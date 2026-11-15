import { MessageCircle, Phone, Stethoscope, UserRound } from 'lucide-react';
import { CLINIC_CONFIG, buildWhatsAppUrl } from '../config/clinicConfig';
import { ResilientImage } from './ResilientImage';

export function DentistSection() {
  const { dentist } = CLINIC_CONFIG;
  const confirmed = dentist.branchAssociationConfirmed;

  return (
    <section id="dentist" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Doctor Photograph / Clinical Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[24px] border border-[#123F46]/12 bg-[#DDF1EA]/45 aspect-[4/5] flex flex-col items-center justify-center p-8 text-center">
              {confirmed && dentist.photo ? (
                <ResilientImage
                  src={dentist.photo}
                  alt={dentist.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center max-w-xs">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FAF9F5] border border-[#123F46]/12 text-[#123F46] shadow-xs">
                    <UserRound className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <p className="font-serif text-xl font-semibold text-[#123F46] mb-2">
                    Baner Clinical Team
                  </p>
                  <p className="text-sm leading-relaxed text-[#252B2D]/75 mb-5">
                    Doctor portrait, verified Baner branch credentials, and specialist roster are
                    configured in <code className="text-xs font-mono">clinicConfig.ts</code> once
                    supplied by clinic management.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#123F46]/80">
                    <Stethoscope className="h-4 w-4 text-[#C6A875]" aria-hidden="true" />
                    <span>Balewadi Phata, Baner Branch</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editable Doctor Profile Details */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
              Meet Our Dentist
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-4">
              {confirmed ? dentist.name : 'Dedicated Multispeciality Dental Care'}
            </h2>

            <p className="text-base leading-[1.7] text-[#252B2D]/85 mb-8 max-w-[60ch]">
              {dentist.introduction}
            </p>

            {/* Structured Editable Profile Fields */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-[#123F46]/12 py-6 mb-7">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Consulting Dentist
                </dt>
                <dd className="text-sm sm:text-base font-medium text-[#123F46]">
                  {confirmed
                    ? dentist.name
                    : `${dentist.name} (Confirm Baner branch availability)`}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Qualifications
                </dt>
                <dd className="text-sm sm:text-base text-[#252B2D]/85">
                  {dentist.qualifications}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Specialisation
                </dt>
                <dd className="text-sm sm:text-base text-[#252B2D]/85">
                  {dentist.specialisation}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Clinical Experience
                </dt>
                <dd className="text-sm sm:text-base text-[#252B2D]/85">
                  {dentist.experience}
                </dd>
              </div>
            </dl>

            {!confirmed && (
              <p className="text-xs sm:text-sm leading-relaxed text-[#252B2D]/70 mb-7">
                {dentist.verificationNote}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CLINIC_CONFIG.phoneHref}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#123F46] px-6 py-2.5 text-sm font-medium text-[#FAF9F5] transition-colors hover:bg-[#0D2F35]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Confirm Doctor Schedule</span>
              </a>

              <a
                href={buildWhatsAppUrl(
                  'Hello, could you please share the consulting dentist timings for the Baner branch?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#123F46]/25 px-6 py-2.5 text-sm font-medium text-[#123F46] transition-colors hover:bg-[#DDF1EA]/50"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
