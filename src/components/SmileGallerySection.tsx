import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, MoveHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_CONFIG, GalleryItem } from '../config/clinicConfig';
import { ResilientImage } from './ResilientImage';

export function SmileGallerySection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const demo = CLINIC_CONFIG.gallery.beforeAfterDemo;
  const items = CLINIC_CONFIG.gallery.items;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, items.length]);

  const updateSliderFromClientX = (clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(95, Math.max(5, Math.round(pct))));
  };

  const activeLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F3F1EA]/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
            Smile Gallery & Clinic Preview
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-3">
            Illustrative Smile & Clinic Showcase
          </h2>
          <p className="text-base leading-[1.65] text-[#252B2D]/80">
            Explore our representative clinical model comparison and serene Baner interior preview.
            Authentic, patient-consented clinical case photographs will be published here once
            supplied by the clinic.
          </p>
        </div>

        {/* Before / After Interactive Comparison Slider */}
        <div className="rounded-[24px] bg-[#FAF9F5] border border-[#123F46]/10 p-5 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-xs font-medium text-[#C6A875] mb-1">{demo.subtitle}</p>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#123F46]">
                {demo.title}
              </h3>
            </div>
            <p className="text-xs text-[#252B2D]/65 tabular-nums">
              Drag slider to compare · {sliderPos}% / {100 - sliderPos}%
            </p>
          </div>

          <div
            ref={sliderRef}
            onPointerDown={(e) => {
              draggingRef.current = true;
              (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              updateSliderFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!draggingRef.current) return;
              updateSliderFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              draggingRef.current = false;
            }}
            onPointerCancel={() => {
              draggingRef.current = false;
            }}
            className="relative aspect-[4/3] max-h-[480px] w-full select-none overflow-hidden rounded-2xl bg-[#EAE5D9] cursor-ew-resize touch-none"
          >
            {/* After Image (Full Background) */}
            <ResilientImage
              src={demo.afterImage}
              alt="Demonstration dental model after alignment and brightening"
              className="h-full w-full object-cover"
            />

            {/* Before Image (Clipped to Slider Percentage) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <ResilientImage
                src={demo.beforeImage}
                alt="Demonstration dental model before orthodontic spacing closure"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Subtle Corner Labels */}
            <div className="pointer-events-none absolute top-4 left-4 rounded-lg bg-[#123F46]/85 px-3 py-1.5 text-xs font-medium text-[#FAF9F5]">
              {demo.beforeLabel}
            </div>
            <div className="pointer-events-none absolute top-4 right-4 rounded-lg bg-[#FAF9F5]/90 px-3 py-1.5 text-xs font-medium text-[#123F46]">
              {demo.afterLabel}
            </div>

            {/* Divider Line & Handle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#FAF9F5] shadow-md"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#123F46] text-[#FAF9F5] shadow-lg border-2 border-[#FAF9F5]">
                <MoveHorizontal className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Keyboard-accessible range control */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-xs font-medium text-[#123F46]">
              <span>Adjust Comparison:</span>
              <input
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Before and after demonstration comparison slider"
                className="w-40 accent-[#123F46] cursor-pointer"
              />
            </label>
            <p className="text-xs leading-relaxed text-[#252B2D]/70 max-w-xl">
              {demo.disclaimer}
            </p>
          </div>
        </div>

        {/* Responsive Gallery Grid with Lightbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left overflow-hidden rounded-2xl bg-[#FAF9F5] border border-[#123F46]/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#123F46]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDF1EA]/40">
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF9F5]/90 text-[#123F46] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-medium text-[#C6A875] mb-1">
                  {item.category} · Demonstration
                </p>
                <p className="font-serif text-base font-semibold text-[#123F46] mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-[#252B2D]/70">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2F35]/90 backdrop-blur-xs p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#FAF9F5] shadow-2xl"
            >
              <div className="relative aspect-[4/3] bg-[#EAE5D9]">
                <ResilientImage
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.imageAlt}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F5]/95 text-[#123F46] shadow-md hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)
                  }
                  aria-label="Previous gallery image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF9F5]/90 text-[#123F46] shadow-md hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % items.length)}
                  aria-label="Next gallery image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF9F5]/90 text-[#123F46] shadow-md hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#C6A875] mb-0.5">
                    {activeLightboxItem.category} · Representative Placeholder
                  </p>
                  <h4 className="font-serif text-lg font-semibold text-[#123F46]">
                    {activeLightboxItem.title}
                  </h4>
                  <p className="text-xs text-[#252B2D]/75 mt-0.5">
                    {activeLightboxItem.caption}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#252B2D]/60 tabular-nums">
                  {lightboxIndex + 1} / {items.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
