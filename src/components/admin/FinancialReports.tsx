import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export const FinancialReports: React.FC = () => {
  const { bookings, rooms, stats } = useHotel();
  const [auditComplete, setAuditComplete] = useState(false);

  // Calculate revenue by tier
  const tierRevenue = {
    penthouse: bookings
      .filter(b => b.roomType === 'penthouse' && b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    suite: bookings
      .filter(b => b.roomType === 'suite' && b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    deluxe: bookings
      .filter(b => b.roomType === 'deluxe' && b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    standard: bookings
      .filter(b => b.roomType === 'standard' && b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.totalPrice, 0)
  };

  const totalRevenue = Object.values(tierRevenue).reduce((a, b) => a + b, 0);

  // RevPAR = ADR * Occupancy Rate
  const revPar = Math.round((stats.averageDailyRate * (stats.occupancyRate / 100)) * 10) / 10;

  const handleRunNightAudit = () => {
    setAuditComplete(true);
    setTimeout(() => setAuditComplete(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Hospitality Financial Analytics & Reports</h2>
          <p className="text-xs text-slate-500">
            Portfolio revenue performance, RevPAR metrics, and night audit ledger controls.
          </p>
        </div>

        <button
          onClick={handleRunNightAudit}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Execute Night Audit Reconciliation</span>
        </button>
      </div>

      {auditComplete && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <strong>Night Audit Completed Successfully!</strong> All daily room charges posted, folios balanced, and ledger closed for October 28, 2026.
          </div>
        </div>
      )}

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Total Gross Ledger</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Across all active stays & folios
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>RevPAR (Rev Per Avail Room)</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ${revPar}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Industry Benchmark standard
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>ADR (Average Daily Rate)</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ${stats.averageDailyRate}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Weighted across luxury categories
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Portfolio Occupancy</span>
            <PieChart className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {stats.occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {stats.occupiedRooms} Occupied of {stats.totalRooms} Rooms
          </div>
        </div>
      </div>

      {/* Revenue by Room Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Revenue Contribution by Category</h3>
          <div className="space-y-3">
            {[
              { label: 'Presidential Penthouses', amount: tierRevenue.penthouse, color: 'bg-slate-900' },
              { label: 'Executive Suites', amount: tierRevenue.suite, color: 'bg-emerald-700' },
              { label: 'Ocean Deluxe Rooms', amount: tierRevenue.deluxe, color: 'bg-blue-600' },
              { label: 'Boutique Queen Rooms', amount: tierRevenue.standard, color: 'bg-amber-600' }
            ].map((cat, idx) => {
              const pct = totalRevenue > 0 ? Math.round((cat.amount / totalRevenue) * 100) : 0;
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>{cat.label}</span>
                    <span className="font-mono tabular-nums font-bold">
                      ${cat.amount.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Night Audit & Operations Health */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Hospitality Compliance & Ledger Balance</h3>
          <div className="space-y-2 text-xs text-slate-600 divide-y divide-slate-100">
            <div className="py-2 flex justify-between">
              <span>Folio Balance Variance:</span>
              <span className="font-mono font-bold text-emerald-700">$0.00 (Balanced)</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Pending Direct Billing Accounts:</span>
              <span className="font-mono font-bold text-slate-900">1 Account (Corporate)</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Tax Remittance Escrow (12%):</span>
              <span className="font-mono font-bold text-slate-900">
                ${(totalRevenue * 0.12).toFixed(2)}
              </span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Credit Card Surcharges:</span>
              <span className="font-mono font-bold text-slate-900">0% (Absorbed by Hotel)</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.print()}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Ledger Summary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
