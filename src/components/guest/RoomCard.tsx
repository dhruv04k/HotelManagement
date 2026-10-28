import React, { useState } from 'react';
import { Room } from '../../types/hotel';
import { Users, Maximize2, Bed, ArrowRight, Check, Eye } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onSelectBook: (room: Room) => void;
  onOpenDetails: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelectBook, onOpenDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const getTierLabel = (type: Room['type']) => {
    switch (type) {
      case 'penthouse': return 'Presidential Penthouse';
      case 'suite': return 'Executive Suite';
      case 'deluxe': return 'Oceanfront Deluxe';
      default: return 'Boutique Collection';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-all shadow-xs hover:shadow-md">
      {/* Visual Slot */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden group">
        {imageLoaded ? (
          <img
            src={room.image}
            alt={room.name}
            onError={() => setImageLoaded(false)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-300 p-4 text-center">
            <Bed className="w-8 h-8 mb-2 text-emerald-400" />
            <span className="text-sm font-medium">{room.name}</span>
          </div>
        )}

        {/* Quiet room number label & status */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-mono font-medium">
          Room {room.number} · Floor {room.floor}
        </div>

        {room.status === 'available' ? (
          <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-medium">
            Available Now
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-slate-200 px-2.5 py-1 rounded text-xs font-medium">
            Book for Later
          </div>
        )}

        <button
          onClick={() => onOpenDetails(room)}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed Metadata (Zero-pill compliant) */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1.5">
            <span className="text-emerald-700 font-semibold">{getTierLabel(room.type)}</span>
            <span aria-hidden="true">·</span>
            <span>Floor {room.floor}</span>
            <span aria-hidden="true">·</span>
            <span>{room.sizeSqFt} sq ft</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {room.name}
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          {/* Quick Specifications */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Up to {room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{room.bedType}</span>
            </div>
          </div>

          {/* Amenities Preview */}
          <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-500">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {idx > 0 && <span className="text-slate-300">·</span>}
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{amenity}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-400">Starting from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(room)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onSelectBook(room)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
