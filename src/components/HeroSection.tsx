import { ArrowDown, ArrowRight } from 'lucide-react';
import { SITE_ASSETS } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onScheduleCall: () => void;
}

export function HeroSection({ onScheduleCall }: HeroSectionProps) {
  return (
    <section id="top">
      {/* Dark Forest Slate Hero matching PDF Page 1 */}
      <div className="bg-[#0E2427] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 lg:pt-20 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#DFA061] mb-6">
                <span className="w-6 h-px bg-[#DFA061]" aria-hidden="true" />
                <span>Technology, Made Dependable</span>
              </div>

              <h1 className="font-serif font-medium tracking-tight text-white text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.06] text-balance">
                The right tech.
                <span className="block italic font-normal text-[#DFA061] mt-1">
                  Ready for work.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                From the first design decision to the day-to-day support, we help businesses choose, deploy and maintain the technology they count on.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href="#offerings"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFA061]"
                >
                  <span>Explore what we do</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onScheduleCall}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#DFA061] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFA061] rounded-sm py-1"
                >
                  <span>Start a conversation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-sm overflow-hidden border border-white/15 bg-[#153135] aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
                <SafeImage
                  src={SITE_ASSETS.heroStudio}
                  alt="Experienced architects and 2026 engineers collaborating inside InfoWorld Technologies' Nagpur workspace"
                  fallbackTitle="InfoWorld Technologies · infoworldtech.co.in"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Provenance Bar matching PDF Page 1 */}
          <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono tracking-[0.16em] uppercase text-slate-300">
            <span>InfoWorld Technologies · Nagpur 440018 · Est. 2026</span>
            <span className="tabular-nums text-slate-400">
              01 / 04 Infrastructure · Software · Experienced &amp; Freshers
            </span>
          </div>
        </div>
      </div>

      {/* Warm Stone Statement Band matching PDF Page 1 bottom */}
      <div className="bg-[#E9E5D8] border-b border-[#0E2427]/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0E2427]/65 mb-1.5">
              A Steady Hand For Your IT
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#0E2427] tracking-tight">
              Plan it well. Put it to work. Keep it working.
            </p>
          </div>
          <p className="text-sm text-[#0E2427]/75 max-w-sm">
            Delivered from Nagpur by seasoned engineers and mentored 2026 graduates.
          </p>
        </div>
      </div>
    </section>
  );
}
