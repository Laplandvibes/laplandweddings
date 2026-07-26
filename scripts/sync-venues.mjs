#!/usr/bin/env node
/**
 * sync-venues.mjs — pull REAL Google review data for every venue in the
 * canonical venue registry (`src/data/venues.ts`).
 *
 * Re-sync:
 *   cd laplandweddings-new && node scripts/sync-venues.mjs
 *
 * Cost: Places API (New) Text Search, **Pro** SKU (rating + userRatingCount are
 * Pro fields) = $0.032 / request. One request per registry venue, so a full run
 * of the current 21 venues is ≈ $0.67 against Google's $200/month Maps free
 * credit. The field mask below is deliberately minimal — every extra field
 * class (reviews, opening hours, websiteUri, photos, priceLevel) would push the
 * request into the Enterprise SKU and multiply the bill for data this site does
 * not display.
 *
 * Writes exactly one file:
 *   src/data/generated/venues-from-maps.json   (gitted, keyed by venue slug)
 *
 * It NEVER writes src/data/venues.ts. That file is the hand-maintained
 * editorial layer (names, regions, capacities, descriptions, spaces, contacts)
 * and the two layers are merged at module load. Re-running this script can
 * therefore never clobber editorial work.
 *
 * ── FAIL CLOSED ──────────────────────────────────────────────────────────────
 * A review score pasted onto the WRONG venue is worse than no score at all: it
 * is a fabricated recommendation, and it is invisible to us because it looks
 * exactly like a correct one. So a candidate is accepted only when ALL gates
 * pass:
 *
 *   1. NAME     — normalised (diacritics folded, punctuation dropped, spaces
 *                 removed) containment, or Dice-bigram similarity ≥ 0.72.
 *   2. NOT-THE-  A candidate whose whole name is just the locality ("Levi",
 *      PLACE      "Inari") is the resort/municipality, not our venue. Rejected
 *                 even though plain containment would accept it, because most
 *                 venue names here START with their locality
 *                 ("Levi Ice Castle", "Tundrea Kilpisjärvi").
 *   3. HEAD      The LAST word of the registry name must appear in the
 *      TOKEN     candidate. Within a hotel chain it is the final word that
 *                identifies the property — "Santa's Hotel **Santamus**" vs
 *                "Santa's Hotel **Santa Claus**", two different Rovaniemi
 *                properties of one company that score Dice 0.80 against each
 *                other and would otherwise swap silently.
 *   4. NOT-A-    Per-venue `rejectNames`: listings that are a sub-unit of the
 *      SUB-UNIT  venue (or its parent) rather than the venue itself. A resort
 *                split into several Google listings must not have one wing's
 *                reviews published as the whole resort's.
 *   5. PLACE    — the returned `formattedAddress` contains one of the
 *                 localities we expect for that venue (municipality / resort /
 *                 village, e.g. Levi ⇒ levi | sirkka | kittila).
 *   6. BBOX     — the returned coordinate sits inside the Finnish Lapland
 *                 bounding box. A geographic sanity check that needs no
 *                 hand-typed per-venue coordinates (which would themselves be
 *                 unverifiable invented data).
 *   7. UNIQUE   — post-pass: if two registry venues resolve to the SAME Google
 *      PLACE      Place ID, BOTH are dropped. Wedding venues frequently operate
 *                 inside a hotel or share an address with a parent business.
 *                 This gate is what surfaced the 2026-07-26 Pyhä defect: two
 *                 registry entries shared one website URL, and tracing it
 *                 showed neither venue existed under the name we published.
 *                 Showing one company's reviews twice under two different
 *                 venue names would be a fabricated comparison, so neither
 *                 gets a rating until a human resolves the registry entry.
 *
 * Anything that does not clear every gate is dropped and listed under
 * "UNMATCHED" in the output. The site then simply shows no rating for that
 * venue — never a guess.
 *
 * The API key is read from .env.local (gitignored) and is never printed, never
 * written to any output file, and never committed.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PLACES_BASE = 'https://places.googleapis.com/v1';

// ── API key ────────────────────────────────────────────────────────────────
async function loadApiKey() {
  const envPath = path.join(ROOT, '.env.local');
  let envText;
  try {
    envText = await fs.readFile(envPath, 'utf-8');
  } catch {
    console.error(`FATAL: ${envPath} not found. Add GOOGLE_MAPS_API_KEY=... to it.`);
    process.exit(1);
  }
  const m = envText.match(/^GOOGLE_MAPS_API_KEY\s*=\s*(.+?)\s*$/m);
  if (!m) {
    console.error('FATAL: GOOGLE_MAPS_API_KEY missing from .env.local');
    process.exit(1);
  }
  return m[1].replace(/^["']|["']$/g, '');
}

/**
 * Which localities each registry venue may legitimately resolve to, and the
 * city string used in the search query. Kept here rather than in the registry
 * because it is sync plumbing, not published copy. Names are NOT duplicated
 * here — they are read out of venues.ts below, so the two files can never
 * drift.
 *
 * `locality` entries are compared against the normalised formattedAddress, so
 * write them folded (Kittilä → kittila, Ylläs → yllas). They are ALSO the list
 * used by the "candidate is just the locality" rejection, so keep them to real
 * place names.
 *
 * Note that several venues sit outside the resort their `locationSlug` groups
 * them under (SnowVillage is in Lainio, the Ranch in Köngäs, Arctic SnowHotel
 * in Lehtojärvi, the Wilderness hotels around Inari), which is exactly why this
 * map is per venue and not per `locationSlug`.
 */
