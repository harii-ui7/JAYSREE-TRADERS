import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Category } from '../../../types/store';
import { Plus, Edit2, Trash2, Folder, X } from 'lucide-react';

export const CategoriesTab: React.FC = () => {
  const { data, addCategory, updateCategory, deleteCategory } = useStore();
  const { categories, products } = data;

  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingCategory({
      name: '',
      nameMalayalam: '',
      iconName: 'Zap',
      description: '',
      order: categories.length + 1,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;

    if (isNew) {
      addCategory({
        name: editingCategory.name,
        nameMalayalam: editingCategory.nameMalayalam || '',
        iconName: editingCategory.iconName || 'Zap',
        description: editingCategory.description || '',
        order: Number(editingCategory.order) || categories.length + 1,
      });
    } else {
      updateCategory(editingCategory.id!, editingCategory);
    }
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900">Product Categories</h3>
          <p className="text-xs text-slate-500">Categories organize your public product catalog and navigation tabs.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs hover:border-amber-400/80 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 bg-slate-100 rounded-lg text-slate-700">
                    <Folder className="w-4 h-4 text-amber-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                    {productCount} Products
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900">{cat.name}</h4>
                {cat.nameMalayalam && <p className="text-xs text-slate-400">{cat.nameMalayalam}</p>}
                <p className="text-xs text-slate-500 mt-2">{cat.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingCategory({ ...cat });
                  }}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                  title="Edit category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(cat.id)}
                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Delete Category?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this category? (Products assigned to it will remain in database).
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCategory(deleteId);
                  setDeleteId(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-heading font-bold text-base text-white">
                {isNew ? 'Add Category' : 'Edit Category'}
              </h3>
              <button onClick={() => setEditingCategory(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name (English) *</label>
                <input
                  type="text"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  required
                  placeholder="e.g. Sanitary & Bathroom Fittings"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name (Malayalam, Optional)</label>
                <input
                  type="text"
                  value={editingCategory.nameMalayalam || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, nameMalayalam: e.target.value })}
                  placeholder="e.g. സാനിറ്ററി & ബാത്ത്റൂം ഫിറ്റിംഗ്സ്"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="e.g. CPVC, UPVC pipes and bathroom accessories"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
