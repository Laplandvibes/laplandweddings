/**
 * Venue → partner PROPERTY ids, so a "check rates" button opens the venue's own
 * booking page instead of a city list or a partner front page.
 *
 * WHY THIS FILE EXISTS (measured 2026-08-02, not guessed)
 * ======================================================
 * Probing the Worker once per CTA with redirect:'manual' and reading the
 * Location header gave, for the 21 venue heroes × 2 partner paths:
 *
 *     property page   0 / 38
 *     city/area list 20 / 38
 *     PARTNER FRONT PAGE 18 / 38
 *
 * Three separate causes, all fixed here + in `lib/affiliate.ts`:
 *
 * 1. `anchorFinland()` glued ", Finland" onto the venue NAME. That guard is
 *    right for a TOWN (the lodging partner used to geocode a bare "Lapland" to Indiana)
 *    and actively wrong for a hotel name: Sembo's autosuggest answers [] for
 *    multi-word hotel terms, the Worker then has no destination at all, and the
 *    visitor lands on sembo.fi's front page. `?ss=` is now always the TOWN and
 *    the property is addressed by id.
 * 2. No site ever passed the property ids the Worker has accepted since
 *    2026-07-27 (`sembo_hotel`+`sembo_poly` for fi, `trip_hotel`+`trip_city`
 *    for the other 11 locales).
 * 3. The Worker truncates `<domain>_<sid>` at 50 chars. `laplandweddings_online_`
 *    already eats 23, so `venue_hero_<slug>` was clipped for 13 of 21 venues —
 *    and clipped into COLLISIONS: all three Wilderness hotels arrived as
 *    `..._venue_hero_wilderness-hotel`, and Northern Lights Ranch/Village Levi/
 *    Village Saariselkä all as `..._venue_hero_northern-lights-`. Attribution
 *    wasn't merely truncated, it was merged. Prefix is now `v_` (see affiliate.ts).
 *
 * HOW THE IDS WERE RESOLVED AND VERIFIED
 * ======================================
 * Sembo: `content-hc.sembo.com/CategorizedAutosuggestion?Term=` →
 *   `hotel.hotelCode` + `hotel.mainPolygonId`. Every id was then opened in a
 *   real browser at the Worker's own plan URL and the rendered property name
 *   read back. A wrong id does not 404 — it renders a different, plausible
 *   hotel — so a 200 was never accepted as proof.
 * Trip.com: SEO detail URL `/hotels/<city>-hotel-detail-<hotelId>/<slug>/`,
 *   then `/hotels/detail/?hotelId=&cityId=` fetched and the `<h1>` read back.
 *
 * 🔴 NEGATIVE CONTROL (it fired). The documented route
 * `/hotels/list?city=<id>&searchWord=<hotel>` neither filters nor, on the
 * server-rendered payload, re-ranks: searching "Hotel Levi Panorama" in Kittilä
 * returns Hotel Kittilä first and does not contain Levi Panorama at all.
 * Trusting result #1 would have mislabelled Levi Panorama, Nova Skyland and
 * Santamus. Match the NAME, never the position.
 *
 * 🔴 DO NOT INVENT AN ID to fill a blank. Two venues are deliberately empty and
 * their buttons degrade instead (see `venueIsBookable`).
 */

export interface VenueBooking {
  /** TOWN passed as `?ss=` — never the hotel name. Resolves the city for the
   *  partner that lacks a property id, and is the honest fallback. */
  town: string;
  semboHotel?: string;
  semboPoly?: string;
  tripHotel?: string;
  tripCity?: string;
}

/**
 * Verified 2026-08-02. `verifiedName` in the comment is what the partner's own
 * page rendered — keep it, it is the evidence that the id is the right hotel.
 */
