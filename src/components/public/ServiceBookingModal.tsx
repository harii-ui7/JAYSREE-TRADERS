import React, { useState } from 'react';
import { Service } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { validateContactMessage } from '../../utils/storeLogic';
import { X, Calendar, Phone, CheckCircle2 } from 'lucide-react';

interface ServiceBookingModalProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ service, onClose }) => {
  const { data, submitMessage } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactMessage({
      name,
      phone,
      message: `${notes || 'Service requested'}. Location: ${address || 'Not specified'}. Preferred timing: ${preferredDate || 'As soon as possible'}.`,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    submitMessage({
      name,
      phone,
      email: '',
      serviceCategory: service.title,
      subject: `Service Booking: ${service.title}`,
      message: `Customer requested booking for: ${service.title}.\nLocation: ${address}\nPreferred Date/Time: ${preferredDate || 'Immediate'}\nNotes: ${notes || 'None'}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Book Technician Service</div>
            <h3 className="font-heading font-bold text-lg text-white leading-tight mt-0.5">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-slate-900">Booking Request Received!</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our service coordinator will call you at <strong className="text-slate-900">{phone}</strong> within 30 minutes to confirm your technician visit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
              <span>Standard Response: <strong>{service.turnaroundTime}</strong></span>
              <span className="font-bold">{service.priceEstimate}</span>
            </div>

            <div>
              <label htmlFor="service-cust-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                id="service-cust-name"
                type="text"
                placeholder="e.g. Anand R."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border ${
                  errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900`}
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="service-cust-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone / WhatsApp Number *
              </label>
              <input
                id="service-cust-phone"
                type="tel"
                placeholder="e.g. 98470 12345"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900`}
              />
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="service-cust-address" className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / Area
                </label>
                <input
                  id="service-cust-address"
                  type="text"
                  placeholder="e.g. Kadavanthra, Kochi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="service-pref-date" className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date / Time
                </label>
                <input
                  id="service-pref-date"
                  type="text"
                  placeholder="e.g. Tomorrow morning 10 AM"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service-cust-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                Describe the problem or requirement
              </label>
              <textarea
                id="service-cust-notes"
                rows={2}
                placeholder="e.g. Need 4 ceiling fan points wired and new switchboard installed"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`tel:${data.settings.phone.replace(/\s+/g, '')}`}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Or Call: {data.settings.phone}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
