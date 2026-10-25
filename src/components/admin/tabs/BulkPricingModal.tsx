import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { X, Save, Search, Check, AlertCircle } from 'lucide-react';

interface BulkPricingModalProps {
  onClose: () => void;
}

export const BulkPricingModal: React.FC<BulkPricingModalProps> = ({ onClose }) => {
  const { data, bulkUpdateProducts } = useStore();
  const { products, categories } = data;

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Local state for modified rows
  const [rows, setRows] = useState(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      categoryId: p.categoryId,
      price: p.price,
      mrp: p.mrp,
      inStock: p.inStock,
      unit: p.unit,
    }))
  );

  const handlePriceChange = (id: string, newPrice: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, price: isNaN(newPrice) ? 0 : newPrice } : r))
    );
  };

  const handleMrpChange = (id: string, newMrp: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, mrp: isNaN(newMrp) ? 0 : newMrp } : r))
    );
  };

  const handleStockToggle = (id: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, inStock: !r.inStock } : r))
    );
  };

  const handleSaveAll = () => {
    bulkUpdateProducts(
      rows.map((r) => ({
        id: r.id,
        price: r.price,
        mrp: r.mrp,
        inStock: r.inStock,
      }))
    );
    onClose();
  };

  const filteredRows = rows.filter((r) => {
    const matchCat = selectedCat === 'all' || r.categoryId === selectedCat;
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Fast Spreadsheet Mode</div>
            <h3 className="font-heading font-bold text-lg text-white">Bulk Price &amp; Stock Editor</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products in table..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white"
            >
              <option value="all">All Categories ({rows.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Editing <strong className="text-slate-900">{filteredRows.length}</strong> items
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto overflow-y-auto flex-1 p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Product Name</th>
                <th className="py-2.5 px-3 font-semibold">Brand</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold w-28">Our Price (₹)</th>
                <th className="py-2.5 px-3 font-semibold w-28">MRP (₹)</th>
                <th className="py-2.5 px-3 font-semibold text-center w-28">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => {
                const cat = categories.find((c) => c.id === row.categoryId);
                return (
                  <tr key={row.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">
                      {row.name}
                      <span className="text-[10px] text-slate-400 block">/ {row.unit}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">{row.brand}</td>
                    <td className="py-2.5 px-3 text-slate-500">{cat?.name || 'Hardware'}</td>
                    <td className="py-2.5 px-3">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">₹</span>
                        <input
                          type="number"
                          value={row.price}
                          onChange={(e) => handlePriceChange(row.id, parseFloat(e.target.value))}
                          className="w-full pl-6 pr-2 py-1.5 rounded border border-slate-300 font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                        <input
                          type="number"
                          value={row.mrp}
                          onChange={(e) => handleMrpChange(row.id, parseFloat(e.target.value))}
                          className="w-full pl-6 pr-2 py-1.5 rounded border border-slate-300 font-mono text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleStockToggle(row.id)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${
                          row.inStock
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {row.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Clicking Save applies updated rates and stock instantly across the live website.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-6 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save All Price Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
