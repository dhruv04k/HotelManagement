import { Room, Booking, GuestProfile, HousekeepingTask, BookingAddOn } from '../types/hotel';

export const HERO_IMAGE = '/src/assets/images/hotel_hero_exterior_1793179465357.jpg';
export const PRESIDENTIAL_IMAGE = '/src/assets/images/hotel_presidential_suite_1793179466277.jpg';
export const DELUXE_OCEAN_IMAGE = '/src/assets/images/hotel_deluxe_ocean_room_1793179466871.jpg';
export const BOUTIQUE_ROOM_IMAGE = '/src/assets/images/hotel_boutique_standard_room_1793179466757.jpg';

export const AVAILABLE_ADDONS: BookingAddOn[] = [
  { id: 'breakfast', name: 'Artisanal Breakfast Buffet', price: 35, perNight: true },
  { id: 'airport_transfer', name: 'Private Airport Chauffeur (Both Ways)', price: 95 },
  { id: 'spa_hydro', name: 'Thermal Spa & Hydrotherapy Day Pass', price: 65 },
  { id: 'welcome_champagne', name: 'Chilled Champagne & Organic Fruit Platter', price: 55 },
  { id: 'late_checkout', name: 'Guaranteed 3:00 PM Late Checkout', price: 40 }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    number: '101',
    name: 'Garden Terrace Queen',
    type: 'standard',
    floor: 1,
    pricePerNight: 160,
    capacity: 2,
    bedType: '1 Queen Bed',
    sizeSqFt: 340,
    image: BOUTIQUE_ROOM_IMAGE,
    amenities: ['High-Speed WiFi', 'Garden Patio', 'Rain Shower', 'Espresso Bar', 'Smart TV', 'Air Conditioning'],
    status: 'available',
    description: 'Quiet ground-floor retreat featuring a secluded private terrace with botanical garden views and handcrafted oak furniture.',
    features: ['300-thread count organic cotton', 'Walk-in rain shower', 'Nespresso coffee machine', 'Soundproof acoustic glass']
  },
  {
    id: 'room-102',
    number: '102',
    name: 'Boutique Garden Queen',
    type: 'standard',
    floor: 1,
    pricePerNight: 160,
    capacity: 2,
    bedType: '1 Queen Bed',
    sizeSqFt: 340,
    image: BOUTIQUE_ROOM_IMAGE,
    amenities: ['High-Speed WiFi', 'Garden Patio', 'Rain Shower', 'Espresso Bar', 'Smart TV'],
    status: 'occupied',
    description: 'Serene guest sanctuary overlooking the reflection pool, tailored for relaxed business or quiet weekend getaways.',
    features: ['Ergonomic workspace', 'Curated local minibar', 'Blackout drapery', 'Keyless digital entry']
  },
  {
    id: 'room-103',
    number: '103',
    name: 'Atrium Courtyard Standard',
    type: 'standard',
    floor: 1,
    pricePerNight: 145,
    capacity: 2,
    bedType: '1 Queen Bed',
    sizeSqFt: 310,
    image: BOUTIQUE_ROOM_IMAGE,
    amenities: ['High-Speed WiFi', 'Courtyard View', 'Rain Shower', 'Smart TV'],
    status: 'dirty',
    description: 'Cozy and intimate room near the main spa salon with warm natural textures and bespoke lighting.',
    features: ['Custom walnut desk', 'Dyson Supersonic hair dryer', 'Signature bathroom amenities']
  },
  {
    id: 'room-201',
    number: '201',
    name: 'Deluxe Ocean View Balcony',
    type: 'deluxe',
    floor: 2,
    pricePerNight: 240,
    capacity: 3,
    bedType: '1 King Bed',
    sizeSqFt: 460,
    image: DELUXE_OCEAN_IMAGE,
    amenities: ['Ocean Panorama', 'Private Balcony', 'Deep Soaking Tub', 'Breakfast Area', 'Espresso Bar', 'WiFi 6'],
    status: 'occupied',
    description: 'Sun-drenched coastal retreat with expansive floor-to-ceiling sliding glass doors opening directly to ocean breezes.',
    features: ['Private outdoor dining set', 'Freestanding soaking tub', 'Bose Bluetooth sound system', 'Pillow concierge menu']
  },
  {
    id: 'room-202',
    number: '202',
    name: 'Coastal Deluxe King',
    type: 'deluxe',
    floor: 2,
    pricePerNight: 240,
    capacity: 2,
    bedType: '1 King Bed',
    sizeSqFt: 440,
    image: DELUXE_OCEAN_IMAGE,
    amenities: ['Ocean Panorama', 'Private Balcony', 'Deep Soaking Tub', 'Espresso Bar', 'WiFi 6'],
    status: 'available',
    description: 'Elevated second-floor deluxe room featuring sweeping coastline vistas and bespoke linen lounging sofas.',
    features: ['Teak balcony loungers', 'Italian marble bathroom', 'Dual vanities', 'Daily turndown service']
  },
  {
    id: 'room-203',
    number: '203',
    name: 'Azure Deluxe Double',
    type: 'deluxe',
    floor: 2,
    pricePerNight: 260,
    capacity: 4,
    bedType: '2 Queen Beds',
    sizeSqFt: 490,
    image: DELUXE_OCEAN_IMAGE,
    amenities: ['Ocean Panorama', 'Private Balcony', 'Double Queen Beds', 'Dining Nook', 'WiFi 6'],
    status: 'cleaning',
    description: 'Generously proportioned double room ideal for families or traveling colleagues, paired with private coastal terrace.',
    features: ['Two premium plush queen beds', 'Walk-in dressing closet', 'Complimentary afternoon tea']
  },
  {
    id: 'room-301',
    number: '301',
    name: 'Executive Horizon Suite',
    type: 'suite',
    floor: 3,
    pricePerNight: 380,
    capacity: 3,
    bedType: '1 California King',
    sizeSqFt: 620,
    image: PRESIDENTIAL_IMAGE,
    amenities: ['Panoramic Horizon View', 'Separate Living Salon', 'Marble Master Bath', 'Cocktail Bar', 'Club Lounge Access'],
    status: 'occupied',
    description: 'Expansive corner suite featuring a separate parlor salon, bespoke marble bar, and floor-to-ceiling skyline windows.',
    features: ['Private wine cooler & spirits', 'Separate guest powder room', 'Dedicated 24/7 concierge liaison', 'VIP Club lounge privilege']
  },
  {
    id: 'room-302',
    number: '302',
    name: 'Grand Executive Suite',
    type: 'suite',
    floor: 3,
    pricePerNight: 395,
    capacity: 3,
    bedType: '1 California King',
    sizeSqFt: 650,
    image: PRESIDENTIAL_IMAGE,
    amenities: ['Panoramic Horizon View', 'Separate Living Salon', 'Marble Master Bath', 'Workstation', 'Club Lounge Access'],
    status: 'available',
    description: 'Lavish contemporary suite designed for elevated stays with executive work lounge and designer furnishings.',
    features: ['Bang & Olufsen acoustics', 'Motorized privacy blinds', 'Oversized hydrotherapy shower', 'Shoeshine & garment press']
  },
  {
    id: 'room-303',
    number: '303',
    name: 'Skyline Terrace Suite',
    type: 'suite',
    floor: 3,
    pricePerNight: 410,
    capacity: 2,
    bedType: '1 King Bed',
    sizeSqFt: 600,
    image: PRESIDENTIAL_IMAGE,
    amenities: ['Wraparound Terrace', 'Living Salon', 'Deep Soaking Tub', 'Club Lounge Access'],
    status: 'maintenance',
    description: 'Corner architectural haven featuring an open-air teak deck with heated outdoor daybeds and panoramic vistas.',
    features: ['Heated bathroom floors', 'Private fire table on terrace', 'Complimentary pressing of 2 garments']
  },
  {
    id: 'room-401',
    number: '401',
    name: 'The Azure Presidential Penthouse',
    type: 'penthouse',
    floor: 4,
    pricePerNight: 780,
    capacity: 4,
    bedType: '1 Master King & 1 Guest Queen',
    sizeSqFt: 1150,
    image: PRESIDENTIAL_IMAGE,
    amenities: ['Top Floor Penthouse', 'Private Rooftop Plunge Pool', 'Full Chef Pantry', 'Butler Service', 'Limousine Included'],
    status: 'occupied',
    description: 'The pinnacle of luxury hospitality. Top-floor penthouse offering panoramic 270-degree ocean & city views, private heated plunge pool, dedicated butler, and private elevator landing.',
    features: ['Private rooftop heated plunge pool', 'Dedicated 24-hour butler', 'Complimentary airport limousine', 'Dining salon for 6 guests', 'Premium curated cellar']
  },
  {
    id: 'room-402',
    number: '402',
    name: 'Royal Penthouse Suite',
    type: 'penthouse',
    floor: 4,
    pricePerNight: 720,
    capacity: 4,
    bedType: '1 Master King & 1 Guest Queen',
    sizeSqFt: 980,
    image: PRESIDENTIAL_IMAGE,
    amenities: ['Top Floor Penthouse', 'Rooftop Solarium', 'Full Kitchenette', 'Butler Service', 'Limousine Included'],
    status: 'available',
    description: 'Commanding penthouse residence with wraparound glass solarium, bespoke artwork, and world-class luxury finishes.',
    features: ['Private rooftop sun deck', 'Dedicated butler staff', 'Sub-Zero gourmet pantry', 'In-suite private dining']
  }
];

