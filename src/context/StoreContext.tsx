import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppStoreData,
  SiteSettings,
  ThemeSettings,
  Product,
  Category,
  Service,
  GalleryItem,
  Testimonial,
  CustomerMessage,
  SEOConfig,
  Language,
} from '../types/store';
import { initialStoreData } from '../data/initialData';

const STORAGE_KEY = 'jaysree_traders_store_v3';
const AUTH_SESSION_KEY = 'jaysree_admin_session';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  data: AppStoreData;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdminLoggedIn: boolean;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Authentication
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (oldPass: string, newPass: string, newPin?: string) => boolean;
  resetAdminPasswordWithPin: (pin: string, newPass: string) => boolean;

  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateTheme: (newTheme: Partial<ThemeSettings>) => void;
  updateSEO: (newSEO: Partial<SEOConfig>) => void;

  // Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkUpdateProducts: (updates: { id: string; price: number; mrp?: number; inStock: boolean }[]) => void;

  // Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Services
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Testimonials
  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Customer Messages
  submitMessage: (message: Omit<CustomerMessage, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  deleteMessage: (id: string) => void;

  // Backup & Reset
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonData: string) => boolean;
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppStoreData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required fields exist
        return {
          ...initialStoreData,
          ...parsed,
          settings: { ...initialStoreData.settings, ...(parsed.settings || {}) },
          theme: { ...initialStoreData.theme, ...(parsed.theme || {}) },
          seo: { ...initialStoreData.seo, ...(parsed.seo || {}) },
          auth: { ...initialStoreData.auth, ...(parsed.auth || {}) },
        };
      }
    } catch (e) {
      console.error('Error loading stored data:', e);
    }
    return initialStoreData;
  });

  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    // Check if initial hash or query parameter requests admin
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#admin' || path.includes('/admin')) {
        return 'admin';
      }
    }
    return 'public';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth methods
  const loginAdmin = (password: string): boolean => {
    if (password === data.auth.passwordHash) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {}
      showToast('Welcome back, Admin! Logged in successfully.', 'success');
      return true;
    }
    showToast('Incorrect password. Please try again or use Recovery PIN.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
    showToast('Logged out of Admin Panel.', 'info');
  };

  const changeAdminPassword = (oldPass: string, newPass: string, newPin?: string): boolean => {
    if (oldPass !== data.auth.passwordHash) {
      showToast('Current password does not match.', 'error');
      return false;
    }
    if (newPass.length < 4) {
      showToast('New password must be at least 4 characters.', 'error');
      return false;
    }

    setData((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        passwordHash: newPass,
        recoveryPin: newPin || prev.auth.recoveryPin,
      },
    }));
    showToast('Admin password successfully updated!', 'success');
    return true;
  };

  const resetAdminPasswordWithPin = (pin: string, newPass: string): boolean => {
    if (pin.trim() !== data.auth.recoveryPin.trim()) {
      showToast('Invalid recovery PIN.', 'error');
      return false;
    }
    if (newPass.length < 4) {
      showToast('New password must be at least 4 characters.', 'error');
      return false;
    }

    setData((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        passwordHash: newPass,
      },
    }));
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, 'true');
    } catch {}
    showToast('Password reset successful! You are now logged in.', 'success');
    return true;
  };

  // Settings updates
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
    showToast('Shop settings saved successfully!', 'success');
  };

  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme },
    }));
    showToast('Theme & Hero settings updated!', 'success');
  };

  const updateSEO = (newSEO: Partial<SEOConfig>) => {
    setData((prev) => ({
      ...prev,
      seo: { ...prev.seo, ...newSEO },
    }));
    showToast('SEO settings updated!', 'success');
  };

  // Products CRUD
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = 'prod_' + Date.now();
    const newProduct: Product = { ...product, id: newId };
    setData((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
    showToast(`Added product "${product.name}"!`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    }));
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id: string) => {
    const item = data.products.find((p) => p.id === id);
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
    showToast(`Deleted product "${item?.name || 'item'}"`, 'info');
  };

  const bulkUpdateProducts = (updates: { id: string; price: number; mrp?: number; inStock: boolean }[]) => {
    const updateMap = new Map(updates.map((u) => [u.id, u]));
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        const u = updateMap.get(p.id);
        if (u) {
          return {
            ...p,
            price: u.price,
            mrp: u.mrp !== undefined ? u.mrp : p.mrp,
            inStock: u.inStock,
          };
        }
        return p;
      }),
    }));
    showToast(`Successfully updated ${updates.length} products!`, 'success');
  };

  // Categories CRUD
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newId = 'cat_' + category.name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories, { ...category, id: newId }],
    }));
    showToast(`Added category "${category.name}"!`, 'success');
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)),
    }));
    showToast('Category updated!', 'success');
  };

  const deleteCategory = (id: string) => {
    const cat = data.categories.find((c) => c.id === id);
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }));
    showToast(`Deleted category "${cat?.name || 'item'}"`, 'info');
  };

  // Services CRUD
  const addService = (service: Omit<Service, 'id'>) => {
    const newId = 'serv_' + Date.now();
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { ...service, id: newId }],
    }));
    showToast(`Added service "${service.title}"!`, 'success');
  };

  const updateService = (id: string, updatedFields: Partial<Service>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)),
    }));
    showToast('Service updated!', 'success');
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    showToast('Service deleted.', 'info');
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: 'gal_' + Date.now() };
    setData((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery],
    }));
    showToast('Photo added to gallery!', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    showToast('Gallery photo deleted.', 'info');
  };

  // Testimonials
  const addTestimonial = (item: Omit<Testimonial, 'id'>) => {
    const newItem: Testimonial = { ...item, id: 'test_' + Date.now() };
    setData((prev) => ({
      ...prev,
      testimonials: [newItem, ...prev.testimonials],
    }));
    showToast('Customer review added!', 'success');
  };

  const updateTestimonial = (id: string, item: Partial<Testimonial>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...item } : t)),
    }));
    showToast('Review updated!', 'success');
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
    showToast('Review deleted.', 'info');
  };

  // Customer Messages
  const submitMessage = (message: Omit<CustomerMessage, 'id' | 'date' | 'status'>) => {
    const newMessage: CustomerMessage = {
      ...message,
      id: 'msg_' + Date.now(),
      date: new Date().toISOString(),
      status: 'unread',
    };
    setData((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
    }));
    showToast('Thank you! Your inquiry has been sent to Jaysree Traders. We will contact you shortly.', 'success');
  };

  const updateMessageStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, status } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
    showToast('Message deleted from inbox.', 'info');
  };

  // Export / Import / Reset
  const exportDatabaseJSON = () => {
    try {
      const exportBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(exportBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jaysree-traders-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Store database backup exported successfully!', 'success');
    } catch (e) {
      showToast('Export failed: ' + String(e), 'error');
    }
  };

  const importDatabaseJSON = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed.products || !parsed.settings) {
        showToast('Invalid backup file format.', 'error');
        return false;
      }
      setData({
        ...initialStoreData,
        ...parsed,
      });
      showToast('Store database restored successfully!', 'success');
      return true;
    } catch (e) {
      showToast('Failed to parse backup JSON: ' + String(e), 'error');
      return false;
    }
  };

  const resetToDefaultData = () => {
    setData(initialStoreData);
    showToast('Reset to original sample data.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        data,
        language,
        setLanguage,
        isAdminLoggedIn,
        currentView,
        setCurrentView,
        toasts,
        showToast,
        dismissToast,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        resetAdminPasswordWithPin,
        updateSettings,
        updateTheme,
        updateSEO,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkUpdateProducts,
        addCategory,
        updateCategory,
        deleteCategory,
        addService,
        updateService,
        deleteService,
        addGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        submitMessage,
        updateMessageStatus,
        deleteMessage,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetToDefaultData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
