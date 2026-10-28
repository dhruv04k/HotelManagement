import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Room, Booking, BookingAddOn } from '../../types/hotel';
import { AVAILABLE_ADDONS } from '../../data/initialData';
import {
  X,
  Calendar,
  Users,
  Check,
  CreditCard,
  QrCode,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  KeyRound,
  ExternalLink
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: Room | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom
}) => {
  const { rooms, createBooking, setCurrentView, setAdminTab } = useHotel();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [checkIn, setCheckIn] = useState('2026-10-28');
  const [checkOut, setCheckOut] = useState('2026-10-31');
  const [guestsCount, setGuestsCount] = useState(2);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [selectedAddOns, setSelectedAddOns] = useState<BookingAddOn[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<Booking['paymentMethod']>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 ···· ···· 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    } else if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [preselectedRoom, rooms]);

  if (!isOpen) return null;

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Calculate pricing
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffDays = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffDays) ? 1 : diffDays;

  const roomTotal = currentRoom ? currentRoom.pricePerNight * nights : 0;
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => {
    return acc + (curr.perNight ? curr.price * nights : curr.price);
  }, 0);
  const subtotal = roomTotal + addOnsTotal;
  const taxAmount = Math.round(subtotal * 0.12 * 10) / 10;
  const grandTotal = Math.round((subtotal + taxAmount) * 10) / 10;

  const handleAddOnToggle = (addon: BookingAddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = createBooking({
      guestName: guestName || 'Esteemed Guest',
      guestEmail: guestEmail || 'guest@azurehotel.com',
      guestPhone: guestPhone || '+1 (555) 234-5678',
      roomId: currentRoom.id,
      checkIn,
      checkOut,
      guestsCount,
      addOns: selectedAddOns,
      specialRequests,
      paymentMethod
    });

    setConfirmedBooking(newBooking);
    setStep(5);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight">
              {step === 5 ? 'Booking Confirmed · Welcome to The Azure' : 'Reserve Your Luxury Suite'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className={step >= 1 ? 'font-bold text-slate-900' : ''}>1. Room & Dates</span>
            <span className="text-slate-300">/</span>
            <span className={step >= 2 ? 'font-bold text-slate-900' : ''}>2. Guest Details</span>
            <span className="text-slate-300">/</span>
            <span className={step >= 3 ? 'font-bold text-slate-900' : ''}>3. Add-Ons</span>
            <span className="text-slate-300">/</span>
            <span className={step >= 4 ? 'font-bold text-slate-900' : ''}>4. Payment</span>
          </div>
        )}

        {/* Step 1: Room Selection & Stay Dates */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Sanctuary
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      Room {room.number} · {room.name} (${room.pricePerNight}/night) - Floor {room.floor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Room Preview Card */}
              {currentRoom && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={currentRoom.image}
                    alt={currentRoom.name}
                    className="w-20 h-16 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-slate-900">{currentRoom.name}</div>
                    <div className="text-slate-500 mt-0.5">
                      {currentRoom.bedType} · Floor {currentRoom.floor} · {currentRoom.sizeSqFt} sq ft
                    </div>
                    <div className="text-emerald-700 font-mono font-semibold mt-1">
                      ${currentRoom.pricePerNight} / night
                    </div>
                  </div>
                </div>
              )}

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Check-In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Nights & Subtotal Summary */}
              <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Length of stay: <strong className="text-slate-900">{nights} night{nights > 1 ? 's' : ''}</strong>
                </span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  Estimated Room Rate: ${roomTotal}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Guest Details */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexandra Montgomery"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="alexandra@montgomery.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 492-0192"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Special Hospitality Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. High floor preference, quiet corner, hypoallergenic pillows, anniversary wine setup"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Sample Autofill for demonstration convenience */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Quick autofill test guest:</span>
                <button
                  type="button"
                  onClick={() => {
                    setGuestName('Elena Rostova');
                    setGuestEmail('elena.rostova@geneva-capital.ch');
                    setGuestPhone('+41 22 819 4000');
                    setSpecialRequests('Late evening arrival around 9 PM; quiet room preferred.');
                  }}
                  className="text-[11px] text-emerald-700 hover:underline font-medium"
                >
                  Fill Elena Rostova
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!guestName) setGuestName('Alexandra Montgomery');
                  if (!guestEmail) setGuestEmail('alexandra@montgomery.com');
                  if (!guestPhone) setGuestPhone('+1 (555) 302-8812');
                  setStep(3);
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Continue to Experiences & Add-Ons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Add-Ons & Curated Experiences */}
        {step === 3 && (
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Curated Resort Enhancements</h4>
              <p className="text-xs text-slate-500 mt-1">
                Customize your stay with culinary and relaxation experiences curated by our hotel team.
              </p>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {AVAILABLE_ADDONS.map(addon => {
                const isSelected = selectedAddOns.some(a => a.id === addon.id);
                const priceDisplay = addon.perNight ? `$${addon.price} / night` : `$${addon.price} total`;

                return (
                  <div
                    key={addon.id}
                    onClick={() => handleAddOnToggle(addon)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-500 text-slate-900 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-semibold">{addon.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {addon.perNight ? `Calculated across ${nights} nights` : 'One-time stay addition'}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono font-bold text-slate-900 tabular-nums">
                      {priceDisplay}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal */}
            <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Selected Add-Ons ({selectedAddOns.length}):
              </span>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                +${addOnsTotal}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Simulation & Price Breakdown */}
        {step === 4 && (
          <form onSubmit={handleFinalizeBooking} className="p-6 space-y-6">
            {/* Price Ledger */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">
                Itemized Folio Summary
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{currentRoom.name} ({nights} nights × ${currentRoom.pricePerNight})</span>
                <span className="font-mono tabular-nums">${roomTotal}</span>
              </div>
              {selectedAddOns.map(addon => (
                <div key={addon.id} className="flex justify-between text-slate-600">
                  <span>{addon.name}</span>
                  <span className="font-mono tabular-nums">
                    +${addon.perNight ? addon.price * nights : addon.price}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200">
                <span>State & Luxury Tourism Tax (12%)</span>
                <span className="font-mono tabular-nums">${taxAmount}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">${grandTotal}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Payment Guarantee Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('corporate_bill')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'corporate_bill'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay on Arrival</span>
                </button>
              </div>

              {/* Credit Card inputs */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-medium focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 text-center">
                  Instant UPI payment verified upon reservation submission.
                </div>
              )}

              {paymentMethod === 'corporate_bill' && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                  Payment will be collected at Front Desk upon check-in or billed to corporate master folio.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Pay ${grandTotal}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Booking Confirmation & Digital Voucher */}
        {step === 5 && confirmedBooking && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Success Banner */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  Reservation Confirmed! Reference: {confirmedBooking.bookingRef}
                </h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  A confirmation voucher has been generated and sent to {confirmedBooking.guestEmail}.
                </p>
              </div>
            </div>

            {/* Official Hotel Voucher Box */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs text-slate-400 font-mono">HOTEL RESERVATION VOUCHER</div>
                  <h3 className="text-lg font-bold text-slate-900">{confirmedBooking.roomName}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Room {confirmedBooking.roomNumber} · The Azure Grand Hotel & Spa
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Confirmation Code</div>
                  <div className="text-base font-bold font-mono text-slate-900 tracking-wider">
                    {confirmedBooking.bookingRef}
                  </div>
                </div>
              </div>

              {/* Voucher Grid Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-slate-400">Primary Guest</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{confirmedBooking.guestName}</div>
                </div>
                <div>
                  <div className="text-slate-400">Dates</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {confirmedBooking.checkIn} → {confirmedBooking.checkOut}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Total Stay</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {confirmedBooking.nights} Night{confirmedBooking.nights > 1 ? 's' : ''} ({confirmedBooking.guestsCount} Guests)
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Total Paid</div>
                  <div className="font-bold text-emerald-700 font-mono mt-0.5">
                    ${confirmedBooking.totalPrice}
                  </div>
                </div>
              </div>

              {/* Digital Room Key Simulation */}
              <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold">Digital Mobile Key Active</div>
                    <div className="text-[11px] text-slate-400">Hold device near Door {confirmedBooking.roomNumber}</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  READY
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleResetAndClose();
                    setCurrentView('admin');
                    setAdminTab('bookings');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View in Staff PMS</span>
                </button>

                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
