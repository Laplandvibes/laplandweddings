import type { ReactNode } from 'react';
import PageBreadcrumb from './PageBreadcrumb';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
  children?: ReactNode;
  compact?: boolean;
  /**
   * CSS object-position for the hero image (default 'center'). Landscape hero
   * photos get cropped hard on tall mobile viewports; point this at the real
   * subject (e.g. '64% 50%' for a wedding scene sitting center-right) so the
   * subject survives the portrait crop instead of showing only background.
   */
  objectPosition?: string;
}

export default function PageHero({ eyebrow, title, subtitle, image, imageAlt, avifSrcSet, webpSrcSet, sizes, children, compact, objectPosition }: PageHeroProps) {
  return (
    <>
    <section
      className={`relative ${compact ? 'min-h-[58vh] sm:min-h-[68vh]' : 'min-h-[72vh] sm:min-h-[82vh]'} flex items-center overflow-hidden`}
    >
      <div className="absolute inset-0">
        {!image ? (
          /* No photo yet for this page. Stock imagery is banned and borrowing
             another location's picture would misrepresent it, so render the
             house gradient instead of a broken <img>. The vignette below still
             applies, so hero text stays readable. */
          <div role="img" aria-label={imageAlt} className="w-full h-full bg-gradient-to-br from-[#3A2A24] via-[#1F1612] to-[#2A1F18]" />
        ) : avifSrcSet || webpSrcSet ? (
          <picture>
            {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes ?? '100vw'} />}
            {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes ?? '100vw'} />}
            <img src={image} alt={imageAlt} className="w-full h-full object-cover" style={objectPosition ? { objectPosition } : undefined} loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
          </picture>
        ) : (
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" style={objectPosition ? { objectPosition } : undefined} loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
        )}
        {/* Base gradient. Kept light across the picture itself and only heavy at
            the very bottom, where the CTA row and the reassurance line sit. The
            old 0.50→0.85 wash stacked with the side vignette below and buried
            the photograph under ~70–90% black (Vesa 2026-07-28: "tämä alku on
            aivan paska"). Readability now comes from the focused scrim behind
            the text block, not from darkening the whole frame. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,12,10,0.20) 0%, rgba(15,12,10,0.24) 45%, rgba(15,12,10,0.50) 78%, rgba(15,12,10,0.80) 100%)',
          }}
        />
        {/* Side vignette for cinematic feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(15,12,10,0.28) 100%)',
          }}
        />
        {/* Scrim behind the headline column only. This is what carries WCAG AA
            for the white h1 and the cream subtitle, so the rest of the frame
            does not have to be darkened to earn it. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 72% 58% at 50% 48%, rgba(15,12,10,0.46) 0%, rgba(15,12,10,0.28) 55%, transparent 78%)',
          }}
        />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-20 text-center">
        {eyebrow && (
          <p className="hero-text-light uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-sm font-semibold mb-3 sm:mb-4" style={{ color: '#FCE8E1', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="hero-text-light font-heading text-[40px] leading-[1.05] sm:text-6xl md:text-7xl mb-3 sm:mb-6 tracking-wide [text-wrap:balance] font-light"
          style={{ color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 5px rgba(0,0,0,0.55)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-text-light text-[15px] sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed [text-wrap:pretty]"
            style={{ color: '#FBF6F0', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3 max-w-md sm:max-w-none mx-auto">
            {children}
          </div>
        )}
      </div>
    </section>
    <PageBreadcrumb />
    </>
  );
}
