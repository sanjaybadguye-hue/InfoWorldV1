import { ArrowRight } from 'lucide-react';
import { HERO_FACTS, SITE_ASSETS } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onScheduleCall: () => void;
}

export function HeroSection({ onScheduleCall }: HeroSectionProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-blue-700 mb-4">
              InfoWorldtech.co.in · Nagpur, Maharashtra · Est. 2026
            </p>

            <h1 className="font-display font-bold tracking-tight text-slate-900 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] text-balance">
              Practical IT products and custom software built in Nagpur.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              We build enterprise software products and deliver custom cloud engineering by uniting seasoned principal architects with mentored 2026 engineering graduates.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onScheduleCall}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                <span>Schedule Discovery Call</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#offerings"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                Explore Products &amp; Services
              </a>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
              <SafeImage
                src={SITE_ASSETS.heroStudio}
                alt="Senior architects and young software engineers collaborating inside InfoWorldtech's sunlit Nagpur studio"
                fallbackTitle="InfoWorldtech Nagpur Engineering Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column Key Facts Strip below the split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="space-y-1">
              <p className="text-xs font-medium text-slate-500">{fact.label}</p>
              <p className="font-display text-lg font-bold text-slate-900 tabular-nums">
                {fact.value}
              </p>
              <p className="text-sm text-slate-600">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
