/**
 * LaplandWeddings — etusivun standardi mainospaikat (LV Media).
 *
 * JAETTU MALLI: MainPartnerBanner (sponsors[0]) heti heron alle +
 * HomeAdSlots-osio (sponsors[1] + 6 premium-paikkaa) heti ensimmäisen
 * sisältöosion jälkeen.
 *
 * MYYTY KUMPPANI → täytä sponsors[0]/[1] tai spotin partner + BUILD + DEPLOY.
 * Tyhjät paikat renderöivät house-adin ("Haluatko mainoksesi tähän?") joka
 * linkittää LV Media -portaaliin.
 */

import type { HomeAdSlotsConfig } from '../../../shared/HomeAdSlots';
import type { Partner } from '../../../shared/PartnerSlot';
import { DEFAULT_PREMIUM_SPOTS } from '../../../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandweddings',
  sponsors: [null, null],
  spots: DEFAULT_PREMIUM_SPOTS,
};

/**
 * ESITTELYKUMPPANI-PAIKAT (Vesa 2026-07-26: "TOTTAKAI HALUAN" / "TEE KAIKKI")
 * ==========================================================================
 * Sivusto nosti 21 nimettyä hääpaikkaa isoilla kuva+kuvaus-korteilla ja antoi
 * jokaiselle oman kokonaisen `/venues/:slug`-sivun täysin ilmaiseksi, samalla
 * kun molemmat myydyt mainospaikat (`sponsors`) olivat tyhjinä. Sama kuvio kuin
 * hoteldealsilla 26.7. ja diningin Nilillä 24.7. Nyt jokaisen venue-ruudukon
 * kärkeen tulee YKSI myytävä Esittelykumppani-paikka. Malli on sama kuin
 * laplandhoteldeals `FeaturedPartnerSlot` (commit `f67c6d6`) ja alun perin
 * laplanddining `/restaurants` (`bdf9b37`): **AdSpec + 1 datarivi** — paikka on
 * pelkkä avain tässä taulukossa, ei oma komponentti per pinta.
 *
 * Säännöt (älä pura näitä ilman Vesan päätöstä):
 *  - Tyhjä (null) = kanoninen VAALEA house-ad `shared/PartnerSlot`ista
 *    ("MAINOSPAIKKA VAPAANA / Varaa mainospaikka →"). EI koskaan automaattista
 *    nostoa jollekin venuelle — ilmainen iso pinta on juuri se mikä korjattiin.
 *  - Maksettu paikka on merkittävä mainokseksi (KKV) — merkintä tehdään
 *    `FeaturedPartnerSlot`issa, ei täällä.
 *  - Paikat näkyvät vain fi/en/sv (`adLocaleEnabled`). Muilla 9 kielellä paikka
 *    jää pois kokonaan ja toimituksellinen venue-kortisto renderöityy
 *    ennallaan — pintaan ei jää aukkoa.
 *  - Myydyn kumppanin linkki EI ole affiliate-muotoinen: maksettu esittely
 *    noudattaa bear-precedenttia ("maksettu esittely, ei komissiolinkki").
 *    Valokuvaajien UTM-referral-linkit (`withReferral`, 6 kpl 25.7.) ja venue-
 *    korttien affiliate-CTA:t pysyvät omissa reiteissään koskemattomina.
 *  - Ansaittu `EditorsPickChip` EI ole osa tätä inventaaria eikä myynnissä.
 *
 * Myynti: täytä alla oleva kenttä Partner-objektilla → build → deploy.
 */
export type FeaturedPlacement =
  | 'home_featured'
  | 'venues_index'
  | 'venue_related'
  | 'location_venues'
  | 'wedding_type_venues';

/**
 * Paikan konteksti mainosmerkinnässä ("Esittelykumppani · Hääpaikat").
 * Vain fi/en/sv, koska paikka itse on `adLocaleEnabled`-rajattu — nämä eivät
 * kuulu 12-kielisiin copy-tiedostoihin eivätkä vuoda muille kielille.
 */
export const FEATURED_CONTEXT: Record<FeaturedPlacement, { fi: string; en: string; sv: string }> = {
  home_featured: { fi: 'Suositellut hääpaikat', en: 'Featured venues', sv: 'Utvalda bröllopsplatser' },
  venues_index: { fi: 'Hääpaikat', en: 'Wedding venues', sv: 'Bröllopsplatser' },
  venue_related: { fi: 'Saman alueen hääpaikat', en: 'Venues in the same region', sv: 'Platser i samma region' },
  location_venues: { fi: 'Alueen hääpaikat', en: 'Venues in this region', sv: 'Regionens bröllopsplatser' },
  wedding_type_venues: { fi: 'Sopivat hääpaikat', en: 'Suitable venues', sv: 'Passande platser' },
};

/** Myydyt Esittelykumppani-paikat. null = house-ad (paikka vapaana). */
export const FEATURED_PARTNERS: Record<FeaturedPlacement, Partner | null> = {
  home_featured: null,
  venues_index: null,
  venue_related: null,
  location_venues: null,
  wedding_type_venues: null,
};
