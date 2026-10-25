/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { ProductsCatalog } from './components/public/ProductsCatalog';
import { ServicesSection } from './components/public/ServicesSection';
import { GallerySection } from './components/public/GallerySection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { FloatingWhatsApp } from './components/public/FloatingWhatsApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { ToastContainer } from './components/common/ToastContainer';
import { generateLocalBusinessSchema } from './utils/storeLogic';

const MainApp: React.FC = () => {
  const { currentView, isAdminLoggedIn, data } = useStore();

  // Dynamic Document Title, Meta Description and Schema Injection
  useEffect(() => {
    if (data.seo?.metaTitle) {
      document.title = data.seo.metaTitle;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.seo?.metaDescription) {
      metaDesc.setAttribute('content', data.seo.metaDescription);
    }

    // Inject JSON-LD LocalBusiness Schema
    try {
      const existingScript = document.getElementById('local-business-schema');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'local-business-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(generateLocalBusinessSchema(data.settings, data.seo));
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Could not inject JSON-LD schema', e);
    }
  }, [data.seo, data.settings]);

  // Handle URL hash changes (#admin or #home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        // Handled through context
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      <ToastContainer />

      {currentView === 'admin' ? (
        isAdminLoggedIn ? (
          <AdminDashboard />
        ) : (
          <AdminLogin />
        )
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <ProductsCatalog />
            <ServicesSection />
            <GallerySection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
