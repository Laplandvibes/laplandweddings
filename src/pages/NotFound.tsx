
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';

const P: Record<'heading' | 'body', Localized<string>> = {
  heading: {
    en: 'Page not found',
    fi: 'Sivua ei löytynyt',
    de: 'Seite nicht gefunden',
    ja: 'ページが見つかりません',
    es: 'Página no encontrada',
    'pt-BR': 'Página não encontrada',
    'zh-CN': '页面未找到',
    ko: '페이지를 찾을 수 없습니다',
    fr: 'Page introuvable',
    it: 'Pagina non trovata',
    nl: 'Pagina niet gevonden',
  },
  body: {
    en: 'This page does not exist. Go back to the home page or browse venues.',
    fi: 'Tämä sivu ei ole olemassa. Palaa etusivulle tai katso hääpaikat.',
    de: 'Diese Seite existiert nicht. Kehren Sie zur Startseite zurück oder durchstöbern Sie die Locations.',
    ja: 'このページは存在しません。ホームに戻るか、会場をご覧ください。',
    es: 'Esta página no existe. Vuelve a la página de inicio o explora los lugares.',
    'pt-BR': 'Esta página não existe. Volte à página inicial ou veja os locais.',
    'zh-CN': '此页面不存在。返回首页或浏览婚礼场地。',
    ko: '이 페이지는 존재하지 않습니다. 홈으로 돌아가거나 웨딩 장소를 둘러보세요.',
    fr: 'Cette page n’existe pas. Retournez à l’accueil ou parcourez les lieux.',
    it: 'Questa pagina non esiste. Torna alla home page o esplora le location.',
    nl: 'Deze pagina bestaat niet. Ga terug naar de homepage of bekijk de locaties.',
  },
};

export default function NotFound() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO title="404 — Not Found | LaplandWeddings" description="Page not found." path="/404" noindex />
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="font-heading text-7xl text-rose mb-4">404</p>
        <h1 className="font-heading text-3xl text-white mb-3 tracking-wide">{pickLocalized(P.heading, lang)}</h1>
        <p className="text-gray-400 max-w-md mb-8">{pickLocalized(P.body, lang)}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <L to="/" className="px-5 py-2.5 bg-rose hover:bg-pink text-white font-semibold rounded-full">{tr.nav.home}</L>
          <L to="/venues" className="px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full">{tr.cta.seeAllVenues}</L>
        </div>
      </section>
    </>
  );
}
