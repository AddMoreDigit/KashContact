// Mock data for admin dashboard

export interface Campaign {
  id: string;
  title: string;
  vendor: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  participants: number;
  budget: number;
  startDate: string;
  endDate: string;
  image?: string;
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  pendingApproval: number;
  totalRevenue: number;
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Beach Getaway',
    vendor: 'Paradise Resorts',
    status: 'active',
    participants: 45,
    budget: 50000,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    image: 'https://via.placeholder.com/400x300?text=Beach+Getaway'
  },
  {
    id: '2',
    title: 'Corporate Team Building',
    vendor: 'Adventure Co',
    status: 'pending',
    participants: 120,
    budget: 75000,
    startDate: '2025-07-15',
    endDate: '2025-07-20',
    image: 'https://via.placeholder.com/400x300?text=Team+Building'
  },
  {
    id: '3',
    title: 'Luxury Spa Weekend',
    vendor: 'Serenity Spas',
    status: 'active',
    participants: 28,
    budget: 35000,
    startDate: '2025-05-01',
    endDate: '2025-09-30',
    image: 'https://via.placeholder.com/400x300?text=Spa+Weekend'
  },
  {
    id: '4',
    title: 'Mountain Hiking Adventure',
    vendor: 'Peak Experiences',
    status: 'completed',
    participants: 62,
    budget: 42000,
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    image: 'https://via.placeholder.com/400x300?text=Mountain+Hiking'
  },
  {
    id: '5',
    title: 'City Food Tour',
    vendor: 'Culinary Delights',
    status: 'active',
    participants: 85,
    budget: 25000,
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    image: 'https://via.placeholder.com/400x300?text=Food+Tour'
  }
];

export const campaignStats: CampaignStats = {
  totalCampaigns: campaigns.length,
  activeCampaigns: campaigns.filter(c => c.status === 'active').length,
  pendingApproval: campaigns.filter(c => c.status === 'pending').length,
  totalRevenue: campaigns.reduce((sum, c) => sum + c.budget, 0)
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'vendor' | 'standard' | 'corporate' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  campaigns?: number;
}

export const users: User[] = [
  {
    id: '1',
    name: 'John Vendor',
    email: 'john@vendor.com',
    role: 'vendor',
    status: 'active',
    joinDate: '2024-01-15',
    campaigns: 12
  },
  {
    id: '2',
    name: 'Jane Standard',
    email: 'jane@standard.com',
    role: 'standard',
    status: 'active',
    joinDate: '2024-03-22',
    campaigns: 5
  },
  {
    id: '3',
    name: 'Bob Corporate',
    email: 'bob@corporate.com',
    role: 'corporate',
    status: 'active',
    joinDate: '2024-02-10',
    campaigns: 8
  },
  {
    id: '4',
    name: 'Alice Inactive',
    email: 'alice@test.com',
    role: 'standard',
    status: 'inactive',
    joinDate: '2023-11-05',
    campaigns: 2
  }
];

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  status: 'verified' | 'pending' | 'rejected';
  rating: number;
  totalCampaigns: number;
  joinDate: string;
}

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Paradise Resorts',
    businessName: 'Paradise Resorts Ltd',
    email: 'contact@paradiseresorts.com',
    status: 'verified',
    rating: 4.8,
    totalCampaigns: 15,
    joinDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Adventure Co',
    businessName: 'Adventure Co Inc',
    email: 'info@adventureco.com',
    status: 'verified',
    rating: 4.6,
    totalCampaigns: 23,
    joinDate: '2023-09-15'
  },
  {
    id: '3',
    name: 'Serenity Spas',
    businessName: 'Serenity Spas Group',
    email: 'hello@serenityspas.com',
    status: 'pending',
    rating: 0,
    totalCampaigns: 0,
    joinDate: '2025-05-01'
  }
];
