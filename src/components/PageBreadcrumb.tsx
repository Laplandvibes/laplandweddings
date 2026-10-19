import Breadcrumbs from '../shared/Breadcrumbs';
import { useLang } from '../i18n/LangContext';
import { ui } from '../data/uiStrings';
import { pickLocalized, type Localized } from '../data/localized';

const TRADITIONS: Localized<string> = {
  fi: 'Hääperinteet', en: 'Wedding traditions', de: 'Hochzeitsbräuche', ja: '結婚式の伝統', es: 'Tradiciones de boda',
  'pt-BR': 'Tradições de casamento', 'zh-CN': '婚礼传统', ko: '결혼 전통', fr: 'Traditions de mariage',
  it: 'Tradizioni nuziali', nl: 'Bruiloftstradities', sv: 'Bröllopstraditioner',
};

/**
 * Ecosystem breadcrumb ("murupolku"), rendered BELOW the hero (mounted once
 * inside PageHero) so it reads as the first line of page content instead of a
 * bar wedged between the nav and the hero. Self-hides on home + unmapped routes
 * (shared/Breadcrumbs returns null there), so PageHero can mount it
 * unconditionally. checklist + partner-with-us are intentionally unmapped (no
 * short localized label exists for them) → they show no crumb, the component's
 * documented fallback. Background matches the deep espresso page bg (bg-night)
 * so the strip reads as the first content band under the hero.
 */
export default function PageBreadcrumb() {
  const { lang, localePath, tr } = useLang();
  const labelMap: Record<string, string> = {
    '/locations': ui('eyebrowRegions', lang),
    '/wedding-types': ui('eyebrowTypes', lang),
    '/venues': ui('eyebrowVenues', lang),
    '/planners': ui('eyebrowPlanners', lang),
    '/photographers': ui('eyebrowPhotographers', lang),
    '/practical-guide': tr.nav.practical,
    '/pricing': tr.nav.pricing,
    '/traditions': pickLocalized(TRADITIONS, lang),
    '/contact': tr.nav.contact,
  };
  return (
    <Breadcrumbs
      lang={lang}
      to={localePath}
      labelMap={labelMap}
      className="bg-night text-cream-text border-b border-white/10"
      accentClassName="hover:text-rose hover:opacity-100"
    />
  );
}
