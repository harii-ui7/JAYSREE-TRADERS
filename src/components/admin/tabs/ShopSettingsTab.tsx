import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Save, Store, Sparkles } from 'lucide-react';

export const ShopSettingsTab: React.FC = () => {
  const { data, updateSettings, updateTheme } = useStore();
  const [form, setForm] = useState({
    shopName: data.settings.shopName,
    shopNameMalayalam: data.settings.shopNameMalayalam,
    tagline: data.settings.tagline,
    taglineMalayalam: data.settings.taglineMalayalam,
    logoText: data.settings.logoText,
    announcement: data.settings.announcement,
    gstin: data.settings.gstin,
    primaryNavy: data.theme.primaryNavy,
    accentYellow: data.theme.accentYellow,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      shopName: form.shopName,
      shopNameMalayalam: form.shopNameMalayalam,
      tagline: form.tagline,
      taglineMalayalam: form.taglineMalayalam,
      logoText: form.logoText,
      announcement: form.announcement,
      gstin: form.gstin,
    });
    updateTheme({
      primaryNavy: form.primaryNavy,
      accentYellow: form.accentYellow,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Store className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Shop Identity &amp; Branding
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shop Name (English) *
            </label>
            <input
              type="text"
              value={form.shopName}
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              required
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shop Name (Malayalam / Regional)
            </label>
            <input
              type="text"
              value={form.shopNameMalayalam}
              onChange={(e) => setForm({ ...form, shopNameMalayalam: e.target.value })}
              placeholder="e.g. ജയശ്രീ ട്രേഡേഴ്സ്"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagline (English)
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagline (Malayalam / Regional)
            </label>
            <input
              type="text"
              value={form.taglineMalayalam}
              onChange={(e) => setForm({ ...form, taglineMalayalam: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Logo Monogram / Badge Text
            </label>
            <input
              type="text"
              maxLength={4}
              value={form.logoText}
              onChange={(e) => setForm({ ...form, logoText: e.target.value })}
              placeholder="e.g. JT"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold tracking-wider uppercase text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              GSTIN / Tax ID
            </label>
            <input
              type="text"
              value={form.gstin}
              onChange={(e) => setForm({ ...form, gstin: e.target.value })}
              placeholder="32AAAAA0000A1Z5"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.accentYellow}
                onChange={(e) => setForm({ ...form, accentYellow: e.target.value })}
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
              />
              <span className="font-mono text-xs text-slate-600">{form.accentYellow}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Top Announcement Banner Text
          </label>
          <input
            type="text"
            value={form.announcement}
            onChange={(e) => setForm({ ...form, announcement: e.target.value })}
            placeholder="e.g. Special contractor discounts on Havells & Polycab this week!"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
          <p className="text-[11px] text-slate-400 mt-1">Appears at the very top of the website. Leave empty to hide banner.</p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Branding Changes</span>
          </button>
        </div>
      </div>
    </form>
  );
};
