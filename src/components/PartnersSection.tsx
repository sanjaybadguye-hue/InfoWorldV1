import { useState } from 'react';
import { ArrowRight, Camera, Check, Cloud, HardDrive, Layers, Network, Shield } from 'lucide-react';
import { PARTNER_TRACKS, type PartnerTrack } from '../data/siteData';

interface PartnersSectionProps {
  onInquirePartner: (partnerName: string) => void;
}

type PartnerCategoryFilter = 'All Tracks' | 'Networking & Security' | 'Cloud & Enterprise';

const TRACK_ICONS: Record<string, typeof Network> = {
  'cisco-networking': Shield,
  'microsoft-cloud': Cloud,
  'networking-cabling': Network,
  'cctv-surveillance': Camera,
  'endpoint-server-oems': HardDrive,
  'sap-erp-backup': Layers,
};

export function PartnersSection({ onInquirePartner }: PartnersSectionProps) {
  const [filter, setFilter] = useState<PartnerCategoryFilter>('All Tracks');

  const visibleTracks: PartnerTrack[] =
    filter === 'All Tracks'
      ? PARTNER_TRACKS
      : PARTNER_TRACKS.filter((track) => track.category === filter);

  return (
    <section id="partners" className="py-16 lg:py-24 bg-[#F6F4EC] border-b border-[#0E2427]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#0E2427]/15">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#196A52] mb-4">
              <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
              <span>Upcoming Planned Partnerships · 2026–2027</span>
            </div>

            <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-[#0E2427] leading-[1.1] text-balance">
              Partner ecosystem built around{' '}
              <span className="italic font-normal text-[#196A52]">proven platforms.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#0E2427]/75 leading-relaxed">
              As we expand our Nagpur operations in 2026, we are formalizing authorized technology and distribution partnerships across Cisco, Microsoft, enterprise networking, CCTV surveillance, and commercial hardware OEMs.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter upcoming partner tracks"
            className="inline-flex items-center gap-1 p-1 bg-[#E9E5D8] rounded-md self-start lg:self-auto"
          >
            {(['All Tracks', 'Networking & Security', 'Cloud & Enterprise'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={filter === tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#196A52] ${
                  filter === tab
                    ? 'bg-white text-[#0E2427] shadow-xs'
                    : 'text-[#0E2427]/70 hover:text-[#0E2427]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTracks.map((track) => {
            const Icon = TRACK_ICONS[track.id] ?? Network;
            return (
              <article
                key={track.id}
                className="bg-white/75 border border-[#0E2427]/15 rounded-sm p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#0E2427]/60">
                      {track.statusLabel} · {track.targetWindow}
                    </p>
                    <span className="w-9 h-9 inline-flex items-center justify-center border border-[#0E2427]/18 rounded-sm text-[#196A52] shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#0E2427]">
                    {track.name}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#0E2427]/75 leading-relaxed">
                    {track.summary}
                  </p>

                  <ul className="mt-5 space-y-2 pt-4 border-t border-[#0E2427]/10">
                    {track.scopeItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#0E2427]/85">
                        <Check className="w-4 h-4 text-[#196A52] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0E2427]/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#0E2427]/60">{track.category}</span>
                  <button
                    type="button"
                    onClick={() => onInquirePartner(track.name)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#196A52] hover:text-[#135440] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Partner / Quote</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Partner Inquiry Banner */}
        <div className="mt-10 p-6 sm:p-8 bg-[#E9E5D8] border border-[#0E2427]/15 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#196A52] mb-1.5">
              OEMs, Distributors &amp; System Integrators
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0E2427]">
              Looking to collaborate with InfoWorldtech in Central India?
            </h3>
            <p className="mt-1.5 text-sm text-[#0E2427]/75">
              Channel managers and enterprise clients can connect directly with Sanjay Badguye at sales@infoworldtech.co.in for Cisco, Microsoft, Networking, CCTV, or hardware rollouts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onInquirePartner('Technology Partner Program (Cisco / Microsoft / Networking / CCTV)')}
            className="px-5 py-3 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            Discuss Partnership
          </button>
        </div>
      </div>
    </section>
  );
}
