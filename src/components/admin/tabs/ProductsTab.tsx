import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Product } from '../../../types/store';
import { formatINR, compressImageFile, validateProduct } from '../../../utils/storeLogic';
import { Plus, Edit2, Trash2, Search, Table, Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { BulkPricingModal } from './BulkPricingModal';

export const ProductsTab: React.FC = () => {
  const { data, addProduct, updateProduct, deleteProduct, language } = useStore();
  const { products, categories } = data;

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [compressing, setCompressing] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCat === 'all' || p.categoryId === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingProduct({
      name: '',
      nameMalayalam: '',
      categoryId: categories[0]?.id || 'electrical',
      price: 100,
      mrp: 120,
      unit: 'piece',
      inStock: true,
      brand: 'Havells',
      description: '',
      image: '',
      features: ['ISI Certified'],
      featured: false,
    });
    setErrors({});
  };

  const handleOpenEdit = (product: Product) => {
    setIsNew(false);
    setEditingProduct({ ...product });
    setErrors({});
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      const compressedDataUrl = await compressImageFile(file, 800, 0.85);
      setEditingProduct((prev) => (prev ? { ...prev, image: compressedDataUrl } : null));
    } catch (err) {
      alert('Failed to process image: ' + String(err));
    } finally {
      setCompressing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const validation = validateProduct(editingProduct);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    if (isNew) {
      addProduct({
        name: editingProduct.name!,
        nameMalayalam: editingProduct.nameMalayalam || '',
        categoryId: editingProduct.categoryId!,
        price: Number(editingProduct.price) || 0,
        mrp: Number(editingProduct.mrp) || Number(editingProduct.price) || 0,
        unit: editingProduct.unit || 'piece',
        inStock: editingProduct.inStock ?? true,
        brand: editingProduct.brand!,
        description: editingProduct.description || '',
        image: editingProduct.image || '',
        features: editingProduct.features || [],
        featured: editingProduct.featured || false,
      });
    } else {
      updateProduct(editingProduct.id!, editingProduct);
    }

    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Action and Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, brand, or specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowBulkModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-300"
            title="Edit all prices in spreadsheet mode"
          >
            <Table className="w-4 h-4 text-slate-600" />
            <span>Bulk Price Editor</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Product Name</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Brand</th>
                <th className="py-3 px-4 font-semibold">Price / MRP</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="w-12 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      {p.nameMalayalam && <div className="text-[11px] text-slate-400">{p.nameMalayalam}</div>}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{cat?.name || 'Hardware'}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-700">{p.brand}</td>
                    <td className="py-2.5 px-4">
                      <span className="font-bold text-slate-950 font-heading tabular-nums">{formatINR(p.price)}</span>
                      {p.mrp > p.price && (
                        <span className="text-[11px] text-slate-400 line-through ml-1.5 tabular-nums">
                          {formatINR(p.mrp)}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 block">/ {p.unit}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          p.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-heading font-bold text-base text-white">
                {isNew ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                    placeholder="e.g. Havells 6A Switch"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name (Malayalam, Optional)</label>
                  <input
                    type="text"
                    value={editingProduct.nameMalayalam || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameMalayalam: e.target.value })}
                    placeholder="e.g. ഹാവൽസ് 6A സ്വിച്ച്"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    required
                    placeholder="e.g. Havells, Astral, Polycab"
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    value={editingProduct.unit || 'piece'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    placeholder="piece, meter, roll, box"
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Our Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.price ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    required
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MRP (₹, Optional)</label>
                  <input
                    type="number"
                    value={editingProduct.mrp ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mrp: parseFloat(e.target.value) })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock ?? true}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>Available In Stock</span>
                  </label>
                </div>
              </div>

              {/* Image Upload with Automatic Compression */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Photo (Upload with Auto-Compression)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-lg bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                    {editingProduct.image ? (
                      <img src={editingProduct.image} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      {compressing ? 'Compressing photo...' : 'Any photo uploaded is automatically compressed to lightweight format.'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Material specs, certifications, voltage rating or usage details..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Features / Specifications (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProduct.features ? editingProduct.features.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. ISI Marked, 1100V, Pure Copper, Flame Retardant"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Pricing Modal */}
      {showBulkModal && (
        <BulkPricingModal onClose={() => setShowBulkModal(false)} />
      )}
    </div>
  );
};
