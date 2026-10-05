export type StaticPath = '/' | '/locations' | '/wedding-types' | '/venues' | '/photographers' | '/practical-guide' | '/contact' | '/pricing' | '/checklist/dvv-foreign-couples';
export type MetaLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
export const STATIC_META: Record<StaticPath, Record<MetaLang, { title: string; description: string }>>;
