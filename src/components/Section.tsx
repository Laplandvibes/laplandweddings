import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, eyebrow, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-10 sm:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-8 sm:mb-14 max-w-3xl mx-auto">
            {eyebrow && (
              <p className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-aurora-pink font-semibold mb-2.5 sm:mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-[26px] leading-tight sm:text-4xl text-white mb-3 sm:mb-4 tracking-wide [text-wrap:balance]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[15px] sm:text-lg text-gray-400 leading-relaxed [text-wrap:pretty]">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