export const INITIAL_GUESTS: GuestProfile[] = [
  {
    id: 'gst-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@vancetech.io',
    phone: '+1 (415) 892-4112',
    idNumber: 'PASSPORT-A984129',
    vip: true,
    totalStays: 4,
    totalSpent: 4280,
    preferences: 'High floor, hypoallergenic pillows, sparkling water on arrival.',
    notes: 'Key corporate account executive. Prefers quiet rooms away from elevator banks.',
    lastStay: '2026-09-12'
  },
  {
    id: 'gst-2',
    name: 'Marcus Sterling',
    email: 'marcus.sterling@sterlingmedia.com',
    phone: '+1 (212) 555-8320',
    idNumber: 'DL-NY8839210',
    vip: true,
    totalStays: 6,
    totalSpent: 7450,
    preferences: 'Extra foam pillows, oat milk in minibar, late checkout request.',
    notes: 'Regular guest for financial quarterly summits. Loves the Presidential Penthouse.',
    lastStay: '2026-10-15'
  },
  {
    id: 'gst-3',
    name: 'Dr. Sophia Lindqvist',
    email: 'sophia.lindqvist@karolinska.se',
    phone: '+46 8 517 7000',
    idNumber: 'PASSPORT-SE44109',
    vip: false,
    totalStays: 2,
    totalSpent: 1280,
    preferences: 'Balcony room facing sea, decaf espresso pods.',
    notes: 'Medical conference speaker. Check-out confirmed for today.',
    lastStay: '2026-08-04'
  },
  {
    id: 'gst-4',
    name: 'Julian Bennett',
    email: 'j.bennett@apexdesign.co',
    phone: '+44 20 7946 0912',
    idNumber: 'PASSPORT-GB882194',
    vip: false,
    totalStays: 1,
    totalSpent: 640,
    preferences: 'High-speed LAN cable, feather duvet.',
    notes: 'Arriving this afternoon for architecture site inspection.',
    lastStay: '2026-04-10'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-101',
    bookingRef: 'HP-84910',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@vancetech.io',
    guestPhone: '+1 (415) 892-4112',
    guestId: 'gst-1',
    roomId: 'room-301',
    roomNumber: '301',
    roomType: 'suite',
    roomName: 'Executive Horizon Suite',
    checkIn: '2026-10-26',
    checkOut: '2026-10-30',
    nights: 4,
    guestsCount: 2,
    pricePerNight: 380,
    roomTotal: 1520,
    addOns: [
      { id: 'breakfast', name: 'Artisanal Breakfast Buffet', price: 35, perNight: true },
      { id: 'spa_hydro', name: 'Thermal Spa & Hydrotherapy Day Pass', price: 65 }
    ],
    addOnsTotal: 205,
    taxAmount: 207,
    totalPrice: 1932,
    amountPaid: 1932,
    status: 'checked_in',
    paymentStatus: 'paid',
    paymentMethod: 'corporate_bill',
    specialRequests: 'Sparkling mineral water upon arrival and high-floor room.',
    charges: [
      { id: 'chg-1', description: 'Room Charge (Night 1 & 2)', amount: 760, date: '2026-10-26', category: 'room' },
      { id: 'chg-2', description: 'Michelin Dinner at The Azure Restaurant', amount: 184, date: '2026-10-27', category: 'dining' },
      { id: 'chg-3', description: 'Thermal Spa Hydrotherapy Package', amount: 65, date: '2026-10-27', category: 'spa' },
      { id: 'chg-4', description: 'Minibar - Artisanal Gin & Tonics', amount: 32, date: '2026-10-27', category: 'minibar' }
    ],
    createdAt: '2026-10-18T14:30:00Z',
    checkedInAt: '2026-10-26T15:20:00Z'
  },
  {
    id: 'bkg-102',
    bookingRef: 'HP-91024',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus.sterling@sterlingmedia.com',
    guestPhone: '+1 (212) 555-8320',
    guestId: 'gst-2',
    roomId: 'room-401',
    roomNumber: '401',
    roomType: 'penthouse',
    roomName: 'The Azure Presidential Penthouse',
    checkIn: '2026-10-27',
    checkOut: '2026-10-31',
    nights: 4,
    guestsCount: 2,
    pricePerNight: 780,
    roomTotal: 3120,
    addOns: [
      { id: 'welcome_champagne', name: 'Chilled Champagne & Organic Fruit Platter', price: 55 },
      { id: 'late_checkout', name: 'Guaranteed 3:00 PM Late Checkout', price: 40 }
    ],
    addOnsTotal: 95,
    taxAmount: 385.8,
    totalPrice: 3600.8,
    amountPaid: 3600.8,
    status: 'checked_in',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    specialRequests: 'Extra velvet hangers and oat milk replenished daily.',
    charges: [
      { id: 'chg-10', description: 'Penthouse Room Charge (Night 1)', amount: 780, date: '2026-10-27', category: 'room' },
      { id: 'chg-11', description: 'Dom Pérignon 2013 In-Suite Butler Service', amount: 340, date: '2026-10-27', category: 'dining' }
    ],
    createdAt: '2026-10-12T09:15:00Z',
    checkedInAt: '2026-10-27T16:05:00Z'
  },
  {
    id: 'bkg-103',
    bookingRef: 'HP-73291',
    guestName: 'Dr. Sophia Lindqvist',
    guestEmail: 'sophia.lindqvist@karolinska.se',
    guestPhone: '+46 8 517 7000',
    guestId: 'gst-3',
    roomId: 'room-201',
    roomNumber: '201',
    roomType: 'deluxe',
    roomName: 'Deluxe Ocean View Balcony',
    checkIn: '2026-10-25',
    checkOut: '2026-10-28', // Today's departure!
    nights: 3,
    guestsCount: 1,
    pricePerNight: 240,
    roomTotal: 720,
    addOns: [
      { id: 'breakfast', name: 'Artisanal Breakfast Buffet', price: 35, perNight: true }
    ],
    addOnsTotal: 105,
    taxAmount: 99,
    totalPrice: 924,
    amountPaid: 924,
    status: 'checked_in',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    specialRequests: 'Quiet room with early morning express check-out.',
    charges: [
      { id: 'chg-20', description: 'Room Charge 3 Nights', amount: 720, date: '2026-10-25', category: 'room' },
      { id: 'chg-21', description: 'Breakfast Buffet x3', amount: 105, date: '2026-10-26', category: 'dining' },
      { id: 'chg-22', description: 'Airport Departure Shuttle', amount: 45, date: '2026-10-28', category: 'transport' }
    ],
    createdAt: '2026-10-05T11:20:00Z',
    checkedInAt: '2026-10-25T14:15:00Z'
  },
  {
    id: 'bkg-104',
    bookingRef: 'HP-65821',
    guestName: 'Julian Bennett',
    guestEmail: 'j.bennett@apexdesign.co',
    guestPhone: '+44 20 7946 0912',
    guestId: 'gst-4',
    roomId: 'room-102',
    roomNumber: '102',
    roomType: 'standard',
    roomName: 'Boutique Garden Queen',
    checkIn: '2026-10-28', // Today's arrival!
    checkOut: '2026-10-31',
    nights: 3,
    guestsCount: 1,
    pricePerNight: 160,
    roomTotal: 480,
    addOns: [
      { id: 'airport_transfer', name: 'Private Airport Chauffeur (Both Ways)', price: 95 }
    ],
    addOnsTotal: 95,
    taxAmount: 69,
    totalPrice: 644,
    amountPaid: 644,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    specialRequests: 'Ground floor room near garden walkway.',
    charges: [
      { id: 'chg-30', description: 'Advance Stay Deposit', amount: 644, date: '2026-10-20', category: 'room' }
    ],
    createdAt: '2026-10-20T17:40:00Z'
  },
  {
    id: 'bkg-105',
    bookingRef: 'HP-54129',
    guestName: 'Claire Duprès',
    guestEmail: 'claire.dupres@artparis.fr',
    guestPhone: '+33 1 42 68 55 00',
    roomId: 'room-202',
    roomNumber: '202',
    roomType: 'deluxe',
    roomName: 'Coastal Deluxe King',
    checkIn: '2026-11-01',
    checkOut: '2026-11-05',
    nights: 4,
    guestsCount: 2,
    pricePerNight: 240,
    roomTotal: 960,
    addOns: [
      { id: 'breakfast', name: 'Artisanal Breakfast Buffet', price: 35, perNight: true },
      { id: 'welcome_champagne', name: 'Chilled Champagne & Organic Fruit Platter', price: 55 }
    ],
    addOnsTotal: 195,
    taxAmount: 138.6,
    totalPrice: 1293.6,
    amountPaid: 500,
    status: 'confirmed',
    paymentStatus: 'partially_paid',
    paymentMethod: 'credit_card',
    specialRequests: 'Anniversary celebration; quiet room preferred.',
    charges: [
      { id: 'chg-40', description: 'Initial Reservation Deposit', amount: 500, date: '2026-10-24', category: 'room' }
    ],
    createdAt: '2026-10-24T10:11:00Z'
  }
];

