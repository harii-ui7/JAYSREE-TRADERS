import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, Menu, X, Shield, MessageCircle, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, language, setLanguage, setCurrentView } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = data;

  const navLinks = [
    { href: '#home', label: language === 'ml' ? 'ഹോം' : 'Home' },
    { href: '#products', label: language === 'ml' ? 'ഉൽപ്പന്നങ്ങൾ' : 'Products' },
    { href: '#services', label: language === 'ml' ? 'സേവനങ്ങൾ' : 'Services' },
    { href: '#about', label: language === 'ml' ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About' },
    { href: '#gallery', label: language === 'ml' ? 'ഗാലറി' : 'Gallery' },
    { href: '#testimonials', label: language === 'ml' ? 'അഭിപ്രായങ്ങൾ' : 'Reviews' },
    { href: '#contact', label: language === 'ml' ? 'ബന്ധപ്പെടുക' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-md">
      {/* Top Announcement Bar */}
      {settings.announcement && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1 text-xs font-semibold text-center tracking-wide flex items-center justify-center gap-2">
          <span>{settings.announcement}</span>
        </div>
      )}

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-heading font-extrabold text-slate-950 text-xl shadow-inner group-hover:scale-105 transition-transform">
              {settings.logoText || 'JT'}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors leading-tight">
                {language === 'ml' && settings.shopNameMalayalam ? settings.shopNameMalayalam : settings.shopName}
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Electrical &amp; Plumbing Hardware
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-amber-400 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Language, Call Now, Admin) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              title="Switch language between English and Malayalam"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'മലയാളം (ML)' : 'English (EN)'}</span>
            </button>

            {/* Call Now Button */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'ml' ? 'വിളിക്കൂ' : 'Call Now'}</span>
            </a>

            {/* Admin Portal Button */}
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shrink-0"
              title="Admin Panel Login"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-2 py-1 text-xs font-medium rounded bg-slate-800 text-amber-400 border border-slate-700"
            >
              {language === 'en' ? 'ML' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now: {settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Store</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('admin');
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg border border-slate-700"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
