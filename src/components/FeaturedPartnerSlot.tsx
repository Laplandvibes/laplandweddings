/**
 * FeaturedPartnerSlot — myytävä "Esittelykumppani"-paikka venue-ruudukon
 * kärjessä.
 *
 * Miksi (Vesa 2026-07-26): sivuston 21 nimettyä hääpaikkaa saivat isot
 * kuva+kuvaus-kortit JA oman kokonaisen `/venues/:slug`-sivun ilmaiseksi samalla
 * kun molemmat myydyt mainospaikat olivat tyhjinä. Nyt jokainen venue-ruudukko
 * alkaa yhdellä myytävällä paikalla, ja toimituksellinen kärkivalinta on pelkkä
 * ansaittu chip normaalikortilla (ks. `bestGoogleRated` / `EditorsPickChip` —
 * sitä ei myydä; peruste on aito Google-arvio, ei mikään tässä tiedostossa).
 *
 * Kanoninen malli: laplandhoteldeals `FeaturedPartnerSlot` (commit `f67c6d6`),
 * alkumalli laplanddining `CityFeaturedSlot` (`bdf9b37`). Sama rakenne,
 * konteksti kaupungin sijasta pinta.
 *
 * KKV: maksettu paikka on merkitty selvästi mainokseksi (pinkki "Mainos"
 * -pilleri + "Esittelykumppani · <pinta>"), samalla muotoilulla kuin verkoston
 * muut maksetut paikat.
 *
 * Tyhjä paikka renderöi kanonisen VAALEAN house-adin `shared/PartnerSlot`ista
 * (bg #F9FAFB, dashed-pinkki reunus, pinkki pilleri-CTA; hehku inline-tyylinä
 * koska arbitrary `shadow-[…]` ei emitoidu kaikissa repoissa).
 *
 * Lokaalirajaus (Vesa 2026-07-30, kaksijakoinen sääntö): MYYTY kortti
 * renderöityy KAIKILLA 12 kielellä — kumppani maksoi näkyvyydestä, joten
 * `adLocaleEnabled`-porttia EI käytetä sen ympärillä ja merkintäcopy on
 * käännetty 12 kielelle (MARKER + FEATURED_CONTEXT, fallback EN). Vain TYHJÄN
 * paikan house-ad on fi/en/sv-portin takana (mainostilan ostajat asioivat
 * näillä kielillä). Muilla kielillä tyhjä paikka ei renderöi mitään, eikä
 * pintaan jää aukkoa: toimituksellinen venue-kortisto on erillään tästä ja
 * renderöityy kaikilla 12 kielellä ennallaan.
 */
import PartnerSlot from '../../../shared/PartnerSlot';
import { adLocaleEnabled, normalizeAdLocale, type AdLocale } from '../../../shared/adSlotsCopy';
import { AD_SLOTS, FEATURED_CONTEXT, FEATURED_PARTNERS, type FeaturedPlacement } from '../data/adSlots';

/**
 * Surfaces on which an UNSOLD placement may still render its "advertise here"
 * notice. Empty on purpose — see the comment at the return below. A SOLD
 * placement is unaffected and renders on every surface.
 */
const HOUSE_AD_SURFACES = new Set<FeaturedPlacement>();

/** Mainosmerkinnän copy 12 kielellä (avain = normalizeAdLocale-koodi) — myyty
 *  kortti renderöityy kaikilla kielillä, joten merkintä ei saa pudota
 *  englantiin. Mainossana on sama kuin verkoston AD_LABEL-vakiossa. */
const MARKER: Record<AdLocale, { ad: string; featured: string }> = {
  en: { ad: 'Advertisement', featured: 'Featured partner' },
  fi: { ad: 'Mainos', featured: 'Esittelykumppani' },
  sv: { ad: 'Annons', featured: 'Utvald partner' },
  de: { ad: 'Anzeige', featured: 'Vorgestellter Partner' },
  fr: { ad: 'Annonce', featured: 'Partenaire à la une' },
  it: { ad: 'Annuncio', featured: 'Partner in evidenza' },
  es: { ad: 'Anuncio', featured: 'Partner destacado' },
  pt: { ad: 'Anúncio', featured: 'Parceiro em destaque' },
  nl: { ad: 'Advertentie', featured: 'Uitgelichte partner' },
  ja: { ad: '広告', featured: '注目パートナー' },
  ko: { ad: '광고', featured: '추천 파트너' },
  zh: { ad: '广告', featured: '精选合作伙伴' },
};

