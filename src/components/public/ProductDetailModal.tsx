import React, { useState } from 'react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { formatINR, calculateDiscountPercent, generateWhatsAppOrderUrl } from '../../utils/storeLogic';
import { X, MessageCircle, Phone, Check, ShieldCheck, Tag } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { data, language } = useStore();
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const category = data.categories.find((c) => c.id === product.categoryId);
  const discount = calculateDiscountPercent(product.mrp, product.price);
  const whatsappUrl = generateWhatsAppOrderUrl(data.settings.whatsapp, product, customNote);

  const handleCopySpecs = () => {
    const text = `${product.name} - ${formatINR(product.price)} (${product.brand})\n${product.description}\nFeatures: ${product.features.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with Title & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>{category?.name || 'Hardware'}</span>
            <span>·</span>
            <span className="text-slate-900 font-bold">{product.brand}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Product Image */}
            <div className="relative bg-slate-100 rounded-xl overflow-hidden aspect-4/3 flex items-center justify-center border border-slate-200/80">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-2"
                referrerPolicy="no-referrer"
              />
              {/* Stock Status Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    product.inStock
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                  {product.inStock ? 'In Stock at Shop' : 'Available on Order'}
                </span>
              </div>
            </div>

            {/* Product Pricing & Specs */}
            <div>
              <h3 className="font-heading text-xl font-bold text-slate-900 leading-snug">
                {language === 'ml' && product.nameMalayalam ? product.nameMalayalam : product.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-950 font-heading tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatINR(product.mrp)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save {discount}%
                    </span>
                  </>
                )}
                <span className="text-xs text-slate-500">/ {product.unit}</span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>100% Genuine Manufacturer Certified · GST Bill Provided</span>
              </div>
            </div>
          </div>

          {/* Key Specifications / Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Key Specifications &amp; Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Inquiry Custom Note */}
          <div>
            <label htmlFor="custom-note" className="block text-xs font-medium text-slate-700 mb-1">
              Add quantity or site requirements (Optional):
            </label>
            <input
              id="custom-note"
              type="text"
              placeholder="e.g. Need 50 pieces delivered to Kadavanthra by tomorrow"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
            />
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopySpecs}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
          >
            {copied ? '✓ Specifications Copied!' : 'Copy Item Specs'}
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${data.settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Shop</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
