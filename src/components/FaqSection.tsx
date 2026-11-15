import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG } from '../config/clinicConfig';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(CLINIC_CONFIG.faqs[0].id);

  return (
    <section aria-labelledby="faq-heading" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-3"
          >
            Planning Your Visit in Baner
          </h2>
          <p className="text-base leading-[1.65] text-[#252B2D]/80">
            Helpful details on finding our Balewadi Phata clinic, confirming schedules, and what to
            expect at your first appointment.
          </p>
        </div>

        <div className="divide-y divide-[#123F46]/12 border-y border-[#123F46]/12">
          {CLINIC_CONFIG.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-2">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 py-3 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123F46]"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#123F46]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#C6A875] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm sm:text-base leading-[1.7] text-[#252B2D]/80">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
