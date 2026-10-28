import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Room, RoomStatus } from '../../types/hotel';
import {
  Bed,
  CheckCircle2,
  AlertCircle,
  Brush,
  Wrench,
  Users,
  DollarSign,
  X,
  CreditCard,
  Plus,
  ArrowRight
} from 'lucide-react';

export const RoomRack: React.FC = () => {
  const { rooms, bookings, updateRoomStatus, setActiveFolioBooking, addChargeToBooking } = useHotel();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filterFloor, setFilterFloor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [quickChargeName, setQuickChargeName] = useState('Minibar Refresh');
  const [quickChargeAmount, setQuickChargeAmount] = useState(25);
  const [chargeAddedMsg, setChargeAddedMsg] = useState(false);

  // Group rooms by floor
  const floors = [4, 3, 2, 1];

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-50 border-emerald-300 text-emerald-800';
      case 'occupied':
        return 'bg-slate-900 border-slate-900 text-white';
      case 'dirty':
        return 'bg-rose-50 border-rose-300 text-rose-800';
      case 'cleaning':
        return 'bg-amber-50 border-amber-300 text-amber-800';
      case 'maintenance':
        return 'bg-purple-50 border-purple-300 text-purple-800';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-800';
    }
  };

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'dirty': return 'Dirty / Vacant';
      case 'cleaning': return 'In Cleaning';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getOccupantBooking = (roomNumber: string) => {
    return bookings.find(b => b.roomNumber === roomNumber && b.status === 'checked_in');
  };

  const handleAddCharge = (bookingId: string) => {
    addChargeToBooking(bookingId, {
      description: quickChargeName,
      amount: quickChargeAmount,
      category: 'minibar'
    });
    setChargeAddedMsg(true);
    setTimeout(() => setChargeAddedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Interactive Room Rack Matrix</h2>
            <p className="text-xs text-slate-500">
              Live status across all 4 hotel levels. Click any room unit to inspect occupants, adjust state, or post charges.
            </p>
          </div>

          {/* Quick Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Dirty
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cleaning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Maintenance
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Filter by Status:</span>
          {['all', 'available', 'occupied', 'dirty', 'cleaning', 'maintenance'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}

          <span className="text-slate-400 font-medium ml-4">Floor:</span>
          {['all', '4', '3', '2', '1'].map(fl => (
            <button
              key={fl}
              onClick={() => setFilterFloor(fl)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterFloor === fl
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fl === 'all' ? 'All Floors' : `Floor ${fl}`}
            </button>
          ))}
        </div>
      </div>

      {/* Floor by Floor Layout */}
      <div className="space-y-6">
        {floors
          .filter(floor => filterFloor === 'all' || filterFloor === floor.toString())
          .map(floor => {
            const floorRooms = rooms.filter(
              r => r.floor === floor && (filterStatus === 'all' || r.status === filterStatus)
            );

            if (floorRooms.length === 0) return null;

            return (
              <div key={floor} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Floor {floor}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">
                      {floor === 4 ? 'Presidential Penthouse Level' : floor === 3 ? 'Executive Suites' : floor === 2 ? 'Oceanfront Deluxe' : 'Garden Sanctuary'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {floorRooms.length} Room Units
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {floorRooms.map(room => {
                    const occupant = getOccupantBooking(room.number);
                    const isOccupied = room.status === 'occupied';

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md flex flex-col justify-between ${getStatusColor(
                          room.status
                        )}`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold font-mono tracking-tight">
                              Room {room.number}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono uppercase ${
                                isOccupied ? 'bg-slate-800 text-emerald-400' : 'bg-white/80'
                              }`}
                            >
                              {getStatusBadge(room.status)}
                            </span>
                          </div>

                          <div className={`text-xs mt-1 font-medium ${isOccupied ? 'text-slate-300' : 'text-slate-600'}`}>
                            {room.name}
                          </div>

                          {occupant ? (
                            <div className="mt-3 pt-2 border-t border-white/20 text-xs">
                              <div className="text-[11px] text-emerald-400 font-mono">In-House Guest:</div>
                              <div className="font-bold text-white truncate">{occupant.guestName}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Depart: {occupant.checkOut}
                              </div>
                            </div>
                          ) : (
                            <div className={`mt-3 pt-2 border-t text-xs ${isOccupied ? 'border-white/20 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                              Rate: <span className="font-mono font-bold">${room.pricePerNight}</span> / night
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-2 flex items-center justify-between text-[11px] opacity-80">
                          <span>{room.bedType}</span>
                          <span>Click to control →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Room Control Drawer / Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-400 font-mono uppercase">Room Console</div>
                <h3 className="text-base font-bold">
                  Room {selectedRoom.number} · {selectedRoom.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Quick Status Adjuster */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Override Room Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['available', 'occupied', 'dirty', 'cleaning', 'maintenance'] as RoomStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateRoomStatus(selectedRoom.id, st);
                        setSelectedRoom(prev => prev ? { ...prev, status: st } : null);
                      }}
                      className={`p-2 rounded-lg text-xs font-medium border capitalize transition-all ${
                        selectedRoom.status === st
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupant Details if Occupied */}
              {getOccupantBooking(selectedRoom.number) ? (
                (() => {
                  const occupant = getOccupantBooking(selectedRoom.number)!;
                  return (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 uppercase">Active Guest Record</span>
                        <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                          CHECKED IN
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div><strong>Guest Name:</strong> {occupant.guestName}</div>
                        <div><strong>Email:</strong> {occupant.guestEmail}</div>
                        <div><strong>Dates:</strong> {occupant.checkIn} to {occupant.checkOut} ({occupant.nights} nights)</div>
                        <div><strong>Folio Balance:</strong> ${occupant.totalPrice} ({occupant.paymentStatus})</div>
                      </div>

                      {/* Quick Post Charge */}
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <span className="text-xs font-semibold text-slate-700 block">Post Quick Incidental Charge:</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quickChargeName}
                            onChange={(e) => setQuickChargeName(e.target.value)}
                            placeholder="Charge description"
                            className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                          />
                          <input
                            type="number"
                            value={quickChargeAmount}
                            onChange={(e) => setQuickChargeAmount(Number(e.target.value))}
                            className="w-20 p-1.5 border border-slate-300 rounded text-xs font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddCharge(occupant.id)}
                            className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 shrink-0"
                          >
                            Post
                          </button>
                        </div>
                        {chargeAddedMsg && (
                          <div className="text-[11px] text-emerald-700 font-semibold">
                            Charge added to folio!
                          </div>
                        )}
                      </div>

                      {/* View Folio button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedRoom(null);
                            setActiveFolioBooking(occupant);
                          }}
                          className="px-3 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Open Itemized Folio / Bill
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                  Unit is currently vacant. No guest checked in.
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRoom(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
