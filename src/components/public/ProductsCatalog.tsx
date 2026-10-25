import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/store';
import { formatINR, calculateDiscountPercent, filterProducts, generateWhatsAppOrderUrl } from '../../utils/storeLogic';
import { Search, X, MessageCircle, Info } from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

export const ProductsCatalog: React.FC = () => {
  const { data, language } = useStore();
  const { products, categories, settings } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      query: searchQuery,
      categoryId: selectedCategory,
      inStockOnly,
      sortBy,
    });
  }, [products, searchQuery, selectedCategory, inStockOnly, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              {language === 'ml' ? 'ഗുണമേന്മയുള്ള ഉൽപ്പന്നങ്ങൾ' : 'Authentic Hardware Catalog'}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ml' ? 'ഇലക്ട്രിക്കൽ & പ്ലംബിംഗ് ഉൽപ്പന്നങ്ങൾ' : 'Electrical & Plumbing Materials'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Wholesale and retail rates for certified switches, flame-retardant wires, CPVC pipes, and luxury bathroom fittings.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-end">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
          {/* Search, Sort and Stock Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name, brand (Havells, Astral, Polycab), or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & In-Stock Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
                />
                <span>In Stock Only</span>
              </label>

              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'ml' && cat.nameMalayalam ? cat.nameMalayalam : cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-base font-medium text-slate-700">No products found matching your filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search terms or selecting a different category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const category = categories.find((c) => c.id === product.categoryId);
              const discount = calculateDiscountPercent(product.mrp, product.price);
              const whatsappUrl = generateWhatsAppOrderUrl(settings.whatsapp, product);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Card Image Area */}
                  <div
                    onClick={() => setActiveModalProduct(product)}
                    className="relative bg-slate-100 aspect-4/3 overflow-hidden cursor-pointer flex items-center justify-center p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock status badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-md ${
                          product.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        {product.inStock ? 'In Stock' : 'Pre-order'}
                      </span>
                    </div>

                    {/* Discount badge if applicable */}
                    {discount > 0 && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet metadata line with typographic separator */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                        <span className="font-semibold text-slate-700">{product.brand}</span>
                        <span>·</span>
                        <span className="truncate">{category?.name || 'Hardware'}</span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => setActiveModalProduct(product)}
                        className="font-heading font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {language === 'ml' && product.nameMalayalam ? product.nameMalayalam : product.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold font-heading text-slate-950 tabular-nums">
                            {formatINR(product.price)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-xs text-slate-400 line-through tabular-nums">
                              {formatINR(product.mrp)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">per {product.unit} · GST incl.</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveModalProduct(product)}
                          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View product details & specs"
                          aria-label={`View specs for ${product.name}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors active:scale-95 whitespace-nowrap"
                          title="Send inquiry on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
};
