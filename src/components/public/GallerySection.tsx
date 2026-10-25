import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { GalleryItem } from '../../types/store';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { data, language } = useStore();
  const { gallery } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(gallery.map((g) => g.category)))];

  const filteredItems = selectedCategory === 'all'
    ? gallery
    : gallery.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              {language === 'ml' ? 'വർക്ക് ഗാലറി' : 'Project & Store Showcase'}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ml' ? 'ഞങ്ങളുടെ പ്രോജക്റ്റുകൾ' : 'Workmanship & Showroom Gallery'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Inspect our certified plumbing setups, concealed distribution boards, lighting projects, and well-stocked hardware inventory.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="aspect-4/3 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-900/80 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between">
                <h4 className="font-heading font-semibold text-sm text-slate-900 truncate">
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                  {item.dateAdded}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
          >
            {/* Lightbox Topbar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-semibold">{activeItem.category}</span>
                <span>·</span>
                <span className="text-slate-300">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Preview */}
            <div className="relative aspect-16/10 bg-slate-950 flex items-center justify-center p-2">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors shadow-lg"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors shadow-lg"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="px-6 py-3.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-white text-xs">
              <span className="font-semibold text-slate-100">{activeItem.title}</span>
              <span className="text-slate-400">Added on {activeItem.dateAdded}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
