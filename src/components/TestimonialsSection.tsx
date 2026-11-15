import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG } from '../config/clinicConfig';

export function TestimonialsSection() {
  const verifiedReviews = CLINIC_CONFIG.verifiedReviews;
  const channels = CLINIC_CONFIG.reviewChannels;

  // Use verified reviews if supplied in clinicConfig; otherwise display verified directory channels in the interactive carousel.
  const hasVerifiedQuotes = verifiedReviews.length > 0;
  const slideCount = hasVerifiedQuotes ? verifiedReviews.length : channels.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
              Patient Feedback & Public Listings
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-3">
              Verified Patient Perspectives
            </h2>
            <p className="text-base leading-[1.65] text-[#252B2D]/80">
              {hasVerifiedQuotes
                ? 'Authentic reviews shared by patients of The Smile Works Multispeciality Dental Clinic.'
                : 'We never publish fabricated testimonials or unverified scores. Read live, attributable patient reviews directly on our verified clinic listings.'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123F46]/20 bg-[#FAF9F5] text-[#123F46] transition-colors hover:bg-[#DDF1EA]/60 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123F46]/20 bg-[#FAF9F5] text-[#123F46] transition-colors hover:bg-[#DDF1EA]/60 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Interactive Carousel Stage */}
        <div className="rounded-[24px] bg-[#DDF1EA]/35 border border-[#123F46]/10 p-6 sm:p-10 mb-6">
          <AnimatePresence mode="wait">
            {hasVerifiedQuotes ? (
              <motion.div
                key={verifiedReviews[activeIndex].id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl"
              >
                {typeof verifiedReviews[activeIndex].rating === 'number' && (
                  <div className="flex items-center gap-1 mb-4 text-[#C6A875]">
                    {Array.from({ length: verifiedReviews[activeIndex].rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                )}
                <blockquote className="font-serif text-xl sm:text-2xl leading-[1.45] text-[#123F46] mb-6">
                  “{verifiedReviews[activeIndex].reviewText}”
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-[#252B2D]/75">
                  <span className="font-semibold text-[#123F46]">
                    {verifiedReviews[activeIndex].patientName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Verified via {verifiedReviews[activeIndex].source}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={channels[activeIndex].platform}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#C6A875] mb-2">
                    Verified Listing · {channels[activeIndex].platform}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#123F46] mb-3">
                    {channels[activeIndex].title}
                  </h3>
                  <p className="text-base leading-[1.65] text-[#252B2D]/80">
                    {channels[activeIndex].description}
                  </p>
                </div>

                <a
                  href={channels[activeIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#123F46] px-6 py-3 text-sm font-medium text-[#FAF9F5] whitespace-nowrap shrink-0 transition-colors hover:bg-[#0D2F35]"
                >
                  <span>{channels[activeIndex].actionLabel}</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slide Indicators + Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose review slide">
            {Array.from({ length: slideCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === activeIndex ? 'w-8 bg-[#123F46]' : 'w-2.5 bg-[#123F46]/25 hover:bg-[#123F46]/45'
                }`}
              />
            ))}
          </div>

          <a
            href={CLINIC_CONFIG.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#123F46] hover:underline"
          >
            <span>Read Baner Clinic Reviews on Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#C6A875]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
