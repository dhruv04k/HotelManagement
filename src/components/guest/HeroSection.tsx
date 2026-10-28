import React, { useState } from 'react';
import { HERO_IMAGE } from '../../data/initialData';
import { Calendar, Users, Sparkles, Search, Compass, MapPin } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

interface HeroSectionProps {
  onSearch: (checkIn: string, checkOut: string, guests: number, tier: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('2026-10-28');
  const [checkOut, setCheckOut] = useState('2026-10-31');
  const [guests, setGuests] = useState(2);
  const [tier, setTier] = useState('all');
  const { stats } = useHotel();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(checkIn, checkOut, guests, tier);
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src={HERO_IMAGE}
          alt="The Azure Grand Hotel Luxury Exterior at Dusk"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
        {/* Editorial Subtitle / Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <Compass className="w-3.5 h-3.5" />
            <span>The Azure Grand Hotel & Spa · Five-Star Coastal Sanctuary</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
            Where Architectural Precision Meets Unrivaled Hospitality.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Streamlined reservations, personalized guest sanctuaries, and comprehensive operational mastery. Experience seamless hospitality powered by HotelPro.
          </p>
        </div>

        {/* Live Booking Search Filter Bar */}
        <div className="mt-10 max-w-5xl bg-white rounded-xl shadow-2xl p-3 sm:p-4 text-slate-900 border border-slate-100">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* Check-In */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Check-In Date
              </label>
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Check-Out Date
              </label>
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Guests
              </label>
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests (Standard)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests (Penthouse)</option>
                </select>
              </div>
            </div>

            {/* Suite Category */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Room Collection
              </label>
              <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Sparkles className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
                >
                  <option value="all">All Available Tiers</option>
                  <option value="standard">Boutique Queen</option>
                  <option value="deluxe">Ocean Deluxe</option>
                  <option value="suite">Executive Suite</option>
                  <option value="penthouse">Presidential Penthouse</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Find Sanctuary</span>
              </button>
            </div>
          </form>

          {/* Quick Hospitality Trust Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>Best Rate Guaranteed</span>
              <span>·</span>
              <span>Free Cancellation up to 24h</span>
              <span>·</span>
              <span>Contactless Mobile Key</span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              Live Availability: {stats.availableRooms} of {stats.totalRooms} Suites Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
