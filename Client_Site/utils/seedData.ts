// Comprehensive seed data initialization for the entire app
import { saveCampaign, type Campaign, type CampaignMember, type CampaignService } from './campaignStorage';
import { addNotification } from './notificationStorage';

// Real member profiles used consistently across the app
export const SEED_MEMBERS = {
  michael: {
    name: 'Michael Chen',
    email: 'michael@keahcont.co.za',
    phone: '+27 82 345 6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  sarah: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@keahcont.co.za',
    phone: '+27 83 456 7890',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  david: {
    name: 'David Williams',
    email: 'david.williams@keahcont.co.za',
    phone: '+27 84 567 8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
  emma: {
    name: 'Emma Davis',
    email: 'emma.davis@keahcont.co.za',
    phone: '+27 85 678 9012',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  john: {
    name: 'John Smith',
    email: 'john.smith@keahcont.co.za',
    phone: '+27 86 789 0123',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
  },
  lisa: {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@keahcont.co.za',
    phone: '+27 87 890 1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  },
};

// Seed campaigns with realistic data
export const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Cape Town Adventure 2025',
    category: 'vacation',
    organizer: SEED_MEMBERS.michael.name,
    organizerEmail: SEED_MEMBERS.michael.email,
    organizerPhone: SEED_MEMBERS.michael.phone,
    description: 'Join us for an unforgettable adventure exploring the beauty of Cape Town! This 5-day trip includes accommodation at luxury hotels, guided tours of Table Mountain and Cape Point, wine tasting in Stellenbosch, and authentic Cape Malay cuisine experiences.',
    startDate: '2025-12-15',
    endDate: '2025-12-20',
    location: 'Cape Town, South Africa',
    totalAmount: 45000,
    currentAmount: 33300,
    progress: 74,
    numberOfMembers: 6,
    members: [
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
    ],
    servicesBooked: [
      {
        id: 1,
        name: 'Deluxe Ocean View Room',
        provider: 'The Table Bay Hotel',
        type: 'room',
        cost: 8500,
        details: '5-star luxury accommodation with ocean views',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
        quantity: 3,
        nights: 5,
        checkIn: '2025-12-15',
        checkOut: '2025-12-20',
        location: 'Cape Town',
      },
      {
        id: 5,
        name: 'Private Wine Tour',
        provider: 'Stellenbosch Wine Tours',
        type: 'activity',
        cost: 3500,
        details: 'Full-day private wine tasting tour',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
        quantity: 6,
        location: 'Cape Town',
      },
      {
        id: 11,
        name: 'Cape Malay Cooking Class',
        provider: 'Bo-Kaap Culinary',
        type: 'food',
        cost: 2500,
        details: 'Traditional Cape Malay cuisine cooking experience',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
        quantity: 6,
        location: 'Cape Town',
      },
    ],
    contributionFrequency: 'monthly',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Check-in at The Table Bay Hotel' },
      { day: 'Day 2', activity: 'Table Mountain Cable Car & City Tour' },
      { day: 'Day 3', activity: 'Stellenbosch Wine Tour & Tasting' },
      { day: 'Day 4', activity: 'Cape Point & Penguin Colony Visit' },
      { day: 'Day 5', activity: 'Bo-Kaap Cooking Class & Check-out' },
    ],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'campaign-2',
    name: 'Durban Beach Holiday',
    category: 'beach',
    organizer: SEED_MEMBERS.sarah.name,
    organizerEmail: SEED_MEMBERS.sarah.email,
    organizerPhone: SEED_MEMBERS.sarah.phone,
    description: 'Experience the golden beaches of Durban! This relaxing getaway includes beachfront accommodation, sunset cruises, traditional Zulu cultural experiences, and the best seafood Durban has to offer.',
    startDate: '2025-11-10',
    endDate: '2025-11-14',
    location: 'Durban, South Africa',
    totalAmount: 32000,
    currentAmount: 32000,
    progress: 100,
    numberOfMembers: 4,
    members: [
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
    ],
    servicesBooked: [
      {
        id: 3,
        name: 'Beachfront Suite',
        provider: 'Beverly Hills Hotel',
        type: 'room',
        cost: 7200,
        details: 'Luxury beachfront accommodation',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
        quantity: 2,
        nights: 4,
        checkIn: '2025-11-10',
        checkOut: '2025-11-14',
        location: 'Durban',
      },
      {
        id: 7,
        name: 'Sunset Cruise',
        provider: 'Durban Harbour Cruises',
        type: 'activity',
        cost: 1800,
        details: 'Evening sunset cruise with dinner',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
        quantity: 4,
        location: 'Durban',
      },
      {
        id: 13,
        name: 'Seafood Platter Experience',
        provider: 'Ocean Basket Gourmet',
        type: 'food',
        cost: 1600,
        details: 'Premium seafood dining experience',
        image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400',
        quantity: 4,
        location: 'Durban',
      },
    ],
    contributionFrequency: 'weekly',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Beach Relaxation' },
      { day: 'Day 2', activity: 'uShaka Marine World & Aquarium' },
      { day: 'Day 3', activity: 'Sunset Cruise & Seafood Dinner' },
      { day: 'Day 4', activity: 'PheZulu Safari Park & Cultural Village' },
    ],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-18'),
  },
  {
    id: 'campaign-3',
    name: 'Zanzibar Island Escape',
    category: 'vacation',
    organizer: SEED_MEMBERS.david.name,
    organizerEmail: SEED_MEMBERS.david.email,
    organizerPhone: SEED_MEMBERS.david.phone,
    description: 'Escape to paradise in Zanzibar! Enjoy pristine white sand beaches, crystal-clear waters, spice tours, Stone Town exploration, and authentic Swahili cuisine in this tropical paradise.',
    startDate: '2026-01-20',
    endDate: '2026-01-27',
    location: 'Zanzibar, Tanzania',
    totalAmount: 58000,
    currentAmount: 37700,
    progress: 65,
    numberOfMembers: 5,
    members: [
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
    ],
    servicesBooked: [
      {
        id: 25,
        name: 'Ocean View Villa',
        provider: 'Zanzibar Beach Resort',
        type: 'room',
        cost: 12000,
        details: 'Luxury beachfront villa',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400',
        quantity: 2,
        nights: 7,
        checkIn: '2026-01-20',
        checkOut: '2026-01-27',
        location: 'Zanzibar',
      },
      {
        id: 27,
        name: 'Spice Tour Adventure',
        provider: 'Zanzibar Spice Tours',
        type: 'activity',
        cost: 1500,
        details: 'Full-day spice plantation tour',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b13b1c4e9c?w=400',
        quantity: 5,
        location: 'Zanzibar',
      },
      {
        id: 28,
        name: 'Swahili Feast',
        provider: 'Stone Town Restaurant',
        type: 'food',
        cost: 2800,
        details: 'Traditional Swahili dining experience',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
        quantity: 5,
        location: 'Zanzibar',
      },
    ],
    contributionFrequency: 'monthly',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Villa Check-in' },
      { day: 'Day 2', activity: 'Beach Relaxation & Water Sports' },
      { day: 'Day 3', activity: 'Spice Tour & Plantation Visit' },
      { day: 'Day 4', activity: 'Stone Town Historical Tour' },
      { day: 'Day 5', activity: 'Snorkeling & Dolphin Tour' },
      { day: 'Day 6', activity: 'Sunset Dhow Cruise & Swahili Feast' },
      { day: 'Day 7', activity: 'Leisure & Departure' },
    ],
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-19'),
  },
  {
    id: 'campaign-4',
    name: 'Team Building Retreat',
    category: 'corporate',
    organizer: SEED_MEMBERS.emma.name,
    organizerEmail: SEED_MEMBERS.emma.email,
    organizerPhone: SEED_MEMBERS.emma.phone,
    description: 'Corporate team building retreat focused on collaboration and innovation. Includes leadership workshops, team challenges, outdoor activities, and professional networking opportunities.',
    startDate: '2025-12-01',
    endDate: '2025-12-03',
    location: 'Cape Town, South Africa',
    totalAmount: 28000,
    currentAmount: 28000,
    progress: 100,
    numberOfMembers: 4,
    members: [
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
    ],
    servicesBooked: [
      {
        id: 2,
        name: 'Executive Conference Room',
        provider: 'Cape Grace Hotel',
        type: 'room',
        cost: 6500,
        details: 'Premium conference facilities',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
        quantity: 1,
        nights: 3,
        checkIn: '2025-12-01',
        checkOut: '2025-12-03',
        location: 'Cape Town',
      },
      {
        id: 6,
        name: 'Team Building Activities',
        provider: 'Adventure Works',
        type: 'activity',
        cost: 4200,
        details: 'Professional team building program',
        image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=400',
        quantity: 4,
        location: 'Cape Town',
      },
    ],
    contributionFrequency: 'once-off',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Leadership Workshop' },
      { day: 'Day 2', activity: 'Team Building Challenges & Activities' },
      { day: 'Day 3', activity: 'Innovation Session & Departure' },
    ],
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: 'campaign-5',
    name: 'Garden Route Road Trip',
    category: 'adventure',
    organizer: SEED_MEMBERS.john.name,
    organizerEmail: SEED_MEMBERS.john.email,
    organizerPhone: SEED_MEMBERS.john.phone,
    description: 'Epic road trip along South Africa\'s famous Garden Route! Experience stunning coastal scenery, wildlife encounters, adventure activities, and charming coastal towns.',
    startDate: '2026-02-10',
    endDate: '2026-02-17',
    location: 'Garden Route, South Africa',
    totalAmount: 42000,
    currentAmount: 0, // Newly accepted campaign - no contributions yet
    progress: 0,
    numberOfMembers: 6,
    members: [
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
    ],
    servicesBooked: [
      {
        id: 15,
        name: 'Luxury SUV Rental',
        provider: 'Garden Route Car Hire',
        type: 'transport',
        cost: 8500,
        details: '7-seater luxury SUV for 7 days',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
        quantity: 1,
        location: 'Cape Town',
      },
      {
        id: 4,
        name: 'Boutique Guesthouse',
        provider: 'Knysna Waterfront Lodge',
        type: 'room',
        cost: 5600,
        details: 'Charming waterfront accommodation',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        quantity: 3,
        nights: 7,
        checkIn: '2026-02-10',
        checkOut: '2026-02-17',
        location: 'Garden Route',
      },
    ],
    contributionFrequency: 'monthly',
    status: 'accepted', // Changed to accepted, but with 0% contribution
    image: 'https://images.unsplash.com/photo-1503595855261-9418f48a991a?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Cape Town to Mossel Bay' },
      { day: 'Day 2', activity: 'Mossel Bay to Knysna' },
      { day: 'Day 3', activity: 'Knysna Lagoon & Featherbed Nature Reserve' },
      { day: 'Day 4', activity: 'Knysna to Plettenberg Bay' },
      { day: 'Day 5', activity: 'Bloukrans Bridge Bungee & Beach' },
      { day: 'Day 6', activity: 'Tsitsikamma National Park' },
      { day: 'Day 7', activity: 'Return Journey to Cape Town' },
    ],
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'campaign-6',
    name: 'Weekend Golf Getaway',
    category: 'sports',
    organizer: SEED_MEMBERS.lisa.name,
    organizerEmail: SEED_MEMBERS.lisa.email,
    organizerPhone: SEED_MEMBERS.lisa.phone,
    description: 'Exclusive golf weekend at championship courses! Includes rounds at premium golf estates, luxury accommodation, fine dining, and professional coaching sessions.',
    startDate: '2025-11-28',
    endDate: '2025-11-30',
    location: 'Stellenbosch, South Africa',
    totalAmount: 24000,
    currentAmount: 0, // Declined campaign - no contributions allowed
    progress: 0, // Declined campaign - 0% progress
    numberOfMembers: 4,
    members: [
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
    ],
    servicesBooked: [
      {
        id: 8,
        name: 'Golf Estate Villa',
        provider: 'Stellenbosch Golf Club',
        type: 'room',
        cost: 4800,
        details: 'Luxury villa on golf estate',
        image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400',
        quantity: 2,
        nights: 2,
        checkIn: '2025-11-28',
        checkOut: '2025-11-30',
        location: 'Stellenbosch',
      },
      {
        id: 9,
        name: 'Championship Golf Rounds',
        provider: 'Stellenbosch Golf Club',
        type: 'activity',
        cost: 3200,
        details: '2 rounds at championship course',
        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
        quantity: 4,
        location: 'Stellenbosch',
      },
    ],
    contributionFrequency: 'once-off',
    status: 'declined', // Declined campaign - inactive and no contributions
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1080',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Practice Round' },
      { day: 'Day 2', activity: 'Championship Round & Dinner' },
    ],
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-18'),
  },
  {
    id: 'campaign-7',
    name: 'Kruger Safari Adventure',
    category: 'safari',
    organizer: SEED_MEMBERS.michael.name,
    organizerEmail: SEED_MEMBERS.michael.email,
    organizerPhone: SEED_MEMBERS.michael.phone,
    description: 'Experience the ultimate African safari in Kruger National Park! This 4-day adventure includes luxury lodge accommodation, guided game drives, bush walks, and authentic boma dining under the stars.',
    startDate: '2026-03-15',
    endDate: '2026-03-19',
    location: 'Kruger National Park, South Africa',
    totalAmount: 52000,
    currentAmount: 26000,
    progress: 50,
    numberOfMembers: 5,
    members: [
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
    ],
    servicesBooked: [
      {
        id: 101,
        name: 'Luxury Safari Lodge',
        provider: 'Sabi Sands Game Reserve',
        type: 'room',
        cost: 18000,
        details: '5-star luxury safari lodge with private deck',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
        quantity: 3,
        nights: 4,
        checkIn: '2026-03-15',
        checkOut: '2026-03-19',
        location: 'Kruger National Park',
      },
      {
        id: 102,
        name: 'Guided Game Drives',
        provider: 'Kruger Safari Tours',
        type: 'activity',
        cost: 8500,
        details: 'Morning and evening game drives with expert rangers',
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=400',
        quantity: 5,
        location: 'Kruger National Park',
      },
      {
        id: 103,
        name: 'Bush Walk Experience',
        provider: 'Kruger Walking Safaris',
        type: 'activity',
        cost: 3200,
        details: 'Guided bush walk with trained rangers',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
        quantity: 5,
        location: 'Kruger National Park',
      },
      {
        id: 104,
        name: 'Boma Dinner',
        provider: 'Safari Lodge Restaurant',
        type: 'food',
        cost: 2800,
        details: 'Traditional African feast under the stars',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
        quantity: 5,
        location: 'Kruger National Park',
      },
    ],
    contributionFrequency: 'monthly',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NjM5Mjg5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Afternoon Game Drive' },
      { day: 'Day 2', activity: 'Morning Game Drive & Bush Walk' },
      { day: 'Day 3', activity: 'Full Day Safari & Boma Dinner' },
      { day: 'Day 4', activity: 'Sunrise Game Drive & Departure' },
    ],
    createdAt: new Date('2024-11-22'),
    updatedAt: new Date('2024-11-22'),
  },
  {
    id: 'campaign-8',
    name: 'Drakensberg Mountain Retreat',
    category: 'adventure',
    organizer: SEED_MEMBERS.sarah.name,
    organizerEmail: SEED_MEMBERS.sarah.email,
    organizerPhone: SEED_MEMBERS.sarah.phone,
    description: 'Escape to the majestic Drakensberg Mountains! This adventure includes mountain lodge stays, guided hiking trails, waterfall exploration, and traditional South African braai experiences.',
    startDate: '2026-04-10',
    endDate: '2026-04-14',
    location: 'Drakensberg, South Africa',
    totalAmount: 38000,
    currentAmount: 15200,
    progress: 40,
    numberOfMembers: 6,
    members: [
      { name: SEED_MEMBERS.sarah.name, email: SEED_MEMBERS.sarah.email, avatar: SEED_MEMBERS.sarah.avatar },
      { name: SEED_MEMBERS.michael.name, email: SEED_MEMBERS.michael.email, avatar: SEED_MEMBERS.michael.avatar },
      { name: SEED_MEMBERS.david.name, email: SEED_MEMBERS.david.email, avatar: SEED_MEMBERS.david.avatar },
      { name: SEED_MEMBERS.emma.name, email: SEED_MEMBERS.emma.email, avatar: SEED_MEMBERS.emma.avatar },
      { name: SEED_MEMBERS.john.name, email: SEED_MEMBERS.john.email, avatar: SEED_MEMBERS.john.avatar },
      { name: SEED_MEMBERS.lisa.name, email: SEED_MEMBERS.lisa.email, avatar: SEED_MEMBERS.lisa.avatar },
    ],
    servicesBooked: [
      {
        id: 105,
        name: 'Mountain Lodge Chalet',
        provider: 'Drakensberg Sun Resort',
        type: 'room',
        cost: 9600,
        details: 'Cozy mountain lodge with panoramic views',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        quantity: 3,
        nights: 4,
        checkIn: '2026-04-10',
        checkOut: '2026-04-14',
        location: 'Drakensberg',
      },
      {
        id: 106,
        name: 'Guided Mountain Hiking',
        provider: 'Berg Adventures',
        type: 'activity',
        cost: 4200,
        details: 'Guided hikes to scenic viewpoints and waterfalls',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
        quantity: 6,
        location: 'Drakensberg',
      },
      {
        id: 107,
        name: 'Rock Art Tour',
        provider: 'Drakensberg Heritage Tours',
        type: 'activity',
        cost: 1800,
        details: 'Ancient San rock art site exploration',
        image: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=400',
        quantity: 6,
        location: 'Drakensberg',
      },
      {
        id: 108,
        name: 'Traditional Braai Experience',
        provider: 'Mountain Grill',
        type: 'food',
        cost: 2400,
        details: 'Authentic South African barbecue feast',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
        quantity: 6,
        location: 'Drakensberg',
      },
    ],
    contributionFrequency: 'monthly',
    status: 'accepted',
    image: 'https://images.unsplash.com/photo-1610479201125-a5c7f17370a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHJlc29ydHxlbnwxfHx8fDE3NjM5NjI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itinerary: [
      { day: 'Day 1', activity: 'Arrival & Sunset Viewing' },
      { day: 'Day 2', activity: 'Tugela Falls Hike' },
      { day: 'Day 3', activity: 'Rock Art Sites & Cultural Tour' },
      { day: 'Day 4', activity: 'Cathedral Peak Hike & Braai Dinner' },
      { day: 'Day 5', activity: 'Morning Walk & Departure' },
    ],
    createdAt: new Date('2024-11-23'),
    updatedAt: new Date('2024-11-23'),
  },
];

