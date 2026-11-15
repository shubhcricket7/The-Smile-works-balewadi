import { useEffect, useState } from 'react';
import { ExternalLink, MapPin, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG } from '../config/clinicConfig';

interface FooterProps {
  onSelectTreatment: (treatmentName: string) => void;
}

const QUICK_NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Our Dentist', href: '#dentist' },
  { label: 'Smile Gallery', href: '#gallery' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Contact & Directions', href: '#contact' },
] as const;

export function Footer({ onSelectTreatment }: FooterProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!privacyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPrivacyOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [privacyOpen]);

  const featuredTreatments = CLINIC_CONFIG.treatments.slice(0, 6);

  return (
    <footer className="bg-[#123F46] text-[#FAF9F5] pt-16 pb-24 sm:pb-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF9F5]/14">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-xl font-semibold tracking-[0.06em] text-[#FAF9F5]">
              {CLINIC_CONFIG.shortWordmark}
            </p>
            <p className="text-sm leading-[1.7] text-[#FAF9F5]/80 max-w-sm">
              Multispeciality dental care in Baner, Pune focused on comfort, transparent clinical
              guidance, and natural, healthy smiles for every stage of life.
            </p>
            <a
              href={CLINIC_CONFIG.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C6A875] hover:underline"
            >
              <span>View Baner Clinic on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C6A875] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF9F5]/80">
              {QUICK_NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-[#FAF9F5] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Treatments */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C6A875] mb-4">
              Treatments
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF9F5]/80">
              {featuredTreatments.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTreatment(t.name)}
                    className="text-left hover:text-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Baner Contact */}
          <div className="lg:col-span-3 space-y-3 text-sm text-[#FAF9F5]/80">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C6A875] mb-4">
              Baner Clinic
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#C6A875] shrink-0 mt-1" aria-hidden="true" />
              <p className="leading-relaxed">{CLINIC_CONFIG.address.full}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#C6A875] shrink-0" aria-hidden="true" />
              <a
                href={CLINIC_CONFIG.phoneHref}
                className="tabular-nums font-medium text-[#FAF9F5] hover:underline"
              >
                {CLINIC_CONFIG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Privacy */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#FAF9F5]/65">
          <p>
            © {new Date().getFullYear()} {CLINIC_CONFIG.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-[#FAF9F5] underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
            <a
              href={CLINIC_CONFIG.links.blogspot}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF9F5] transition-colors"
            >
              Clinic Page
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {privacyOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
            onClick={() => setPrivacyOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2F35]/75 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#FAF9F5] text-[#252B2D] p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3
                  id="privacy-policy-title"
                  className="font-serif text-2xl font-semibold text-[#123F46]"
                >
                  Patient Privacy Policy
                </h3>
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  aria-label="Close privacy policy"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDF1EA]/60 text-[#123F46] hover:bg-[#DDF1EA] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3 text-sm leading-[1.65] text-[#252B2D]/85">
                <p>
                  {CLINIC_CONFIG.businessName} (Baner, Pune) respects your personal and dental
                  privacy. Details submitted through our appointment request form—such as your name,
                  phone number, optional email address, and preferred treatment—are used solely to
                  coordinate your consultation and follow up regarding scheduling.
                </p>
                <p>
                  We do not sell or share patient enquiry details with third-party marketers. If you
                  choose to contact us via WhatsApp or telephone ({CLINIC_CONFIG.phoneDisplay}),
                  your communication is handled directly by our clinic desk.
                </p>
                <p>
                  Clinical photographs are never published on this website without explicit written
                  patient consent; currently displayed showcase imagery consists solely of
                  representative clinical models and clinic interior previews.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  className="rounded-full bg-[#123F46] px-6 py-2.5 text-sm font-medium text-[#FAF9F5] hover:bg-[#0D2F35] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
