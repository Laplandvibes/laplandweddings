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
import type { AdLocale } from '../../../shared/adSlotsCopy';
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
 *  - MYYTY paikka näkyy KAIKILLA 12 kielellä (Vesa 2026-07-30: kumppani maksoi
 *    näkyvyydestä — täydet käännökset, ei `adLocaleEnabled`-porttia). Vain
 *    TYHJÄN paikan house-ad on fi/en/sv-portin takana (Vesa 2026-07-13:
 *    mainostilan ostajat asioivat näillä kielillä). Muilla 9 kielellä tyhjä
 *    paikka jää pois kokonaan ja toimituksellinen venue-kortisto renderöityy
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
 * 12 kielellä (avain = normalizeAdLocale-koodi), koska MYYTY kortti renderöityy
 * kaikilla kielillä — merkintäketju ei saa pudota englantiin keskellä muuten
 * käännettyä sivua. House-ad käyttää näistä vain fi/en/sv-rivejä (portti).
 */
export const FEATURED_CONTEXT: Record<FeaturedPlacement, Record<AdLocale, string>> = {
  home_featured: {
    fi: 'Suositellut hääpaikat', en: 'Featured venues', sv: 'Utvalda bröllopsplatser',
    de: 'Ausgewählte Hochzeitslocations', fr: 'Lieux de mariage sélectionnés',
    it: 'Location selezionate', es: 'Lugares de boda destacados',
    pt: 'Locais de casamento em destaque', nl: 'Uitgelichte trouwlocaties',
    ja: 'おすすめのウェディング会場', ko: '추천 웨딩 장소', zh: '精选婚礼场地',
  },
  venues_index: {
    fi: 'Hääpaikat', en: 'Wedding venues', sv: 'Bröllopsplatser',
    de: 'Hochzeitslocations', fr: 'Lieux de mariage', it: 'Location per matrimoni',
    es: 'Lugares de boda', pt: 'Locais de casamento', nl: 'Trouwlocaties',
    ja: 'ウェディング会場', ko: '웨딩 장소', zh: '婚礼场地',
  },
  venue_related: {
    fi: 'Saman alueen hääpaikat', en: 'Venues in the same region', sv: 'Platser i samma region',
    de: 'Locations in derselben Region', fr: 'Lieux de la même région',
    it: 'Location nella stessa regione', es: 'Lugares de la misma región',
    pt: 'Locais na mesma região', nl: 'Locaties in dezelfde regio',
    ja: '同じ地域の会場', ko: '같은 지역의 장소', zh: '同一地区的场地',
  },
  location_venues: {
    fi: 'Alueen hääpaikat', en: 'Venues in this region', sv: 'Regionens bröllopsplatser',
    de: 'Locations der Region', fr: 'Lieux de la région', it: 'Location della regione',
    es: 'Lugares de la región', pt: 'Locais da região', nl: 'Locaties in de regio',
    ja: 'この地域の会場', ko: '이 지역의 장소', zh: '该地区的场地',
  },
  wedding_type_venues: {
    fi: 'Sopivat hääpaikat', en: 'Suitable venues', sv: 'Passande platser',
    de: 'Passende Locations', fr: 'Lieux adaptés', it: 'Location adatte',
    es: 'Lugares adecuados', pt: 'Locais adequados', nl: 'Passende locaties',
    ja: 'ぴったりの会場', ko: '어울리는 장소', zh: '合适的场地',
  },
};

/** Myydyt Esittelykumppani-paikat. null = house-ad (paikka vapaana). */
export const FEATURED_PARTNERS: Record<FeaturedPlacement, Partner | null> = {
  home_featured: null,
  venues_index: null,
  venue_related: null,
  location_venues: null,
  wedding_type_venues: null,
};