function markerCopy(locale: string) {
  return MARKER[normalizeAdLocale(locale)] ?? MARKER.en;
}

function contextLabel(placement: FeaturedPlacement, locale: string): string {
  const c = FEATURED_CONTEXT[placement];
  return c[normalizeAdLocale(locale)] ?? c.en;
}

export default function FeaturedPartnerSlot({
  placement,
  locale,
  className,
}: {
  placement: FeaturedPlacement;
  locale: string;
  className?: string;
}) {
  const m = markerCopy(locale);
  const context = contextLabel(placement, locale);
  const partner = FEATURED_PARTNERS[placement];
  const wrap = ['mb-8 sm:mb-10', className].filter(Boolean).join(' ');

  if (partner) {
    return (
      <div className={wrap} data-featured-partner={placement}>
        <p className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-mute mb-2">
          <span className="inline-flex items-center rounded-full bg-[#EC4899] px-2 py-0.5 text-white">
            {m.ad}
          </span>
          <span>
            {m.featured} · {context}
          </span>
        </p>
        {/* Kanoninen PartnerSlot-banneri on tummalla sivulla `bg-white/5`
            -lasikortti eli hyvin vähäeleinen. Lisätään sivuston oma
            kultahiusviiva PELKKÄNÄ LISÄYKSENÄ (ring + varjo eivät kilpaile
            mistään olemassa olevasta declarationista, joten Tailwind-
            luokkajärjestys ei voi kumota sitä) → maksava kumppani ei huku
            espressotaustaan. */}
        <PartnerSlot
          variant="banner"
          partner={partner}
          locale={locale}
          surface="dark"
          className="ring-1 ring-gold/40 shadow-lg shadow-black/40"
        />
      </div>
    );
  }

  // 🔴 EMPTY SLOT ≠ SOLD SLOT (Vesa 2026-08-02, on the sibling luxury site:
  // "aika paljon noita haluatko mainoksesi tähän osioita, tulee sellainen olo
  // että ei hyvä"). This component carried two different products down one
  // branch. A SOLD placement is content and still renders on all five surfaces
  // above — no inventory is lost. An EMPTY placement is a vacancy notice, and
  // repeating it on every surface reads as a half-empty billboard wall on a
  // page selling five-figure weddings.
  //
  // Counted on this site: five FeaturedPartnerSlot surfaces (home, /venues,
  // /venues/:slug ×21, /locations/:slug ×8, /wedding-types/:slug ×6) with
  // FEATURED_PARTNERS empty on every one, so home → venues → venue → location
  // met "MAINOSPAIKKA VAPAANA" four times in one journey.
  //
  // The house ad keeps exactly one home: the /partner-with-us page plus the
  // dedicated HomeAdSlots row, which is where someone shopping for ad space is
  // actually looking. Restoring a surface = add its placement to this set.
  //
  // fi/en/sv-portti koskee VAIN tätä house-ad-haaraa (Vesa 2026-07-13) — myyty
  // kortti yllä renderöityy kaikilla 12 kielellä (Vesa 2026-07-30).
  if (!adLocaleEnabled(locale)) return null;
  if (!HOUSE_AD_SURFACES.has(placement)) return null;

  return (
    <div className={wrap} data-featured-partner={placement}>
      <PartnerSlot
        variant="banner"
        partner={null}
        locale={locale}
        surface="dark"
        placeholder={{
          siteSlug: AD_SLOTS.siteSlug,
          slotId: `featured_${placement}`,
          level: 'premium',
          label: `${m.featured} · ${context}`,
        }}
      />
    </div>
  );
}
