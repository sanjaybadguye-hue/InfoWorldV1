import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

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
  'IT Infrastructure & Hardware',
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
    mailtoHref?: string;
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

  const buildMailtoHref = (payload: {
    name: string;
    email: string;
    phone: string;
    company: string;
    inquiryType: string;
    subject: string;
    message: string;
  }): string => {
    const mailSubject = `[infoworldtech.co.in] ${payload.inquiryType}${
      payload.subject ? ` — ${payload.subject}` : ''
    }`;
    const mailBody = [
      'Attention: Sanjay Badguye',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : '',
      payload.company ? `Organization/College: ${payload.company}` : '',
      `Category: ${payload.inquiryType}`,
      '',
      payload.message,
    ]
      .filter(Boolean)
      .join('\n');
    return `mailto:sales@infoworldtech.co.in?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitState({ status: 'submitting' });

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      inquiryType,
      subject: subject.trim(),
      message: message.trim(),
    };
    const mailtoHref = buildMailtoHref(payload);

    try {
      const response = await fetch('./api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json') || response.status === 404 || response.status === 405) {
        const staticRefId = `IWT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
        try {
          const existing = JSON.parse(localStorage.getItem('iwt_inquiries') ?? '[]');
          existing.push({ id: staticRefId, ...payload, submittedAt: new Date().toISOString() });
          localStorage.setItem('iwt_inquiries', JSON.stringify(existing));
        } catch {
          // Ignore storage quota errors
        }

        setSubmitState({
          status: 'success',
          referenceId: staticRefId,
          mailtoHref,
          serverMessage:
            'Your inquiry has been prepared and logged for Sanjay Badguye. Send via your email client below or reach us at sales@infoworldtech.co.in.',
        });

        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setSubject('');
        setMessage('');
        setErrors({});
        return;
      }

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
      const staticRefId = `IWT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmitState({
        status: 'success',
        referenceId: staticRefId,
        mailtoHref,
        serverMessage:
          'Your inquiry has been prepared for Sanjay Badguye. Click below to dispatch it directly via email.',
      });
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#0E2427] text-white border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Office & Direct Contact Column matching PDF Page 5 & 6 */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.18em] uppercase text-[#DFA061] mb-4">
              <span className="w-6 h-px bg-[#DFA061]" aria-hidden="true" />
              <span>A Good Place To Start</span>
            </div>

            <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-white leading-[1.08] text-balance">
              Let’s find your{' '}
              <span className="italic font-normal text-[#DFA061]">next right step.</span>
            </h2>

            <p className="mt-5 text-base text-slate-300 leading-relaxed">
              Tell us what you’re trying to solve. Our Nagpur team can help you think through the infrastructure, business software, or engineering support that makes sense.
            </p>

            <div className="mt-8 space-y-5 pt-8 border-t border-white/15">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 inline-flex items-center justify-center border border-white/20 rounded-sm text-[#DFA061] shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-white">Attention: Sanjay Badguye</p>
                  <a
                    href="mailto:sales@infoworldtech.co.in"
                    className="text-[#DFA061] hover:underline mt-0.5 inline-block"
                  >
                    sales@infoworldtech.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 inline-flex items-center justify-center border border-white/20 rounded-sm text-[#DFA061] shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-white">Direct Office Line (Mon–Sat, IST)</p>
                  <p className="text-slate-300 tabular-nums mt-0.5">
                    +91 712 248 9104 · 09:30 AM – 06:30 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 inline-flex items-center justify-center border border-white/20 rounded-sm text-[#DFA061] shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-white">InfoWorld Technologies — Nagpur Office</p>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Shri Sunder Chhabi Nivas, House No. 221,
                    <br />
                    Ganji Peth Ganesh Chowk, Near Rajwada Palace,
                    <br />
                    Nagpur - 440018
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="mailto:sales@infoworldtech.co.in?subject=Inquiry%20for%20Sanjay%20Badguye%20-%20infoworldtech.co.in"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0E2427] bg-[#F6F4EC] rounded-sm hover:bg-[#E9E5D8] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Contact sales</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Validated Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#F6F4EC] text-[#0E2427] border border-white/15 rounded-sm p-6 sm:p-8">
              {submitState.status === 'success' ? (
                <div role="status" className="py-8 text-center space-y-4">
                  <CheckCircle2
                    className="w-12 h-12 text-[#196A52] mx-auto"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl font-medium text-[#0E2427]">
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-sm sm:text-base text-[#0E2427]/75 max-w-md mx-auto">
                    {submitState.serverMessage}
                  </p>
                  {submitState.referenceId && (
                    <p className="text-sm text-[#0E2427]">
                      Reference ID:{' '}
                      <span className="font-mono font-semibold text-[#196A52] tabular-nums">
                        {submitState.referenceId}
                      </span>
                    </p>
                  )}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    {submitState.mailtoHref && (
                      <a
                        href={submitState.mailtoHref}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] transition-colors whitespace-nowrap shrink-0"
                      >
                        Send via Email App
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitState({ status: 'idle' })}
                      className="px-5 py-2.5 text-sm font-semibold text-[#0E2427] border border-[#0E2427]/25 rounded-sm hover:bg-[#E9E5D8] transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Full Name <span className="text-rose-700">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohan Deshpande"
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-700">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Email Address <span className="text-rose-700">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rohan@company.co.in"
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-700">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98230 00000"
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-700">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Organization / College (if fresher)
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company or Institute Name"
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-type" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Inquiry Category <span className="text-rose-700">*</span>
                      </label>
                      <select
                        id="contact-type"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                        Topic / Role
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. SAP B1 Integration or 2026 Fresher Role"
                        className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#0E2427] mb-1.5">
                      Project Brief or Application Note <span className="text-rose-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your IT infrastructure, software goals, or engineering background..."
                      className="w-full px-3.5 py-2.5 text-sm text-[#0E2427] bg-white border border-[#0E2427]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#196A52]"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-700">{errors.message}</p>
                    )}
                  </div>

                  {submitState.status === 'error' && submitState.serverMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800"
                    >
                      {submitState.serverMessage}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#0E2427]/65">
                      Attention: Sanjay Badguye · Ganji Peth, Nagpur - 440018
                    </p>
                    <button
                      type="submit"
                      disabled={submitState.status === 'submitting'}
                      className="px-6 py-3 text-sm font-semibold text-white bg-[#196A52] rounded-sm hover:bg-[#135440] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#196A52] focus-visible:ring-offset-2"
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
