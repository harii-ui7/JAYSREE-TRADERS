import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Save, Share2 } from 'lucide-react';

export const SocialLinksTab: React.FC = () => {
  const { data, updateSettings } = useStore();
  const [links, setLinks] = useState({ ...data.settings.socialLinks });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ socialLinks: links });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Share2 className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Social Profiles &amp; Google Business Link
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Google Business Profile / Reviews Link
          </label>
          <input
            type="url"
            value={links.googleBusiness || ''}
            onChange={(e) => setLinks({ ...links, googleBusiness: e.target.value })}
            placeholder="https://g.page/r/..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
          <p className="text-[11px] text-slate-400 mt-1">Direct link for customers to leave you 5-star Google reviews.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook Page URL</label>
          <input
            type="url"
            value={links.facebook || ''}
            onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
            placeholder="https://facebook.com/..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram Profile URL</label>
          <input
            type="url"
            value={links.instagram || ''}
            onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
            placeholder="https://instagram.com/..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
          <input
            type="url"
            value={links.youtube || ''}
            onChange={(e) => setLinks({ ...links, youtube: e.target.value })}
            placeholder="https://youtube.com/@..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Social Links</span>
          </button>
        </div>
      </div>
    </form>
  );
};
