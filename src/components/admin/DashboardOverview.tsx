import React from 'react';
import { useHotel } from '../../context/HotelContext';
import {
  Bed,
  Users,
  DollarSign,
  CalendarCheck,
  LogOut,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Brush
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { stats, rooms, bookings, setAdminTab, checkInBooking, checkOutBooking, setActiveFolioBooking } = useHotel();

  // Today's arrivals (checkIn = 2026-10-28)
  const todayArrivals = bookings.filter(b => b.checkIn === '2026-10-28' && b.status === 'confirmed');
  // Today's departures (checkOut = 2026-10-28)
  const todayDepartures = bookings.filter(b => b.checkOut === '2026-10-28' && b.status === 'checked_in');
  // Urgent housekeeping rooms
  const dirtyRooms = rooms.filter(r => r.status === 'dirty' || r.status === 'cleaning');

  return (
    <div className="space-y-8">
      {/* Top Welcome & Shift Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Front Desk & Operations Console
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Today's Operational Roster
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Wednesday, October 28, 2026 · Morning Shift (07:00 – 15:30)</span>
            <span>·</span>
            <span className="font-medium text-slate-700">Supervisor: Front Desk Manager</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('rooms')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Open Room Rack
          </button>
          <button
            onClick={() => setAdminTab('bookings')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>All Bookings</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Tabular figures, clean unboxed layout) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Occupancy Rate */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Occupancy</span>
            <Bed className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {stats.occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {stats.occupiedRooms} / {stats.totalRooms} Rooms Occupied
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Room Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            ${stats.todayRevenue}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Active Nightly Run Rate
          </div>
        </div>

        {/* ADR */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>ADR (Daily Rate)</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ${stats.averageDailyRate}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Average Daily Rate
          </div>
        </div>

        {/* In-House Guests */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>In-House Guests</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {stats.activeGuests}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Registered on Premises
          </div>
        </div>

        {/* Arrivals Today */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Arrivals Today</span>
            <CalendarCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-blue-700 tabular-nums">
            {stats.todayArrivals}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Check-ins Scheduled
          </div>
        </div>

        {/* Departures Today */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Departures</span>
            <LogOut className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-700 tabular-nums">
            {stats.todayDepartures}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Check-outs Due
          </div>
        </div>
      </div>

      {/* Main Operations Split: Priority Queues & Room Rack Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Arrivals Queue */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Today's Expected Arrivals</h3>
              <p className="text-xs text-slate-500">Guests arriving today requiring check-in verification</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {todayArrivals.length} Pending
            </span>
          </div>

          {todayArrivals.length > 0 ? (
            <div className="divide-y divide-slate-100 text-xs">
              {todayArrivals.map(b => (
                <div key={b.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">{b.guestName}</div>
                    <div className="text-slate-500 mt-0.5">
                      Room {b.roomNumber} ({b.roomName}) · {b.nights} nights
                    </div>
                    {b.specialRequests && (
                      <div className="text-[11px] text-amber-700 font-medium mt-1">
                        Note: {b.specialRequests}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => checkInBooking(b.id)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Check In</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No further arrivals pending for today.
            </div>
          )}
        </div>

        {/* Today's Departures & Express Checkouts */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Today's Scheduled Departures</h3>
              <p className="text-xs text-slate-500">Guests checking out today for final billing reconciliation</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              {todayDepartures.length} Due
            </span>
          </div>

          {todayDepartures.length > 0 ? (
            <div className="divide-y divide-slate-100 text-xs">
              {todayDepartures.map(b => (
                <div key={b.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">{b.guestName}</div>
                    <div className="text-slate-500 mt-0.5">
                      Room {b.roomNumber} · Outstanding Folio: <span className="font-mono font-bold text-slate-900">${b.totalPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveFolioBooking(b)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      Folio Bill
                    </button>
                    <button
                      onClick={() => checkOutBooking(b.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Check Out</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              All departures for today have been completed.
            </div>
          )}
        </div>
      </div>

      {/* Housekeeping Alert Strip */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Brush className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              Housekeeping Status: {dirtyRooms.length} Rooms Require Cleaning & Sanitization
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Ensure turnaround is completed before afternoon check-in window (15:00).
            </div>
          </div>
        </div>

        <button
          onClick={() => setAdminTab('housekeeping')}
          className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg shadow-2xs transition-colors shrink-0"
        >
          Manage Housekeeping Roster
        </button>
      </div>
    </div>
  );
};
