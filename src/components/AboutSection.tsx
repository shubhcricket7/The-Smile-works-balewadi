import { motion } from 'motion/react';
import { CLINIC_CONFIG, IMAGES } from '../config/clinicConfig';
import { ResilientImage } from './ResilientImage';

const CARE_PRINCIPLES = [
  {
    title: 'Patient-Focused Dental Care',
    detail: 'Unhurried consultations where your questions, comfort, and daily routine guide every recommendation.',
  },
  {
    title: 'Personalised Treatment Approach',
    detail: 'Care pathways adapted to your individual oral health goals rather than rigid one-size templates.',
  },
  {
    title: 'Comfortable Clinical Experience',
    detail: 'A serene, hygienic setting near Balewadi Phata designed to help patients feel calm and reassured.',
  },
  {
    title: 'Oral Health & Smile Aesthetics',
    detail: 'Balancing long-term functional tooth health with natural, harmonious smile confidence.',
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Clinic Interior Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full overflow-hidden rounded-[24px] bg-[#DDF1EA]/50 shadow-sm min-h-[320px] sm:min-h-[420px]">
              <ResilientImage
                src={IMAGES.clinicInterior}
                alt="Calm architectural lounge and consultation interior at The Smile Works Multispeciality Dental Clinic in Baner"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative & Clinical Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
              About Our Baner Clinic
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-5">
              A Better Dental Experience Begins Here.
            </h2>
            <p className="text-base leading-[1.7] text-[#252B2D]/85 mb-8 max-w-[58ch]">
              Situated in Baner near Balewadi Phata,{' '}
              <span className="font-medium text-[#123F46]">{CLINIC_CONFIG.businessName}</span> brings
              preventive, restorative, orthodontic, and cosmetic dentistry together in a welcoming
              neighbourhood practice. From routine check-ups to comprehensive smile planning, every
              visit is shaped around clear communication and gentle care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#123F46]/12 pt-7">
              {CARE_PRINCIPLES.map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif text-lg font-semibold text-[#123F46] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[#252B2D]/78">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