export const INITIAL_HOUSEKEEPING: HousekeepingTask[] = [
  {
    id: 'hk-1',
    roomId: 'room-103',
    roomNumber: '103',
    floor: 1,
    status: 'dirty',
    priority: 'urgent',
    assignedTo: 'Maria Santos',
    notes: 'Guest checked out at 09:30 AM. Deep linen turn and sanitize.',
    updatedAt: '2026-10-28T09:35:00Z'
  },
  {
    id: 'hk-2',
    roomId: 'room-203',
    roomNumber: '203',
    floor: 2,
    status: 'in_progress',
    priority: 'normal',
    assignedTo: 'Carlos Mendes',
    notes: 'Mid-stay daily refresh requested.',
    updatedAt: '2026-10-28T10:15:00Z'
  },
  {
    id: 'hk-3',
    roomId: 'room-303',
    roomNumber: '303',
    floor: 3,
    status: 'maintenance',
    priority: 'high',
    assignedTo: 'Kevin Liu (Facilities)',
    notes: 'Balcony sliding door roller track calibration.',
    updatedAt: '2026-10-27T18:00:00Z'
  },
  {
    id: 'hk-4',
    roomId: 'room-101',
    roomNumber: '101',
    floor: 1,
    status: 'clean',
    priority: 'normal',
    assignedTo: 'Maria Santos',
    notes: 'Inspected and certified clean for arrival.',
    updatedAt: '2026-10-28T08:00:00Z'
  },
  {
    id: 'hk-5',
    roomId: 'room-202',
    roomNumber: '202',
    floor: 2,
    status: 'clean',
    priority: 'normal',
    assignedTo: 'Carlos Mendes',
    notes: 'Full sanitization completed, stocked with luxury bathrobes.',
    updatedAt: '2026-10-28T08:45:00Z'
  }
];
