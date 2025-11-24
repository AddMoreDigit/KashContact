// Converters between different campaign formats

import type { Campaign as StoredCampaign } from './campaignStorage';

// Local app campaign interface (used in App.tsx and components)
export interface AppCampaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string; name?: string; avatar?: string }[];
  memberPerformance?: {
    email: string;
    name?: string;
    avatar?: string;
    contributionPercentage: number;
    contributedAmount: number;
    goalAmount: number;
    daysLeft: number;
    missedPayments: number;
    status: 'on-track' | 'completed' | 'critical';
  }[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
  category: string;
  startDate: string;
  endDate: string;
  contributionFrequency: string;
  cartItems: any[];
}

// Convert StoredCampaign to AppCampaign
export function storedToAppCampaign(stored: StoredCampaign): AppCampaign {
  // Format dates
  const startDate = new Date(stored.startDate);
  const endDate = new Date(stored.endDate);
  const dateString = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  
  // Determine status - if user created it, they manage it; if invited, they contribute
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const userEmail = userProfile.email || '';
  const isOrganizer = stored.organizerEmail === userEmail;
  const status: 'contribute' | 'manage' = isOrganizer ? 'manage' : 'contribute';
  
  // Extract provider from services
  const provider = stored.servicesBooked[0]?.provider || 'Service Provider';
  
  // Format services
  const services = stored.servicesBooked.map(service => ({
    name: service.provider || service.name,
    type: `${service.type.charAt(0).toUpperCase() + service.type.slice(1)}: ${service.name}`
  }));
  
  return {
    id: parseInt(stored.id.replace('campaign-', '')),
    title: stored.name,
    image: stored.image || 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080',
    provider,
    date: dateString,
    services,
    members: stored.members,
    goal: stored.totalAmount,
    contributed: stored.currentAmount,
    status,
    category: stored.category,
    startDate: stored.startDate,
    endDate: stored.endDate,
    contributionFrequency: stored.contributionFrequency,
    cartItems: stored.servicesBooked.map(service => ({
      id: service.id,
      type: service.type,
      name: service.name,
      price: service.cost,
      provider: service.provider,
      image: service.image,
      location: service.location,
      quantity: service.quantity || 1,
      nights: service.nights,
      checkIn: service.checkIn,
      checkOut: service.checkOut,
      totalPrice: service.cost
    }))
  };
}

// Convert AppCampaign to StoredCampaign
export function appToStoredCampaign(app: AppCampaign): StoredCampaign {
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const organizerName = app.members.find(m => m.email === userProfile.email)?.name || userProfile.fullNames || 'User';
  const organizerEmail = userProfile.email || 'user@example.com';
  const organizerPhone = userProfile.phoneNumber || '+27 000 000 000';
  
  return {
    id: `campaign-${app.id}`,
    name: app.title,
    category: app.category,
    organizer: organizerName,
    organizerEmail,
    organizerPhone,
    description: `Join us for an amazing ${app.category.toLowerCase()} experience!`,
    startDate: app.startDate,
    endDate: app.endDate,
    location: app.cartItems[0]?.location || 'Not specified',
    totalAmount: app.goal,
    currentAmount: app.contributed,
    progress: Math.round((app.contributed / app.goal) * 100),
    numberOfMembers: app.members.length,
    members: app.members,
    servicesBooked: app.cartItems || [],
    contributionFrequency: app.contributionFrequency,
    status: app.status === 'manage' ? 'accepted' : 'pending',
    image: app.image,
    itinerary: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Generate member performance data for a campaign
export function generateMemberPerformance(campaign: AppCampaign) {
  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'
  ];
  
  const statuses: Array<'on-track' | 'completed' | 'critical'> = ['on-track', 'completed', 'critical', 'on-track', 'on-track', 'on-track'];
  const percentages = [74, 100, 65, 74, 74, 74];
  
  const today = new Date();
  const endDate = new Date(campaign.endDate);
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  return campaign.members.map((member, index) => {
    const goalShare = campaign.goal / campaign.members.length;
    const percentage = percentages[index % percentages.length];
    const contributedAmount = (goalShare * percentage) / 100;
    
    // Generate name from email if not provided
    const name = member.name || member.email.split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    
    return {
      email: member.email,
      name: name,
      avatar: member.avatar || avatars[index % avatars.length],
      contributionPercentage: percentage,
      contributedAmount: contributedAmount,
      goalAmount: goalShare,
      daysLeft: daysLeft,
      missedPayments: index % 3,
      status: statuses[index % statuses.length],
    };
  });
}