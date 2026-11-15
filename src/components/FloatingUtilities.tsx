import { useEffect, useState } from 'react';
import { ArrowUp, Calendar, MessageCircle, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG, buildWhatsAppUrl } from '../config/clinicConfig';

interface FloatingUtilitiesProps {
  onBookClick: () => void;
}

export function FloatingUtilities({ onBookClick }: FloatingUtilitiesProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop / Tablet Floating WhatsApp & Back-to-Top Stack */}
      <div className="fixed right-4 bottom-20 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123F46]/15 bg-[#FAF9F5]/95 text-[#123F46] shadow-md backdrop-blur-sm transition-colors hover:bg-[#DDF1EA] cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message The Smile Works on WhatsApp"
          className="inline-flex h-12 sm:h-13 items-center gap-2.5 rounded-full bg-[#123F46] px-4 sm:px-5 text-sm font-medium text-[#FAF9F5] shadow-lg border border-[#FAF9F5]/20 transition-transform duration-150 hover:scale-[1.03] hover:bg-[#0D2F35]"
        >
          <MessageCircle className="h-5 w-5 text-[#DDF1EA]" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
        </a>
      </div>

      {/* Compact Mobile Sticky Appointment Bar (kept <= 52px for 15% mobile viewport cap) */}
      <div className="fixed inset-x-0 bottom-0 z-30 sm:hidden border-t border-[#123F46]/12 bg-[#FAF9F5]/98 backdrop-blur-md px-3 py-1.5">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={CLINIC_CONFIG.phoneHref}
            className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#123F46]/25 bg-white text-xs font-semibold text-[#123F46]"
          >
            <Phone className="h-3.5 w-3.5 text-[#C6A875]" aria-hidden="true" />
            <span>Call Clinic</span>
          </a>

          <button
            type="button"
            onClick={onBookClick}
            className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#123F46] text-xs font-semibold text-[#FAF9F5] cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </>
  );
}