const TARGETS = {
  kakslauttanen: {
    queryCity: 'Saariselkä, Lapland, Finland',
    locality: ['saariselka', 'kakslauttanen', 'inari', 'ivalo'],
    // Google lists the resort's two villages separately. The site publishes one
    // card for the resort, so a village's reviews are not the resort's.
    rejectNames: ['east village', 'west village'],
  },
  'arctic-snowhotel': { queryCity: 'Rovaniemi, Lapland, Finland', locality: ['rovaniemi', 'lehtojarvi', 'sinetta'] },
  'snow-village-lainio': { queryCity: 'Lainio, Kittilä, Lapland, Finland', locality: ['lainio', 'kittila', 'yllas', 'yllasjarvi', 'levi', 'sirkka'] },
  'northern-lights-ranch': { queryCity: 'Köngäs, Kittilä, Lapland, Finland', locality: ['kongas', 'levi', 'sirkka', 'kittila'] },
  'levi-ice-castle': { queryCity: 'Levi, Kittilä, Lapland, Finland', locality: ['levi', 'sirkka', 'kittila'] },
  'levin-iglut': { queryCity: 'Levi, Kittilä, Lapland, Finland', locality: ['levi', 'sirkka', 'kittila', 'utsuvaara'] },
  'apukka-resort': { queryCity: 'Rovaniemi, Lapland, Finland', locality: ['rovaniemi', 'apukka'] },
  'arctic-treehouse': { queryCity: 'Rovaniemi, Lapland, Finland', locality: ['rovaniemi'] },
  'wilderness-hotel-muotka': { queryCity: 'Inari, Lapland, Finland', locality: ['inari', 'ivalo', 'muotka', 'saariselka'] },
  'wilderness-hotel-inari': { queryCity: 'Inari, Lapland, Finland', locality: ['inari'] },
  'wilderness-hotel-juutua': { queryCity: 'Inari, Lapland, Finland', locality: ['inari', 'juutua'] },
  'northern-lights-village-saariselka': { queryCity: 'Saariselkä, Lapland, Finland', locality: ['saariselka', 'inari', 'ivalo'] },
  'northern-lights-village-levi': { queryCity: 'Levi, Kittilä, Lapland, Finland', locality: ['levi', 'sirkka', 'kittila', 'kongas'] },
  'hotelli-hullu-poro': { queryCity: 'Levi, Kittilä, Lapland, Finland', locality: ['levi', 'sirkka', 'kittila'] },
  'levi-panorama': { queryCity: 'Levi, Kittilä, Lapland, Finland', locality: ['levi', 'sirkka', 'kittila'] },
  'lapland-hotels-saaga': { queryCity: 'Ylläs, Kolari, Lapland, Finland', locality: ['yllas', 'yllasjarvi', 'akaslompolo', 'kolari'] },
  'tundrea-kilpisjarvi': { queryCity: 'Kilpisjärvi, Enontekiö, Lapland, Finland', locality: ['kilpisjarvi', 'enontekio'] },
  // Both sit in the Luosto log village, NOT in Pyhä: the registry called them
  // "Hotel Aurora Pyhä" and "Lapland Hotels Pyhä" until 2026-07-26, when the
  // shared (404) website URL was traced back to two different real properties
  // 20 km away. Keeping the locality list to Luosto is what stops the Pyhä
  // hotels (Hotel Pyhätunturi, SKI-INN Kultakero) from being matched here again.
  'santas-hotel-aurora': { queryCity: 'Luosto, Sodankylä, Lapland, Finland', locality: ['luosto', 'sodankyla'] },
  'lapland-hotels-luostotunturi': { queryCity: 'Luosto, Sodankylä, Lapland, Finland', locality: ['luosto', 'sodankyla'] },
  'santas-hotel-santamus': { queryCity: 'Rovaniemi, Lapland, Finland', locality: ['rovaniemi'] },
  'nova-skyland': { queryCity: 'Rovaniemi, Lapland, Finland', locality: ['rovaniemi'] },
};

