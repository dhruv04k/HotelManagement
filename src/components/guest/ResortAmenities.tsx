import React from 'react';
import { Utensils, Waves, Sparkles, Car, Clock, ShieldCheck, HeartPulse, Wine } from 'lucide-react';

export const ResortAmenities: React.FC = () => {
  const experiences = [
    {
      icon: Utensils,
      title: 'Michelin-Caliber Culinary',
      description: 'Gastronomy driven by coastal provenance, featuring daily catches and organic hillside produce paired with rare grand cru vintages.'
    },
    {
      icon: Waves,
      title: 'Ocean Water Hydrotherapy Spa',
      description: 'Thermal plunge baths, eucalyptus steam rooms, and bespoke circadian rhythm restoration therapies created by master healers.'
    },
    {
      icon: Wine,
      title: 'Private Rooftop Cellar Lounge',
      description: 'Exclusive evening tastings with our head sommelier, overlooking panoramic sunset horizons from the fourth-floor terrace.'
    },
    {
      icon: Car,
      title: 'Private Chauffeur Service',
      description: 'Door-to-door transfer fleet with complimentary airport pickup for suite and penthouse guests.'
    },
    {
      icon: Clock,
      title: '24/7 Dedicated Butler Service',
      description: 'Discreet, anticipatory hospitality from unpacking service to bespoke itineraries arranged in minutes.'
    },
    {
      icon: ShieldCheck,
      title: 'Contactless Digital PMS Experience',
      description: 'Digital door keys on your personal mobile device, real-time in-suite room service folio tracking, and express paperless check-out.'
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
            Signature Resort Experiences
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Unrivaled Hospitality Crafted with Architectural Elegance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every moment at The Azure is intentionally composed to provide complete rejuvenation and effortless ease.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
