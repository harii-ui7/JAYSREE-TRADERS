import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Service } from '../../types/store';
import { Zap, Droplets, Wrench, Cpu, Activity, ShieldAlert, Check, Clock, Calendar } from 'lucide-react';
import { ServiceBookingModal } from './ServiceBookingModal';

export const ServicesSection: React.FC = () => {
  const { data, language } = useStore();
  const { services } = data;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Icon mapper helper
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'droplets':
        return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-emerald-500" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-purple-500" />;
      case 'activity':
        return <Activity className="w-6 h-6 text-cyan-500" />;
      case 'shieldalert':
      default:
        return <ShieldAlert className="w-6 h-6 text-amber-500" />;
    }
  };

  const activeServices = services.filter((s) => s.active !== false);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            {language === 'ml' ? 'വിദഗ്ദ്ധ സേവനങ്ങൾ' : 'Certified Field Technicians'}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ml' ? 'ഇലക്ട്രിക്കൽ & പ്ലംബിംഗ് സർവീസുകൾ' : 'Professional Electrical & Plumbing Services'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Fully licensed electricians and plumbers for house wiring, sanitary fittings, emergency leak repairs, and inverter setups.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Turnaround Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white rounded-full border border-slate-200 shadow-2xs">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{service.turnaroundTime}</span>
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 leading-snug">
                  {language === 'ml' && service.titleMalayalam ? service.titleMalayalam : service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {language === 'ml' && service.descriptionMalayalam ? service.descriptionMalayalam : service.description}
                </p>

                {/* Features Checklist */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price Estimate & Booking Button */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-700">{service.priceEstimate}</span>
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      <ServiceBookingModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
