// Thin wrapper around the canonical shared SharedFooter. The shared component
// auto-detects URL prefix (/fr /it /nl /kr ...) and renders the 27-spoke
// ecosystem grid with localized niche labels.
import SharedFooter from '../../../shared/Footer';

export default function Footer() {
  return <SharedFooter />;
}
