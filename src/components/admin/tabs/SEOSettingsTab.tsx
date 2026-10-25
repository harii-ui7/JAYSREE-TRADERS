import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { generateLocalBusinessSchema } from '../../../utils/storeLogic';
import { Save, Search, Code, Check } from 'lucide-react';

export const SEOSettingsTab: React.FC = () => {
  const { data, updateSEO } = useStore();
  const [form, setForm] = useState({
    metaTitle: data.seo.metaTitle,
    metaDescription: data.seo.metaDescription,
    metaKeywords: data.seo.metaKeywords,
    canonicalUrl: data.seo.canonicalUrl,
  });
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEO(form);
  };

  const schemaJson = JSON.stringify(generateLocalBusinessSchema(data.settings, data.seo), null, 2);

  const copySchema = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Search Engine Optimization (SEO) &amp; Google Snippet
          </h3>
        </div>

        {/* Live Google Search Preview */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Google Search Result Preview
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-600 font-mono flex items-center gap-1">
              <span>{form.canonicalUrl || 'https://jaysreetraders.com'}</span>
              <span>›</span>
              <span>store</span>
            </div>
            <div className="text-base text-blue-800 hover:underline font-semibold leading-snug cursor-pointer">
              {form.metaTitle || `${data.settings.shopName} | Electrical & Plumbing Store`}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {form.metaDescription || data.settings.tagline}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Page Meta Title (Max 60 characters) *
          </label>
          <input
            type="text"
            maxLength={70}
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Keep between 50–60 characters for best Google click-through</span>
            <span>{form.metaTitle.length}/70</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Meta Description (Max 160 characters) *
          </label>
          <textarea
            rows={3}
            maxLength={180}
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            required
            className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Summarize your electrical brands, wholesale prices, and Kerala location</span>
            <span>{form.metaDescription.length}/180</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Search Keywords (Comma Separated)
          </label>
          <input
            type="text"
            value={form.metaKeywords}
            onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
            placeholder="electrical shop, polycab wire, havells switch, astral pipes, plumbing fittings"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical Website URL</label>
          <input
            type="url"
            value={form.canonicalUrl}
            onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
            placeholder="https://jaysreetraders.com"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        {/* LocalBusiness Schema.org Structured Data */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Code className="w-4 h-4 text-amber-500" />
              <span>Google LocalBusiness Schema (JSON-LD)</span>
            </div>
            <button
              type="button"
              onClick={copySchema}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
              <span>{copiedSchema ? 'Copied JSON!' : 'Copy Schema'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-300 text-[11px] font-mono rounded-lg overflow-x-auto max-h-48 border border-slate-800">
            {schemaJson}
          </pre>
          <p className="text-[11px] text-slate-400 mt-1">
            Automatically formatted for Google Rich Snippets with your shop hours, address, and phone.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </div>
    </form>
  );
};