export const VENUE_BOOKING: Record<string, VenueBooking> = {
  // Sembo: "Kakslauttanen Arctic Resort" · Trip: "Kakslauttanen Arctic Resort - Igloos and Chalets"
  kakslauttanen: { town: 'Saariselkä', semboHotel: '1679682', semboPoly: '360014', tripHotel: '8669535', tripCity: '56309' },
  // Sembo: "Arctic SnowHotel & Glass Igloos" · Trip: "Arctic SnowHotel & Glass Igloos"
  'arctic-snowhotel': { town: 'Rovaniemi', semboHotel: 'FI-1040', semboPoly: '360732', tripHotel: '8197351', tripCity: '1794' },
  // Sembo has no listing at all (autosuggest returns Colorado/New Hampshire
  // fuzz for "SnowVillage"/"Lainio"). Trip: "Lapland Hotels SnowVillage".
  'snow-village-lainio': { town: 'Kittilä', tripHotel: '9705330', tripCity: '38182' },
  // Sembo: "Northern Lights Ranch, Kittila [Koengaes]" · Trip: "Northern Lights Ranch"
  'northern-lights-ranch': { town: 'Kittilä', semboHotel: '1014610', semboPoly: '360115', tripHotel: '10090817', tripCity: '38182' },
  // 🔴 NEITHER partner sells it. Trip's nearest offer is "Luvattumaa - Levi Ice
  // Gallery" (9884273) — a different operator's ice attraction. Left empty on
  // purpose; the button degrades to "See stays in Levi".
  'levi-ice-castle': { town: 'Levi' },
  // Sembo: "Golden Crown Levin Iglut" · Trip: "Golden Crown - Levin Iglut"
  'levin-iglut': { town: 'Levi', semboHotel: '2512109', semboPoly: '360006', tripHotel: '9528161', tripCity: '38182' },
  // Sembo: "Apukka Resort, Rovaniemi" · Trip: "Apukka Resort"
  'apukka-resort': { town: 'Rovaniemi', semboHotel: '656849', semboPoly: '360462', tripHotel: '9940210', tripCity: '1794' },
  // Sembo: "Arctic TreeHouse Hotel" · Trip: "Arctic TreeHouse Hotel"
  'arctic-treehouse': { town: 'Rovaniemi', semboHotel: '922953', semboPoly: '360732', tripHotel: '10035619', tripCity: '1794' },
  // Sembo: "Wilderness Hotel Muotka & Igloos" · Trip: "Wilderness Hotel Muotka & Igloos"
  'wilderness-hotel-muotka': { town: 'Saariselkä', semboHotel: '766605', semboPoly: '360102', tripHotel: '10628631', tripCity: '56309' },
  // Sembo: "Wilderness Hotel Inari & Igloos" · Trip: "Wilderness Hotel Inari & Igloos"
  'wilderness-hotel-inari': { town: 'Inari', semboHotel: '766602', semboPoly: '360410', tripHotel: '10871588', tripCity: '38225' },
  // Trip id 776976 — its SEO slug is the stale "tradition-hotel-kultahovi" but
  // the page's own <h1> is "Wilderness Hotel Juutua". The other candidate,
  // 10753967, renders "Inari Juutua" and is a DIFFERENT property.
  'wilderness-hotel-juutua': { town: 'Inari', semboHotel: '2526253', semboPoly: '360410', tripHotel: '776976', tripCity: '38225' },
  // Sembo + Trip: "Northern Lights Village Saariselkä"
  'northern-lights-village-saariselka': { town: 'Saariselkä', semboHotel: '1595628', semboPoly: '360532', tripHotel: '10754001', tripCity: '38225' },
  // Sembo + Trip: "Northern Lights Village Levi"
  'northern-lights-village-levi': { town: 'Levi', semboHotel: '1000377', semboPoly: '360696', tripHotel: '26443931', tripCity: '38182' },
  // Sembo + Trip: "Hotel Hullu Poro". 🔴 A looser name match would have taken
  // one of the four Hullu Poro listings (Areena, Hostel, a 3-review duplicate)
  // — the same trap the 2026-07-29 Google-review sync hit.
  'hotelli-hullu-poro': { town: 'Levi', semboHotel: '18113', semboPoly: '360006', tripHotel: '2145630', tripCity: '38182' },
  // Sembo + Trip: "Hotel Levi Panorama"
  'levi-panorama': { town: 'Levi', semboHotel: '18138', semboPoly: '360006', tripHotel: '2150418', tripCity: '38182' },
  // Sembo: "Lapland Hotels Saaga, Yllas" · Trip: "Lapland Hotels Saaga" (Trip
  // files Ylläsjärvi under the Kolari municipality id, not the Ylläs one).
  'lapland-hotels-saaga': { town: 'Ylläs', semboHotel: '1741117', semboPoly: '360476', tripHotel: '5931460', tripCity: '259389' },
  // Sembo: "Tundrea, Kilpisjarvi" · Trip: "Tundrea Holiday Resort"
  'tundrea-kilpisjarvi': { town: 'Kilpisjärvi', semboHotel: '498568', semboPoly: '360488', tripHotel: '9838621', tripCity: '259384' },
  // Sembo + Trip: "Santa's Hotel Aurora & Igloos"
  'santas-hotel-aurora': { town: 'Luosto', semboHotel: '282349', semboPoly: '360048', tripHotel: '3176942', tripCity: '56309' },
  // Sembo + Trip: "Lapland Hotels Luostotunturi & Amethyst Spa"
  'lapland-hotels-luostotunturi': { town: 'Luosto', semboHotel: '1727124', semboPoly: '360048', tripHotel: '3044287', tripCity: '9888' },
  // 🔴 NEITHER partner lists Santamus. Both offer "Santa's Hotel Santa Claus"
  // instead (Sembo FI-H22788 / Trip 2164549) — a DIFFERENT hotel in the same
  // chain. This is exactly the mismatch the venue review sync already refused
  // to guess on 2026-07-29. Left empty; the button degrades.
  'santas-hotel-santamus': { town: 'Rovaniemi' },
  // Sembo + Trip: "Nova Skyland Hotel"
  'nova-skyland': { town: 'Rovaniemi', semboHotel: '905083', semboPoly: '360049', tripHotel: '11619373', tripCity: '1794' },
};

/**
 * Does this venue have a bookable page at the partner serving THIS locale?
 *
 * The Worker sends fi_FI to Sembo and every other locale to Trip.com, so
 * bookability is per-locale: SnowVillage is bookable for an English visitor and
 * not for a Finnish one. A card must never promise a property page the link for
 * that visitor's locale cannot deliver — same rule as the sibling site's
 * `ctaPromisesProperty()`.
 */
export function venueIsBookable(slug: string, lang: string): boolean {
  const b = VENUE_BOOKING[slug];
  if (!b) return false;
  return lang === 'fi' ? Boolean(b.semboHotel && b.semboPoly) : Boolean(b.tripHotel);
}

/** Town used for `?ss=` and for the degraded button label. */
export function venueTown(slug: string): string {
  return VENUE_BOOKING[slug]?.town ?? 'Lapland';
}
