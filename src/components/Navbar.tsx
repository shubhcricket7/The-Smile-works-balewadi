import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG } from '../config/clinicConfig';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Our Dentist', href: '#dentist' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#123F46]/10 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 lg:h-[72px] items-center justify-between gap-8">
          {/* Zone 1: Clean Single-Line Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="font-serif text-lg sm:text-xl font-semibold tracking-[0.06em] text-[#123F46] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123F46]"
          >
            {CLINIC_CONFIG.shortWordmark}
          </a>

          {/* Zone 2: Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#252B2D]/85"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#123F46] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#C6A875] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123F46]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#123F46] px-5 py-2.5 text-sm font-medium text-[#FAF9F5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#0D2F35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F46] cursor-pointer"
            >
              Book Appointment
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-[#123F46]/15 bg-[#FAF9F5] text-[#123F46] transition-colors hover:bg-[#DDF1EA]/60 focus-visible:outline-2 focus-visible:outline-[#123F46] cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#123F46]/10 bg-[#FAF9F5] px-4 py-5 shadow-md"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#252B2D] transition-colors hover:bg-[#DDF1EA]/60 hover:text-[#123F46]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#123F46]/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onBookClick();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#123F46] px-5 py-2.5 text-sm font-medium text-[#FAF9F5] transition-colors hover:bg-[#0D2F35] cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
