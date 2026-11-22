import { useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { OFFERINGS, type OfferingItem } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface OfferingsSectionProps {
  onInquireOffering: (inquiryType: string, subject: string) => void;
}

type FilterOption = 'all' | 'product' | 'service';

export function OfferingsSection({ onInquireOffering }: OfferingsSectionProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(null);

  const products = OFFERINGS.filter((item) => item.kind === 'product');
  const services = OFFERINGS.filter((item) => item.kind === 'service');

  const showProducts = filter === 'all' || filter === 'product';
  const showServices = filter === 'all' || filter === 'service';

  const featuredProduct = products.find((p) => p.featured);
  const secondaryProducts = products.filter((p) => !p.featured);

  return (
    <section id="offerings" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Segmented Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-700 mb-2">
              IT Products &amp; Engineering Services
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Software built to run operations reliably, not sit in slide decks.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter IT products and services"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start md:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All Offerings' },
                { id: 'product', label: 'IT Products' },
                { id: 'service', label: 'IT Services' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* IT Products Asymmetric Showcase */}
        {showProducts && (
          <div className="mt-12">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Flagship IT Products
              </h3>
              <span className="text-sm text-slate-500 tabular-nums">
                3 Enterprise Platforms · Ready for Deployment
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {featuredProduct && (
                <article className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                  {featuredProduct.imageSrc && (
                    <div className="aspect-[16/9] bg-slate-100 border-b border-slate-200 overflow-hidden">
                      <SafeImage
                        src={featuredProduct.imageSrc}
                        alt={featuredProduct.imageAlt ?? featuredProduct.title}
                        fallbackTitle={featuredProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        IT Product · {featuredProduct.deploymentTarget} · {featuredProduct.slaMetric}
                      </p>
                      <h4 className="font-display text-2xl font-bold text-slate-900">
                        {featuredProduct.title}
                      </h4>
                      <p className="text-sm font-medium text-blue-700 mt-1">
                        {featuredProduct.subtitle}
                      </p>
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {featuredProduct.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedOffering(featuredProduct)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        <span>View Technical Specs</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onInquireOffering('IT Product Demo', `Product Demo: ${featuredProduct.title}`)
                        }
                        className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Request Product Demo
                      </button>
                    </div>
                  </div>
                </article>
              )}

              <div className="lg:col-span-5 flex flex-col gap-6">
                {secondaryProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex-1 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        IT Product · {product.slaMetric}
                      </p>
                      <h4 className="font-display text-xl font-bold text-slate-900">
                        {product.title}
                      </h4>
                      <p className="text-sm font-medium text-blue-700 mt-1">{product.subtitle}</p>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {product.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedOffering(product)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        <span>View Specs</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onInquireOffering('IT Product Demo', `Product Demo: ${product.title}`)
                        }
                        className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Book Demo
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* IT Services Editorial Numbered Grid */}
        {showServices && (
          <div id="services" className="mt-16">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Custom IT Engineering Services
              </h3>
              <span className="text-sm text-slate-500">
                Delivered from Nagpur IT Park
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">
                      IT Service · {service.slaMetric}
                    </p>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      {service.title}
                    </h4>
                    <p className="text-sm font-medium text-blue-700 mt-1">{service.subtitle}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedOffering(service)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span>Scope Details</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onInquireOffering('Custom IT Services', `Service Inquiry: ${service.title}`)
                      }
                      className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Estimate
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Specification Detail Modal */}
      {selectedOffering && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="offering-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setSelectedOffering(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">
                  {selectedOffering.kind === 'product' ? 'IT Product Specification' : 'IT Service Scope'} · {selectedOffering.slaMetric}
                </p>
                <h3 id="offering-modal-title" className="font-display text-2xl font-bold text-slate-900">
                  {selectedOffering.title}
                </h3>
                <p className="text-sm font-medium text-blue-700 mt-1">{selectedOffering.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedOffering(null)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {selectedOffering.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-900 mb-3">
                Included Deliverables &amp; Architecture
              </p>
              <ul className="space-y-2.5">
                {selectedOffering.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Deployment: <span className="font-medium text-slate-800">{selectedOffering.deploymentTarget}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const item = selectedOffering;
                  setSelectedOffering(null);
                  onInquireOffering(
                    item.kind === 'product' ? 'IT Product Demo' : 'Custom IT Services',
                    `Inquiry: ${item.title}`
                  );
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                {selectedOffering.kind === 'product' ? 'Schedule Product Demo' : 'Discuss This Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
