import React, { useState } from 'react';
import { X, BookOpen, Rocket, ShieldCheck, Globe, Database, Copy, Check } from 'lucide-react';

interface AdminGuideModalProps {
  onClose: () => void;
}

export const AdminGuideModal: React.FC<AdminGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'deploy' | 'userguide' | 'password'>('deploy');
  const [copied, setCopied] = useState(false);

  const copyGuide = () => {
    navigator.clipboard.writeText(`JAYSREE TRADERS - DEPLOYMENT & ADMIN GUIDE\n\nSee full instructions inside admin panel.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-bold text-lg text-white">
              Store Owner Documentation &amp; Deployment Guide
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'deploy'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>1. Free Hosting &amp; Domain Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('userguide')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'userguide'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. How to Edit Every Section</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'password'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. Admin Password &amp; Backup</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <strong className="block text-sm font-bold text-emerald-950 mb-1">
                  100% Free Hosting Option (Zero Monthly Server Cost)
                </strong>
                Because this application runs self-contained with browser local storage and instant client-side image compression, you do NOT need expensive cloud databases or paid servers!
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Option A: Deploy to Netlify / Vercel (Recommended, 5 Minutes)
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Download or push your code</strong> to a free GitHub repository (e.g. <code>jaysree-traders-web</code>).
                  </li>
                  <li>
                    Create a free account on <strong>Vercel.com</strong> or <strong>Netlify.com</strong>.
                  </li>
                  <li>
                    Click <strong>"Add New Project"</strong> and import your GitHub repository.
                  </li>
                  <li>
                    Build Settings: Framework Preset <code>Vite</code>, Build Command <code>npm run build</code>, Output Directory <code>dist</code>.
                  </li>
                  <li>
                    Click <strong>Deploy</strong>. In 60 seconds, your website is live with free SSL (https://)!
                  </li>
                </ol>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  How to Connect Your Custom Domain (e.g. jaysreetraders.com)
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Buy your domain from GoDaddy, Namecheap, or Google Domains.</li>
                  <li>In Vercel or Netlify, go to <strong>Project Settings → Domains</strong> and enter <code>jaysreetraders.com</code>.</li>
                  <li>
                    Add the DNS records shown by Vercel/Netlify in your domain provider’s DNS manager:
                    <div className="mt-1 font-mono text-[11px] bg-slate-900 text-amber-300 p-2.5 rounded-lg">
                      Type: A | Name: @ | Value: 76.76.21.21<br />
                      Type: CNAME | Name: www | Value: cname.vercel-dns.com
                    </div>
                  </li>
                  <li>Wait 10–30 minutes for DNS to propagate. Your store is now active at your domain!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'userguide' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                The built-in Admin Panel lets non-technical store owners change any part of the website without coding.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">🛒 Products &amp; Prices</strong>
                  Click <em>Products</em> tab to add new items, change prices in ₹, toggle stock, upload compressed photos, or use <em>Bulk Pricing</em> to update all rates in one table.
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">📁 Categories &amp; Services</strong>
                  Reorder or add new product categories (Wires, Switches, CPVC) and technician services with turnaround times.
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">🏢 Shop Name &amp; Malayalam</strong>
                  Update your shop name, logo, English &amp; Malayalam headlines, top announcement bar, and GST number from <em>Shop &amp; Branding</em>.
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">📞 Contact &amp; Timings</strong>
                  Change your phone numbers, WhatsApp, store address, opening hours, and Google Maps location in <em>Contact &amp; Hours</em>.
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">📬 Customer Inbox</strong>
                  When a customer fills out the contact form or books a service, it appears in <em>Customer Inquiries</em>. Click 1 button to call or WhatsApp reply!
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <strong className="block text-slate-900 font-bold mb-1">🖼️ Gallery &amp; Reviews</strong>
                  Upload photos of completed plumbing or wiring jobs, and manage genuine customer testimonials.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong className="block font-bold mb-1">Default Login Credentials:</strong>
                Email: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-900">admin@jaysreetraders.com</code><br />
                Password: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-900">jaysree@2026</code><br />
                Recovery PIN: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-900">2026</code>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">How to Change Password</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>In the top right corner of the Admin Dashboard, click <strong>"Change Password"</strong>.</li>
                  <li>Enter your current password and your desired new password (minimum 4 characters).</li>
                  <li>Click <strong>"Update Credentials"</strong>. The new password takes effect immediately.</li>
                </ol>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">Database Backup &amp; Safe Keeping</h4>
                <p>
                  Before making major edits or transferring to another computer, go to the <strong>Database &amp; Backups</strong> tab and click <strong>"Export Backup File (JSON)"</strong>. This saves your complete store catalog, inquiries, and settings to your computer.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={copyGuide}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Guide!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
