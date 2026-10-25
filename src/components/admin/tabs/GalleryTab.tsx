import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { GalleryItem } from '../../../types/store';
import { compressImageFile } from '../../../utils/storeLogic';
import { Plus, Trash2, Upload, Image as ImageIcon, X } from 'lucide-react';

export const GalleryTab: React.FC = () => {
  const { data, addGalleryItem, deleteGalleryItem } = useStore();
  const { gallery } = data;

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Plumbing');
  const [image, setImage] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      const compressed = await compressImageFile(file, 900, 0.85);
      setImage(compressed);
    } catch (err) {
      alert('Error compressing image: ' + String(err));
    } finally {
      setCompressing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      alert('Please provide a title and select/upload an image.');
      return;
    }

    addGalleryItem({
      title,
      category,
      imageUrl: image,
      dateAdded: new Date().toISOString().slice(0, 10),
    });

    setShowAddModal(false);
    setTitle('');
    setImage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900">Project &amp; Work Gallery</h3>
          <p className="text-xs text-slate-500">Showcase recent plumbing installations, wiring jobs, and shop displays with lightbox preview.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Project Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:border-amber-400 transition-colors flex flex-col justify-between"
          >
            <div className="aspect-4/3 bg-slate-100 overflow-hidden relative">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-slate-900 truncate max-w-xs">{item.title}</h4>
                <span className="text-[10px] text-slate-400">{item.dateAdded}</span>
              </div>
              <button
                onClick={() => setDeleteId(item.id)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                title="Delete photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Delete Photo?</h3>
            <p className="text-xs text-slate-600">This photo will be removed from the public gallery.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGalleryItem(deleteId);
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

      {/* Upload Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-heading font-bold text-base text-white">Add Photo to Gallery</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project / Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 3-Phase DB Box Wiring in Villa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Storefront">Storefront / Showroom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Photo *</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-lg bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                    {image ? (
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                      className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      {compressing ? 'Compressing photo...' : 'Photo is compressed automatically before saving.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={compressing}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
