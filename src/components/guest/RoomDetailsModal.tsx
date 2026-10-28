import React from 'react';
import { Room } from '../../types/hotel';
import { X, Check, Users, Bed, Maximize2, Sparkles, Shield, Clock, ArrowRight } from 'lucide-react';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose, onBook }) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Room Visual Showcase */}
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
              Floor {room.floor} · Room {room.number} · {room.type.toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">{room.name}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <div className="text-slate-400">Accommodates</div>
              <div className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>{room.capacity} Guests</span>
              </div>
            </div>
            <div>
              <div className="text-slate-400">Bed Configuration</div>
              <div className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                <Bed className="w-3.5 h-3.5 text-slate-500" />
                <span>{room.bedType}</span>
              </div>
            </div>
            <div>
              <div className="text-slate-400">Living Area</div>
              <div className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{room.sizeSqFt} sq ft</span>
              </div>
            </div>
            <div>
              <div className="text-slate-400">Nightly Rate</div>
              <div className="font-bold text-slate-900 text-sm font-mono tabular-nums mt-0.5">
                ${room.pricePerNight} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sanctuary Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Key Architectural & Room Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Bespoke Room Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {room.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Amenities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              All Included Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hospitality Policies */}
          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Check-in: 3:00 PM · Check-out: 11:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Disinfected daily & sealed for your safety</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Total base rate</div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              ${room.pricePerNight} <span className="text-xs font-normal text-slate-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(room);
              }}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
