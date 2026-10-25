import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, language, setCurrentView } = useStore();
  const { settings, categories } = data;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-heading font-extrabold text-slate-950 text-base">
                {settings.logoText || 'JT'}
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                {language === 'ml' && settings.shopNameMalayalam ? settings.shopNameMalayalam : settings.shopName}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {settings.tagline}. Authorized wholesale dealer for ISI-certified electrical switchgear, flame-retardant wires, CPVC piping systems, and luxury sanitaryware in Kerala.
            </p>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>GSTIN: <strong className="text-slate-300 font-mono">{settings.gstin}</strong></div>
              <div>Trade License: Licensed Electrical &amp; Plumbing Hardware Store</div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Browse Products</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Our Services</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Shop</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Work Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact &amp; Map</a></li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <a href="#products" className="hover:text-amber-400 transition-colors truncate block">
                    {language === 'ml' && cat.nameMalayalam ? cat.nameMalayalam : cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Summary */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Store Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{settings.city}, {settings.state}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white truncate">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Access */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.shopName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>Admin Panel &amp; Store CMS</span>
            </button>
            <a href="#home" className="hover:text-slate-300 transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
