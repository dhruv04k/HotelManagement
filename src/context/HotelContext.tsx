import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Room,
  Booking,
  GuestProfile,
  HousekeepingTask,
  RoomStatus,
  HotelStats,
  FolioCharge
} from '../types/hotel';
import {
  INITIAL_ROOMS,
  INITIAL_BOOKINGS,
  INITIAL_GUESTS,
  INITIAL_HOUSEKEEPING
} from '../data/initialData';

export type AdminTab = 'dashboard' | 'bookings' | 'rooms' | 'housekeeping' | 'guests' | 'billing' | 'analytics';

interface HotelContextType {
  rooms: Room[];
  bookings: Booking[];
  guests: GuestProfile[];
  housekeepingTasks: HousekeepingTask[];
  currentView: 'guest' | 'admin';
  setCurrentView: (view: 'guest' | 'admin') => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  stats: HotelStats;
  createBooking: (newBooking: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guestsCount: number;
    addOns: { id: string; name: string; price: number; perNight?: boolean }[];
    specialRequests?: string;
    paymentMethod: Booking['paymentMethod'];
  }) => Booking;
  checkInBooking: (bookingId: string) => void;
  checkOutBooking: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  addChargeToBooking: (bookingId: string, charge: Omit<FolioCharge, 'id' | 'date'>) => void;
  updateRoomStatus: (roomId: string, status: RoomStatus) => void;
  updateHousekeepingStatus: (taskId: string, status: HousekeepingTask['status'], notes?: string) => void;
  createHousekeepingTask: (task: Omit<HousekeepingTask, 'id' | 'updatedAt'>) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  activeFolioBooking: Booking | null;
  setActiveFolioBooking: (booking: Booking | null) => void;
  resetAllData: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROOMS: 'hotelpro_rooms_v1',
  BOOKINGS: 'hotelpro_bookings_v1',
  GUESTS: 'hotelpro_guests_v1',
  HOUSEKEEPING: 'hotelpro_housekeeping_v1',
  CURRENT_VIEW: 'hotelpro_view_v1'
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [guests, setGuests] = useState<GuestProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GUESTS);
      return saved ? JSON.parse(saved) : INITIAL_GUESTS;
    } catch {
      return INITIAL_GUESTS;
    }
  });

  const [housekeepingTasks, setHousekeepingTasks] = useState<HousekeepingTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOUSEKEEPING);
      return saved ? JSON.parse(saved) : INITIAL_HOUSEKEEPING;
    } catch {
      return INITIAL_HOUSEKEEPING;
    }
  });

  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeFolioBooking, setActiveFolioBooking] = useState<Booking | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [guests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOUSEKEEPING, JSON.stringify(housekeepingTasks));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [housekeepingTasks]);

  // Compute operational statistics
  const stats = useMemo<HotelStats>(() => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const cleaningRooms = rooms.filter(r => r.status === 'cleaning' || r.status === 'dirty').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    // Today is treated as 2026-10-28 (current session date)
    const todayStr = '2026-10-28';
    const todayArrivals = bookings.filter(b => b.checkIn === todayStr && b.status !== 'cancelled').length;
    const todayDepartures = bookings.filter(b => b.checkOut === todayStr && b.status !== 'cancelled').length;

    const activeBookings = bookings.filter(b => b.status === 'checked_in');
    const todayRevenue = activeBookings.reduce((sum, b) => sum + b.pricePerNight, 0);
    const averageDailyRate = occupiedRooms > 0 ? Math.round(todayRevenue / occupiedRooms) : 265;
    const activeGuests = activeBookings.reduce((sum, b) => sum + b.guestsCount, 0);

    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      cleaningRooms,
      maintenanceRooms,
      occupancyRate,
      todayArrivals,
      todayDepartures,
      todayRevenue,
      averageDailyRate,
      activeGuests
    };
  }, [rooms, bookings]);

  // Create booking flow
  const createBooking = (newBookingData: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guestsCount: number;
    addOns: { id: string; name: string; price: number; perNight?: boolean }[];
    specialRequests?: string;
    paymentMethod: Booking['paymentMethod'];
  }): Booking => {
    const targetRoom = rooms.find(r => r.id === newBookingData.roomId) || rooms[0];
    const checkInDate = new Date(newBookingData.checkIn);
    const checkOutDate = new Date(newBookingData.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const roomTotal = targetRoom.pricePerNight * nights;
    const addOnsTotal = newBookingData.addOns.reduce((acc, item) => {
      return acc + (item.perNight ? item.price * nights : item.price);
    }, 0);
    const subtotal = roomTotal + addOnsTotal;
    const taxAmount = Math.round(subtotal * 0.12 * 10) / 10;
    const totalPrice = Math.round((subtotal + taxAmount) * 10) / 10;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `HP-${randomNum}`;
    const newId = `bkg-${Date.now()}`;

    const newBooking: Booking = {
      id: newId,
      bookingRef,
      guestName: newBookingData.guestName,
      guestEmail: newBookingData.guestEmail,
      guestPhone: newBookingData.guestPhone,
      roomId: targetRoom.id,
      roomNumber: targetRoom.number,
      roomType: targetRoom.type,
      roomName: targetRoom.name,
      checkIn: newBookingData.checkIn,
      checkOut: newBookingData.checkOut,
      nights,
      guestsCount: newBookingData.guestsCount,
      pricePerNight: targetRoom.pricePerNight,
      roomTotal,
      addOns: newBookingData.addOns,
      addOnsTotal,
      taxAmount,
      totalPrice,
      amountPaid: totalPrice,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: newBookingData.paymentMethod,
      specialRequests: newBookingData.specialRequests,
      charges: [
        {
          id: `chg-${Date.now()}-1`,
          description: `Room Stay: ${targetRoom.name} (${nights} night${nights > 1 ? 's' : ''})`,
          amount: roomTotal,
          date: newBookingData.checkIn,
          category: 'room'
        },
        ...newBookingData.addOns.map((add, idx) => ({
          id: `chg-${Date.now()}-add-${idx}`,
          description: add.name + (add.perNight ? ` (${nights} nights)` : ''),
          amount: add.perNight ? add.price * nights : add.price,
          date: newBookingData.checkIn,
          category: 'service' as const
        }))
      ],
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Check if guest profile exists or create one
    setGuests(prev => {
      const existing = prev.find(g => g.email.toLowerCase() === newBookingData.guestEmail.toLowerCase());
      if (existing) {
        return prev.map(g =>
          g.id === existing.id
            ? {
                ...g,
                totalStays: g.totalStays + 1,
                totalSpent: g.totalSpent + totalPrice,
                lastStay: newBookingData.checkIn
              }
            : g
        );
      } else {
        const newGuest: GuestProfile = {
          id: `gst-${Date.now()}`,
          name: newBookingData.guestName,
          email: newBookingData.guestEmail,
          phone: newBookingData.guestPhone,
          idNumber: 'VERIFIED-ID',
          vip: totalPrice > 1500,
          totalStays: 1,
          totalSpent: totalPrice,
          preferences: newBookingData.specialRequests || 'Standard hospitality service',
          notes: 'Booked online via HotelPro direct booking engine.',
          lastStay: newBookingData.checkIn
        };
        return [newGuest, ...prev];
      }
    });

    return newBooking;
  };

  const checkInBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          // Also set room status to occupied
          setRooms(rPrev =>
            rPrev.map(room => (room.id === b.roomId ? { ...room, status: 'occupied' } : room))
          );
          return {
            ...b,
            status: 'checked_in',
            checkedInAt: new Date().toISOString()
          };
        }
        return b;
      })
    );
  };

  const checkOutBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          // Room becomes dirty / cleaning needed
          setRooms(rPrev =>
            rPrev.map(room => (room.id === b.roomId ? { ...room, status: 'dirty' } : room))
          );
          // Auto add housekeeping task
          setHousekeepingTasks(hkPrev => [
            {
              id: `hk-${Date.now()}`,
              roomId: b.roomId,
              roomNumber: b.roomNumber,
              floor: parseInt(b.roomNumber[0], 10) || 1,
              status: 'dirty',
              priority: 'urgent',
              assignedTo: 'Housekeeping Team',
              notes: `Departure turnaround for guest ${b.guestName}. Full sanitation and fresh linen set.`,
              updatedAt: new Date().toISOString()
            },
            ...hkPrev
          ]);
          return {
            ...b,
            status: 'checked_out',
            checkedOutAt: new Date().toISOString()
          };
        }
        return b;
      })
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          // Free up room if it was reserved
          setRooms(rPrev =>
            rPrev.map(room => (room.id === b.roomId && room.status === 'occupied' ? { ...room, status: 'available' } : room))
          );
          return {
            ...b,
            status: 'cancelled',
            paymentStatus: 'refunded'
          };
        }
        return b;
      })
    );
  };

  const addChargeToBooking = (bookingId: string, chargeData: Omit<FolioCharge, 'id' | 'date'>) => {
    const newCharge: FolioCharge = {
      ...chargeData,
      id: `chg-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updatedCharges = [...b.charges, newCharge];
          const newTotal = b.totalPrice + newCharge.amount;
          return {
            ...b,
            charges: updatedCharges,
            totalPrice: Math.round(newTotal * 100) / 100
          };
        }
        return b;
      })
    );

    // Update active folio if modal is open
    setActiveFolioBooking(prev => {
      if (prev && prev.id === bookingId) {
        return {
          ...prev,
          charges: [...prev.charges, newCharge],
          totalPrice: Math.round((prev.totalPrice + newCharge.amount) * 100) / 100
        };
      }
      return prev;
    });
  };

  const updateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms(prev => prev.map(r => (r.id === roomId ? { ...r, status } : r)));
  };

  const updateHousekeepingStatus = (taskId: string, status: HousekeepingTask['status'], notes?: string) => {
    setHousekeepingTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          // If marked clean, update the corresponding room status too
          if (status === 'clean') {
            updateRoomStatus(t.roomId, 'available');
          } else if (status === 'maintenance') {
            updateRoomStatus(t.roomId, 'maintenance');
          } else if (status === 'in_progress') {
            updateRoomStatus(t.roomId, 'cleaning');
          }
          return {
            ...t,
            status,
            notes: notes !== undefined ? notes : t.notes,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
  };

  const createHousekeepingTask = (task: Omit<HousekeepingTask, 'id' | 'updatedAt'>) => {
    const newTask: HousekeepingTask = {
      ...task,
      id: `hk-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    setHousekeepingTasks(prev => [newTask, ...prev]);
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.ROOMS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.GUESTS);
    localStorage.removeItem(STORAGE_KEYS.HOUSEKEEPING);
    setRooms(INITIAL_ROOMS);
    setBookings(INITIAL_BOOKINGS);
    setGuests(INITIAL_GUESTS);
    setHousekeepingTasks(INITIAL_HOUSEKEEPING);
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        bookings,
        guests,
        housekeepingTasks,
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        stats,
        createBooking,
        checkInBooking,
        checkOutBooking,
        cancelBooking,
        addChargeToBooking,
        updateRoomStatus,
        updateHousekeepingStatus,
        createHousekeepingTask,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        isBookingModalOpen,
        setIsBookingModalOpen,
        activeFolioBooking,
        setActiveFolioBooking,
        resetAllData
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
