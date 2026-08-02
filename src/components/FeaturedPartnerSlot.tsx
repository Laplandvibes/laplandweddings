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
 * Lokaalirajaus: `adLocaleEnabled` (fi/en/sv) on PAKOLLINEN — ilman sitä
 * fi/en/sv-copy vuotaisi 9 muulle kielelle. Muilla kielillä komponentti ei
 * renderöi mitään, eikä pintaan jää aukkoa: toimituksellinen venue-kortisto on
 * erillään tästä ja renderöityy kaikilla 12 kielellä ennallaan.
 */
import PartnerSlot from '../../../shared/PartnerSlot';
import { adLocaleEnabled } from '../../../shared/adSlotsCopy';
import { AD_SLOTS, FEATURED_CONTEXT, FEATURED_PARTNERS, type FeaturedPlacement } from '../data/adSlots';

/**
 * Surfaces on which an UNSOLD placement may still render its "advertise here"
 * notice. Empty on purpose — see the comment at the return below. A SOLD
 * placement is unaffected and renders on every surface.
 */
const HOUSE_AD_SURFACES = new Set<FeaturedPlacement>();

/** fi/en/sv mainosmerkinnän copy. Ei 12-kielisissä tiedostoissa: paikka on gatettu. */
function markerCopy(locale: string) {
  const l = (locale || 'en').toLowerCase();
  if (l.startsWith('fi')) return { ad: 'Mainos', featured: 'Esittelykumppani' };
  if (l.startsWith('sv')) return { ad: 'Annons', featured: 'Utvald partner' };
  return { ad: 'Advertisement', featured: 'Featured partner' };
}

function contextLabel(placement: FeaturedPlacement, locale: string): string {
  const l = (locale || 'en').toLowerCase();
  const c = FEATURED_CONTEXT[placement];
  if (l.startsWith('fi')) return c.fi;
  if (l.startsWith('sv')) return c.sv;
  return c.en;
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
  if (!adLocaleEnabled(locale)) return null;

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
