import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data, language } = useStore();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            {language === 'ml' ? 'ഉപഭോക്തൃ സാക്ഷ്യങ്ങൾ' : 'Verified Reviews'}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ml' ? 'ഉപഭോക്താക്കൾ പറയുന്നത്' : 'Trusted by Homeowners & Contractors'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            See how our authentic products, wholesale pricing, and experienced technicians have helped customers across Kerala.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/90 hover:border-amber-400/80 transition-colors flex flex-col justify-between relative shadow-2xs"
            >
              <Quote className="w-8 h-8 text-amber-400/30 absolute top-6 right-6" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < test.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">{test.rating}.0 / 5.0</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{test.reviewText}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    {test.customerName}
                  </h4>
                  <span className="text-xs text-slate-500">{test.location}</span>
                </div>

                {test.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Customer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
