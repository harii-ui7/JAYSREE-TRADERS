import { Product, SiteSettings, SEOConfig, CustomerMessage } from '../types/store';

/**
 * Format Indian Rupees with standard formatting
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercent(mrp: number, price: number): number {
  if (!mrp || mrp <= price) return 0;
  const discount = Math.round(((mrp - price) / mrp) * 100);
  return Math.max(0, Math.min(99, discount));
}

/**
 * Filter and sort products based on search query, category, stock status and sort order
 */
export function filterProducts(
  products: Product[],
  options: {
    query?: string;
    categoryId?: string;
    inStockOnly?: boolean;
    brand?: string;
    sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'featured';
  } = {}
): Product[] {
  const { query = '', categoryId = 'all', inStockOnly = false, brand = 'all', sortBy = 'featured' } = options;
  const trimmedQuery = query.trim().toLowerCase();

  return products
    .filter((product) => {
      // Category filter
      if (categoryId && categoryId !== 'all' && product.categoryId !== categoryId) {
        return false;
      }

      // Stock status filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Brand filter
      if (brand && brand !== 'all' && product.brand.toLowerCase() !== brand.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (trimmedQuery) {
        const nameMatch = product.name.toLowerCase().includes(trimmedQuery);
        const nameMlMatch = product.nameMalayalam?.toLowerCase().includes(trimmedQuery) || false;
        const brandMatch = product.brand.toLowerCase().includes(trimmedQuery);
        const descMatch = product.description.toLowerCase().includes(trimmedQuery);
        const featureMatch = product.features.some((f) => f.toLowerCase().includes(trimmedQuery));
        return nameMatch || nameMlMatch || brandMatch || descMatch || featureMatch;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });
}

/**
 * Generate WhatsApp click-to-chat URL for ordering/inquiring a specific product
 */
export function generateWhatsAppOrderUrl(
  whatsappNumber: string,
  product: Product,
  customNote?: string
): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const formattedPrice = formatINR(product.price);
  const text = `Hello Jaysree Traders! I am interested in purchasing:\n\n*Product:* ${product.name}\n*Brand:* ${product.brand}\n*Price:* ${formattedPrice}\n*Stock:* ${product.inStock ? 'In Stock' : 'Check availability'}\n${customNote ? `*Note:* ${customNote}\n` : ''}\nPlease let me know availability and best price. Thank you!`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate general WhatsApp click-to-chat URL
 */
export function generateWhatsAppGeneralUrl(whatsappNumber: string, message?: string): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const defaultText = message || 'Hello Jaysree Traders! I have an inquiry about electrical & plumbing materials/services.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;
}

/**
 * Validate customer contact message form
 */
export function validateContactMessage(data: Partial<CustomerMessage>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (minimum 2 characters)';
  }

  const phoneRegex = /^[+]?[\d\s-]{10,14}$/;
  if (!data.phone || !phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please enter your inquiry details (minimum 5 characters)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate product input form
 */
export function validateProduct(data: Partial<Product>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Product name is required (min 2 characters)';
  }
  if (!data.categoryId) {
    errors.categoryId = 'Please select a valid category';
  }
  if (data.price === undefined || data.price < 0 || isNaN(data.price)) {
    errors.price = 'Price must be a valid positive number';
  }
  if (!data.brand || data.brand.trim().length === 0) {
    errors.brand = 'Brand name is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generate LocalBusiness Schema for SEO & Google Business verification
 */
export function generateLocalBusinessSchema(settings: SiteSettings, seo: SEOConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: settings.shopName,
    alternateName: settings.shopNameMalayalam,
    description: seo.metaDescription,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.fullAddress,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.pinCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '9.9816',
      longitude: '76.2999',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
  };
}

/**
 * Client-side image compressor using HTML Canvas
 * Compresses any uploaded image file to lightweight WebP/JPEG data URL
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Try WebP first, fallback to jpeg
        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          resolve(webpDataUrl);
        } catch {
          const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegDataUrl);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