/**
 * Finnish Lapland bounding box (plus a small margin). Rovaniemi ≈ 66.5 N,
 * Nuorgam ≈ 70.09 N, western border ≈ 20.5 E (Kilpisjärvi ≈ 20.8 E), eastern
 * ≈ 30.6 E. Anything outside this is not a Lapland venue, whatever Google
 * called it.
 */
const LAPLAND_BBOX = { minLat: 65.4, maxLat: 70.2, minLng: 20.0, maxLng: 31.0 };

// ── Registry reader (single source of truth for names) ──────────────────────
function unescapeTs(s) {
  return s.replace(/\\(['"\\])/g, '$1');
}

async function readRegistry() {
  const src = await fs.readFile(path.join(ROOT, 'src/data/venues.ts'), 'utf-8');
  // slug / name / locationSlug are the first three fields of every entry.
  // `name` may be single- OR double-quoted ("Santa's Hotel Santamus").
  const re =
    /^\s{4}slug:\s*'([^']+)',\s*\r?\n\s{4}name:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"),\s*\r?\n\s{4}locationSlug:\s*'([^']+)'/gm;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({
      key: m[1],
      name: unescapeTs(m[2] !== undefined ? m[2] : m[3]),
      locationSlug: m[4],
    });
  }
  if (out.length === 0) {
    console.error('FATAL: could not parse any venues out of src/data/venues.ts.');
    console.error('       The registry format changed — fix the regex before trusting a sync.');
    process.exit(1);
  }
  return out;
}

// ── Name matching ──────────────────────────────────────────────────────────
const fold = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const compact = (s) => fold(s).replace(/ /g, '');

function bigrams(s) {
  const out = new Set();
  for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2));
  return out;
}

/** Sørensen–Dice coefficient over character bigrams (0..1). */
function dice(a, b) {
  const A = bigrams(a);
  const B = bigrams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let shared = 0;
  for (const g of A) if (B.has(g)) shared++;
  return (2 * shared) / (A.size + B.size);
}

const NAME_MIN_DICE = 0.72;

function nameGate(expected, candidate) {
  const a = compact(expected);
  const b = compact(candidate);
  if (!a || !b) return { ok: false, score: 0, how: 'empty' };
  if (b.includes(a) || a.includes(b)) return { ok: true, score: 1, how: 'containment' };
  const d = dice(a, b);
  return { ok: d >= NAME_MIN_DICE, score: d, how: `dice ${d.toFixed(2)}` };
}

/**
 * Wedding-venue hardening (not in the hoteldeals original).
 *
 * Almost every venue here is named after where it stands — "Levi Ice Castle",
 * "Tundrea Kilpisjärvi", "Lapland Hotels Luostotunturi". Plain containment therefore
 * accepts a Google result named merely "Levi" or "Pyhä", i.e. the ski resort or
 * the fell itself, and the place + bbox gates cannot catch it because that
 * resort really is at that address. Reject any candidate whose entire name is
 * one of the venue's own locality tokens, or that is too short to identify a
 * business at all.
 */
function genericNameGate(candidate, localities) {
  const c = compact(candidate);
  if (c.length < 5) return { ok: false, why: `candidate name "${candidate}" too short to identify a business` };
  if (localities.some((l) => compact(l) === c)) {
    return { ok: false, why: `candidate "${candidate}" is the locality itself, not the venue` };
  }
  return { ok: true };
}

/**
 * Head-token gate (not in the hoteldeals original).
 *
 * Chains here run several properties whose names share a long prefix, so two
 * different hotels can score high on both containment and Dice: "Santa's Hotel
 * Santamus" vs "Santa's Hotel Santa Claus" (two Rovaniemi properties of Santa's
 * Hotels) sits at Dice 0.80, comfortably over the 0.72 floor, and the address
 * gate cannot separate them because both are in Rovaniemi. What always differs
 * is the LAST word — that is the word the operator uses to tell its own
 * properties apart. So require it to survive into the candidate name.
 *
 * Deliberately a substring test on the compacted candidate, not a token test,
 * so "Saariselkä" still matches inside "…VillageSaariselkä".
 */
