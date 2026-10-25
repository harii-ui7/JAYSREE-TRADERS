import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  FolderTree,
  Wrench,
  Image as ImageIcon,
  Star,
  Store,
  Sparkles,
  BookOpen,
  PhoneCall,
  Share2,
  Search,
  Mail,
  Database,
  ExternalLink,
  Lock,
  LogOut,
  HelpCircle,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import { ProductsTab } from './tabs/ProductsTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { ServicesTab } from './tabs/ServicesTab';
import { GalleryTab } from './tabs/GalleryTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { ShopSettingsTab } from './tabs/ShopSettingsTab';
import { HeroSettingsTab } from './tabs/HeroSettingsTab';
import { AboutSettingsTab } from './tabs/AboutSettingsTab';
import { ContactSettingsTab } from './tabs/ContactSettingsTab';
import { SocialLinksTab } from './tabs/SocialLinksTab';
import { SEOSettingsTab } from './tabs/SEOSettingsTab';
import { MessagesTab } from './tabs/MessagesTab';
import { DatabaseTab } from './tabs/DatabaseTab';
import { ChangePasswordModal } from './ChangePasswordModal';
import { AdminGuideModal } from './AdminGuideModal';

export const AdminDashboard: React.FC = () => {
  const { data, logoutAdmin, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<
    | 'products'
    | 'categories'
    | 'services'
    | 'gallery'
    | 'testimonials'
    | 'shop'
    | 'hero'
    | 'about'
    | 'contact'
    | 'social'
    | 'seo'
    | 'messages'
    | 'database'
  >('products');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadCount = data.messages.filter((m) => m.status === 'unread').length;

  interface NavItem {
    id:
      | 'products'
      | 'categories'
      | 'services'
      | 'gallery'
      | 'testimonials'
      | 'shop'
      | 'hero'
      | 'about'
      | 'contact'
      | 'social'
      | 'seo'
      | 'messages'
      | 'database';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
    badge?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'products', label: 'Products Catalog', icon: Package, count: data.products.length },
    { id: 'categories', label: 'Categories', icon: FolderTree, count: data.categories.length },
    { id: 'services', label: 'Technician Services', icon: Wrench, count: data.services.length },
    { id: 'gallery', label: 'Work Gallery', icon: ImageIcon, count: data.gallery.length },
    { id: 'testimonials', label: 'Customer Reviews', icon: Star, count: data.testimonials.length },
    { id: 'messages', label: 'Customer Inquiries', icon: Mail, count: unreadCount, badge: unreadCount > 0 },
    { id: 'shop', label: 'Shop & Branding', icon: Store },
    { id: 'hero', label: 'Hero Banner', icon: Sparkles },
    { id: 'about', label: 'About Story & Stats', icon: BookOpen },
    { id: 'contact', label: 'Contact & Timings', icon: PhoneCall },
    { id: 'social', label: 'Social Profiles', icon: Share2 },
    { id: 'seo', label: 'SEO & Google Schema', icon: Search },
    { id: 'database', label: 'Database & Backups', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Lockup */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                aria-label="Toggle admin navigation"
              >
                {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-heading font-extrabold text-slate-950 text-sm">
                {data.settings.logoText || 'JT'}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base text-white tracking-tight">
                  {data.settings.shopName}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  Admin CMS
                </span>
              </div>
            </div>

            {/* Actions: View Website, Guide, Change Pass, Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* View Live Website Button */}
              <button
                onClick={() => setCurrentView('public')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors"
                title="Exit to customer website view"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Website</span>
              </button>

              {/* Guide Button */}
              <button
                onClick={() => setShowGuideModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Hosting & admin user guide"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Setup Guide</span>
              </button>

              {/* Change Password */}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Change admin password"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden lg:inline">Password</span>
              </button>

              {/* Logout */}
              <button
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-rose-300 hover:bg-rose-950/50 hover:text-rose-200 transition-colors"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div
            onClick={() => setActiveTab('products')}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">Total Products</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading text-slate-900 tabular-nums">
                {data.products.length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                {data.products.filter((p) => p.inStock).length} In Stock
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('messages')}
            className={`bg-white p-4 rounded-xl border shadow-2xs cursor-pointer transition-colors ${
              unreadCount > 0 ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <span className="text-xs text-slate-500 font-medium">Customer Inquiries</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading text-slate-900 tabular-nums">
                {data.messages.length}
              </span>
              {unreadCount > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {unreadCount} Unread
                </span>
              )}
            </div>
          </div>

          <div
            onClick={() => setActiveTab('services')}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">Active Services</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading text-slate-900 tabular-nums">
                {data.services.filter((s) => s.active).length}
              </span>
              <span className="text-xs text-slate-400">Wiring &amp; Plumbing</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('gallery')}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">Gallery Photos</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold font-heading text-slate-900 tabular-nums">
                {data.gallery.length}
              </span>
              <span className="text-xs text-slate-400">Project Showcases</span>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Layout (Sidebar + Tab Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Navigation Sidebar */}
          <div
            className={`lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-2xs p-3 space-y-1 ${
              mobileNavOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Content Sections
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                      {item.count}
                    </span>
                  ) : item.count !== undefined ? (
                    <span
                      className={`text-[11px] tabular-nums ${
                        isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel Content */}
          <main className="lg:col-span-9">
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'testimonials' && <TestimonialsTab />}
            {activeTab === 'messages' && <MessagesTab />}
            {activeTab === 'shop' && <ShopSettingsTab />}
            {activeTab === 'hero' && <HeroSettingsTab />}
            {activeTab === 'about' && <AboutSettingsTab />}
            {activeTab === 'contact' && <ContactSettingsTab />}
            {activeTab === 'social' && <SocialLinksTab />}
            {activeTab === 'seo' && <SEOSettingsTab />}
            {activeTab === 'database' && <DatabaseTab />}
          </main>
        </div>
      </div>

      {/* Floating Website Switcher Bar at Bottom */}
      <div className="sticky bottom-4 mx-auto z-20 max-w-sm w-full px-4">
        <div className="bg-slate-900/90 backdrop-blur-md text-white p-2 rounded-xl shadow-xl border border-slate-700 flex items-center justify-between gap-3">
          <div className="text-xs px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200 font-medium">Live Website Sync Active</span>
          </div>
          <button
            onClick={() => setCurrentView('public')}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
      {showGuideModal && (
        <AdminGuideModal onClose={() => setShowGuideModal(false)} />
      )}
    </div>
  );
};
