import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CookieBanner from '../../shared/CookieBanner';
import { LangProvider, useLang } from './i18n/LangContext';
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect';
import { AppPromoNudge } from './components/AppPromo';
const Home = lazy(() => import('./pages/Home'))
const Locations = lazy(() => import('./pages/Locations'))
const LocationPage = lazy(() => import('./pages/LocationPage'))
const WeddingTypesIndex = lazy(() => import('./pages/WeddingTypesIndex'))
const WeddingTypePage = lazy(() => import('./pages/WeddingTypePage'))
const Venues = lazy(() => import('./pages/Venues'))
const VenuePage = lazy(() => import('./pages/VenuePage'))
const Photographers = lazy(() => import('./pages/Photographers'))
const Checklist = lazy(() => import('./pages/Checklist'))
const PracticalGuide = lazy(() => import('./pages/PracticalGuide'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PartnerWithUs = lazy(() => import('./pages/PartnerWithUs'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'))
const routes = [
  { path: '', element: <Home /> },
  { path: 'locations', element: <Locations /> },
  { path: 'locations/:slug', element: <LocationPage /> },
  { path: 'wedding-types', element: <WeddingTypesIndex /> },
  { path: 'wedding-types/:slug', element: <WeddingTypePage /> },
  { path: 'venues', element: <Venues /> },
  { path: 'venues/:slug', element: <VenuePage /> },
  { path: 'planners', element: <Navigate to="/" replace /> },
  { path: 'photographers', element: <Photographers /> },
  { path: 'checklist/dvv-foreign-couples', element: <Checklist /> },
  { path: 'practical-guide', element: <PracticalGuide /> },
  { path: 'pricing', element: <Pricing /> },
  { path: 'partner-with-us', element: <PartnerWithUs /> },
  { path: 'contact', element: <Navigate to="/" replace /> },
  { path: 'privacy', element: <Privacy /> },
  { path: 'terms', element: <Terms /> },
  { path: 'cookie-policy', element: <CookiePolicy /> },
];

const LOCALE_PREFIXES = ['fi', 'de', 'ja', 'es', 'br', 'cn', 'kr', 'fr', 'it', 'nl', 'sv'] as const;

function LocalisedCookieBanner() {
  const { lang, localePath } = useLang();
  return (
    <CookieBanner
      consentKey="laplandweddings_cookie_consent"
      lang={lang}
      policyHref={localePath('/cookie-policy')}
    />
  );
}

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-night text-gray-200">
        <ScrollToTop />
        <LocaleAutoRedirect />
        <Navigation />
        <main>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
            {routes.map((r) => (
              <Route key={`en-${r.path}`} path={`/${r.path}`} element={r.element} />
            ))}
            {LOCALE_PREFIXES.map((prefix) => (
              <>
                <Route key={`${prefix}-root`} path={`/${prefix}`} element={<Home />} />
                {routes.slice(1).map((r) => (
                  <Route key={`${prefix}-${r.path}`} path={`/${prefix}/${r.path}`} element={r.element} />
                ))}
              </>
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <LocalisedCookieBanner />
      </div>
      <AppPromoNudge />
    </LangProvider>
  );
}