function headTokenGate(expected, candidate) {
  const tokens = fold(expected).split(' ').filter(Boolean);
  const head = tokens[tokens.length - 1];
  if (!head) return { ok: true };
  const ok = compact(candidate).includes(head);
  return {
    ok,
    why: ok ? '' : `"${candidate}" is missing the identifying word "${head}" — likely a sibling property of the same chain`,
  };
}

/**
 * Per-venue listing exclusions. A resort that Google splits into several
 * listings (Kakslauttanen East/West Village) must not have one wing's reviews
 * published as the whole resort's rating: the card says "Kakslauttanen Arctic
 * Resort", so the number beside it has to be that resort's, not one village's.
 * If only sub-unit listings exist, the venue correctly ends up with no rating.
 */
function rejectListGate(candidate, rejectNames = []) {
  const c = compact(candidate);
  const hit = rejectNames.find((r) => c.includes(compact(r)));
  return {
    ok: !hit,
    why: hit ? `"${candidate}" is a sub-unit listing ("${hit}"), not the venue as published` : '',
  };
}

function placeGate(address, localities) {
  const a = fold(address || '');
  const hit = localities.find((l) => a.includes(l));
  return { ok: Boolean(hit), hit };
}

function bboxGate(loc) {
  if (!loc || typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number') {
    return { ok: false, why: 'no coordinate' };
  }
  const { latitude: lat, longitude: lng } = loc;
  const ok =
    lat >= LAPLAND_BBOX.minLat &&
    lat <= LAPLAND_BBOX.maxLat &&
    lng >= LAPLAND_BBOX.minLng &&
    lng <= LAPLAND_BBOX.maxLng;
  return { ok, why: ok ? '' : `outside Lapland (${lat.toFixed(3)}, ${lng.toFixed(3)})` };
}

// ── Places API ─────────────────────────────────────────────────────────────
/**
 * Minimal Pro-tier field mask. Do not add fields casually: `reviews`,
 * `regularOpeningHours`, `websiteUri` and `priceLevel` are Enterprise-tier and
 * would raise the per-request price for data this site never renders.
 */
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.businessStatus',
].join(',');

