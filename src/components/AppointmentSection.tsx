import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { CLINIC_CONFIG, buildWhatsAppUrl } from '../config/clinicConfig';

interface AppointmentSectionProps {
  preselectedTreatment: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface BookingResult {
  status: 'idle' | 'submitting' | 'success' | 'error';
  referenceId?: string;
  errorMessage?: string;
}

const TIME_WINDOWS = [
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (1:00 PM – 4:30 PM)',
  'Evening (4:30 PM – 8:00 PM)',
] as const;

export function AppointmentSection({ preselectedTreatment }: AppointmentSectionProps) {
  const todayIso = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    treatment: preselectedTreatment || CLINIC_CONFIG.treatments[0].name,
    preferredDate: '',
    preferredTime: TIME_WINDOWS[0],
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [result, setResult] = useState<BookingResult>({ status: 'idle' });

  useEffect(() => {
    if (preselectedTreatment) {
      setForm((prev) => ({ ...prev, treatment: preselectedTreatment }));
    }
  }, [preselectedTreatment]);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) {
      errors.name = 'Please enter the patient name (at least 2 characters).';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address or leave it blank.';
    }
    if (!form.treatment) {
      errors.treatment = 'Please select a treatment.';
    }
    if (!form.preferredDate) {
      errors.preferredDate = 'Please choose your preferred consultation date.';
    }
    if (!form.preferredTime) {
      errors.preferredTime = 'Please choose a preferred time window.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildBookingWhatsAppLink = (): string => {
    const lines = [
      'Hello, I would like to book an appointment at The Smile Works Multispeciality Dental Clinic (Baner, Pune).',
      form.name ? `Patient Name: ${form.name}` : '',
      form.phone ? `Phone: ${form.phone}` : '',
      form.treatment ? `Preferred Treatment: ${form.treatment}` : '',
      form.preferredDate ? `Preferred Date: ${form.preferredDate}` : '',
      form.preferredTime ? `Preferred Time: ${form.preferredTime}` : '',
      form.message ? `Notes: ${form.message}` : '',
    ].filter(Boolean);

    return buildWhatsAppUrl(lines.join('\n'));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setResult({ status: 'submitting' });

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          'Appointment server endpoint is not active in this hosting environment. Please send your request via WhatsApp below.'
        );
      }

      const data = await response.json();
      if (!response.ok || !data?.ok || !data?.referenceId) {
        throw new Error(
          data?.error ||
            'Unable to save appointment request right now. Please send via WhatsApp or call us.'
        );
      }

      setResult({
        status: 'success',
        referenceId: data.referenceId,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to reach the booking service right now. Please use WhatsApp or call +91 89998 00571.';
      setResult({
        status: 'error',
        errorMessage: message,
      });
    }
  };

  return (
    <section id="appointment" className="py-16 sm:py-24 bg-[#DDF1EA]/40">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Reassurance & Direct Options */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#C6A875] mb-3">
              Book Your Visit · Baner, Pune
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-[1.16] font-semibold text-[#123F46] mb-4">
              Request Your Dental Appointment
            </h2>
            <p className="text-base leading-[1.65] text-[#252B2D]/85 mb-8">
              Share your preferred treatment and convenient date. Our Baner clinic desk will
              confirm exact doctor availability and slot timings with you promptly.
            </p>

            <div className="rounded-2xl bg-[#FAF9F5] border border-[#123F46]/10 p-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Prefer Instant WhatsApp Scheduling?
                </p>
                <p className="text-sm text-[#252B2D]/80 mb-3">
                  Send your preferred day directly to our Baner clinic desk on WhatsApp.
                </p>
                <a
                  href={buildBookingWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#123F46] px-5 py-2.5 text-sm font-medium text-[#FAF9F5] transition-colors hover:bg-[#0D2F35]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

              <div className="border-t border-[#123F46]/10 pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#252B2D]/60 mb-1">
                  Speak With Reception
                </p>
                <a
                  href={CLINIC_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#123F46] tabular-nums hover:underline"
                >
                  <Phone className="h-4 w-4 text-[#C6A875]" aria-hidden="true" />
                  <span>{CLINIC_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[24px] bg-[#FAF9F5] border border-[#123F46]/10 p-6 sm:p-9 shadow-sm">
              {result.status === 'success' ? (
                <div className="py-6">
                  <div className="flex items-start gap-3 text-[#123F46] mb-4">
                    <CheckCircle2 className="h-6 w-6 text-[#123F46] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#C6A875] mb-1">
                        Request Recorded · Ref {result.referenceId}
                      </p>
                      <h3 className="font-serif text-2xl font-semibold text-[#123F46]">
                        Thank you, {form.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-[#252B2D]/85 mb-6">
                    Your appointment request for <strong>{form.treatment}</strong> on{' '}
                    <strong className="tabular-nums">{form.preferredDate}</strong> ({form.preferredTime})
                    has been saved. Our Baner desk will reach out on{' '}
                    <strong className="tabular-nums">{form.phone}</strong> to confirm your exact
                    consultation slot.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildBookingWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#123F46] px-6 py-2.5 text-sm font-medium text-[#FAF9F5] hover:bg-[#0D2F35]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Also Share on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setResult({ status: 'idle' });
                        setForm((prev) => ({
                          ...prev,
                          name: '',
                          phone: '',
                          email: '',
                          message: '',
                        }));
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-[#123F46]/25 px-5 py-2.5 text-sm font-medium text-[#123F46] hover:bg-[#DDF1EA]/40 cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {result.status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-700/25 bg-red-50 p-4 text-sm text-red-900"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
                        <div className="space-y-3">
                          <p className="font-medium">{result.errorMessage}</p>
                          <div className="flex flex-wrap gap-2.5">
                            <a
                              href={buildBookingWhatsAppLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#123F46] px-4 py-2 text-xs font-medium text-[#FAF9F5] hover:bg-[#0D2F35]"
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Send Request via WhatsApp</span>
                            </a>
                            <a
                              href={CLINIC_CONFIG.phoneHref}
                              className="inline-flex items-center gap-1.5 rounded-full border border-[#123F46]/30 bg-white px-4 py-2 text-xs font-medium text-[#123F46]"
                            >
                              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Call {CLINIC_CONFIG.phoneDisplay}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="patient-name"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Patient Name *
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] placeholder:text-[#252B2D]/45 focus:border-[#123F46] focus:outline-none"
                      />
                      {fieldErrors.name && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] tabular-nums placeholder:text-[#252B2D]/45 focus:border-[#123F46] focus:outline-none"
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="patient-email"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="patient-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] placeholder:text-[#252B2D]/45 focus:border-[#123F46] focus:outline-none"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferred-treatment"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Preferred Treatment *
                      </label>
                      <select
                        id="preferred-treatment"
                        required
                        value={form.treatment}
                        onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] focus:border-[#123F46] focus:outline-none"
                      >
                        {CLINIC_CONFIG.treatments.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.treatment && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.treatment}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="preferred-date"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="preferred-date"
                        type="date"
                        required
                        min={todayIso}
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] tabular-nums focus:border-[#123F46] focus:outline-none"
                      />
                      {fieldErrors.preferredDate && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferred-time"
                        className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                      >
                        Preferred Time *
                      </label>
                      <select
                        id="preferred-time"
                        required
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full min-h-[46px] rounded-xl border border-[#123F46]/20 bg-white px-4 py-2.5 text-sm text-[#252B2D] focus:border-[#123F46] focus:outline-none"
                      >
                        {TIME_WINDOWS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.preferredTime && (
                        <p className="mt-1 text-xs text-red-700">{fieldErrors.preferredTime}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="additional-message"
                      className="block text-xs font-medium uppercase tracking-wider text-[#123F46] mb-1.5"
                    >
                      Additional Message
                    </label>
                    <textarea
                      id="additional-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly share any dental concern, tooth sensitivity, or preferred callback window..."
                      className="w-full rounded-xl border border-[#123F46]/20 bg-white px-4 py-3 text-sm text-[#252B2D] placeholder:text-[#252B2D]/45 focus:border-[#123F46] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={result.status === 'submitting'}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#123F46] px-8 py-3 text-sm font-medium text-[#FAF9F5] transition-colors hover:bg-[#0D2F35] disabled:opacity-60 cursor-pointer"
                    >
                      {result.status === 'submitting'
                        ? 'Submitting Request...'
                        : 'Request an Appointment'}
                    </button>

                    <a
                      href={buildBookingWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-[#123F46] underline decoration-[#C6A875] underline-offset-4 hover:text-[#0D2F35]"
                    >
                      Or send request via WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
