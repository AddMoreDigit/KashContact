// Centralized service storage management

export interface ServiceData {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  description?: string;
  price?: string;
  priceUnit?: string;
  priceRate?: string;
  bookings?: string;
  termsAndConditions?: string;
  gallery?: string[];
  vendorCreated?: boolean;
  available?: boolean;
  serviceProviderId?: string;
  serviceProviderName?: string;
  serviceProviderEmail?: string;
  serviceProviderPhone?: string;
  originalId?: number;
}

const STORAGE_KEY = 'vendorCreatedServices';

const defaultServiceProviders: ServiceData[] = [
  // ========================================
  // SERVICE PROVIDER 1: Seaview Lodge
  // ========================================
  
  // Accommodation Services
  {
    id: 1,
    name: 'Deluxe Suite Stay',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Luxurious suite with ocean views, king-size bed, private balcony, and modern amenities. Perfect for couples seeking a romantic getaway.',
    price: 'R1 200.00',
    priceRate: '1200.00',
    priceUnit: 'per night',
    bookings: '12 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHN1aXRlfGVufDF8fHx8MTc2MzA1NzEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in time is 3:00 PM and check-out is at 11:00 AM. We offer free cancellation up to 48 hours before arrival. A 50% deposit is required upon booking to secure your reservation.\nAll bookings are subject to availability. Payment must be completed 24 hours before service delivery. Guests are responsible for any damages to property or equipment during their stay.',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 104,
    name: 'Standard Double Room',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Comfortable double room with garden view, queen-size bed, en-suite bathroom, and complimentary Wi-Fi.',
    price: 'R850.00',
    priceRate: '850.00',
    priceUnit: 'per night',
    bookings: '18 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHN1aXRlfGVufDF8fHx8MTc2MzA1NzEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in time is 3:00 PM and check-out is at 11:00 AM. We offer free cancellation up to 48 hours before arrival. A 50% deposit is required upon booking to secure your reservation.\nAll bookings are subject to availability. Payment must be completed 24 hours before service delivery. Guests are responsible for any damages to property or equipment during their stay.',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 113,
    name: 'Family Suite',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Spacious family suite with two bedrooms, kitchenette, living area, and stunning mountain views. Ideal for families.',
    price: 'R1 800.00',
    priceRate: '1800.00',
    priceUnit: 'per night',
    bookings: '8 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZhbWlseSUyMHJvb218ZW58MXx8fHwxNzYzMDU3MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in time is 3:00 PM and check-out is at 11:00 AM. We offer free cancellation up to 48 hours before arrival. A 50% deposit is required upon booking to secure your reservation.\nAll bookings are subject to availability. Payment must be completed 24 hours before service delivery. Guests are responsible for any damages to property or equipment during their stay.',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },

  // Food Services
  {
    id: 2,
    name: 'Seafood Platter',
    location: 'Cape Town',
    category: 'Food & Dining',
    description: 'Fresh seafood platter featuring prawns, mussels, calamari, line fish, and chips. Served with lemon butter sauce.',
    price: 'R350.00',
    priceRate: '350.00',
    priceUnit: 'per meal',
    bookings: '25 Orders this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdHRlcnxlbnwxfHx8fDE3NjMwNTcxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Pre-order required 24 hours in advance | Dietary restrictions accommodated | Service charge: 10%',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 114,
    name: 'Traditional Braai Package',
    location: 'Cape Town',
    category: 'Food & Dining',
    description: 'Authentic South African braai experience with boerewors, lamb chops, chicken, pap, chakalaka, and salads. Serves 10 people.',
    price: 'R2 500.00',
    priceRate: '2500.00',
    priceUnit: 'per package',
    bookings: '15 Orders this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYmElMjBncmlsbHxlbnwxfHx8fDE3NjMwNTcxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Pre-order required 48 hours in advance | Minimum 10 people | Braai equipment provided',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 115,
    name: 'Continental Breakfast Buffet',
    location: 'Cape Town',
    category: 'Food & Dining',
    description: 'Full breakfast buffet with fresh pastries, fruits, cereals, yogurt, eggs, bacon, and hot beverages.',
    price: 'R180.00',
    priceRate: '180.00',
    priceUnit: 'per person',
    bookings: '45 Orders this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBidWZmZXR8ZW58MXx8fHwxNzYzMDU3MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Served daily 7:00 AM - 10:00 AM | Pre-booking required for groups | Special dietary needs accommodated',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },

  // Transport Services
  {
    id: 3,
    name: 'Airport Shuttle Service',
    location: 'Cape Town',
    category: 'Transport',
    description: 'Comfortable airport transfer service with professional drivers, air-conditioned vehicles, and luggage assistance.',
    price: 'R350.00',
    priceRate: '350.00',
    priceUnit: 'per trip',
    bookings: '30 Bookings this Week',
    available: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwc2h1dHRsZXxlbnwxfHx8fDE3NjMwNTcxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Booking required 24 hours in advance | Free cancellation up to 12 hours | Meet & greet service included',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 116,
    name: 'Private Car Hire with Driver',
    location: 'Cape Town',
    category: 'Transport',
    description: 'Full-day private car hire with experienced driver for sightseeing and city tours. Mercedes-Benz sedan.',
    price: 'R1 500.00',
    priceRate: '1500.00',
    priceUnit: 'per day',
    bookings: '12 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBkcml2ZXJ8ZW58MXx8fHwxNzYzMDU3MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: '8-hour service | Fuel included | Additional hours charged at R200/hour | 48-hour cancellation notice',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },

  // Activities/Tour Services
  {
    id: 4,
    name: 'Cape Town City Tour',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Half-day guided city tour covering Table Mountain, V&A Waterfront, Bo-Kaap, and City Bowl. Includes cable car ticket.',
    price: 'R650.00',
    priceRate: '650.00',
    priceUnit: 'per person',
    bookings: '22 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMGNpdHl8ZW58MXx8fHwxNzYzMDU3MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Duration: 4-5 hours | Minimum 2 people | Cable car subject to weather | Includes transport and guide',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 5,
    name: 'Safari Game Reserve Tour',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Full-day safari adventure to Aquila Game Reserve. See the Big 5, enjoy game drives, and traditional lunch included.',
    price: 'R2 500.00',
    priceRate: '2500.00',
    priceUnit: 'per person',
    bookings: 'Full Booked this Month',
    available: false,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB6ZWJyYXxlbnwxfHx8fDE3NjMwNTcxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Full-day tour (10 hours) | Includes transport, game drive, and lunch | Early morning departure | Booking required 7 days in advance',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 6,
    name: 'Sunset Boat Cruise',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Romantic sunset cruise along the coast with champagne, canapés, and stunning views of Table Mountain and the Atlantic Ocean.',
    price: 'R850.00',
    priceRate: '850.00',
    priceUnit: 'per person',
    bookings: '18 Bookings this Week',
    available: true,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwdG91cnxlbnwxfHx8fDE3NjMwNTcxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Duration: 2 hours | Minimum 2 people | Subject to weather conditions | Includes drinks and snacks | Booking required 48 hours',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },
  {
    id: 117,
    name: 'Wine Country Tour',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Full-day wine tasting tour of Stellenbosch and Franschhoek. Visit 3 estates, cheese pairing, and gourmet lunch.',
    price: 'R1 200.00',
    priceRate: '1200.00',
    priceUnit: 'per person',
    bookings: '16 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Duration: 8 hours | Minimum 4 people | Includes transport, tastings, and lunch | Must be 18+ | Booking required 3 days',
    serviceProviderId: 'vendor_001',
    serviceProviderName: 'Seaview Lodge',
    serviceProviderEmail: 'michael@seaviewlodge.com',
    serviceProviderPhone: '+27 123 456 789',
  },

  // ========================================
  // SERVICE PROVIDER 2: Blue Water Hospitality
  // ========================================
  
  {
    id: 101,
    name: 'Blue Water Executive Suite',
    location: 'Durban',
    category: 'Accommodation',
    description: 'Premium executive suite with panoramic ocean views, separate living area, work desk, and complimentary executive lounge access.',
    price: 'R2 200.00',
    priceRate: '2200.00',
    priceUnit: 'per night',
    bookings: '15 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 12:00 PM | Free Wi-Fi and parking | Complimentary breakfast | Cancellation: 72 hours notice',
    serviceProviderId: 'sp_001',
    serviceProviderName: 'Blue Water Hospitality Group',
    serviceProviderEmail: 'sarah.johnson@bluewater.co.za',
    serviceProviderPhone: '+27 31 123 4567',
  },
  {
    id: 118,
    name: 'Ocean View Standard Room',
    location: 'Durban',
    category: 'Accommodation',
    description: 'Comfortable room with partial ocean views, modern amenities, and access to hotel facilities including pool and gym.',
    price: 'R950.00',
    priceRate: '950.00',
    priceUnit: 'per night',
    bookings: '28 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHZpZXclMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzMDU3MTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 12:00 PM | Free Wi-Fi and parking | Cancellation: 72 hours notice',
    serviceProviderId: 'sp_001',
    serviceProviderName: 'Blue Water Hospitality Group',
    serviceProviderEmail: 'sarah.johnson@bluewater.co.za',
    serviceProviderPhone: '+27 31 123 4567',
  },
  {
    id: 119,
    name: 'Fine Dining Experience',
    location: 'Durban',
    category: 'Food & Dining',
    description: '5-course tasting menu featuring fresh seafood and local ingredients. Paired with premium South African wines.',
    price: 'R750.00',
    priceRate: '750.00',
    priceUnit: 'per person',
    bookings: '12 Bookings this Week',
    available: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc2MzA1NzEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Reservations required 48 hours | Dress code: Smart casual | Service charge: 12% | Wine pairing additional R350',
    serviceProviderId: 'sp_001',
    serviceProviderName: 'Blue Water Hospitality Group',
    serviceProviderEmail: 'sarah.johnson@bluewater.co.za',
    serviceProviderPhone: '+27 31 123 4567',
  },
  {
    id: 120,
    name: 'Beachfront Conference Package',
    location: 'Durban',
    category: 'Activities',
    description: 'Full-day conference package with meeting room, AV equipment, Wi-Fi, tea breaks, and lunch for up to 50 people.',
    price: 'R15 000.00',
    priceRate: '15000.00',
    priceUnit: 'per day',
    bookings: '6 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbXxlbnwxfHx8fDE3NjMwNTcxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Booking required 14 days in advance | Capacity: 50 people | Includes all equipment and catering | Setup/cleanup included',
    serviceProviderId: 'sp_001',
    serviceProviderName: 'Blue Water Hospitality Group',
    serviceProviderEmail: 'sarah.johnson@bluewater.co.za',
    serviceProviderPhone: '+27 31 123 4567',
  },

  // ========================================
  // SERVICE PROVIDER 3: Lekkeslaap Hospitality
  // ========================================
  
  {
    id: 102,
    name: 'Lekkeslaap Deluxe Room',
    location: 'Durban',
    category: 'Accommodation',
    description: 'Cozy room with modern décor, comfortable bedding, mini-bar, and access to on-site restaurant. Perfect for business travelers.',
    price: 'R650.00',
    priceRate: '650.00',
    priceUnit: 'per night',
    bookings: '24 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 11:00 AM | Free parking | Breakfast available at extra cost | 24-hour cancellation',
    serviceProviderId: 'sp_002',
    serviceProviderName: 'Lekkeslaap Hospitality',
    serviceProviderEmail: 'david.williams@lekkeslaap.co.za',
    serviceProviderPhone: '+27 31 234 5678',
  },
  {
    id: 121,
    name: 'Traditional South African Cuisine',
    location: 'Durban',
    category: 'Food & Dining',
    description: 'Authentic South African dishes including bunny chow, bobotie, and malva pudding. Family-style portions.',
    price: 'R180.00',
    priceRate: '180.00',
    priceUnit: 'per person',
    bookings: '35 Orders this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFmcmljYW4lMjBmb29kfGVufDF8fHx8MTc2MzA1NzEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Served daily 12:00 PM - 9:00 PM | Vegetarian options available | Group bookings welcomed',
    serviceProviderId: 'sp_002',
    serviceProviderName: 'Lekkeslaap Hospitality',
    serviceProviderEmail: 'david.williams@lekkeslaap.co.za',
    serviceProviderPhone: '+27 31 234 5678',
  },
  {
    id: 122,
    name: 'Durban City Transfer',
    location: 'Durban',
    category: 'Transport',
    description: 'Reliable city transfer service with comfortable vehicles for business meetings, shopping trips, or sightseeing.',
    price: 'R250.00',
    priceRate: '250.00',
    priceUnit: 'per trip',
    bookings: '42 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2MzA1NzEzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Within city limits | Booking required 6 hours in advance | Waiting time: First 15 minutes free',
    serviceProviderId: 'sp_002',
    serviceProviderName: 'Lekkeslaap Hospitality',
    serviceProviderEmail: 'david.williams@lekkeslaap.co.za',
    serviceProviderPhone: '+27 31 234 5678',
  },

  // ========================================
  // SERVICE PROVIDER 4: Cape Town Beach Resorts
  // ========================================
  
  {
    id: 103,
    name: 'Cape Town Beach Villa',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Stunning beachfront villa with 4 bedrooms, private pool, fully equipped kitchen, and direct beach access. Ideal for groups.',
    price: 'R5 500.00',
    priceRate: '5500.00',
    priceUnit: 'per night',
    bookings: '8 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 3:00 PM | Check-out: 10:00 AM | Sleeps 8 people | Minimum 2-night stay | Security deposit: R5000 | 7-day cancellation',
    serviceProviderId: 'sp_003',
    serviceProviderName: 'Cape Town Beach Resorts',
    serviceProviderEmail: 'emma.davis@capetownbeach.co.za',
    serviceProviderPhone: '+27 21 345 6789',
  },
  {
    id: 123,
    name: 'Beachside BBQ Package',
    location: 'Cape Town',
    category: 'Food & Dining',
    description: 'Private beach BBQ setup with fresh seafood, meats, salads, and drinks. Chef service included for groups up to 15 people.',
    price: 'R4 500.00',
    priceRate: '4500.00',
    priceUnit: 'per package',
    bookings: '10 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYmElMjBncmlsbHxlbnwxfHx8fDE3NjMwNTcxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Booking required 5 days in advance | Minimum 8 people | Includes setup, chef, and cleanup | Alcohol extra',
    serviceProviderId: 'sp_003',
    serviceProviderName: 'Cape Town Beach Resorts',
    serviceProviderEmail: 'emma.davis@capetownbeach.co.za',
    serviceProviderPhone: '+27 21 345 6789',
  },
  {
    id: 124,
    name: 'Surf Lessons',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Professional surf lessons for beginners and intermediate surfers. All equipment provided, small group sessions.',
    price: 'R450.00',
    priceRate: '450.00',
    priceUnit: 'per person',
    bookings: '32 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwbGVzc29uc3xlbnwxfHx8fDE3NjMwNTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Duration: 2 hours | Maximum 6 people per session | All equipment included | Age: 10+ | Weather dependent',
    serviceProviderId: 'sp_003',
    serviceProviderName: 'Cape Town Beach Resorts',
    serviceProviderEmail: 'emma.davis@capetownbeach.co.za',
    serviceProviderPhone: '+27 21 345 6789',
  },
  {
    id: 125,
    name: 'Coastal Hiking Experience',
    location: 'Cape Town',
    category: 'Activities',
    description: 'Guided coastal hike along scenic trails with breathtaking ocean views. Includes packed lunch and photography stops.',
    price: 'R550.00',
    priceRate: '550.00',
    priceUnit: 'per person',
    bookings: '14 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwaGlraW5nfGVufDF8fHx8MTc2MzA1NzE0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Duration: 4-5 hours | Moderate fitness required | Minimum 4 people | Includes guide and lunch | Booking required 48 hours',
    serviceProviderId: 'sp_003',
    serviceProviderName: 'Cape Town Beach Resorts',
    serviceProviderEmail: 'emma.davis@capetownbeach.co.za',
    serviceProviderPhone: '+27 21 345 6789',
  },

  // ========================================
  // ADDITIONAL SERVICE PROVIDERS
  // ========================================
  
  {
    id: 105,
    name: 'Tastebites Corporate Catering',
    location: 'Durban',
    category: 'Food & Dining',
    description: 'Professional catering for corporate events, conferences, and functions. Customized menus available.',
    price: 'R250.00',
    priceRate: '250.00',
    priceUnit: 'per person',
    bookings: '18 Events this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Minimum 20 people | Booking required 7 days | Includes setup and service | Dietary requirements accommodated',
    serviceProviderId: 'sp_005',
    serviceProviderName: 'Tastebites Catering Services',
    serviceProviderEmail: 'bookings@tastebites.co.za',
    serviceProviderPhone: '+27 31 456 7890',
  },
  {
    id: 106,
    name: 'Island Paradise Honeymoon Suite',
    location: 'Zanzibar',
    category: 'Accommodation',
    description: 'Romantic beachfront suite with private plunge pool, four-poster bed, and stunning Indian Ocean views.',
    price: 'R4 200.00',
    priceRate: '4200.00',
    priceUnit: 'per night',
    bookings: '12 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 11:00 AM | Includes breakfast and sunset cocktails | Minimum 3-night stay',
    serviceProviderId: 'sp_006',
    serviceProviderName: 'Island Paradise Resorts',
    serviceProviderEmail: 'info@islandparadise.tz',
    serviceProviderPhone: '+255 24 567 8901',
  },
  {
    id: 107,
    name: 'Ocean View Penthouse',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Luxurious 3-bedroom penthouse with wraparound balcony, private jacuzzi, and panoramic views of the Atlantic.',
    price: 'R8 500.00',
    priceRate: '8500.00',
    priceUnit: 'per night',
    bookings: '5 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 3:00 PM | Check-out: 11:00 AM | Sleeps 6 | Concierge service included | Minimum 2-night stay',
    serviceProviderId: 'sp_007',
    serviceProviderName: 'Ocean View Resort Group',
    serviceProviderEmail: 'reservations@oceanview.co.za',
    serviceProviderPhone: '+27 21 678 9012',
  },
  {
    id: 108,
    name: 'Safari Lodge Bush Camp',
    location: 'Durban',
    category: 'Accommodation',
    description: 'Authentic bush camp experience with luxury tents, en-suite bathrooms, and guided wildlife walks.',
    price: 'R3 200.00',
    priceRate: '3200.00',
    priceUnit: 'per night',
    bookings: '14 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'All-inclusive: Meals and activities | Minimum 2-night stay | Game drives included | Booking required 14 days',
    serviceProviderId: 'sp_008',
    serviceProviderName: 'Safari Lodge Adventures',
    serviceProviderEmail: 'info@safarilodge.co.za',
    serviceProviderPhone: '+27 31 789 0123',
  },
  {
    id: 109,
    name: 'Coastal Chef Experience',
    location: 'Cape Town',
    category: 'Food & Dining',
    description: 'Private chef service in your accommodation. Fresh seafood and local specialties prepared in your kitchen.',
    price: 'R2 500.00',
    priceRate: '2500.00',
    priceUnit: 'per meal (4-8 people)',
    bookings: '8 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Booking required 72 hours | Groceries extra | Minimum 4 people | Chef service 3-4 hours | Cleanup included',
    serviceProviderId: 'sp_009',
    serviceProviderName: 'Coastal Dining Experiences',
    serviceProviderEmail: 'bookings@coastaldining.co.za',
    serviceProviderPhone: '+27 21 890 1234',
  },
  {
    id: 110,
    name: 'Beach Paradise Bungalow',
    location: 'Zanzibar',
    category: 'Accommodation',
    description: 'Traditional thatched bungalow steps from the beach. Air-conditioned, with private veranda and hammock.',
    price: 'R1 800.00',
    priceRate: '1800.00',
    priceUnit: 'per night',
    bookings: '20 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 11:00 AM | Breakfast included | Beach activities available',
    serviceProviderId: 'sp_010',
    serviceProviderName: 'Beach Paradise Hotels',
    serviceProviderEmail: 'info@beachparadise.tz',
    serviceProviderPhone: '+255 24 901 2345',
  },
  {
    id: 111,
    name: 'Mountain Retreat Lodge',
    location: 'Cape Town',
    category: 'Accommodation',
    description: 'Secluded mountain lodge with hiking trails, outdoor fire pit, and spectacular mountain views. Perfect for nature lovers.',
    price: 'R1 600.00',
    priceRate: '1600.00',
    priceUnit: 'per night',
    bookings: '11 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 3:00 PM | Check-out: 11:00 AM | Self-catering or meals available | Guided hikes extra',
    serviceProviderId: 'sp_011',
    serviceProviderName: 'Mountain Retreat Lodges',
    serviceProviderEmail: 'info@mountainretreat.co.za',
    serviceProviderPhone: '+27 21 012 3456',
  },
  {
    id: 112,
    name: 'Urban Business Hotel',
    location: 'Durban',
    category: 'Accommodation',
    description: 'Modern business hotel in city center. High-speed Wi-Fi, work desk, fitness center, and meeting rooms.',
    price: 'R780.00',
    priceRate: '780.00',
    priceUnit: 'per night',
    bookings: '38 Bookings this Month',
    available: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjMwNTcxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    termsAndConditions: 'Check-in: 2:00 PM | Check-out: 11:00 AM | Free Wi-Fi and parking | Business center access | Express check-out',
    serviceProviderId: 'sp_012',
    serviceProviderName: 'Urban Hotel Chain',
    serviceProviderEmail: 'reservations@urbanhotel.co.za',
    serviceProviderPhone: '+27 31 123 4567',
  },
];

export const serviceStorage = {
  // Get all vendor-created services (excluding default ones)
  getAll(): ServiceData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading services from localStorage:', error);
      return [];
    }
  },

  // Get all service providers (default + vendor-created)
  getAllServiceProviders(): ServiceData[] {
    const vendorServices = this.getAll();
    return [...defaultServiceProviders, ...vendorServices];
  },

  // Get unique service provider profiles
  getUniqueServiceProviders(): Array<{
    id: string;
    businessName: string;
    businessType: string;
    location: string;
    image: string;
    email: string;
    phone: string;
    serviceCount: number;
  }> {
    const allServices = this.getAllServiceProviders();
    console.log('serviceStorage.getUniqueServiceProviders: Total services:', allServices.length);
    const providerMap = new Map();

    allServices.forEach(service => {
      const providerId = service.serviceProviderId || `provider_${service.id}`;
      
      if (!providerMap.has(providerId)) {
        // Determine business type from service categories
        const providerServices = allServices.filter(s => s.serviceProviderId === providerId);
        const categories = [...new Set(providerServices.map(s => s.category))];
        
        let businessType = 'Hospitality';
        if (categories.some(cat => cat.toLowerCase().includes('accommodation'))) {
          businessType = 'Accommodation';
        } else if (categories.some(cat => cat.toLowerCase().includes('food'))) {
          businessType = 'Food Service';
        } else if (categories.some(cat => cat.toLowerCase().includes('transport'))) {
          businessType = 'Transportation';
        } else if (categories.some(cat => cat.toLowerCase().includes('tour') || cat.toLowerCase().includes('activity'))) {
          businessType = 'Tours & Activities';
        }

        // Prioritize accommodation images for provider image, fallback to first service image
        const accommodationService = providerServices.find(s => 
          s.category.toLowerCase().includes('accommodation')
        );
        const imageService = accommodationService || providerServices[0];

        providerMap.set(providerId, {
          id: providerId,
          businessName: service.serviceProviderName || 'Service Provider',
          businessType: businessType,
          location: service.location,
          image: imageService.image,
          email: service.serviceProviderEmail || '',
          phone: service.serviceProviderPhone || '',
          serviceCount: providerServices.length,
        });
      }
    });

    const providers = Array.from(providerMap.values());
    console.log('serviceStorage.getUniqueServiceProviders: Unique providers:', providers.length);
    console.log('serviceStorage.getUniqueServiceProviders: Providers:', providers);
    return providers;
  },

  // Get all unique locations from services
  getUniqueLocations(): string[] {
    const allServices = this.getAllServiceProviders();
    return [...new Set(allServices.map(s => s.location))].filter(Boolean);
  },

  // Get all unique categories from services
  getUniqueCategories(): string[] {
    const allServices = this.getAllServiceProviders();
    return [...new Set(allServices.map(s => s.category))].filter(Boolean);
  },

  // Filter services by criteria
  filterServices(filters: {
    location?: string;
    category?: string;
    providerId?: string;
    available?: boolean;
  }): ServiceData[] {
    let services = this.getAllServiceProviders();

    if (filters.location) {
      services = services.filter(s => s.location === filters.location);
    }

    if (filters.category) {
      services = services.filter(s => s.category === filters.category);
    }

    if (filters.providerId) {
      services = services.filter(s => s.serviceProviderId === filters.providerId);
    }

    if (filters.available !== undefined) {
      services = services.filter(s => s.available === filters.available);
    }

    return services;
  },

  // Add a new service
  add(service: ServiceData): void {
    try {
      const services = this.getAll();
      const newService = { ...service, vendorCreated: true };
      services.push(newService);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch (error) {
      console.error('Error saving service to localStorage:', error);
    }
  },

  // Update an existing service
  update(updatedService: ServiceData): void {
    try {
      const services = this.getAll();
      const index = services.findIndex(s => s.id === updatedService.id);
      if (index !== -1) {
        services[index] = updatedService;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
      }
    } catch (error) {
      console.error('Error updating service in localStorage:', error);
    }
  },

  // Delete a service
  delete(id: number): void {
    try {
      const services = this.getAll();
      const filtered = services.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting service from localStorage:', error);
    }
  },

  // Get a single service by ID
  getById(id: number): ServiceData | undefined {
    return this.getAll().find(s => s.id === id);
  },

  // Clear all services (for testing)
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};