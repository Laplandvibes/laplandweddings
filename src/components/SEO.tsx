// 2026-05-21: locale-aware — hreflang × 11 + og:locale + JSON-LD inLanguage.
import { useEffect } from 'react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';

interface SEOProps {
  /** Title — caller passes already-localised string. */
  title: string;
  description: string;
  /** Canonical / hreflang path WITHOUT any locale prefix. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
  noindex?: boolean;
}

const SITE = 'https://laplandweddings.online';
const DEFAULT_IMAGE = 'https://laplandweddings.online/og.jpg?v=2fe91594'; // was a hotlink to a third-party photographer's site (19.9.2026)

const SUPPORTED: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
const URL_PREFIX_OF: Record<Lang, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr', fr: '/fr', it: '/it', nl: '/nl', sv: '/sv',
};
const BCP47: Record<Lang, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};
// en_GB = sama kuin esirenderöijän LOCALES (scripts/prerender-meta.mjs) ja sivuston päivämäärät (en-GB). Ennen 8.10.2026
// tässä oli en_US, ja JS vaihtoi staattisen og:localen englanninkielisillä sivuilla (gate:og-js "korvattu").
const OG_LOCALE: Record<Lang, string> = {
  en: 'en_GB', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]:not([data-seo-alt])`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Share image the prerenderer wrote for the URL the visitor landed on. Read once at
// module load, before any effect runs: on that URL it is kept, so crawlers that run
// JavaScript see the same og:image and twitter:image as crawlers that read the
// static HTML. After a client-side navigation the `image` prop is used.
const LANDED =
  typeof document === 'undefined'
    ? null
    : {
        path: window.location.pathname,
        og: document.head.querySelector('meta[property="og:image"]')?.getAttribute('content') || null,
      };

function setLink(rel: string, href: string, hreflang?: string) {
  if (typeof document === 'undefined') return;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function stripPrefix(path: string): string {
  const m = path.match(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)(?=\/|$)/);
  if (m) return path.replace(m[0], '') || '/';
  return path;
}

function buildUrl(path: string, lang: Lang): string {
  const clean = stripPrefix(path === '' ? '/' : path);
  const lp = URL_PREFIX_OF[lang];
  // Trailing-slash form matches the prerendered static HTML (Cloudflare Pages
  // serves /path/index.html at /path/ with 200; the no-slash form 308-redirects).
  if (clean === '/') return `${SITE}${lp}/`;
  return `${SITE}${lp}${clean}`.replace(/\/?$/, '/');
}

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47;
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47));
    return o;
  }
  return node;
}

// Rakenteisen datan sisäiset osoitteet samaan muotoon kuin kanoninen, hreflang ja sivukartta:
// sivun OMA kieliversio ja loppukauttaviiva. Sivujen schema-oliot on kirjoitettu englannin
// kauttaviivattomilla osoitteilla (https://laplandweddings.online/locations/rovaniemi), jolloin esim.
// /fi/locations/ kertoi Googlelle paikkalistansa osoitteiksi englanninkielisten sivujen 308-ohjautuvat muodot.
// Mitattu 12.–13.11.2026, mittari lv-ops scripts/audit_jsonld_osoitteet.mjs.
// - polullinen osoite -> kieliversio + kauttaviiva (/fi/locations/rovaniemi/)
// - juuri -> https://laplandweddings.online/ ; murupolun item saisi kielijuuren (/fi/)
// - tiedostot (.jpg), ankkurit (#org) ja ulkoiset osoitteet jäävät ennalleen
const INTERNAL_URL = /^https:\/\/laplandweddings\.online((?:\/[A-Za-z0-9_-]+)*)\/?$/;
function localizeUrls(node: unknown, lang: Lang, key = ''): unknown {
  if (typeof node === 'string') {
    const m = INTERNAL_URL.exec(node);
    if (!m) return node;
    const path = m[1] || '/';
    if (path === '/' && key !== 'item') return `${SITE}/`;
    return buildUrl(path, lang);
  }
  if (Array.isArray(node)) return node.map((n) => localizeUrls(n, lang, key));
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) out[k] = localizeUrls(v, lang, k);
    return out;
  }
  return node;
}

export default function SEO({ title, description, path, image, type = 'website', jsonLd, noindex }: SEOProps) {
  const { lang } = useLang();
  const bcp47 = BCP47[lang];
  const currentUrl = buildUrl(path, lang);
  const enUrl = buildUrl(path, 'en');
  const og = image || DEFAULT_IMAGE;

  // JSON-LD is rendered as a real <script> element below (React 19 hoists it to
  // <head>) so it lands in the prerendered static HTML — a useEffect injection
  // does not run during SSG/prerender.
  const localizedSchema = jsonLd
    ? (localizeUrls(injectInLanguage(JSON.parse(JSON.stringify(jsonLd)), bcp47), lang) as object)
    : null;

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = bcp47;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', currentUrl, 'property');
    const ogImage = LANDED?.og && LANDED.path === window.location.pathname ? LANDED.og : og;
    setMeta('og:image', ogImage, 'property');
    setMeta('og:locale', OG_LOCALE[lang], 'property');
    setMeta('og:site_name', 'LaplandWeddings', 'property');

    // og:locale:alternate EI täällä (8.10.2026): esirenderöijä (scripts/prerender-meta.mjs) kirjoittaa sivun 11 muuta
    // kieltä staattiseen HTML:ään, ja tämä hook lisäsi niiden rinnalle toisen joukon (en_US eikä en_GB) ⇒ gate:og-js
    // "ristiriita" jokaisella ei-englanninkielisellä sivulla. Staattiset jäävät DOMiin sellaisinaan.

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    setLink('canonical', currentUrl);
    // Clear old hreflang and rebuild.
    // Short codes (en, fi, pt-BR, …) + trailing-slash hrefs: must match the
    // prerenderer (scripts/prerender-meta.mjs) and sitemap.xml exactly so
    // hydration doesn't disagree with the static HTML. x-default = page's own EN URL.
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    SUPPORTED.forEach((l) => setLink('alternate', buildUrl(path, l), l));
    setLink('alternate', enUrl, 'x-default');
  }, [title, description, currentUrl, enUrl, og, type, lang, noindex, path, bcp47]);

  return localizedSchema ? (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedSchema) }} />
  ) : null;
}
