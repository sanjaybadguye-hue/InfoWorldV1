import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export interface ContactPreset {
  inquiryType: string;
  subject: string;
  nonce: number;
}

interface ContactSectionProps {
  preset: ContactPreset | null;
}

const INQUIRY_TYPES = [
  'IT Product Demo',
  'Custom IT Services',
  'Experienced Roles',
  'Freshers 2026 Cohort',
  'General Partnership',
];

export function ContactSection({ preset }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('Custom IT Services');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    referenceId?: string;
    serverMessage?: string;
  }>({ status: 'idle' });

  useEffect(() => {
    if (!preset) return;
    if (INQUIRY_TYPES.includes(preset.inquiryType)) {
      setInquiryType(preset.inquiryType);
    }
    if (preset.subject) {
      setSubject(preset.subject);
    }
    setSubmitState({ status: 'idle' });
  }, [preset]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (phone.trim().length > 0 && !/^[+\d\s()-]{7,20}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number (7–20 digits) or leave blank.';
    }
    if (message.trim().length < 15) {
      nextErrors.message = 'Please share a short summary of at least 15 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          inquiryType,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        referenceId?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitState({
          status: 'error',
          serverMessage: data.error ?? 'Could not submit inquiry. Please verify your entries.',
        });
        return;
      }

      setSubmitState({
        status: 'success',
        referenceId: data.referenceId,
        serverMessage: data.message,
      });

      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch {
      setSubmitState({
        status: 'error',
        serverMessage: 'Connection issue while sending your inquiry. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Office & Direct Info Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Contact InfoWorldtech.co.in
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Start a conversation with our Nagpur engineering team.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you need a live demo of PulseERP Core, want a hybrid pod of experienced architects and mentored freshers, or are applying for our 2026 roles, write to us directly.
            </p>

            <div className="mt-8 space-y-5 pt-8 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Nagpur Headquarters (Est. 2026)</p>
                  <p className="text-slate-600 mt-0.5">
                    3rd Floor, Technology Tower B, IT Park Road, Subhash Nagar, Nagpur, Maharashtra 440022
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Email &amp; Careers Desk</p>
                  <a
                    href="mailto:hello@infoworldtech.co.in"
                    className="text-blue-700 hover:underline mt-0.5 inline-block"
                  >
                    hello@infoworldtech.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Office Hours (Mon–Sat, IST)</p>
                  <p className="text-slate-600 tabular-nums mt-0.5">
                    +91 712 248 9104 · 09:30 AM – 06:30 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Validated Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              {submitState.status === 'success' ? (
                <div role="status" className="py-8 text-center space-y-4">
                  <CheckCircle2
                    className="w-12 h-12 text-emerald-700 mx-auto"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                    {submitState.serverMessage}
                  </p>
                  {submitState.referenceId && (
                    <p className="text-sm text-slate-800">
                      Reference ID:{' '}
                      <span className="font-mono font-semibold text-blue-700 tabular-nums">
                        {submitState.referenceId}
                      </span>
                    </p>
                  )}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitState({ status: 'idle' })}
                      className="px-5 py-2.5 text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohan Deshpande"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-700">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rohan@company.co.in"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-700">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98230 00000"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-700">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Organization / College (if fresher)
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company or Institute Name"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-type" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Inquiry Category <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="contact-type"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Topic / Role
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. PulseERP Demo or 2026 Fresher Role"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 mb-1.5">
                      Project Brief or Application Note <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your software goals, timeline, or engineering background..."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-700">{errors.message}</p>
                    )}
                  </div>

                  {submitState.status === 'error' && submitState.serverMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800"
                    >
                      {submitState.serverMessage}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Direct review by our Nagpur leads · 24-hour response SLA
                    </p>
                    <button
                      type="submit"
                      disabled={submitState.status === 'submitting'}
                      className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                    >
                      {submitState.status === 'submitting' ? 'Sending Inquiry...' : 'Submit Inquiry'}
                    </button>
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
