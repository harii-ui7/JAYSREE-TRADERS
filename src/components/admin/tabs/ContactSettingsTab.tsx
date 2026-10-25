import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Save, Phone, MapPin, Clock } from 'lucide-react';

export const ContactSettingsTab: React.FC = () => {
  const { data, updateSettings } = useStore();
  const [form, setForm] = useState({
    phone: data.settings.phone,
    altPhone: data.settings.altPhone,
    whatsapp: data.settings.whatsapp,
    email: data.settings.email,
    fullAddress: data.settings.fullAddress,
    city: data.settings.city,
    state: data.settings.state,
    pinCode: data.settings.pinCode,
    openingHoursWeekday: data.settings.openingHoursWeekday,
    openingHoursWeekend: data.settings.openingHoursWeekend,
    googleMapsEmbedUrl: data.settings.googleMapsEmbedUrl,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ ...form });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Phone className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Contact Numbers &amp; Store Coordinates
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Phone Number *</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Alternate Phone</label>
            <input
              type="text"
              value={form.altPhone}
              onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Store Number *</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Store Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Physical Street Address *</label>
          <textarea
            rows={2}
            value={form.fullAddress}
            onChange={(e) => setForm({ ...form, fullAddress: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">City / Town *</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">State / Province *</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">PIN / Postal Code *</label>
            <input
              type="text"
              value={form.pinCode}
              onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Weekday Timings</label>
            <input
              type="text"
              value={form.openingHoursWeekday}
              onChange={(e) => setForm({ ...form, openingHoursWeekday: e.target.value })}
              placeholder="e.g. Mon – Sat: 8:30 AM – 8:30 PM"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sunday / Holiday Timings</label>
            <input
              type="text"
              value={form.openingHoursWeekend}
              onChange={(e) => setForm({ ...form, openingHoursWeekend: e.target.value })}
              placeholder="e.g. Sun: 9:00 AM – 2:00 PM"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Google Maps Embed URL</label>
          <input
            type="text"
            value={form.googleMapsEmbedUrl}
            onChange={(e) => setForm({ ...form, googleMapsEmbedUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
          <p className="text-[11px] text-slate-400 mt-1">Get this by searching your shop on Google Maps → Share → Embed a map → Copy the src URL.</p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info</span>
          </button>
        </div>
      </div>
    </form>
  );
};
