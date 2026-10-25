import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Save, Sparkles, Image as ImageIcon } from 'lucide-react';

export const HeroSettingsTab: React.FC = () => {
  const { data, updateTheme } = useStore();
  const [form, setForm] = useState({
    heroHeadline: data.theme.heroHeadline,
    heroHeadlineMalayalam: data.theme.heroHeadlineMalayalam,
    heroSubheadline: data.theme.heroSubheadline,
    heroSubheadlineMalayalam: data.theme.heroSubheadlineMalayalam,
    heroButtonText: data.theme.heroButtonText,
    heroWhatsappText: data.theme.heroWhatsappText,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme({ ...form });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Hero Banner &amp; Headline Settings
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Main Hero Headline (English) *
          </label>
          <input
            type="text"
            value={form.heroHeadline}
            onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Main Hero Headline (Malayalam / Regional)
          </label>
          <input
            type="text"
            value={form.heroHeadlineMalayalam}
            onChange={(e) => setForm({ ...form, heroHeadlineMalayalam: e.target.value })}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subheadline / Description (English)
          </label>
          <textarea
            rows={2}
            value={form.heroSubheadline}
            onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
            className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subheadline / Description (Malayalam)
          </label>
          <textarea
            rows={2}
            value={form.heroSubheadlineMalayalam}
            onChange={(e) => setForm({ ...form, heroSubheadlineMalayalam: e.target.value })}
            className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Button Label
            </label>
            <input
              type="text"
              value={form.heroButtonText}
              onChange={(e) => setForm({ ...form, heroButtonText: e.target.value })}
              placeholder="Browse Catalog"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp Button Label
            </label>
            <input
              type="text"
              value={form.heroWhatsappText}
              onChange={(e) => setForm({ ...form, heroWhatsappText: e.target.value })}
              placeholder="Order via WhatsApp"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero Banner</span>
          </button>
        </div>
      </div>
    </form>
  );
};
