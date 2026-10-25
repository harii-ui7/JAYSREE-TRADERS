import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Service } from '../../../types/store';
import { Plus, Edit2, Trash2, Wrench, Clock, X } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { data, addService, updateService, deleteService } = useStore();
  const { services } = data;

  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingService({
      title: '',
      titleMalayalam: '',
      description: '',
      descriptionMalayalam: '',
      iconName: 'Wrench',
      turnaroundTime: 'Same Day',
      priceEstimate: 'Free Site Estimate',
      features: ['Licensed technicians', 'Genuine spare parts'],
      active: true,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    if (isNew) {
      addService({
        title: editingService.title,
        titleMalayalam: editingService.titleMalayalam || '',
        description: editingService.description || '',
        descriptionMalayalam: editingService.descriptionMalayalam || '',
        iconName: editingService.iconName || 'Wrench',
        turnaroundTime: editingService.turnaroundTime || 'Same Day',
        priceEstimate: editingService.priceEstimate || 'Free Estimate',
        features: editingService.features || [],
        active: editingService.active ?? true,
      });
    } else {
      updateService(editingService.id!, editingService);
    }
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900">Technician Services &amp; Repairs</h3>
          <p className="text-xs text-slate-500">Edit offered electrician and plumbing services, response times, and pricing estimates.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs hover:border-amber-400/80 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 bg-slate-100 rounded-lg text-amber-500">
                  <Wrench className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{service.turnaroundTime}</span>
                </span>
              </div>

              <h4 className="font-heading font-bold text-base text-slate-900">{service.title}</h4>
              {service.titleMalayalam && <p className="text-xs text-slate-400">{service.titleMalayalam}</p>}
              <p className="text-xs text-slate-600 mt-2 line-clamp-2">{service.description}</p>
              <div className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
                {service.priceEstimate}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-semibold ${service.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                {service.active ? '● Active' : '○ Inactive'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingService({ ...service });
                  }}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                  title="Edit service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(service.id)}
                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                  title="Delete service"
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
            <h3 className="font-heading font-bold text-lg text-slate-900">Delete Service?</h3>
            <p className="text-xs text-slate-600">Are you sure you want to remove this service from the website?</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteService(deleteId);
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

      {/* Add / Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-heading font-bold text-base text-white">
                {isNew ? 'Add Service' : 'Edit Service'}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Title (English) *</label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  placeholder="e.g. Complete House Wiring"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Title (Malayalam, Optional)</label>
                <input
                  type="text"
                  value={editingService.titleMalayalam || ''}
                  onChange={(e) => setEditingService({ ...editingService, titleMalayalam: e.target.value })}
                  placeholder="e.g. പൂർണ്ണ ഭവന വയറിംഗ്"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Response / Turnaround</label>
                  <input
                    type="text"
                    value={editingService.turnaroundTime || ''}
                    onChange={(e) => setEditingService({ ...editingService, turnaroundTime: e.target.value })}
                    placeholder="e.g. Same Day / 2-4 Hours"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price Estimate</label>
                  <input
                    type="text"
                    value={editingService.priceEstimate || ''}
                    onChange={(e) => setEditingService({ ...editingService, priceEstimate: e.target.value })}
                    placeholder="e.g. From ₹450 / Free Estimate"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Scope of service, tools used, licensed technician details..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Features (Comma Separated)</label>
                <input
                  type="text"
                  value={editingService.features ? editingService.features.join(', ') : ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Licensed electricians, Free estimate, Original materials"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
