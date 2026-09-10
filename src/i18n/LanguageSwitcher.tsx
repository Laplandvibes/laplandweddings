import LanguageMenu, { type LanguageOption } from './LanguageMenu';
// SIVUSTOKOHTAINEN RIVI — laplandstore: `src/lang.tsx`, laplandweddings: `./LangContext`.
import { useLang } from './LangContext';

/**
 * Kielivalitsimen kytkentä sivustoille, joilla kielen vaihto kulkee sivuston
 * OMAN funktion kautta eikä suoran linkin kautta.
 *
 * Miksi näillä kahdella on eri sovitin kuin muilla 26:lla: laplandstoren
 * `setLang` säilyttää osoitteen `?query`- ja `#hash`-osat (kaupan suodattimet
 * ovat siellä), ja laplandweddingsin kieli elää Reactin contextissa eikä
 * URL-etuliitteessä. Jos rivit olisivat `<Link>`-elementtejä, ensimmäinen
 * menettäisi suodattimet ja toinen ei vaihtaisi kieltä lainkaan. Siksi rivit
 * ovat painikkeita ja valinta menee `onSelect`-kutsuun.
 *
 * Ulkoasu, liput, näppäimistö ja mobiili tulevat silti samasta kanonisesta
 * `LanguageMenu`-komponentista kuin kaikkialla muualla.
 */

const LANGS: { code: string; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'fi', label: 'FI', native: 'Suomi' },
  { code: 'de', label: 'DE', native: 'Deutsch' },
  { code: 'ja', label: 'JA', native: '日本語' },
  { code: 'es', label: 'ES', native: 'Español' },
  { code: 'pt-BR', label: 'BR', native: 'Português' },
  { code: 'zh-CN', label: 'CN', native: '简体中文' },
  { code: 'ko', label: 'KR', native: '한국어' },
  { code: 'fr', label: 'FR', native: 'Français' },
  { code: 'it', label: 'IT', native: 'Italiano' },
  { code: 'nl', label: 'NL', native: 'Nederlands' },
  { code: 'sv', label: 'SV', native: 'Svenska' },
];

const ARIA: Record<string, string> = {
  en: 'Change language', fi: 'Vaihda kieli', de: 'Sprache wechseln', ja: '言語を切り替える',
  es: 'Cambiar idioma', 'pt-BR': 'Mudar idioma', 'zh-CN': '切换语言', ko: '언어 변경',
  fr: 'Changer de langue', it: 'Cambia lingua', nl: 'Taal wijzigen', sv: 'Byt språk',
};

interface Props {
  className?: string;
  variant?: 'pill' | 'inline';
  tone?: 'dark' | 'light';
  align?: 'right' | 'left';
}

export default function LanguageSwitcher({
  className = '',
  variant = 'pill',
  tone = 'dark',
  align = 'right',
}: Props) {
  const { lang, setLang } = useLang();

  const items: LanguageOption[] = LANGS.map((l) => ({
    code: l.code,
    label: l.label,
    native: l.native,
  }));

  return (
    <LanguageMenu
      locale={lang}
      items={items}
      variant={variant}
      tone={tone}
      align={align}
      label={ARIA[lang] ?? ARIA.en}
      className={className}
      onSelect={(code) => setLang(code as typeof lang)}
    />
  );
}
