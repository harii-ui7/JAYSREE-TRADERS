import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';
import { generateWhatsAppGeneralUrl } from '../../utils/storeLogic';

export const FloatingWhatsApp: React.FC = () => {
  const { data } = useStore();
  const { settings } = data;
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsapp,
    `Hello ${settings.shopName}! I am contacting you directly from your website for electrical/plumbing materials.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Speech Bubble Teaser */}
      {!tooltipDismissed && (
        <div className="mb-2.5 max-w-xs bg-slate-900 text-white text-xs py-2 px-3.5 rounded-xl shadow-xl border border-slate-700 flex items-center justify-between gap-3 animate-bounce">
          <div className="flex flex-col">
            <span className="font-bold text-amber-400">Need instant quotes?</span>
            <span className="text-[11px] text-slate-300">Chat with us on WhatsApp</span>
          </div>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss chat tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
        aria-label="Chat with Jaysree Traders on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
