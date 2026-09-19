import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Lazy routes render after navigation, so the browser's own anchor jump finds nothing.
      // Poll briefly for the target (venue cards → /venues/<slug>#quote, pricing → #quote).
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const timer = window.setInterval(() => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); window.clearInterval(timer); }
        else if (++tries > 30) window.clearInterval(timer);
      }, 60);
      return () => window.clearInterval(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
