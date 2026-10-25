import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MessageCircle, ShieldCheck, Award, Wrench, Truck } from 'lucide-react';
import { generateWhatsAppGeneralUrl } from '../../utils/storeLogic';

export const Hero: React.FC = () => {
  const { data, language } = useStore();
  const { settings, theme } = data;

  const headline = language === 'ml' && theme.heroHeadlineMalayalam ? theme.heroHeadlineMalayalam : theme.heroHeadline;
  const subheadline = language === 'ml' && theme.heroSubheadlineMalayalam ? theme.heroSubheadlineMalayalam : theme.heroSubheadline;

  const whatsappLink = generateWhatsAppGeneralUrl(
    settings.whatsapp,
    `Hello ${settings.shopName}! I would like to inquire about electrical and plumbing materials.`
  );

  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800">
      {/* Background Ambient Glow & Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle Trust Tagline */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-400 mb-4 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'ml' ? 'വിശ്വസ്ത സേവനം 15+ വർഷങ്ങളായി' : 'Authorized Distributor · 15+ Years of Trust'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            {subheadline}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm tracking-wide transition-all transform active:scale-95 shadow-lg shadow-amber-400/20"
            >
              <span>{language === 'ml' ? 'ഉൽപ്പന്നങ്ങൾ കാണുക' : theme.heroButtonText || 'Browse Catalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm tracking-wide transition-all transform active:scale-95 shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'ml' ? 'വാട്സാപ്പിൽ ബന്ധപ്പെടുക' : theme.heroWhatsappText || 'Order via WhatsApp'}</span>
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700 transition-colors"
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>{language === 'ml' ? 'ടെക്നീഷ്യൻ ബുക്കിംഗ്' : 'Book Technician'}</span>
            </a>
          </div>
        </div>

        {/* 4-Item Quick Value Proposition Grid below hero */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">100% Genuine Brands</h4>
              <p className="text-xs text-slate-400 mt-0.5">Havells, Polycab, Astral, Jaquar with manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Direct Wholesale Rates</h4>
              <p className="text-xs text-slate-400 mt-0.5">Special discounts for contractors, builders, and electricians</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Certified Technicians</h4>
              <p className="text-xs text-slate-400 mt-0.5">Licensed electricians & plumbers for wiring, leakage & repair</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Fast Site Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Prompt vehicle delivery directly to your construction site</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
