#!/usr/bin/env node
/**
 * sync-route-i18n-names.mjs — keep the prerenderer's per-locale NAMES in sync
 * with the site's own canonical registries.
 *
 *   src/data/locations.ts     name{12}   →  route-i18n.json  locations[].name
 *   src/data/weddingTypes.ts  name{12}   →  route-i18n.json  types[].name
 *   src/data/venues.ts        region{12} →  route-i18n.json  venues[].region
 *
 * All 12 locales, en and fi included (2026-10-05). Before that en and fi came
 * from a hand-kept copy inside prerender-meta.mjs, which had drifted from the
 * registry in five venue regions, and the browser builds the same <title> from
 * the registry: one source means both sides read these values.
 *
 * ── WHY THIS EXISTS ──────────────────────────────────────────────────────────
 * The registries hold page prose (venues.ts description.en for kakslauttanen is
 * 306 chars), while a meta description is written to survive Google's ~155-char
 * truncation (the same venue: 119 chars). So the DESCRIPTIONS are not synced
 * from the registry: they live in src/lib/{venue,location,type}Meta.mjs, which
 * both the prerenderer and the page components import.
 *
 * The NAMES are a different case. `name` / `region` are short identifiers with
 * exactly the same job in both places, and the registries are the hand-maintained,
 * reviewed, already-live layer. Measured 2026-08-14: the prerenderer's generated
 * locale file disagreed with the registries in **126** of 210 venue regions, and
 * **23** of those were still bare English on a non-English page — including
 * "Santa Claus Village", which the registry translates for all 12 locales
 * (Weihnachtsmanndorf, Kerstmandorp, Jultomtens by, サンタクロース村 …) while the
 * generated file kept English for de, es, it, ja, nl, pt-BR and sv.
 *
 * So: names come from the registry, meta descriptions from src/lib/*Meta.mjs.
 *
 * ── FAIL LOUD ────────────────────────────────────────────────────────────────
 * Same contract as `sync-venues.mjs`: these registries are TypeScript parsed with
 * a regex, so a format change must stop the build rather than silently produce a
 * file with fewer translations than before. Coverage is compared against the
 * existing route-i18n.json and any DROP is fatal.
 *
 * Run:  node scripts/sync-route-i18n-names.mjs        (part of `npm run build`)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TARGET = resolve(__dirname, 'route-i18n.json');

const LOCALES = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];

/**
 * Pull `slug` → { locale: value } for one multilingual field out of a registry.
 *
 * The registries are flat arrays of object literals whose entries open with
 * `slug: '…'`. We slice from each slug to the next one so a field name that also
 * exists on a nested object (venues.ts has `name` on both the venue and its
 * `weddingSpaces`) cannot leak across entry boundaries.
 */
function extract(file, field) {
  const src = readFileSync(resolve(ROOT, file), 'utf-8');
  const starts = [...src.matchAll(/^\s*slug:\s*'([^']+)',/gm)];
  if (starts.length === 0) {
    throw new Error(`FATAL: no slugs parsed out of ${file}. The registry format changed — fix the regex before trusting a sync.`);
  }

  const out = {};
  for (let i = 0; i < starts.length; i++) {
    const slug = starts[i][1];
    const from = starts[i].index;
    const to = i + 1 < starts.length ? starts[i + 1].index : src.length;
    const entry = src.slice(from, to);

    // First `<field>: {` at entry level, then read its quoted key/value pairs.
    const block = entry.match(new RegExp(`\\n\\s{2,6}${field}:\\s*\\{([^}]*)\\}`));
    if (!block) continue;

    const vals = {};
    for (const kv of block[1].matchAll(/(?:'([^']+)'|([A-Za-z-]+))\s*:\s*'((?:[^'\\]|\\.)*)'/g)) {
      vals[kv[1] || kv[2]] = kv[3].replace(/\\'/g, "'");
    }
    if (Object.keys(vals).length) out[slug] = vals;
  }

  if (Object.keys(out).length === 0) {
    throw new Error(`FATAL: parsed ${starts.length} slugs from ${file} but not one '${field}' block. Fix the regex.`);
  }
  return out;
}

const registry = {
  locations: { data: extract('src/data/locations.ts', 'name'), field: 'name' },
  types: { data: extract('src/data/weddingTypes.ts', 'name'), field: 'name' },
  venues: { data: extract('src/data/venues.ts', 'region'), field: 'region' },
};

const json = JSON.parse(readFileSync(TARGET, 'utf-8'));

let changed = 0;
let missing = 0;
const before = {};
const after = {};

for (const [group, { data, field }] of Object.entries(registry)) {
  for (const locale of LOCALES) {
    for (const entry of json[locale]?.[group] ?? []) {
      const authoritative = data[entry.slug]?.[locale];
      if (!authoritative) {
        missing++;
        continue;
      }
      const en = data[entry.slug]?.en;
      before[`${group}.${field}`] ??= 0;
      after[`${group}.${field}`] ??= 0;
      // The English row equals English by definition: count only the other locales.
      if (locale !== 'en' && entry[field] === en) before[`${group}.${field}`]++;
      if (locale !== 'en' && authoritative === en) after[`${group}.${field}`]++;

      if (entry[field] !== authoritative) {
        entry[field] = authoritative;
        changed++;
      }
    }
  }
}

// A registry that suddenly resolves fewer entries means the parse broke, not
// that the site shrank. Refuse to write a thinner file than we read.
if (missing > 0) {
  throw new Error(
    `FATAL: ${missing} slug×locale pairs had no registry value. Either a slug was renamed in one place only, or the parse regressed. Not writing.`
  );
}

writeFileSync(TARGET, JSON.stringify(json, null, 2) + '\n', 'utf-8');

const stillEnglish = Object.entries(after)
  .map(([k, v]) => `${k} ${v}`)
  .join(', ');
console.log(
  `[route-i18n] names synced from registries: ${changed} value(s) updated. ` +
    `Entries whose translation legitimately equals English (bare Finnish toponyms such as Saariselkä, Kilpisjärvi, "Lainio, Kittilä"): ${stillEnglish}.`
);
