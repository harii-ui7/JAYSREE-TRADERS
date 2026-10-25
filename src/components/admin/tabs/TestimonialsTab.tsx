import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Testimonial } from '../../../types/store';
import { Plus, Edit2, Trash2, Star, ShieldCheck, X } from 'lucide-react';

export const TestimonialsTab: React.FC = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useStore();
  const { testimonials } = data;

  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      customerName: '',
      location: 'Kochi, Kerala',
      rating: 5,
      reviewText: '',
      date: new Date().toISOString().slice(0, 10),
      verified: true,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.customerName || !editingItem?.reviewText) return;

    if (isNew) {
      addTestimonial({
        customerName: editingItem.customerName,
        location: editingItem.location || 'Kerala',
        rating: Number(editingItem.rating) || 5,
        reviewText: editingItem.reviewText,
        date: editingItem.date || new Date().toISOString().slice(0, 10),
        verified: editingItem.verified ?? true,
      });
    } else {
      updateTestimonial(editingItem.id!, editingItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900">Customer Reviews &amp; Testimonials</h3>
          <p className="text-xs text-slate-500">Add or manage real homeowner and contractor testimonials with ratings.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-400/80 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < test.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{test.rating}.0</span>
                </div>
                {test.verified && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                "{test.reviewText}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-slate-900">{test.customerName}</h4>
                <span className="text-[10px] text-slate-400">{test.location} · {test.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingItem({ ...test });
                  }}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(test.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Delete Review?</h3>
            <p className="text-xs text-slate-600">Are you sure you want to delete this customer review?</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTestimonial(deleteId);
                  setDeleteId(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-heading font-bold text-base text-white">
                {isNew ? 'Add Customer Review' : 'Edit Review'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Anand K. Menon"
                  value={editingItem.customerName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, customerName: e.target.value })}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Aluva, Kochi"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating (1 - 5)</label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Review Text *</label>
                <textarea
                  rows={3}
                  placeholder="Details of materials purchased, quality, pricing or service provided..."
                  value={editingItem.reviewText || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, reviewText: e.target.value })}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.verified ?? true}
                    onChange={(e) => setEditingItem({ ...editingItem, verified: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Mark as Verified Customer</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
