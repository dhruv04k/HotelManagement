import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Booking, FolioCharge } from '../../types/hotel';
import {
  X,
  Printer,
  Plus,
  Building2,
  CheckCircle2,
  DollarSign,
  Receipt,
  Download
} from 'lucide-react';

export const FolioInvoiceModal: React.FC = () => {
  const { activeFolioBooking, setActiveFolioBooking, addChargeToBooking } = useHotel();

  const [newChargeDesc, setNewChargeDesc] = useState('');
  const [newChargeAmount, setNewChargeAmount] = useState<number>(45);
  const [newChargeCategory, setNewChargeCategory] = useState<FolioCharge['category']>('dining');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!activeFolioBooking) return null;

  const handleAddCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChargeDesc.trim() || newChargeAmount <= 0) return;

    addChargeToBooking(activeFolioBooking.id, {
      description: newChargeDesc.trim(),
      amount: newChargeAmount,
      category: newChargeCategory
    });

    setNewChargeDesc('');
    setNewChargeAmount(45);
    setShowAddForm(false);
  };

  const roomCharges = activeFolioBooking.charges.filter(c => c.category === 'room');
  const otherCharges = activeFolioBooking.charges.filter(c => c.category !== 'room');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Guest Master Folio #{activeFolioBooking.bookingRef}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={() => setActiveFolioBooking(null)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Folio Document */}
        <div className="p-8 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Hotel Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    The Azure Grand Hotel & Spa
                  </h1>
                  <div className="text-xs text-slate-500">
                    Hospitality Excellence Since 1998
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-3 space-y-0.5">
                <div>100 Ocean Promenade, Azure Bay, CA 90210</div>
                <div>concierge@azuregrandhotel.com · +1 (800) 555-AZURE</div>
                <div>Tax ID: US-94-819203 · Lic. Hospitality #48201</div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Official Guest Folio
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {activeFolioBooking.bookingRef}
              </div>
              <div className="text-xs text-slate-500">
                Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                  Status: {activeFolioBooking.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Guest & Stay Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-semibold">Guest Name</div>
              <div className="font-bold text-slate-900 mt-0.5">{activeFolioBooking.guestName}</div>
              <div className="text-slate-500 text-[11px]">{activeFolioBooking.guestEmail}</div>
            </div>

            <div>
              <div className="text-slate-400 uppercase text-[10px] font-semibold">Accommodations</div>
              <div className="font-bold text-slate-900 mt-0.5">Room {activeFolioBooking.roomNumber}</div>
              <div className="text-slate-500 text-[11px]">{activeFolioBooking.roomName}</div>
            </div>

            <div>
              <div className="text-slate-400 uppercase text-[10px] font-semibold">Stay Duration</div>
              <div className="font-bold text-slate-900 mt-0.5">
                {activeFolioBooking.nights} Night{activeFolioBooking.nights > 1 ? 's' : ''} ({activeFolioBooking.guestsCount} Guests)
              </div>
              <div className="text-slate-500 text-[11px]">
                {activeFolioBooking.checkIn} → {activeFolioBooking.checkOut}
              </div>
            </div>

            <div>
              <div className="text-slate-400 uppercase text-[10px] font-semibold">Settlement Method</div>
              <div className="font-bold text-slate-900 mt-0.5 uppercase">
                {activeFolioBooking.paymentMethod.replace('_', ' ')}
              </div>
              <div className="text-emerald-700 font-mono text-[11px]">Verified & Guaranteed</div>
            </div>
          </div>

          {/* Itemized Folio Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Itemized Charges & Services
              </h3>
              <div className="no-print">
                <button
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Incidental Charge</span>
                </button>
              </div>
            </div>

            {/* Quick Add Charge Form */}
            {showAddForm && (
              <form onSubmit={handleAddCharge} className="no-print p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-900">Add Incidental / Room Service Charge</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Description (e.g. Minibar, Laundry, Valet)"
                    value={newChargeDesc}
                    onChange={(e) => setNewChargeDesc(e.target.value)}
                    className="p-2 border border-slate-300 rounded text-xs bg-white font-medium focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount in USD"
                    value={newChargeAmount}
                    onChange={(e) => setNewChargeAmount(Number(e.target.value))}
                    className="p-2 border border-slate-300 rounded text-xs bg-white font-mono focus:outline-none"
                    required
                  />
                  <select
                    value={newChargeCategory}
                    onChange={(e) => setNewChargeCategory(e.target.value as any)}
                    className="p-2 border border-slate-300 rounded text-xs bg-white font-medium focus:outline-none"
                  >
                    <option value="dining">Dining / Restaurant</option>
                    <option value="minibar">Minibar</option>
                    <option value="spa">Spa / Wellness</option>
                    <option value="transport">Transport / Valet</option>
                    <option value="service">Service / Laundry</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
                  >
                    Post to Folio
                  </button>
                </div>
              </form>
            )}

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Category</th>
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeFolioBooking.charges.map(charge => (
                    <tr key={charge.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500">{charge.date}</td>
                      <td className="px-4 py-2.5 uppercase text-[10px] font-mono text-slate-500">{charge.category}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-900">{charge.description}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900 tabular-nums">
                        ${charge.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 space-y-1 max-w-sm">
              <p className="font-semibold text-slate-700">Folio Settlement Agreement:</p>
              <p>
                All room charges, food and beverage, and incidentals billed to this folio are guaranteed by the guest. Disputes must be registered with the hotel controller within 7 business days.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Charges:</span>
                <span className="font-mono tabular-nums font-semibold">
                  ${(activeFolioBooking.totalPrice - activeFolioBooking.taxAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>State & Tourism Tax (12%):</span>
                <span className="font-mono tabular-nums">
                  ${activeFolioBooking.taxAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Folio:</span>
                <span className="font-mono tabular-nums">${activeFolioBooking.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold text-xs pt-1">
                <span>Paid to Date:</span>
                <span className="font-mono tabular-nums">${activeFolioBooking.amountPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <div className="text-xs text-slate-500">
            HotelPro Financial Audit System · Authorized Staff Copy
          </div>
          <button
            onClick={() => setActiveFolioBooking(null)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Folio
          </button>
        </div>
      </div>
    </div>
  );
};
