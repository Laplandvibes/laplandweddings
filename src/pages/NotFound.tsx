import SharedNotFound from '../shared/NotFound';
import { useLang } from '../i18n/LangContext';

// LaplandWeddings uses its own romantic "rose" accent (index.css --color-rose-deep
// #C9466A) instead of the network default vibe-pink — matches the CTA colour
// every other button on this site already uses (bg-rose / bg-rose-deep).
export default function NotFound() {
  const { lang, tr, localePath } = useLang();

  return (
    <SharedNotFound
      lang={lang}
      siteName="LaplandWeddings"
      homeHref={localePath('/')}
      accentHex="#C9466A"
      links={[
        { href: localePath('/locations'), label: tr.nav.locations },
        { href: localePath('/venues'), label: tr.nav.venues },
        { href: localePath('/wedding-types'), label: tr.nav.types },
      ]}
    />
  );
}
