import React from 'react';
import { useHotel, AdminTab } from '../../context/HotelContext';
import { Building2, ShieldCheck, CalendarCheck, BedDouble, ArrowRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBookingModal?: () => void;
  onOpenLookupModal?: () => void;
  onOpenDemoVideo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal, onOpenLookupModal, onOpenDemoVideo }) => {
  const { currentView, setCurrentView, adminTab, setAdminTab, stats } = useHotel();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('guest')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  HotelPro
                </span>
              </div>
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-400">·</span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 whitespace-nowrap">
              The Azure Grand Hotel & Spa
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {currentView === 'guest' ? (
              <>
                <a href="#rooms" className="hover:text-slate-900 transition-colors whitespace-nowrap">
                  Rooms & Suites
                </a>
                <a href="#amenities" className="hover:text-slate-900 transition-colors whitespace-nowrap">
                  Resort Experience
                </a>
                <button
                  onClick={onOpenLookupModal}
                  className="hover:text-slate-900 transition-colors whitespace-nowrap text-left"
                >
                  My Reservation
                </button>
                <button
                  onClick={onOpenDemoVideo}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Demo Video & Links</span>
                </button>
                <a href="#story" className="hover:text-slate-900 transition-colors whitespace-nowrap">
                  About HotelPro
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAdminTab('dashboard')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'dashboard' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setAdminTab('bookings')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'bookings' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Reservations
                </button>
                <button
                  onClick={() => setAdminTab('rooms')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'rooms' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Room Rack
                </button>
                <button
                  onClick={() => setAdminTab('housekeeping')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'housekeeping' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Housekeeping
                </button>
                <button
                  onClick={() => setAdminTab('guests')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'guests' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Guest CRM
                </button>
                <button
                  onClick={() => setAdminTab('analytics')}
                  className={`transition-colors whitespace-nowrap ${
                    adminTab === 'analytics' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Financial Reports
                </button>
                <button
                  onClick={onOpenDemoVideo}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Demo Video & Links</span>
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Actions and Mode Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* View Switcher Button */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setCurrentView('guest')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentView === 'guest'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BedDouble className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guest Portal</span>
                <span className="sm:hidden">Guest</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Staff PMS</span>
                <span className="sm:hidden">Staff</span>
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono">
                  {stats.occupancyRate}%
                </span>
              </button>
            </div>

            {currentView === 'guest' ? (
              <button
                onClick={onOpenBookingModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
              >
                <span>Book Stay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onOpenBookingModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Walk-In Booking</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
