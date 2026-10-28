export type RoomType = 'standard' | 'deluxe' | 'suite' | 'penthouse';

export type RoomStatus = 'available' | 'occupied' | 'dirty' | 'cleaning' | 'maintenance';

export interface Room {
  id: string;
  number: string;
  name: string;
  type: RoomType;
  floor: number;
  pricePerNight: number;
  capacity: number;
  bedType: string;
  sizeSqFt: number;
  image: string;
  amenities: string[];
  status: RoomStatus;
  description: string;
  features: string[];
}

export interface FolioCharge {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: 'room' | 'dining' | 'minibar' | 'spa' | 'transport' | 'service';
}

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  perNight?: boolean;
}

export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'partially_paid' | 'refunded';
export type PaymentMethod = 'credit_card' | 'upi' | 'cash' | 'corporate_bill';

export interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestId?: string;
  roomId: string;
  roomNumber: string;
  roomType: RoomType;
  roomName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guestsCount: number;
  pricePerNight: number;
  roomTotal: number;
  addOns: BookingAddOn[];
  addOnsTotal: number;
  taxAmount: number;
  totalPrice: number;
  amountPaid: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  specialRequests?: string;
  charges: FolioCharge[];
  createdAt: string;
  checkedInAt?: string;
  checkedOutAt?: string;
}

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  vip: boolean;
  totalStays: number;
  totalSpent: number;
  preferences: string;
  notes: string;
  lastStay?: string;
}

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNumber: string;
  floor: number;
  status: 'dirty' | 'in_progress' | 'inspected' | 'clean' | 'maintenance';
  priority: 'urgent' | 'high' | 'normal';
  assignedTo: string;
  notes?: string;
  updatedAt: string;
}

export interface HotelStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  cleaningRooms: number;
  maintenanceRooms: number;
  occupancyRate: number;
  todayArrivals: number;
  todayDepartures: number;
  todayRevenue: number;
  averageDailyRate: number;
  activeGuests: number;
}
