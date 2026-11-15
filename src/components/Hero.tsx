import { ArrowRight, CalendarCheck, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_CONFIG, IMAGES } from '../config/clinicConfig';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Subtle ambient mint wash in upper-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-[#DDF1EA]/55 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6"
          >
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.16em] text-[#123F46]/80 uppercase mb-5">
              {CLINIC_CONFIG.branchLabel}
            </p>

            <h1 className="font-serif text-[clamp(2.35rem,4.4vw,3.85rem)] leading-[1.08] tracking-[-0.02em] font-semibold text-[#123F46] max-w-[14ch] mb-6">
              Your Smile Deserves the Best Care.
            </h1>

            <p className="text-base sm:text-[17px] leading-[1.65] text-[#252B2D]/85 max-w-[52ch] mb-8">
              Experience personalised dental care with a focus on comfort, confidence and
              healthier smiles. Your journey towards a beautiful smile starts here.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#123F46] px-7 py-3 text-sm sm:text-[15px] font-medium text-[#FAF9F5] whitespace-nowrap shrink-0 shadow-sm transition-colors duration-150 hover:bg-[#0D2F35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F46] cursor-pointer"
              >
                <span>Book Your Appointment</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#123F46]/25 bg-transparent px-7 py-3 text-sm sm:text-[15px] font-medium text-[#123F46] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#123F46] hover:bg-[#DDF1EA]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F46] cursor-pointer"
              >
                Explore Treatments
              </button>
            </div>

            {/* Trust-focused supporting line & Baner landmark */}
            <div className="border-t border-[#123F46]/12 pt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-[#252B2D]/80">
              <p className="font-serif italic text-base text-[#123F46]">
                “Thoughtful Care. Confident Smiles.”
              </p>
              <span className="hidden sm:inline text-[#C6A875]" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#252B2D]/75">
                <MapPin className="h-4 w-4 text-[#C6A875] shrink-0" aria-hidden="true" />
                <span>Tulip Tower, Balewadi Phata, Baner</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait & Floating Appointment Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-stretch"
          >
            {/* Subtle decorative dental arch outline accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -right-4 hidden sm:block h-full w-full rounded-[28px] border border-[#C6A875]/45"
            />

            <div className="relative w-full overflow-hidden rounded-[24px] bg-[#DDF1EA]/40 shadow-lg min-h-[400px] sm:min-h-[480px] lg:min-h-[540px]">
              <ResilientImage
                src={IMAGES.heroPortrait}
                alt="Confident smiling Indian adult representing natural healthy dental care in Baner, Pune"
                loading="eager"
                className="h-full w-full object-cover object-top"
              />

              {/* Measured scrim at bottom for card contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#123F46]/45 via-[#123F46]/10 to-transparent"
              />

              {/* Subtle Floating Appointment Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px] rounded-2xl bg-[#FAF9F5]/95 backdrop-blur-md p-4 sm:p-5 shadow-md border border-[#123F46]/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#C6A875] mb-1">
                      Baner Clinic Desk
                    </p>
                    <p className="font-serif text-base font-semibold text-[#123F46]">
                      Personalised Consultations
                    </p>
                    <p className="mt-1 text-xs text-[#252B2D]/75 leading-relaxed">
                      Tulip Tower, Balewadi Phata · Prior appointment recommended
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDF1EA] text-[#123F46]">
                    <CalendarCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#123F46]/10 flex items-center justify-between gap-3">
                  <a
                    href={CLINIC_CONFIG.phoneHref}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#123F46] tabular-nums hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C6A875]" aria-hidden="true" />
                    <span>{CLINIC_CONFIG.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={onBookClick}
                    className="text-xs font-semibold text-[#123F46] hover:text-[#0D2F35] whitespace-nowrap cursor-pointer"
                  >
                    Request Slot →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
