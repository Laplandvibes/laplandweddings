import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import Locations from './pages/Locations';
import LocationPage from './pages/LocationPage';
import WeddingTypesIndex from './pages/WeddingTypesIndex';
import WeddingTypePage from './pages/WeddingTypePage';
import Venues from './pages/Venues';
import VenuePage from './pages/VenuePage';
import Planners from './pages/Planners';
import PracticalGuide from './pages/PracticalGuide';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import CookiePolicy from './pages/legal/CookiePolicy';

export default function App() {
  return (
    <div className="min-h-screen bg-night text-gray-200">
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
          <Route path="/wedding-types" element={<WeddingTypesIndex />} />
          <Route path="/wedding-types/:slug" element={<WeddingTypePage />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:slug" element={<VenuePage />} />
          <Route path="/planners" element={<Planners />} />
          <Route path="/practical-guide" element={<PracticalGuide />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