async function textSearch(apiKey, textQuery) {
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery,
      languageCode: 'en',
      regionCode: 'FI',
      maxResultCount: 5,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    // Never echo the key; Google's error bodies do not contain it, but keep the
    // slice short so a future API change cannot leak much either.
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  return data.places || [];
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = await loadApiKey();
  const registry = await readRegistry();
  const today = new Date().toISOString().slice(0, 10);

  console.log(`Registry: ${registry.length} venues parsed from src/data/venues.ts`);
  console.log('Places API (New) Text Search · Pro SKU · ~$0.032/request\n');

  const matched = {};
  const unmatched = [];
  let requests = 0;

  for (const venue of registry) {
    const target = TARGETS[venue.key];
    if (!target) {
      unmatched.push({
        key: venue.key,
        name: venue.name,
        reason: 'no TARGETS entry in sync-venues.mjs (add localities before syncing)',
      });
      console.log(`  x ${venue.key.padEnd(34)} no TARGETS entry — skipped (fail closed)`);
      continue;
    }

    const textQuery = `${venue.name}, ${target.queryCity}`;
    let places;
    try {
      places = await textSearch(apiKey, textQuery);
      requests++;
    } catch (e) {
      unmatched.push({ key: venue.key, name: venue.name, reason: `API error: ${e.message}` });
      console.log(`  x ${venue.key.padEnd(34)} API error: ${e.message}`);
      continue;
    }

    const rejected = [];
    let accepted = null;

    for (const p of places) {
      const candName = p.displayName?.text || '';
      const n = nameGate(venue.name, candName);
      if (!n.ok) {
        rejected.push(`"${candName}" name mismatch (${n.how})`);
        continue;
      }
      const g = genericNameGate(candName, target.locality);
      if (!g.ok) {
        rejected.push(g.why);
        continue;
      }
      const h = headTokenGate(venue.name, candName);
      if (!h.ok) {
        rejected.push(h.why);
        continue;
      }
      const rj = rejectListGate(candName, target.rejectNames);
      if (!rj.ok) {
        rejected.push(rj.why);
        continue;
      }
      const pl = placeGate(p.formattedAddress, target.locality);
      if (!pl.ok) {
        rejected.push(
          `"${candName}" wrong place — address "${p.formattedAddress}" has none of [${target.locality.join(', ')}]`,
        );
        continue;
      }
      const bb = bboxGate(p.location);
      if (!bb.ok) {
        rejected.push(`"${candName}" ${bb.why}`);
        continue;
      }
      if (typeof p.rating !== 'number' || typeof p.userRatingCount !== 'number') {
        rejected.push(`"${candName}" matched but Google returned no rating`);
        continue;
      }
      if (p.businessStatus && p.businessStatus !== 'OPERATIONAL') {
        rejected.push(`"${candName}" businessStatus=${p.businessStatus}`);
        continue;
      }
      accepted = { p, nameHow: n.how, localityHit: pl.hit };
      break;
    }

    if (!accepted) {
      unmatched.push({
        key: venue.key,
        name: venue.name,
        reason: rejected.length ? rejected.join(' | ') : 'Text Search returned no candidates',
      });
      console.log(`  x ${venue.key.padEnd(34)} NO SAFE MATCH`);
      for (const r of rejected) console.log(`       · ${r}`);
      continue;
    }

    const { p } = accepted;
    matched[venue.key] = {
      // Google's own display name, kept so a reviewer can see WHAT was matched.
      // The published card name still comes from the editorial registry.
      matchedName: p.displayName.text,
      rating: p.rating,
      reviewCount: p.userRatingCount,
      googlePlaceId: p.id,
      address: p.formattedAddress,
      location: p.location,
      lastVerified: today,
    };
    console.log(
      `  v ${venue.key.padEnd(34)} ${String(p.rating).padEnd(4)} · ${String(p.userRatingCount).padStart(5)} reviews  ` +
        `[${accepted.nameHow}, locality "${accepted.localityHit}"]  ${p.displayName.text}`,
    );
  }

  // ── UNIQUE PLACE gate (post-pass) ────────────────────────────────────────
  // Two registry venues resolving to one Google listing means the registry
  // describes one business twice (or a venue was matched to its parent). Either
  // way, printing the same reviews under two names is a fabricated comparison.
  const byPlaceId = new Map();
  for (const [key, rec] of Object.entries(matched)) {
    const list = byPlaceId.get(rec.googlePlaceId) || [];
    list.push(key);
    byPlaceId.set(rec.googlePlaceId, list);
  }
  for (const [placeId, keys] of byPlaceId) {
    if (keys.length < 2) continue;
    console.log(`\n  ! DUPLICATE PLACE ${placeId} claimed by ${keys.length} venues — dropping all (fail closed):`);
    for (const key of keys) {
      const rec = matched[key];
      console.log(`       · ${key} → "${rec.matchedName}"`);
      unmatched.push({
        key,
        name: key,
        reason: `duplicate Google place ${placeId} ("${rec.matchedName}") also claimed by ${keys
          .filter((k) => k !== key)
          .join(', ')} — same business under two registry entries, dropped so one company's reviews are not shown twice`,
      });
      delete matched[key];
    }
  }

  const generatedDir = path.join(ROOT, 'src/data/generated');
  await fs.mkdir(generatedDir, { recursive: true });
  const outPath = path.join(generatedDir, 'venues-from-maps.json');
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        _README:
          'GENERATED by scripts/sync-venues.mjs from Google Places API (New) Text Search. ' +
          'Do not hand-edit: re-run the script instead. Editorial data (names, regions, ' +
          'capacities, descriptions, contacts) lives in src/data/venues.ts and is never ' +
          'written by the sync.',
        _syncedAt: today,
        venues: matched,
        unmatched,
      },
      null,
      2,
    ) + '\n',
  );

  // Distribution, so the pick thresholds can be DERIVED from the real field
  // rather than copied from another site.
  const ratings = Object.values(matched)
    .map((m) => m.rating)
    .sort((a, b) => a - b);
  const counts = Object.values(matched)
    .map((m) => m.reviewCount)
    .sort((a, b) => a - b);
  const median = (arr) =>
    arr.length === 0 ? null : arr.length % 2 ? arr[(arr.length - 1) / 2] : (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;

  console.log('');
  console.log(`v ${Object.keys(matched).length}/${registry.length} venues have verified Google review data`);
  if (ratings.length) {
    console.log(`  rating  min ${ratings[0]}  median ${median(ratings)}  max ${ratings[ratings.length - 1]}`);
    console.log(`          all: ${ratings.join(', ')}`);
    console.log(`  reviews min ${counts[0]}  median ${median(counts)}  max ${counts[counts.length - 1]}`);
    console.log(`          all: ${counts.join(', ')}`);
  }
  if (unmatched.length) {
    console.log(`! ${unmatched.length} left WITHOUT review data (fail closed):`);
    for (const u of unmatched) console.log(`    ${u.key}: ${u.reason}`);
  }
  console.log(`v ${requests} API requests ~ $${(requests * 0.032).toFixed(2)}`);
  console.log('v wrote src/data/generated/venues-from-maps.json');
}

main().catch((e) => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
