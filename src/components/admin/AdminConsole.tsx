import React from 'react';
import { useHotel, AdminTab } from '../../context/HotelContext';
import { DashboardOverview } from './DashboardOverview';
import { BookingsManager } from './BookingsManager';
import { RoomRack } from './RoomRack';
import { HousekeepingManager } from './HousekeepingManager';
import { GuestCRM } from './GuestCRM';
import { FinancialReports } from './FinancialReports';
import { FolioInvoiceModal } from './FolioInvoiceModal';
import {
  LayoutDashboard,
  CalendarCheck,
  Bed,
  Brush,
  Users,
  BarChart3,
  RotateCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AdminConsoleProps {
  onOpenNewBooking: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ onOpenNewBooking }) => {
  const { adminTab, setAdminTab, resetAllData } = useHotel();

  const getBreadcrumbLabel = (tab: AdminTab) => {
    switch (tab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'bookings': return 'Reservations & Master Ledger';
      case 'rooms': return 'Room Rack Matrix';
      case 'housekeeping': return 'Housekeeping Turnaround';
      case 'guests': return 'Guest CRM Directory';
      case 'analytics': return 'Financial Analytics & Audit';
      default: return 'PMS Operations';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24">
      {/* Sub-Header Breadcrumb and Tab Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Trail */}
          <div className="py-3 flex items-center justify-between gap-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-semibold text-slate-700">HotelPro PMS</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>The Azure Grand Hotel</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold">{getBreadcrumbLabel(adminTab)}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.confirm('Reset all demo bookings, rooms, and housekeeping to default state?')) {
                    resetAllData();
                  }
                }}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                title="Reset demo data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

          {/* Sub-Nav Segmented Tabs */}
          <div className="py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
            <button
              onClick={() => setAdminTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Operations Dashboard</span>
            </button>

            <button
              onClick={() => setAdminTab('bookings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'bookings'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Reservations Ledger</span>
            </button>

            <button
              onClick={() => setAdminTab('rooms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'rooms'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bed className="w-3.5 h-3.5" />
              <span>Room Rack Matrix</span>
            </button>

            <button
              onClick={() => setAdminTab('housekeeping')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'housekeeping'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Brush className="w-3.5 h-3.5" />
              <span>Housekeeping Turnaround</span>
            </button>

            <button
              onClick={() => setAdminTab('guests')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'guests'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Guest CRM Directory</span>
            </button>

            <button
              onClick={() => setAdminTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                adminTab === 'analytics'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Financial Reports & RevPAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {adminTab === 'dashboard' && <DashboardOverview />}
        {adminTab === 'bookings' && <BookingsManager onOpenNewBooking={onOpenNewBooking} />}
        {adminTab === 'rooms' && <RoomRack />}
        {adminTab === 'housekeeping' && <HousekeepingManager />}
        {adminTab === 'guests' && <GuestCRM />}
        {adminTab === 'analytics' && <FinancialReports />}
      </main>

      {/* Active Guest Folio Modal */}
      <FolioInvoiceModal />
    </div>
  );
};
