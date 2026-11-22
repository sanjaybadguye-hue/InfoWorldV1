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
    <>
      {/* Proof of Impact — Adjacent to Capabilities */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Measured Client Outcomes
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Production systems verified across regional supply chains and finance teams.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {study.sector} · {study.city}
                  </p>

                  <div className="mt-4 pb-4 border-b border-slate-200">
                    <p className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                      {study.metricValue}
                    </p>
                    <p className="text-sm font-semibold text-blue-700 mt-1">
                      {study.metricUnit}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{study.timeframe}</p>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 mt-4">
                    {study.client}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">Challenge:</span> {study.challenge}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">Outcome:</span> {study.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Nagpur 2026 Talent Model (Experienced + Freshers) */}
      <section id="team" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-200 aspect-[4/3] lg:aspect-auto">
                <SafeImage
                  src={SITE_ASSETS.teamMentorship}
                  alt="Experienced InfoWorldtech architect reviewing microservices diagrams with two fresh engineering graduates in Nagpur"
                  fallbackTitle="Senior Architects & 2026 Fresher Mentorship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-blue-700 mb-2">
                Nagpur Engineering Culture · Est. 2026
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                Experienced architects and driven freshers building side by side.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Great software requires both institutional memory and fresh energy. In our Nagpur studio, senior engineers with 6 to 14 years of production experience lead system architecture, security boundaries, and client discovery—while 2026 engineering graduates work directly inside delivery pods through structured code reviews and automated testing.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Experienced Specialists
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    Principal architects, backend database leads, and DevOps engineers who own reliability, security, and delivery predictability.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Freshers Cohort (2026)
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    B.E., B.Tech, and MCA graduates from Nagpur mentored over an 18-week live residency shipping real TypeScript and QA automation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Open Roles Filter & Listings */}
          <div className="mt-14 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Open Positions in Nagpur (2026)
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Hiring both experienced technology leads and motivated 2026 freshers.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter open positions by experience level"
                className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start sm:self-auto"
              >
                {(['All Roles', 'Experienced', 'Freshers 2026'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={roleFilter === tab}
                    onClick={() => setRoleFilter(tab)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      roleFilter === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
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
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {role.track} · {role.experience} · {role.location}
                    </p>
                    <h4 className="font-display text-lg font-bold text-slate-900 mt-2">
                      {role.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {role.focus}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      Core Stack: <span className="text-slate-700 font-medium">{role.skills.join(' · ')}</span>
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onApplyRole(role.title, role.track)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
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
    </>
  );
}
