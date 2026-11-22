import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Cpu,
  HardDrive,
  Layers,
  Monitor,
  Network,
  Printer,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  CAPABILITY_PILLARS,
  INFRASTRUCTURE_PIECES,
  PROCESS_STEPS,
  type CapabilityPillar,
  type InfrastructurePiece,
} from '../data/siteData';
import { SafeImage } from './SafeImage';

interface OfferingsSectionProps {
  onInquireOffering: (inquiryType: string, subject: string) => void;
}

const PIECE_ICONS: Record<string, typeof Monitor> = {
  'desktops-laptops': Monitor,
  'servers-thin-clients': Server,
  'networking-integration': Network,
  'printers-plotters': Printer,
  'infrastructure-design': Cpu,
  'configuration-management': SlidersHorizontal,
  'maintenance-support': ShieldCheck,
  'business-software-apps': Layers,
};

type PillarFilter = 'all' | 'infrastructure' | 'software';

export function OfferingsSection({ onInquireOffering }: OfferingsSectionProps) {
  const [filter, setFilter] = useState<PillarFilter>('all');
  const [selectedPillar, setSelectedPillar] = useState<CapabilityPillar | null>(null);
  const [activePiece, setActivePiece] = useState<InfrastructurePiece>(INFRASTRUCTURE_PIECES[0]);

  const visiblePillars =
    filter === 'all'
      ? CAPABILITY_PILLARS
      : CAPABILITY_PILLARS.filter((item) => item.kind === filter);

  return (
    <>
      {/* Light Warm Alabaster Section — PDF Page 2: One Capable Partner */}
      <section id="offerings" className="py-16 lg:py-24 bg-[#F6F4EC] border-b border-[#0E2427]/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#196A52] mb-4">
                <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
                <span>One Capable Partner</span>
              </div>

              <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-[#0E2427] leading-[1.1] text-balance">
                Technology for the{' '}
                <span className="italic font-normal text-[#196A52]">whole operation.</span>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#0E2427]/75 leading-relaxed max-w-xl">
                Good technology is more than a purchase. We bring products, implementation and ongoing care together around the way your organization works.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter IT Infrastructure and Business Software"
              className="inline-flex items-center gap-1 p-1 bg-[#E9E5D8] rounded-md self-start md:self-auto"
            >
              {(
                [
                  { id: 'all', label: 'All Capabilities' },
                  { id: 'infrastructure', label: 'IT Infrastructure' },
                  { id: 'software', label: 'Business Software' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#196A52] ${
                    filter === tab.id
                      ? 'bg-white text-[#0E2427] shadow-xs'
                      : 'text-[#0E2427]/70 hover:text-[#0E2427]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visiblePillars.map((pillar) => {
              const PillarIcon = pillar.kind === 'infrastructure' ? HardDrive : Layers;
              return (
                <article
                  key={pillar.id}
                  className="bg-[#F6F4EC] border border-[#0E2427]/18 rounded-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {pillar.imageSrc && (
                      <div className="aspect-[16/9] border-b border-[#0E2427]/12 bg-[#E9E5D8] overflow-hidden">
                        <SafeImage
                          src={pillar.imageSrc}
                          alt={pillar.imageAlt ?? pillar.title}
                          fallbackTitle={pillar.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-7 sm:p-9">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#0E2427]/65">
                          {pillar.code}
                        </span>
                        <span className="w-10 h-10 inline-flex items-center justify-center border border-[#0E2427]/20 rounded-sm text-[#196A52]">
                          <PillarIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0E2427] tracking-tight">
                        {pillar.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-[#0E2427]/75 leading-relaxed">
                        {pillar.description}
                      </p>

                      <ul className="mt-5 space-y-2 pt-5 border-t border-[#0E2427]/10">
                        {pillar.highlights.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-[#0E2427]/85">
                            <Check className="w-4 h-4 text-[#196A52] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-7 sm:px-9 pb-7 pt-4 border-t border-[#0E2427]/10 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPillar(pillar)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#196A52] hover:text-[#135440] transition-colors cursor-pointer"
                    >
                      <span>Explore capabilities</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onInquireOffering(
                          pillar.kind === 'infrastructure' ? 'Custom IT Services' : 'IT Product Demo',
                          `${pillar.title} Inquiry`
                        )
                      }
                      className="px-4 py-2 text-xs sm:text-sm font-medium text-[#0E2427] border border-[#0E2427]/25 rounded-sm hover:bg-[#E9E5D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Consultation
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Forest Slate Section — PDF Page 3: The pieces that keep work moving */}
      <section id="services" className="py-16 lg:py-24 bg-[#0E2427] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#DFA061] mb-4">
                <span className="w-6 h-px bg-[#DFA061]" aria-hidden="true" />
                <span>Built Around Your Needs</span>
              </div>

              <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-white leading-[1.1] text-balance">
                The pieces that keep work{' '}
                <span className="italic font-normal text-[#DFA061]">moving.</span>
              </h2>

              <p className="mt-5 text-base text-slate-300 leading-relaxed">
                From individual devices to connected systems, find the technology and hands-on services to fit your environment.
              </p>

              {/* Active Piece Detail Panel */}
              <div className="mt-8 p-6 bg-[#132E32] border border-white/15 rounded-sm">
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#DFA061]">
                  Selected Capability · {activePiece.category}
                </p>
                <h3 className="font-serif text-xl font-medium text-white mt-2">
                  {activePiece.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {activePiece.detail}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onInquireOffering('Custom IT Services', `Quote: ${activePiece.title}`)
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#DFA061] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Inquire about {activePiece.title}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* 8-Row Editorial Capability List matching PDF Page 3 */}
            <div className="lg:col-span-7 divide-y divide-white/15 border-y border-white/15">
              {INFRASTRUCTURE_PIECES.map((piece) => {
                const Icon = PIECE_ICONS[piece.id] ?? Layers;
                const isActive = activePiece.id === piece.id;
                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => setActivePiece(piece)}
                    className={`w-full py-5 px-3 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFA061] ${
                      isActive ? 'bg-white/6' : 'hover:bg-white/4'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? 'text-[#DFA061]' : 'text-[#DFA061]/80'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-base sm:text-lg text-white font-normal truncate">
                        {piece.title}
                      </span>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 shrink-0">
                      {isActive ? 'Selected' : piece.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Warm Stone Process Section — PDF Page 4: Straightforward By Design */}
      <section id="process" className="py-16 lg:py-24 bg-[#E9E5D8] border-b border-[#0E2427]/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#196A52] mb-4">
              <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
              <span>Straightforward By Design</span>
            </div>

            <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-[#0E2427] leading-[1.1] text-balance">
              From question to{' '}
              <span className="italic font-normal text-[#196A52]">working answer.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#0E2427]/75 leading-relaxed">
              Technology decisions have real consequences. We make the path from first conversation to ongoing support clear and considered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#0E2427]/18">
            {PROCESS_STEPS.map((step) => (
              <div key={step.code} className="space-y-3">
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#0E2427]/60 tabular-nums">
                  {step.code}
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#0E2427]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#0E2427]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Specification Modal */}
      {selectedPillar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2427]/70 backdrop-blur-xs"
          onClick={() => setSelectedPillar(null)}
        >
          <div
            className="bg-[#F6F4EC] border border-[#0E2427]/20 rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#196A52]">
                  {selectedPillar.code} · {selectedPillar.slaMetric}
                </p>
                <h3
                  id="pillar-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-medium text-[#0E2427] mt-1"
                >
                  {selectedPillar.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close capability details"
                onClick={() => setSelectedPillar(null)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-sm border border-[#0E2427]/20 text-[#0E2427] hover:bg-[#E9E5D8] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#0E2427]/80 leading-relaxed">
              {selectedPillar.description}
            </p>

            <div className="mt-6 pt-5 border-t border-[#0E2427]/12">
              <p className="font-mono text-xs uppercase tracking-wider text-[#0E2427]/65 mb-3">
                Scope &amp; Deliverables
              </p>
              <ul className="space-y-2.5">
                {selectedPillar.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#0E2427]/85">
                    <Check className="w-4 h-4 text-[#196A52] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#0E2427]/12 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#0E2427]/70">
                Deployment: <strong className="text-[#0E2427]">{selectedPillar.deploymentTarget}</strong>
              </span>

              <button
                type="button"
                onClick={() => {
                  const target = selectedPillar;
                  setSelectedPillar(null);
                  onInquireOffering(
                    target.kind === 'infrastructure' ? 'Custom IT Services' : 'IT Product Demo',
                    `${target.title} Consultation`
                  );
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] transition-colors cursor-pointer"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
