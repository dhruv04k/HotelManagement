import React from 'react';
import { HERO_IMAGE, PRESIDENTIAL_IMAGE } from '../../data/initialData';
import { ShieldCheck, Award, Sparkles, Compass } from 'lucide-react';

export const HotelStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Narrative Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>The HotelPro Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Hospitality Engineered for Distinction and Absolute Tranquility.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded on the belief that modern luxury lies in seamless ease, The Azure pairs timeless coastal architecture with cutting-edge hotel property operations. Whether you are retreating to our oceanfront terraces or our staff is orchestrating turnarounds behind the scenes, precision is our standard.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-xs">
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-slate-400 mt-1">Digital folios and contactless check-in ready</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">24/7</div>
                <div className="text-slate-400 mt-1">Dedicated butler and in-suite dining coverage</div>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-4/3">
            <img
              src={PRESIDENTIAL_IMAGE}
              alt="The Azure Penthouse Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-xs text-slate-300">
              <span className="font-semibold text-white">Executive Penthouse Salon</span> · Natural walnut wood, floor-to-ceiling panoramic glass, and Italian linens.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
