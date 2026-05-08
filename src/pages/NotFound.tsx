import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';

export default function NotFound() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO title="404 — Not Found | LaplandWeddings" description="Page not found." path="/404" noindex />
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="font-heading text-7xl text-rose mb-4">404</p>
        <h1 className="font-heading text-3xl text-white mb-3 tracking-wide">{lang === 'fi' ? 'Sivua ei löytynyt' : 'Page not found'}</h1>
        <p className="text-gray-400 max-w-md mb-8">{lang === 'fi' ? 'Tämä sivu ei ole olemassa. Palaa etusivulle tai katso hääpaikat.' : 'This page does not exist. Go back to the home page or browse venues.'}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-5 py-2.5 bg-rose hover:bg-pink text-white font-semibold rounded-full">{tr.nav.home}</Link>
          <Link to="/venues" className="px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full">{tr.cta.seeAllVenues}</Link>
        </div>
      </section>
    </>
  );
}
