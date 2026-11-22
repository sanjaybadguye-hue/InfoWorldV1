import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES, SITE_ASSETS, TEAM_ROLES } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface ProofAndTeamSectionProps {
  onApplyRole: (roleTitle: string, track: string) => void;
}

type RoleFilter = 'All Roles' | 'Experienced' | 'Freshers 2026';

export function ProofAndTeamSection({ onApplyRole }: ProofAndTeamSectionProps) {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('All Roles');

  const visibleRoles =
    roleFilter === 'All Roles'
      ? TEAM_ROLES
      : TEAM_ROLES.filter((role) => role.track === roleFilter);

  return (
    <section id="team" className="py-16 lg:py-24 bg-[#F6F4EC] border-b border-[#0E2427]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PDF Page 5 Editorial Split: 2026 Established Card + Rooted in Nagpur */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Sculptural Year Emblem Card matching PDF Page 5 */}
            <div className="bg-[#E9E5D8] border border-[#0E2427]/12 rounded-sm p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="w-56 h-56 rounded-full border border-[#196A52]/20 flex items-center justify-center"
              >
                <div className="w-44 h-44 rounded-full border border-[#196A52]/20 flex flex-col items-center justify-center">
                  <span className="font-serif text-5xl sm:text-6xl font-medium text-[#196A52] tabular-nums">
                    2026
                  </span>
                  <span className="mt-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#0E2427]/65">
                    Established · Nagpur
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-sm overflow-hidden border border-[#0E2427]/15 bg-[#E9E5D8] aspect-[4/3] lg:aspect-auto">
              <SafeImage
                src={SITE_ASSETS.teamMentorship}
                alt="Senior InfoWorldtech architect mentoring 2026 engineering graduates in Nagpur"
                fallbackTitle="Experienced Leads & 2026 Freshers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#196A52] mb-4">
              <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
              <span>Rooted In Nagpur · Est. 2026</span>
            </div>

            <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-[#0E2427] leading-[1.1] text-balance">
              Experience that{' '}
              <span className="italic font-normal text-[#196A52]">shows up.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#0E2427]/80 leading-relaxed">
              Founded in Nagpur in 2026, InfoWorldtech brings a practical, end-to-end perspective—from servers, networking, and workstations to SAP Business One, custom software, and e-invoicing—with a focus on choosing well, delivering thoughtfully, and staying available.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#0E2427]/12">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#196A52] mb-1.5">
                  Experienced Specialists
                </p>
                <p className="text-sm text-[#0E2427]/75 leading-relaxed">
                  Senior architects and infrastructure leads with 6–14 years of production delivery who own system design, security, and client SLAs.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#196A52] mb-1.5">
                  Freshers Cohort 2026
                </p>
                <p className="text-sm text-[#0E2427]/75 leading-relaxed">
                  Motivated B.E., B.Tech, and MCA graduates from Nagpur mentored directly inside live software and systems delivery pods.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono tracking-[0.16em] uppercase text-[#0E2427]/70">
              <span className="w-6 h-px bg-[#196A52]" aria-hidden="true" />
              <span>Experienced Architects &amp; Fresh Talent Working Together</span>
            </div>
          </div>
        </div>

        {/* Measured Proof of Impact */}
        <div className="mt-16 pt-14 border-t border-[#0E2427]/12">
          <div className="max-w-2xl mb-8">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#196A52] mb-2">
              Measured Client Outcomes
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0E2427]">
              Systems verified across regional operations.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className="bg-white/70 border border-[#0E2427]/15 rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-[#0E2427]/60">
                    {study.sector} · {study.city}
                  </p>
                  <div className="mt-4 pb-4 border-b border-[#0E2427]/10">
                    <p className="font-serif text-3xl sm:text-4xl font-semibold text-[#0E2427] tabular-nums">
                      {study.metricValue}
                    </p>
                    <p className="text-sm font-semibold text-[#196A52] mt-1">
                      {study.metricUnit}
                    </p>
                    <p className="text-xs text-[#0E2427]/60 mt-0.5">{study.timeframe}</p>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#0E2427] mt-4">
                    {study.client}
                  </h4>
                  <p className="mt-2 text-sm text-[#0E2427]/75 leading-relaxed">
                    {study.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Open Roles in Nagpur (Experienced + Freshers 2026) */}
        <div className="mt-16 pt-14 border-t border-[#0E2427]/12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0E2427]">
                Open Roles in Nagpur (2026)
              </h3>
              <p className="text-sm text-[#0E2427]/75 mt-1">
                Hiring both experienced professionals and 2026 engineering freshers.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter open positions by experience level"
              className="inline-flex items-center gap-1 p-1 bg-[#E9E5D8] rounded-md self-start sm:self-auto"
            >
              {(['All Roles', 'Experienced', 'Freshers 2026'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={roleFilter === tab}
                  onClick={() => setRoleFilter(tab)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#196A52] ${
                    roleFilter === tab
                      ? 'bg-white text-[#0E2427] shadow-xs'
                      : 'text-[#0E2427]/70 hover:text-[#0E2427]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleRoles.map((role) => (
              <article
                key={role.id}
                className="bg-white/75 border border-[#0E2427]/15 rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#0E2427]/60">
                    {role.track} · {role.experience} · {role.location}
                  </p>
                  <h4 className="font-serif text-xl font-medium text-[#0E2427] mt-2">
                    {role.title}
                  </h4>
                  <p className="mt-2 text-sm text-[#0E2427]/75 leading-relaxed">
                    {role.focus}
                  </p>
                  <p className="mt-3 text-xs text-[#0E2427]/65">
                    Core Stack:{' '}
                    <span className="font-medium text-[#0E2427]">{role.skills.join(' · ')}</span>
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#0E2427]/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onApplyRole(role.title, role.track)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#196A52] hover:text-[#135440] transition-colors cursor-pointer"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
