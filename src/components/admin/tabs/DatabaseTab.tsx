import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Database, Download, Upload, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const DatabaseTab: React.FC = () => {
  const { data, exportDatabaseJSON, importDatabaseJSON, resetToDefaultData } = useStore();
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      importDatabaseJSON(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview & Storage Statistics */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-bold text-base text-slate-900">
            Store Database, Backups &amp; Zero-Cost Hosting
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Your entire hardware shop catalog, photos, customer inquiries, and custom branding settings are stored persistently. You never have to pay for an external SQL database server!
        </p>

        {/* Database Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-xl font-bold font-heading text-slate-900 block">{data.products.length}</span>
            <span className="text-[11px] text-slate-500">Products</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-xl font-bold font-heading text-slate-900 block">{data.categories.length}</span>
            <span className="text-[11px] text-slate-500">Categories</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-xl font-bold font-heading text-slate-900 block">{data.services.length}</span>
            <span className="text-[11px] text-slate-500">Services</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-xl font-bold font-heading text-slate-900 block">{data.gallery.length}</span>
            <span className="text-[11px] text-slate-500">Photos</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-xl font-bold font-heading text-slate-900 block">{data.messages.length}</span>
            <span className="text-[11px] text-slate-500">Inquiries</span>
          </div>
        </div>
      </div>

      {/* Export & Import Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Export Backup Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-amber-500" />
              <h4 className="font-heading font-bold text-sm text-slate-900">Export Complete Store Backup</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Download your entire store database (products, prices, photos, inquiries, and settings) as a single JSON backup file to your computer.
            </p>
          </div>
          <button
            onClick={exportDatabaseJSON}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Store Backup (JSON)</span>
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-5 h-5 text-blue-500" />
              <h4 className="font-heading font-bold text-sm text-slate-900">Restore / Import Backup File</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Upload a previously exported backup file to restore all your products, prices, and settings instantly.
            </p>
          </div>
          <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>Choose Backup File...</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Factory Reset Card */}
      <div className="bg-rose-50/60 rounded-xl p-6 border border-rose-200/80 space-y-3">
        <div className="flex items-center gap-2 text-rose-800">
          <AlertTriangle className="w-5 h-5" />
          <h4 className="font-heading font-bold text-sm">Reset to Default Sample Store Content</h4>
        </div>
        <p className="text-xs text-rose-900/80 leading-relaxed">
          Need to start over? This resets all products, prices, and categories back to the realistic default electrical &amp; plumbing sample catalog.
        </p>

        {!resetConfirm ? (
          <button
            onClick={() => setResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-700 bg-white border border-rose-300 hover:bg-rose-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Data</span>
          </button>
        ) : (
          <div className="p-3 bg-white rounded-lg border border-rose-300 flex items-center justify-between gap-3">
            <span className="text-xs text-rose-800 font-semibold">Are you sure? All custom added items will be replaced.</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaultData();
                  setResetConfirm(false);
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
