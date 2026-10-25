import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { validateContactMessage, generateWhatsAppGeneralUrl } from '../../utils/storeLogic';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, language, submitMessage } = useStore();
  const { settings } = data;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry / Price Quotation');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactMessage({ name, phone, email, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    submitMessage({
      name,
      phone,
      email,
      subject,
      message,
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  const whatsappLink = generateWhatsAppGeneralUrl(
    settings.whatsapp,
    `Hello ${settings.shopName}! I have a direct query from your website.`
  );

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            {language === 'ml' ? 'ഞങ്ങളുമായി ബന്ധപ്പെടുക' : 'Get In Touch'}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ml' ? 'ഞങ്ങളുടെ ഷോപ്പിലേക്ക് സ്വാഗതം' : 'Visit Our Store or Send an Inquiry'}
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Need urgent wholesale electrical materials, plumbing supplies, or an on-site technician estimate? Reach out to our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
                Call &amp; Instant Chat
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Main Store Phone</div>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {settings.phone}
                    </a>
                    {settings.altPhone && (
                      <div className="text-xs text-slate-400 mt-0.5">
                        Alt: <a href={`tel:${settings.altPhone.replace(/\s+/g, '')}`} className="hover:text-amber-400">{settings.altPhone}</a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-700/60">
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp Direct Support</div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {settings.whatsapp}
                    </a>
                    <div className="text-[11px] text-slate-400 mt-0.5">Instant material inquiries &amp; photo bill quotes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-700/60">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Address</div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Store Hours */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Store Address</div>
                  <p className="text-sm font-medium text-white leading-relaxed mt-0.5">
                    {settings.fullAddress}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {settings.city}, {settings.state} - {settings.pinCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-700/60">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Store Timings</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {settings.openingHoursWeekday}
                  </div>
                  <div className="text-xs text-amber-400 mt-0.5">
                    {settings.openingHoursWeekend}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GST Registered: <strong className="text-slate-200">{settings.gstin}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Send an Inquiry to Store
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Submitted messages arrive immediately in our Admin inbox for prompt response.
                  </p>
                </div>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <strong>Thank you!</strong> Your message has been sent directly to Jaysree Traders. We will get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-form-name" className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                      } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-form-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      placeholder="e.g. 98470 12345"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                      } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-form-email" className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                      } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-form-subject" className="block text-xs font-semibold text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-form-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Product Inquiry / Price Quotation">Product Inquiry / Price Quotation</option>
                      <option value="Bulk Contractor Order">Bulk Contractor Order</option>
                      <option value="Technician / Service Booking">Technician / Service Booking</option>
                      <option value="Emergency Pipe Leak / Electrical Issue">Emergency Pipe Leak / Electrical</option>
                      <option value="Other Requirement">Other Requirement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-form-message" className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Requirement or Message *
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    placeholder="Provide details about the items, brand preferences, quantities, or repair work needed..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                    } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Average reply time: Under 30 minutes</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all transform active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Map Container */}
        {settings.googleMapsEmbedUrl && (
          <div className="mt-12 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 aspect-21/9 max-h-80">
            <iframe
              src={settings.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jaysree Traders Store Location Map"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};
