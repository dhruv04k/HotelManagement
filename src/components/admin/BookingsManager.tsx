import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Booking, BookingStatus } from '../../types/hotel';
import {
  Search,
  Filter,
  CheckCircle2,
  LogOut,
  Receipt,
  Plus,
  XCircle,
  FileText,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';

interface BookingsManagerProps {
  onOpenNewBooking: () => void;
}

export const BookingsManager: React.FC<BookingsManagerProps> = ({ onOpenNewBooking }) => {
  const { bookings, checkInBooking, checkOutBooking, cancelBooking, setActiveFolioBooking } = useHotel();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [quickChargeBooking, setQuickChargeBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'today_arrivals') {
          if (b.checkIn !== '2026-10-28' || b.status === 'cancelled') return false;
        } else if (statusFilter === 'today_departures') {
          if (b.checkOut !== '2026-10-28' || b.status === 'cancelled') return false;
        } else if (b.status !== statusFilter) {
          return false;
        }
      }

      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesRef = b.bookingRef.toLowerCase().includes(query);
        const matchesGuest = b.guestName.toLowerCase().includes(query);
        const matchesEmail = b.guestEmail.toLowerCase().includes(query);
        const matchesRoom = b.roomNumber.includes(query);
        if (!matchesRef && !matchesGuest && !matchesEmail && !matchesRoom) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, statusFilter, search]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'checked_in':
        return <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">IN-HOUSE</span>;
      case 'confirmed':
        return <span className="text-[11px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">CONFIRMED</span>;
      case 'checked_out':
        return <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">CHECKED OUT</span>;
      case 'cancelled':
        return <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">CANCELLED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Reservations & Guest Master Ledger</h2>
          <p className="text-xs text-slate-500">
            Real-time PMS bookings roster with check-in, check-out, and folio reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewBooking}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Walk-in / Reservation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Segmented Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setStatusFilter('checked_in')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'checked_in' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Checked In ({bookings.filter(b => b.status === 'checked_in').length})
            </button>
            <button
              onClick={() => setStatusFilter('today_arrivals')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'today_arrivals' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Arrivals Today
            </button>
            <button
              onClick={() => setStatusFilter('today_departures')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'today_departures' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Departures Today
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'confirmed' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Future Confirmed
            </button>
            <button
              onClick={() => setStatusFilter('cancelled')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'cancelled' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, guest, room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* High Density Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Ref #</th>
                <th className="px-4 py-3">Guest Details</th>
                <th className="px-4 py-3">Room / Suite</th>
                <th className="px-4 py-3">Check-In / Out</th>
                <th className="px-4 py-3">Nights</th>
                <th className="px-4 py-3 text-right">Folio Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBookings.length > 0 ? (
                filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Ref */}
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                      {b.bookingRef}
                    </td>

                    {/* Guest */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{b.guestName}</div>
                      <div className="text-[11px] text-slate-400">{b.guestEmail} · {b.guestPhone}</div>
                      {b.specialRequests && (
                        <div className="text-[10px] text-amber-700 mt-0.5 font-medium truncate max-w-xs">
                          Note: {b.specialRequests}
                        </div>
                      )}
                    </td>

                    {/* Room */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">Room {b.roomNumber}</div>
                      <div className="text-[11px] text-slate-500">{b.roomName}</div>
                    </td>

                    {/* Dates */}
                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      <div>{b.checkIn}</div>
                      <div className="text-slate-400">→ {b.checkOut}</div>
                    </td>

                    {/* Nights */}
                    <td className="px-4 py-3.5 font-mono">
                      {b.nights}n · {b.guestsCount}g
                    </td>

                    {/* Folio Total */}
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ${b.totalPrice}
                      <div className="text-[10px] text-slate-400 font-normal uppercase font-sans">
                        {b.paymentStatus}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => checkInBooking(b.id)}
                            className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium text-[11px] transition-colors"
                            title="Check-In Guest"
                          >
                            Check In
                          </button>
                        )}

                        {b.status === 'checked_in' && (
                          <button
                            onClick={() => checkOutBooking(b.id)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-medium text-[11px] transition-colors"
                            title="Check-Out Guest"
                          >
                            Check Out
                          </button>
                        )}

                        <button
                          onClick={() => setActiveFolioBooking(b)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium text-[11px] flex items-center gap-1 transition-colors"
                          title="View Folio Invoice"
                        >
                          <Receipt className="w-3 h-3 text-slate-500" />
                          <span>Folio</span>
                        </button>

                        {b.status !== 'cancelled' && b.status !== 'checked_out' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Cancel reservation ${b.bookingRef} for ${b.guestName}?`)) {
                                cancelBooking(b.id);
                              }
                            }}
                            className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No reservations matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
