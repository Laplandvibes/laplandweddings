import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  compact?: boolean;
}

export default function PageHero({ eyebrow, title, subtitle, image, imageAlt, children, compact }: PageHeroProps) {
  return (
    <section
      className={`relative ${compact ? 'min-h-[42vh] sm:min-h-[55vh]' : 'min-h-[60vh] sm:min-h-[75vh]'} flex items-center overflow-hidden`}
    >
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/55 to-night/95" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-20 text-center">
        {eyebrow && (
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-sm text-aurora-pink font-semibold mb-3 sm:mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-[34px] leading-[1.1] sm:text-5xl md:text-6xl text-white mb-3 sm:mb-6 tracking-wide [text-wrap:balance]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed [text-wrap:pretty]">
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
  );
}
