export type Language = 'en' | 'ml';

export interface SiteSettings {
  shopName: string;
  shopNameMalayalam: string;
  tagline: string;
  taglineMalayalam: string;
  logoText: string;
  announcement: string;
  aboutStory: string;
  aboutStoryMalayalam: string;
  yearsInBusiness: number;
  happyCustomersCount: number;
  genuineBrandsCount: number;
  emergencyServiceHours: string;
  phone: string;
  altPhone: string;
  whatsapp: string;
  email: string;
  fullAddress: string;
  city: string;
  state: string;
  pinCode: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
  googleMapsEmbedUrl: string;
  gstin: string;
  socialLinks: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    youtube: string;
    googleBusiness: string;
  };
}

export interface ThemeSettings {
  primaryNavy: string;
  accentYellow: string;
  heroHeadline: string;
  heroHeadlineMalayalam: string;
  heroSubheadline: string;
  heroSubheadlineMalayalam: string;
  heroButtonText: string;
  heroWhatsappText: string;
  heroBgUrl: string;
}

export interface Product {
  id: string;
  name: string;
  nameMalayalam?: string;
  categoryId: string;
  price: number;
  mrp: number;
  unit: string;
  inStock: boolean;
  brand: string;
  description: string;
  image: string;
  features: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameMalayalam: string;
  iconName: string;
  description: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  descriptionMalayalam?: string;
  iconName: string;
  turnaroundTime: string;
  priceEstimate: string;
  features: string[];
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  dateAdded: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  reviewText: string;
  date: string;
  verified: boolean;
}

export interface CustomerMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceCategory?: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
  notes?: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
}

export interface AdminAuth {
  email: string;
  passwordHash: string; // Stored securely in storage
  recoveryPin: string;
  securityQuestion: string;
  securityAnswer: string;
  lastLogin?: string;
}

export interface AppStoreData {
  settings: SiteSettings;
  theme: ThemeSettings;
  products: Product[];
  categories: Category[];
  services: Service[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  messages: CustomerMessage[];
  seo: SEOConfig;
  auth: AdminAuth;
}
