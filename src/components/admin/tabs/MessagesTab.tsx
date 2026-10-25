import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { Mail, Phone, MessageCircle, Trash2, CheckCircle, Download, Search, AlertCircle } from 'lucide-react';

export const MessagesTab: React.FC = () => {
  const { data, updateMessageStatus, deleteMessage } = useStore();
  const { messages, settings } = data;

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMessages = messages.filter((m) => {
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      (m.email && m.email.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Category/Subject', 'Status', 'Message'];
    const rows = messages.map((m) => [
      m.id,
      m.date,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.phone}"`,
      `"${m.email || ''}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      m.status,
      `"${m.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customer-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            Customer Inquiries &amp; Messages
          </h3>
          <p className="text-xs text-slate-500">
            Messages submitted by visitors via website contact and service booking forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or message text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto self-start sm:self-auto">
          {(['all', 'unread', 'read', 'replied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {status}
              {status === 'unread' && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-slate-950 font-bold rounded-full text-[10px]">
                  {messages.filter((m) => m.status === 'unread').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No customer messages found.</p>
          <p className="text-xs text-slate-400 mt-0.5">When customers submit the contact or booking form, inquiries appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const cleanPhone = msg.phone.replace(/\D/g, '');
            const replyWhatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${msg.name}! Thank you for reaching out to ${settings.shopName}. Regarding your inquiry about "${msg.subject || 'materials'}":`
            )}`;

            return (
              <div
                key={msg.id}
                className={`bg-white rounded-xl p-5 border transition-all ${
                  msg.status === 'unread'
                    ? 'border-amber-400 shadow-sm bg-amber-50/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-slate-900">{msg.name}</span>
                    {msg.status === 'unread' ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950 uppercase tracking-wide">
                        New
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 text-slate-600 capitalize">
                        {msg.status}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(msg.date).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {msg.subject || 'General Inquiry'}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line">
                  {msg.message}
                </p>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span>Phone: <strong>{msg.phone}</strong></span>
                    {msg.email && <span>Email: <strong>{msg.email}</strong></span>}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Mark status toggle */}
                    {msg.status === 'unread' && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'read')}
                        className="px-2.5 py-1.5 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                      >
                        Mark as Read
                      </button>
                    )}

                    {/* Direct Call Button */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-500" />
                      <span>Call</span>
                    </a>

                    {/* Direct WhatsApp Reply */}
                    <a
                      href={replyWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => updateMessageStatus(msg.id, 'replied')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>

                    {/* Delete Message */}
                    <button
                      onClick={() => setDeleteId(msg.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg ml-1"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Delete Message?</h3>
            <p className="text-xs text-slate-600">Are you sure you want to remove this message from your inbox?</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMessage(deleteId);
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
    </div>
  );
};
