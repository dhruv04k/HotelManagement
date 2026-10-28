import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Booking } from '../../types/hotel';
import {
  X,
  Search,
  Calendar,
  CreditCard,
  KeyRound,
  UtensilsCrossed,
  Printer,
  AlertCircle,
  CheckCircle2,
  Coffee,
  Sparkles
} from 'lucide-react';

interface MyReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyReservationModal: React.FC<MyReservationModalProps> = ({ isOpen, onClose }) => {
  const { bookings, cancelBooking, addChargeToBooking } = useHotel();
  const [searchTerm, setSearchTerm] = useState('HP-84910'); // Default to rich demo booking
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(() => {
    return bookings.find(b => b.bookingRef === 'HP-84910') || bookings[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(true);
  const [roomServiceItem, setRoomServiceItem] = useState('Craft Cocktail & Truffle Fries');
  const [roomServicePrice, setRoomServicePrice] = useState(38);
  const [serviceAddedSuccess, setServiceAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const term = searchTerm.trim().toLowerCase();
    const match = bookings.find(
      b => b.bookingRef.toLowerCase() === term || b.guestEmail.toLowerCase() === term
    );
    setSearchedBooking(match || null);
  };

  const handleAddRoomService = () => {
    if (!searchedBooking) return;
    addChargeToBooking(searchedBooking.id, {
      description: `In-Suite Dining: ${roomServiceItem}`,
      amount: roomServicePrice,
      category: 'dining'
    });
    setServiceAddedSuccess(true);
    setTimeout(() => setServiceAddedSuccess(false), 2500);

    // Refresh local searched booking
    const updated = bookings.find(b => b.id === searchedBooking.id);
    if (updated) {
      setSearchedBooking(updated);
    }
  };

  const handleCancel = () => {
    if (!searchedBooking) return;
    if (window.confirm('Are you sure you wish to cancel this reservation?')) {
      cancelBooking(searchedBooking.id);
      const updated = bookings.find(b => b.id === searchedBooking.id);
      if (updated) {
        setSearchedBooking({ ...updated, status: 'cancelled' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight">Guest Concierge & Reservation Lookup</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Booking Reference (e.g. HP-84910) or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Lookup
            </button>
          </form>

          {/* Result */}
          {searchedBooking ? (
            <div className="space-y-5">
              {/* Status Header */}
              <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">#{searchedBooking.bookingRef}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase font-mono ${
                        searchedBooking.status === 'checked_in'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchedBooking.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : searchedBooking.status === 'checked_out'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {searchedBooking.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{searchedBooking.roomName}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Room {searchedBooking.roomNumber} · Primary Guest: {searchedBooking.guestName}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Folio</div>
                  <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                    ${searchedBooking.totalPrice}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {searchedBooking.paymentStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Stay Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 block">Check-In</span>
                  <span className="font-semibold text-slate-800">{searchedBooking.checkIn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Check-Out</span>
                  <span className="font-semibold text-slate-800">{searchedBooking.checkOut}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Length of Stay</span>
                  <span className="font-semibold text-slate-800">{searchedBooking.nights} Nights</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Digital Key</span>
                  <span className="font-semibold text-emerald-700">Door {searchedBooking.roomNumber} Active</span>
                </div>
              </div>

              {/* In-Suite Folio Charges */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Itemized Folio Charges ({searchedBooking.charges.length})
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Real-Time Sync</span>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                  {searchedBooking.charges.map((charge) => (
                    <div key={charge.id} className="p-2.5 flex items-center justify-between bg-white">
                      <div>
                        <div className="font-medium text-slate-800">{charge.description}</div>
                        <div className="text-[10px] text-slate-400">Date: {charge.date} · {charge.category.toUpperCase()}</div>
                      </div>
                      <div className="font-mono tabular-nums font-semibold text-slate-900">
                        ${charge.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-Suite Room Service Request Simulation */}
              {searchedBooking.status === 'checked_in' && (
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                    <span>Order In-Suite Dining to Room {searchedBooking.roomNumber}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={roomServiceItem}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRoomServiceItem(val);
                        if (val.includes('Cocktail')) setRoomServicePrice(38);
                        else if (val.includes('Club')) setRoomServicePrice(28);
                        else if (val.includes('Breakfast')) setRoomServicePrice(42);
                        else setRoomServicePrice(55);
                      }}
                      className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                    >
                      <option value="Craft Cocktail & Truffle Fries">Craft Cocktail & Truffle Fries ($38)</option>
                      <option value="The Azure Signature Club Sandwich">The Azure Signature Club Sandwich ($28)</option>
                      <option value="In-Bed Continental Breakfast Setup">In-Bed Continental Breakfast Setup ($42)</option>
                      <option value="Bottle of Grand Reserve Pinot Noir">Bottle of Grand Reserve Pinot Noir ($55)</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleAddRoomService}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
                    >
                      Bill to Room Folio
                    </button>
                  </div>

                  {serviceAddedSuccess && (
                    <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Order placed! Added to your folio account.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Folio Receipt</span>
                </button>

                {searchedBooking.status !== 'cancelled' && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 text-slate-500 text-xs space-y-2">
              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
              <p>No reservation found for reference "{searchTerm}".</p>
              <p className="text-slate-400">Try testing with demo reference <strong>HP-84910</strong> or <strong>HP-91024</strong>.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
