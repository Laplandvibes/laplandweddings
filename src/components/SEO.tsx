import { useEffect } from 'react';
import { useLang } from '../i18n/LangContext';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
  noindex?: boolean;
}

const SITE = 'https://laplandweddings.online';
const DEFAULT_IMAGE =
  'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  if (typeof document === 'undefined') return;
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data: object | null, id: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`script[data-seo="${id}"]`) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.seo = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SEO({ title, description, path, image, type = 'website', jsonLd, noindex }: SEOProps) {
  const { lang } = useLang();
  const url = `${SITE}${path}`;
  const og = image || DEFAULT_IMAGE;

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', og, 'property');
    setMeta('og:locale', lang === 'fi' ? 'fi_FI' : 'en_GB', 'property');
    setMeta('og:site_name', 'LaplandWeddings', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', og);

    setLink('canonical', url);
    setLink('alternate', url, lang);
    setLink('alternate', url, lang === 'fi' ? 'en' : 'fi');
    setLink('alternate', url, 'x-default');

    setJsonLd(jsonLd ?? null, 'page');
  }, [title, description, url, og, type, lang, noindex, jsonLd]);

  return null;
}
