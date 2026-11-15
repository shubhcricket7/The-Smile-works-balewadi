import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { CLINIC_CONFIG, buildWhatsAppUrl } from '../config/clinicConfig';

export function LocationSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F3F1EA]/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Address, Actions & Editable Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
                Location & Contact
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-6">
                Visit The Smile Works
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#123F46] mb-2">
                    {CLINIC_CONFIG.businessName}
                  </h3>
                  <div className="flex items-start gap-3 text-sm sm:text-base leading-[1.65] text-[#252B2D]/85">
                    <MapPin
                      className="h-5 w-5 text-[#C6A875] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <address className="not-italic">
                      {CLINIC_CONFIG.address.line1}
                      <br />
                      {CLINIC_CONFIG.address.line2}
                      <br />
                      {CLINIC_CONFIG.address.cityStatePin}
                    </address>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#C6A875] shrink-0" aria-hidden="true" />
                  <a
                    href={CLINIC_CONFIG.phoneHref}
                    className="text-base sm:text-lg font-semibold text-[#123F46] tabular-nums hover:underline"
                  >
                    {CLINIC_CONFIG.phoneDisplay}
                  </a>
                </div>

                {/* Primary Contact Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={CLINIC_CONFIG.phoneHref}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#123F46] px-5 py-2.5 text-sm font-medium text-[#FAF9F5] transition-colors hover:bg-[#0D2F35]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={CLINIC_CONFIG.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#123F46]/25 bg-[#FAF9F5] px-5 py-2.5 text-sm font-medium text-[#123F46] transition-colors hover:bg-[#DDF1EA]/60"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#123F46]/25 bg-[#FAF9F5] px-5 py-2.5 text-sm font-medium text-[#123F46] transition-colors hover:bg-[#DDF1EA]/60"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Editable Baner Opening Hours Card */}
            <div className="rounded-2xl bg-[#FAF9F5] border border-[#123F46]/10 p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Clock className="h-4 w-4 text-[#C6A875]" aria-hidden="true" />
                <h3 className="font-serif text-lg font-semibold text-[#123F46]">
                  Baner Clinic Hours
                </h3>
              </div>

              <dl className="space-y-2.5 text-sm">
                {CLINIC_CONFIG.openingHours.schedule.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between gap-4 border-b border-[#123F46]/8 pb-2 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-medium text-[#123F46]">{slot.day}</dt>
                    <dd className="text-[#252B2D]/80 text-right tabular-nums">{slot.hours}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-xs leading-relaxed text-[#252B2D]/70">
                {CLINIC_CONFIG.openingHours.note}
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 flex">
            <div className="w-full overflow-hidden rounded-[24px] border border-[#123F46]/12 bg-[#FAF9F5] shadow-sm min-h-[360px] sm:min-h-[460px]">
              <iframe
                title="The Smile Works Multispeciality Dental Clinic Baner Google Maps Location"
                src={CLINIC_CONFIG.links.googleMapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full min-h-[360px] sm:min-h-[460px] border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
