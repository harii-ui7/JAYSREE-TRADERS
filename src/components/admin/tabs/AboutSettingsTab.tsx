import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Save, BookOpen } from 'lucide-react';

export const AboutSettingsTab: React.FC = () => {
  const { data, updateSettings } = useStore();
  const [form, setForm] = useState({
    aboutStory: data.settings.aboutStory,
    aboutStoryMalayalam: data.settings.aboutStoryMalayalam,
    yearsInBusiness: data.settings.yearsInBusiness,
    happyCustomersCount: data.settings.happyCustomersCount,
    genuineBrandsCount: data.settings.genuineBrandsCount,
    emergencyServiceHours: data.settings.emergencyServiceHours,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      aboutStory: form.aboutStory,
      aboutStoryMalayalam: form.aboutStoryMalayalam,
      yearsInBusiness: Number(form.yearsInBusiness) || 15,
      happyCustomersCount: Number(form.happyCustomersCount) || 5000,
      genuineBrandsCount: Number(form.genuineBrandsCount) || 40,
      emergencyServiceHours: form.emergencyServiceHours,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            About Section &amp; Experience Highlights
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Shop Story &amp; History (English) *
          </label>
          <textarea
            rows={4}
            value={form.aboutStory}
            onChange={(e) => setForm({ ...form, aboutStory: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Shop Story &amp; History (Malayalam / Regional)
          </label>
          <textarea
            rows={3}
            value={form.aboutStoryMalayalam}
            onChange={(e) => setForm({ ...form, aboutStoryMalayalam: e.target.value })}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Years in Business
            </label>
            <input
              type="number"
              value={form.yearsInBusiness}
              onChange={(e) => setForm({ ...form, yearsInBusiness: parseInt(e.target.value) })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Happy Customers
            </label>
            <input
              type="number"
              value={form.happyCustomersCount}
              onChange={(e) => setForm({ ...form, happyCustomersCount: parseInt(e.target.value) })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Genuine Brands
            </label>
            <input
              type="number"
              value={form.genuineBrandsCount}
              onChange={(e) => setForm({ ...form, genuineBrandsCount: parseInt(e.target.value) })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Emergency Hours
            </label>
            <input
              type="text"
              value={form.emergencyServiceHours}
              onChange={(e) => setForm({ ...form, emergencyServiceHours: e.target.value })}
              placeholder="e.g. 24/7"
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
            <span>Save About Details</span>
          </button>
        </div>
      </div>
    </form>
  );
};
