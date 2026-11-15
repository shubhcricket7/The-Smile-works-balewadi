import { motion } from 'motion/react';
import { CLINIC_CONFIG } from '../config/clinicConfig';

export function WhyChooseUsSection() {
  return (
    <section aria-labelledby="why-choose-heading" className="py-16 sm:py-24 bg-[#123F46] text-[#FAF9F5]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
            The Smile Works Standard
          </p>
          <h2
            id="why-choose-heading"
            className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#FAF9F5] mb-4"
          >
            Why Patients in Baner Trust Our Care
          </h2>
          <p className="text-base leading-[1.65] text-[#FAF9F5]/80">
            Thoughtful dentistry goes beyond clinical skill—it rests on clarity, gentleness, and
            respect for every patient who walks through our doors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_CONFIG.whyChooseUs.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[#FAF9F5]/14 bg-[#FAF9F5]/[0.04] p-7 transition-colors duration-200 hover:bg-[#FAF9F5]/[0.08]"
            >
              <span className="block font-serif text-lg font-medium text-[#C6A875] tabular-nums mb-4">
                {pillar.index}
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#FAF9F5] mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-sm leading-[1.65] text-[#FAF9F5]/80">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
