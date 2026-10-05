export type LegalPath = '/privacy' | '/terms' | '/cookie-policy';
export type LegalLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
export const LEGAL_META: Record<LegalPath, Record<LegalLang, { title: string; description: string }>>;
