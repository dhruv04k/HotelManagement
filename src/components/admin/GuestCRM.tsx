import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { GuestProfile } from '../../types/hotel';
import { Search, UserCheck, Star, Mail, Phone, Calendar, Plus, Edit3 } from 'lucide-react';

export const GuestCRM: React.FC = () => {
  const { guests } = useHotel();
  const [search, setSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile | null>(null);

  const filteredGuests = guests.filter(g => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.phone.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Guest Profiles & CRM Directory</h2>
          <p className="text-xs text-slate-500">
            Guest lifetime stay records, VIP loyalty statuses, and bespoke hospitality preferences.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search guest name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
          />
        </div>
      </div>

      {/* Guest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuests.map(guest => (
          <div
            key={guest.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{guest.name}</h3>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{guest.idNumber}</div>
                </div>
                {guest.vip && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase font-mono flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>VIP Guest</span>
                  </span>
                )}
              </div>

              {/* Contact info */}
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{guest.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{guest.phone}</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Hospitality Preferences
                </div>
                <div className="text-slate-700 italic">
                  "{guest.preferences || 'No specific preferences recorded.'}"
                </div>
                {guest.notes && (
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    <strong>Staff Note:</strong> {guest.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Lifetime metrics */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Stays</span>
                <span className="font-bold text-slate-900 font-mono">{guest.totalStays}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Lifetime Spend</span>
                <span className="font-bold text-emerald-700 font-mono tabular-nums">
                  ${guest.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
