import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';

export const About: React.FC = () => {
  const { data, language } = useStore();
  const { settings } = data;

  const story = language === 'ml' && settings.aboutStoryMalayalam ? settings.aboutStoryMalayalam : settings.aboutStory;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              {language === 'ml' ? 'ഞങ്ങളുടെ ചരിത്രം' : 'Our Legacy & Trust'}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              {language === 'ml'
                ? `${settings.shopNameMalayalam || settings.shopName}: നിങ്ങളുടെ വിശ്വസ്ത പങ്കാളി`
                : `${settings.shopName}: Built on Integrity, Quality & Unmatched Service`}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {story}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Authorized wholesale stockist for premier brands: Havells, Polycab, Astral, Jaquar, Supreme &amp; Schneider.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Every switch, wire, and pipe carries official manufacturer warranties and genuine ISI / ISO certification.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Dedicated fleet for prompt on-site construction deliveries across town with flexible payment terms.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{settings.city}, {settings.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{settings.openingHoursWeekday}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>GST: {settings.gstin}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Counter Metrics & Badges */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Experience</span>
              <div className="my-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
                  {settings.yearsInBusiness}+
                </span>
                <span className="text-xl font-bold text-amber-400 ml-1">Years</span>
              </div>
              <p className="text-xs text-slate-400">Serving Kerala with dependable hardware since 2011</p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200/60 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Satisfied Clients</span>
              <div className="my-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {settings.happyCustomersCount}+
                </span>
              </div>
              <p className="text-xs text-slate-600">Homeowners, contractors &amp; master technicians</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Brands</span>
              <div className="my-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
                  {settings.genuineBrandsCount}+
                </span>
              </div>
              <p className="text-xs text-slate-500">100% genuine factory-sealed inventory</p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200/60 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Support</span>
              <div className="my-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-heading text-emerald-950 tracking-tight">
                  {settings.emergencyServiceHours}
                </span>
              </div>
              <p className="text-xs text-slate-600">Emergency plumbing &amp; electrical technician support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
