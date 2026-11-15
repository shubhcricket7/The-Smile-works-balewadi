import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG, TreatmentItem } from '../config/clinicConfig';
import { ResilientImage } from './ResilientImage';

interface TreatmentsSectionProps {
  onBookTreatment: (treatmentName: string) => void;
}

type CategoryFilter =
  | 'All'
  | 'Cosmetic & Aligners'
  | 'Restorative & Implants'
  | 'General & Family';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Cosmetic & Aligners',
  'Restorative & Implants',
  'General & Family',
];

export function TreatmentsSection({ onBookTreatment }: TreatmentsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeTreatment, setActiveTreatment] = useState<TreatmentItem | null>(null);

  useEffect(() => {
    if (!activeTreatment) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTreatment(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTreatment]);

  const filtered =
    selectedCategory === 'All'
      ? CLINIC_CONFIG.treatments
      : CLINIC_CONFIG.treatments.filter((item) => item.category === selectedCategory);

  return (
    <section id="treatments" className="py-16 sm:py-24 bg-[#F3F1EA]/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
              Multispeciality Dental Care
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-3">
              Treatments Tailored to Every Smile
            </h2>
            <p className="text-base leading-[1.65] text-[#252B2D]/80">
              Explore our dental care services in Baner, Pune. Exact treatment suitability and
              clinical steps are confirmed personally during your consultation.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter dental treatments by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#FAF9F5] p-1.5 border border-[#123F46]/10 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123F46] ${
                    isActive
                      ? 'bg-[#123F46] text-[#FAF9F5]'
                      : 'text-[#252B2D]/75 hover:text-[#123F46] hover:bg-[#DDF1EA]/40'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 12 Treatment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filtered.map((treatment) => (
            <article
              key={treatment.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#FAF9F5] border border-[#123F46]/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDF1EA]/45">
                <ResilientImage
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  fallbackTitle={treatment.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-[#252B2D]/60 mb-2">
                  <span className="tabular-nums font-medium text-[#C6A875]">
                    {treatment.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{treatment.category}</span>
                  {!treatment.verifiedOffering && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Confirm on Call</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#123F46] mb-2.5">
                  {treatment.name}
                </h3>

                <p className="text-sm leading-[1.6] text-[#252B2D]/80 mb-6 flex-1">
                  {treatment.shortDescription}
                </p>

                <div className="pt-4 border-t border-[#123F46]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTreatment(treatment)}
                    className="text-sm font-medium text-[#123F46] hover:text-[#0D2F35] underline decoration-[#C6A875]/70 underline-offset-4 whitespace-nowrap cursor-pointer"
                  >
                    Learn More
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookTreatment(treatment.name)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF1EA] px-4 py-2 text-xs font-semibold text-[#123F46] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#123F46] hover:text-[#FAF9F5] cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs sm:text-sm text-[#252B2D]/70 text-center max-w-2xl mx-auto">
          Note: All clinical procedures, timelines, and personalised treatment options are confirmed
          following an in-person dental evaluation at our Baner branch.
        </p>
      </div>

      {/* Treatment Detail Modal */}
      <AnimatePresence>
        {activeTreatment && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="treatment-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123F46]/55 backdrop-blur-xs"
            onClick={() => setActiveTreatment(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#FAF9F5] shadow-xl border border-[#123F46]/15"
            >
              <div className="relative aspect-[16/9] bg-[#DDF1EA]/40">
                <ResilientImage
                  src={activeTreatment.image}
                  alt={activeTreatment.imageAlt}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveTreatment(null)}
                  aria-label="Close treatment details"
                  className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F5]/95 text-[#123F46] shadow-sm hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xs font-medium text-[#C6A875] mb-1.5">
                  {activeTreatment.number} · {activeTreatment.category}
                </p>
                <h3
                  id="treatment-modal-title"
                  className="font-serif text-2xl font-semibold text-[#123F46] mb-3"
                >
                  {activeTreatment.name}
                </h3>
                <p className="text-sm leading-[1.65] text-[#252B2D]/85 mb-4">
                  {activeTreatment.shortDescription}
                </p>

                <div className="space-y-3 rounded-xl bg-[#DDF1EA]/40 p-4 mb-6 text-sm text-[#252B2D]/85">
                  <div>
                    <p className="font-semibold text-[#123F46] text-xs uppercase tracking-wider mb-1">
                      What to Expect at Consultation
                    </p>
                    <p className="leading-[1.6]">{activeTreatment.consultationOverview}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#123F46] text-xs uppercase tracking-wider mb-1">
                      Comfort & Care Approach
                    </p>
                    <p className="leading-[1.6]">{activeTreatment.comfortFocus}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTreatment(null)}
                    className="rounded-full border border-[#123F46]/20 px-5 py-2.5 text-sm font-medium text-[#123F46] hover:bg-[#DDF1EA]/40 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const name = activeTreatment.name;
                      setActiveTreatment(null);
                      onBookTreatment(name);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#123F46] px-6 py-2.5 text-sm font-medium text-[#FAF9F5] hover:bg-[#0D2F35] cursor-pointer"
                  >
                    <span>Book {activeTreatment.name}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
