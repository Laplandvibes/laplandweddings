import type { Lang } from '../i18n/translations';
import { pickLocalized, type Localized } from './localized';

/**
 * Shared UI micro-labels used across multiple pages/components. Each is a full
 * 12-locale `Localized<string>`. Read with `ui(key, lang)`.
 *
 * These cover small, recurring chrome strings (eyebrows, "guests", "from", etc.)
 * that were previously inline `lang === 'fi' ? … : …` ternaries falling back to
 * English for the other locales.
 */
const STRINGS = {
  // eyebrows
  eyebrowVenues: {
    en: 'Venues', fi: 'Hääpaikat', de: 'Locations', ja: '会場',
    es: 'Lugares', 'pt-BR': 'Locais', 'zh-CN': '婚礼场地', ko: '웨딩 장소',
    fr: 'Lieux', it: 'Location', nl: 'Locaties', sv: 'Bröllopsplatser',
  },
  eyebrowRegions: {
    en: 'Regions', fi: 'Paikkakunnat', de: 'Regionen', ja: '地域',
    es: 'Regiones', 'pt-BR': 'Regiões', 'zh-CN': '地区', ko: '지역',
    fr: 'Régions', it: 'Regioni', nl: 'Regio’s', sv: 'Regioner',
  },
  eyebrowTypes: {
    en: 'Types', fi: 'Häätyypit', de: 'Hochzeitsarten', ja: 'ウェディングタイプ',
    es: 'Tipos', 'pt-BR': 'Tipos', 'zh-CN': '婚礼类型', ko: '웨딩 유형',
    fr: 'Types', it: 'Tipi', nl: 'Types', sv: 'Typer',
  },
  eyebrowPlanners: {
    en: 'Wedding planners', fi: 'Hääsuunnittelijat', de: 'Hochzeitsplaner', ja: 'ウェディングプランナー',
    es: 'Organizadores de bodas', 'pt-BR': 'Organizadores de casamento', 'zh-CN': '婚礼策划师', ko: '웨딩 플래너',
    fr: 'Wedding planners', it: 'Wedding planner', nl: 'Trouwplanners', sv: 'Bröllopsplanerare',
  },
  eyebrowPhotographers: {
    en: 'Photographers', fi: 'Valokuvaajat', de: 'Fotografen', ja: 'フォトグラファー',
    es: 'Fotógrafos', 'pt-BR': 'Fotógrafos', 'zh-CN': '摄影师', ko: '포토그래퍼',
    fr: 'Photographes', it: 'Fotografi', nl: 'Fotografen', sv: 'Fotografer',
  },
  eyebrowWeddingType: {
    en: 'Wedding type', fi: 'Häätyyppi', de: 'Hochzeitsart', ja: 'ウェディングタイプ',
    es: 'Tipo de boda', 'pt-BR': 'Tipo de casamento', 'zh-CN': '婚礼类型', ko: '웨딩 유형',
    fr: 'Type de mariage', it: 'Tipo di matrimonio', nl: 'Type bruiloft', sv: 'Bröllopstyp',
  },
  eyebrowContact: {
    en: 'Contact', fi: 'Yhteydenotto', de: 'Kontakt', ja: 'お問い合わせ',
    es: 'Contacto', 'pt-BR': 'Contato', 'zh-CN': '联系', ko: '문의',
    fr: 'Contact', it: 'Contatti', nl: 'Contact', sv: 'Kontakt',
  },

  // recurring nouns / words
  guests: {
    en: 'guests', fi: 'vierasta', de: 'Gäste', ja: '名',
    es: 'invitados', 'pt-BR': 'convidados', 'zh-CN': '位宾客', ko: '명',
    fr: 'invités', it: 'ospiti', nl: 'gasten', sv: 'gäster',
  },
  venuesLower: {
    en: 'venues', fi: 'hääpaikkaa', de: 'Locations', ja: '会場',
    es: 'lugares', 'pt-BR': 'locais', 'zh-CN': '个场地', ko: '곳',
    fr: 'lieux', it: 'location', nl: 'locaties', sv: 'platser',
  },
  from: {
    en: 'from', fi: 'alk', de: 'ab', ja: '〜',
    es: 'desde', 'pt-BR': 'a partir de', 'zh-CN': '起', ko: '부터',
    fr: 'à partir de', it: 'da', nl: 'vanaf', sv: 'från',
  },
  website: {
    en: 'Website →', fi: 'Verkkosivut →', de: 'Website →', ja: 'ウェブサイト →',
    es: 'Sitio web →', 'pt-BR': 'Site →', 'zh-CN': '网站 →', ko: '웹사이트 →',
    fr: 'Site web →', it: 'Sito web →', nl: 'Website →', sv: 'Webbplats →',
  },
  highlight: {
    en: 'Highlight', fi: 'Erityispiirre', de: 'Highlight', ja: '見どころ',
    es: 'Destacado', 'pt-BR': 'Destaque', 'zh-CN': '亮点', ko: '하이라이트',
    fr: 'Point fort', it: 'In evidenza', nl: 'Hoogtepunt', sv: 'Höjdpunkt',
  },
  fromCentre: {
    en: 'from centre', fi: 'keskustasta', de: 'vom Zentrum', ja: '中心部から',
    es: 'desde el centro', 'pt-BR': 'do centro', 'zh-CN': '距市中心', ko: '중심에서',
    fr: 'du centre', it: 'dal centro', nl: 'vanaf het centrum', sv: 'från centrum',
  },
} satisfies Record<string, Localized<string>>;

export type UiKey = keyof typeof STRINGS;

export function ui(key: UiKey, lang: Lang): string {
  return pickLocalized(STRINGS[key], lang);
}
