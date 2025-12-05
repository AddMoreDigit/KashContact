// Service Provider (Vendor) profile management

// import imgRectangle143 from '../../imports/figma/asset/d8d0f6eef9e33d7a74a8eaa14da50a361867870c.png';
// import imgRectangle144 from '../../imports/figma/asset/5e1af89dd90bd46b3b066a2e4a43c094c7b26e1a.png';
// import imgRectangle145 from "../../imports/figma/asset/bddea6c45e13c33c0fca7f6dee07e6a62fd31a2f.png";
// import imgRectangle137 from '../../imports/figma/asset/76d9e1da34c25cad1b9eb31fba3e73ee2a3caf7f.png';
// import imgRectangle138 from '../../imports/figma/asset/9c06d82aa0b47b30d7f1ad21c98d1e2f8f618e2f.png';
// import imgRectangle139 from '../../imports/figma/asset/c876a2327e7e0b2ca2ae02ebf8ca9e1be3a23ef2.png';

export interface ServiceProviderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  location: string;
  description?: string;
  logo?: string;
  image?: string;
  category?: string;
}

const STORAGE_KEY = 'serviceProviderProfile';

// All available service providers in the system
const allServiceProviders: ServiceProviderProfile[] = [
  {
    id: 'vendor_001',
    name: 'Michael',
    email: 'michael@seaviewlodge.com',
    phone: '+27 123 456 789',
    businessName: 'Seaview Lodge',
    businessType: 'Accommodation',
    location: 'Cape Town',
    description: 'Premier accommodation provider in Cape Town offering luxury stays with ocean views.',
    image: 'https://images.unsplash.com/photo-1724218041680-a6b87c3c443e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMG9jZWFuJTIwdmlld3xlbnwxfHx8fDE3NjM2ODkxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_001',
    name: 'Blue Water Team',
    email: 'info@bluewater.co.za',
    phone: '+27 31 123 4567',
    businessName: 'Blue Water Hospitality Group',
    businessType: 'Accommodation',
    location: 'Durban',
    description: 'Luxury hotel chain offering world-class hospitality services across South Africa.',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzY3ODkzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_002',
    name: 'Lekkeslaap Team',
    email: 'info@lekkeslaap.co.za',
    phone: '+27 31 234 5678',
    businessName: 'Lekkeslaap Hospitality',
    businessType: 'Food Service & Motel',
    location: 'Durban',
    description: 'Comfortable motel accommodation with delicious food service options.',
    image: 'https://images.unsplash.com/photo-1630567396007-eb0fb467f49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RlbCUyMHJlc3RhdXJhbnQlMjBmb29kfGVufDF8fHx8MTc2MzY4OTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Food Service & Motel',
  },
  {
    id: 'sp_003',
    name: 'Cape Town Beach Team',
    email: 'info@capetownbeach.co.za',
    phone: '+27 21 345 6789',
    businessName: 'Cape Town Beach Resorts',
    businessType: 'Accommodation',
    location: 'Cape Town',
    description: 'Beachfront resort offering stunning ocean views and premium amenities.',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2MzY1NzIzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_005',
    name: 'Tastebites Team',
    email: 'bookings@tastebites.co.za',
    phone: '+27 31 456 7890',
    businessName: 'Tastebites Catering Services',
    businessType: 'Food Service',
    location: 'Durban',
    description: 'Professional catering services for all occasions with diverse menu options.',
    image: 'https://images.unsplash.com/photo-1732259495388-af40b972c311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzY4OTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Food Service',
  },
  {
    id: 'sp_006',
    name: 'Island Paradise Team',
    email: 'info@islandparadise.tz',
    phone: '+255 24 567 8901',
    businessName: 'Island Paradise Resorts',
    businessType: 'Accommodation',
    location: 'Zanzibar',
    description: 'Tropical island resort with pristine beaches and luxury accommodations.',
    image: 'https://images.unsplash.com/photo-1634645995827-885f9a67be50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGlzbGFuZCUyMHJlc29ydHxlbnwxfHx8fDE3NjM2MzE4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_007',
    name: 'Ocean View Team',
    email: 'reservations@oceanview.co.za',
    phone: '+27 21 678 9012',
    businessName: 'Ocean View Resort Group',
    businessType: 'Accommodation',
    location: 'Cape Town',
    description: 'Premium resort group with breathtaking ocean views and modern facilities.',
    image: 'https://images.unsplash.com/photo-1583401535382-a0814c295b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzYzNjg5MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_008',
    name: 'Safari Lodge Team',
    email: 'info@safarilodge.co.za',
    phone: '+27 31 789 0123',
    businessName: 'Safari Lodge Adventures',
    businessType: 'Accommodation',
    location: 'Durban',
    description: 'Adventure lodge offering safari experiences and wildlife encounters.',
    image: 'https://images.unsplash.com/photo-1734362815901-24bdeb199da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBsb2RnZSUyMGFmcmljYXxlbnwxfHx8fDE3NjM2ODkxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_009',
    name: 'Coastal Dining Team',
    email: 'bookings@coastaldining.co.za',
    phone: '+27 21 890 1234',
    businessName: 'Coastal Dining Experiences',
    businessType: 'Food Service',
    location: 'Cape Town',
    description: 'Upscale dining experiences featuring fresh seafood and coastal cuisine.',
    image: 'https://images.unsplash.com/photo-1759027044799-5aed5577f864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM2ODkxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Food Service',
  },
  {
    id: 'sp_010',
    name: 'Beach Paradise Team',
    email: 'info@beachparadise.tz',
    phone: '+255 24 901 2345',
    businessName: 'Beach Paradise Hotels',
    businessType: 'Accommodation',
    location: 'Zanzibar',
    description: 'Beachfront hotel chain with exceptional service and tropical ambiance.',
    image: 'https://images.unsplash.com/photo-1707296825230-3f106b3ac450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwaG90ZWx8ZW58MXx8fHwxNzYzNjg5MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_011',
    name: 'Mountain Retreat Team',
    email: 'info@mountainretreat.co.za',
    phone: '+27 21 012 3456',
    businessName: 'Mountain Retreat Lodges',
    businessType: 'Accommodation',
    location: 'Cape Town',
    description: 'Mountain lodge retreat offering tranquility and spectacular mountain views.',
    image: 'https://images.unsplash.com/photo-1762067412033-83b4420574a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxvZGdlJTIwcmV0cmVhdHxlbnwxfHx8fDE3NjM2ODkxODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
  {
    id: 'sp_012',
    name: 'Urban Hotel Team',
    email: 'reservations@urbanhotel.co.za',
    phone: '+27 31 123 4567',
    businessName: 'Urban Hotel Chain',
    businessType: 'Accommodation',
    location: 'Durban',
    description: 'Modern urban hotels with convenient city center locations and amenities.',
    image: 'https://images.unsplash.com/photo-1688659810075-dcd1ab9c9314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGNpdHklMjBob3RlbHxlbnwxfHx8fDE3NjM2ODkxODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accommodation',
  },
];

// Default service provider profile for logged-in vendor
const defaultProfile: ServiceProviderProfile = allServiceProviders[0];

export const serviceProviderStorage = {
  // Get current service provider profile
  get(): ServiceProviderProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch (error) {
      console.error('Error reading service provider profile:', error);
      return defaultProfile;
    }
  },

  // Get all service providers (for user browsing)
  getAll(): ServiceProviderProfile[] {
    return allServiceProviders;
  },

  // Get service provider by ID
  getById(id: string): ServiceProviderProfile | undefined {
    return allServiceProviders.find(sp => sp.id === id);
  },

  // Update service provider profile
  update(profile: ServiceProviderProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving service provider profile:', error);
    }
  },

  // Clear profile (logout)
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Initialize with default profile on first login
  initialize(): void {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      this.update(defaultProfile);
    }
  }
};