// Initialize all seed data
export function initializeSeedData() {
  try {
    // Check if data already exists
    const existingCampaigns = localStorage.getItem('campaigns_data');
    
    // Always log for debugging
    console.log('🔍 Checking seed data...');
    console.log('Existing campaigns:', existingCampaigns);
    
    // Only initialize if no data exists OR if it's empty
    if (!existingCampaigns) {
      console.log('✨ No existing campaigns found. Initializing seed data...');
      
      // Save all seed campaigns
      SEED_CAMPAIGNS.forEach(campaign => {
        console.log(`📦 Saving campaign: ${campaign.name}`);
        saveCampaign(campaign);
      });
      
      console.log('✅ Seed data initialized successfully!');
      console.log(`📊 Total campaigns saved: ${SEED_CAMPAIGNS.length}`);
      
      // Verify the save
      const savedCampaigns = localStorage.getItem('campaigns_data');
      console.log('Saved campaigns in storage:', savedCampaigns);
      
      // Add welcome notifications for the logged-in user
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      if (userProfile.email) {
        addNotification({
          id: `notif-welcome-${Date.now()}`,
          type: 'campaign',
          title: 'Welcome to Keah Contribution!',
          message: 'Start exploring campaigns and contributing to your goals.',
          timestamp: new Date(),
          read: false,
          campaignId: 'campaign-1',
          campaignName: 'Cape Town Adventure 2025',
        });
      }
      
      return true;
    } else {
      const parsed = JSON.parse(existingCampaigns);
      console.log(`ℹ️ Seed data already exists. Found ${parsed.length} campaigns.`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error initializing seed data:', error);
    return false;
  }
}

// Reset all data (useful for testing)
export function resetAllData() {
  try {
    localStorage.removeItem('campaigns_data');
    localStorage.removeItem('notifications');
    console.log('✅ All data reset successfully!');
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
}

// Force reinitialize seed data (clears existing and adds fresh data)
export function forceInitializeSeedData() {
  try {
    console.log('🔄 Force reinitializing seed data...');
    
    // Clear existing data
    resetAllData();
    
    // Save all seed campaigns
    SEED_CAMPAIGNS.forEach(campaign => {
      console.log(`📦 Saving campaign: ${campaign.name}`);
      saveCampaign(campaign);
    });
    
    console.log('✅ Seed data force initialized successfully!');
    console.log(`📊 Total campaigns saved: ${SEED_CAMPAIGNS.length}`);
    
    // Verify the save
    const savedCampaigns = localStorage.getItem('campaigns_data');
    if (savedCampaigns) {
      const parsed = JSON.parse(savedCampaigns);
      console.log(`✅ Verified: ${parsed.length} campaigns in storage`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error force initializing seed data:', error);
    return false;
  }
}

// Get seed member by email
export function getSeedMemberByEmail(email: string) {
  return Object.values(SEED_MEMBERS).find(member => member.email === email);
}

// Get all seed member emails
export function getAllSeedMemberEmails(): string[] {
  return Object.values(SEED_MEMBERS).map(member => member.email);
}

// Check if email is a seed member
export function isSeedMember(email: string): boolean {
  return getAllSeedMemberEmails().includes(email);
}