import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  calculateDiscountPercent,
  filterProducts,
  generateWhatsAppOrderUrl,
  validateContactMessage,
  validateProduct,
  generateLocalBusinessSchema,
} from './storeLogic';
import { Product, SiteSettings, SEOConfig } from '../types/store';

const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Havells Fabio 6A Modular Switch',
    nameMalayalam: 'ഹാവൽസ് 6A സ്വിച്ച്',
    categoryId: 'electrical',
    price: 95,
    mrp: 120,
    unit: 'piece',
    inStock: true,
    brand: 'Havells',
    description: 'Durable flame-retardant polycarbonate switch',
    image: '',
    features: ['Polycarbonate', 'Silver contacts', 'ISI Certified'],
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Polycab 2.5 sq.mm FR PVC Copper Wire 90m',
    categoryId: 'wires',
    price: 2350,
    mrp: 2750,
    unit: 'roll',
    inStock: true,
    brand: 'Polycab',
    description: 'High conductivity electrolytic grade copper wire',
    image: '',
    features: ['Flame Retardant', '90m length', '1100V grade'],
    featured: false,
  },
  {
    id: 'prod-3',
    name: 'Astral CPVC Pipe 1 inch 10ft',
    categoryId: 'plumbing',
    price: 490,
    mrp: 550,
    unit: 'length',
    inStock: false,
    brand: 'Astral',
    description: 'Chlorinated polyvinyl chloride pipe for hot and cold water',
    image: '',
    features: ['SDR 11', 'Lead free', 'Hot & cold potable water'],
    featured: false,
  },
];

test('formatINR formats currency in Indian notation', () => {
  assert.equal(formatINR(95), '₹95');
  assert.equal(formatINR(2350), '₹2,350');
  assert.equal(formatINR(125000), '₹1,25,000');
});

test('calculateDiscountPercent calculates correct discount percentage', () => {
  assert.equal(calculateDiscountPercent(120, 95), 21);
  assert.equal(calculateDiscountPercent(100, 100), 0);
  assert.equal(calculateDiscountPercent(0, 100), 0);
  assert.equal(calculateDiscountPercent(2750, 2350), 15);
});

test('filterProducts filters by category', () => {
  const result = filterProducts(mockProducts, { categoryId: 'plumbing' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'prod-3');
});

test('filterProducts filters by inStockOnly', () => {
  const result = filterProducts(mockProducts, { inStockOnly: true });
  assert.equal(result.length, 2);
  assert.equal(result.some((p) => p.id === 'prod-3'), false);
});

test('filterProducts filters by search query matching name or features', () => {
  const result = filterProducts(mockProducts, { query: 'copper' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name.includes('Polycab'), true);

  const switchResult = filterProducts(mockProducts, { query: 'Fabio' });
  assert.equal(switchResult.length, 1);
});

test('generateWhatsAppOrderUrl builds properly encoded WhatsApp URL', () => {
  const url = generateWhatsAppOrderUrl('+91 94470 12345', mockProducts[0], 'Need 10 boxes');
  assert.ok(url.includes('wa.me/919447012345'));
  assert.ok(url.includes('Havells%20Fabio'));
  assert.ok(url.includes('Need%2010%20boxes'));
});

test('validateContactMessage validates phone, name, and message', () => {
  const valid = validateContactMessage({
    name: 'Anil Kumar',
    phone: '9847012345',
    email: 'anil@example.com',
    message: 'Need quote for 3BHK house wiring',
  });
  assert.equal(valid.valid, true);

  const invalid = validateContactMessage({
    name: 'A',
    phone: '123',
    message: 'hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.message);
});

test('validateProduct validates price and name', () => {
  const valid = validateProduct({
    name: 'Legrand MCB 16A',
    categoryId: 'electrical',
    price: 340,
    brand: 'Legrand',
  });
  assert.equal(valid.valid, true);

  const invalid = validateProduct({
    name: '',
    price: -10,
    brand: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.price);
  assert.ok(invalid.errors.brand);
});

test('generateLocalBusinessSchema returns valid schema.org object', () => {
  const mockSettings: SiteSettings = {
    shopName: 'Jaysree Traders',
    shopNameMalayalam: 'ജയശ്രീ ട്രേഡേഴ്സ്',
    tagline: 'Your trusted partner',
    taglineMalayalam: '',
    logoText: 'JT',
    announcement: 'Special contractor discounts available!',
    aboutStory: 'Founded in 2010',
    aboutStoryMalayalam: '',
    yearsInBusiness: 15,
    happyCustomersCount: 4500,
    genuineBrandsCount: 40,
    emergencyServiceHours: '24/7',
    phone: '+91 94470 12345',
    altPhone: '',
    whatsapp: '+91 98460 54321',
    email: 'info@jaysreetraders.com',
    fullAddress: 'Main Bazaar Road, Ernakulam',
    city: 'Kochi',
    state: 'Kerala',
    pinCode: '682016',
    openingHoursWeekday: '8:30 AM - 8:30 PM',
    openingHoursWeekend: '9:00 AM - 2:00 PM',
    googleMapsEmbedUrl: '',
    gstin: '32AAAAA0000A1Z5',
    socialLinks: {
      whatsapp: '',
      facebook: '',
      instagram: '',
      youtube: '',
      googleBusiness: '',
    },
  };
  const mockSeo: SEOConfig = {
    metaTitle: 'Jaysree Traders',
    metaDescription: 'Best electrical & plumbing shop in Kochi',
    metaKeywords: 'hardware, pipes, wires',
    canonicalUrl: 'https://jaysreetraders.com',
  };

  const schema = generateLocalBusinessSchema(mockSettings, mockSeo) as any;
  assert.equal(schema['@type'], 'HomeGoodsStore');
  assert.equal(schema.name, 'Jaysree Traders');
  assert.equal(schema.telephone, '+91 94470 12345');
});
