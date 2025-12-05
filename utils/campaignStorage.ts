// Centralized campaign data storage

export interface CampaignMember {
  name: string;
  email: string;
  avatar?: string;
}

export interface CampaignService {
  id: number;
  name: string;
  provider: string;
  type: 'room' | 'food' | 'transport' | 'activity';
  cost: number;
  details: string;
  image?: string;
  quantity?: number;
  nights?: number;
  checkIn?: string;
  checkOut?: string;
  location?: string;
}

export interface Campaign {
  id: string;
  name: string;
  category: string;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  creatorEmail: string; // The original creator of the campaign
  adminEmails: string[]; // Array of admin emails (creator + co-admin)
  description?: string;
  startDate: string;
  endDate: string;
  location: string;
  totalAmount: number;
  currentAmount: number;
  progress: number;
  numberOfMembers: number;
  members: CampaignMember[];
  servicesBooked: CampaignService[];
  contributionFrequency: string;
  status: 'pending' | 'accepted' | 'declined';
  image?: string;
  itinerary?: Array<{ day: string; activity: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const CAMPAIGNS_KEY = 'campaigns_data';

// Get all campaigns
export function getAllCampaigns(): Campaign[] {
  try {
    const stored = localStorage.getItem(CAMPAIGNS_KEY);
    if (!stored) return [];
    
    const campaigns: Campaign[] = JSON.parse(stored);
    return campaigns;
  } catch (error) {
    console.error('Error loading campaigns:', error);
    return [];
  }
}

// Get campaign by ID
export function getCampaignById(campaignId: string): Campaign | null {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.find(c => c.id === campaignId) || null;
  } catch (error) {
    console.error('Error getting campaign:', error);
    return null;
  }
}

// Get campaigns by status
export function getCampaignsByStatus(status: 'pending' | 'accepted' | 'declined'): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => c.status === status);
  } catch (error) {
    console.error('Error getting campaigns by status:', error);
    return [];
  }
}

// Get campaigns for vendor (all pending, accepted, or declined campaigns)
export function getVendorCampaigns(): Campaign[] {
  try {
    return getAllCampaigns();
  } catch (error) {
    console.error('Error getting vendor campaigns:', error);
    return [];
  }
}

// Get campaigns created by user
export function getUserCampaigns(organizer: string): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => c.organizer === organizer);
  } catch (error) {
    console.error('Error getting user campaigns:', error);
    return [];
  }
}

// Get campaigns where user is a member
export function getCampaignsForMember(memberEmail: string): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => 
      c.members.some(m => m.email === memberEmail) || 
      c.organizerEmail === memberEmail
    );
  } catch (error) {
    console.error('Error getting member campaigns:', error);
    return [];
  }
}

// Get campaigns where user is organizer (created by them)
export function getCampaignsCreatedByUser(organizerEmail: string): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => c.organizerEmail === organizerEmail);
  } catch (error) {
    console.error('Error getting user created campaigns:', error);
    return [];
  }
}

// Get campaigns where user is a member but not organizer (invited campaigns)
export function getCampaignsUserIsInvitedTo(memberEmail: string): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => 
      c.organizerEmail !== memberEmail && 
      c.members.some(m => m.email === memberEmail)
    );
  } catch (error) {
    console.error('Error getting invited campaigns:', error);
    return [];
  }
}

// Save new campaign
export function saveCampaign(campaign: Campaign): void {
  try {
    const campaigns = getAllCampaigns();
    
    // Remove existing campaign with same ID if any
    const filtered = campaigns.filter(c => c.id !== campaign.id);
    
    filtered.push({
      ...campaign,
      createdAt: campaign.createdAt || new Date(),
      updatedAt: new Date()
    });
    
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error saving campaign:', error);
  }
}

// Update existing campaign
export function updateCampaign(campaignId: string, updates: Partial<Campaign>): void {
  try {
    const campaigns = getAllCampaigns();
    const index = campaigns.findIndex(c => c.id === campaignId);
    
    if (index === -1) {
      console.error('Campaign not found');
      return;
    }
    
    campaigns[index] = {
      ...campaigns[index],
      ...updates,
      updatedAt: new Date()
    };
    
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  } catch (error) {
    console.error('Error updating campaign:', error);
  }
}

// Update campaign status
export function updateCampaignStatusOnly(campaignId: string, status: 'pending' | 'accepted' | 'declined'): void {
  updateCampaign(campaignId, { status });
}

// Update campaign progress/funding
export function updateCampaignProgress(campaignId: string, currentAmount: number): void {
  try {
    const campaign = getCampaignById(campaignId);
    if (!campaign) {
      console.error('Campaign not found');
      return;
    }
    
    const progress = Math.round((currentAmount / campaign.totalAmount) * 100);
    
    updateCampaign(campaignId, {
      currentAmount,
      progress
    });
  } catch (error) {
    console.error('Error updating campaign progress:', error);
  }
}

// Delete campaign
export function deleteCampaign(campaignId: string): void {
  try {
    const campaigns = getAllCampaigns();
    const filtered = campaigns.filter(c => c.id !== campaignId);
    
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting campaign:', error);
  }
}

// Helper: Generate campaign itinerary from dates
export function generateItinerary(startDate: string, endDate: string): Array<{ day: string; activity: string }> {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const itinerary: Array<{ day: string; activity: string }> = [];
  
  for (let i = 0; i < days; i++) {
    if (i === 0) {
      itinerary.push({ day: 'Day 1', activity: 'Arrival & Check-in' });
    } else if (i === days - 1) {
      itinerary.push({ day: `Day ${i + 1}`, activity: 'Check-out & Departure' });
    } else {
      itinerary.push({ day: `Day ${i + 1}`, activity: 'Activities & Experiences' });
    }
  }
  
  return itinerary;
}

// Helper: Extract location from services
export function extractLocationFromServices(services: CampaignService[]): string {
  // Try to find location from services
  for (const service of services) {
    if (service.location) {
      return service.location;
    }
  }
  return 'Not specified';
}

// Check if user is a campaign admin
export function isCampaignAdmin(campaign: Campaign, userEmail: string): boolean {
  return campaign.adminEmails.includes(userEmail);
}

// Check if user is the campaign creator
export function isCampaignCreator(campaign: Campaign, userEmail: string): boolean {
  return campaign.creatorEmail === userEmail;
}

// Check if user is a campaign member (including admins)
export function isCampaignMember(campaign: Campaign, userEmail: string): boolean {
  return campaign.members.some(m => m.email === userEmail) || campaign.adminEmails.includes(userEmail);
}

// Get campaigns where user is an admin
export function getCampaignsWhereUserIsAdmin(userEmail: string): Campaign[] {
  try {
    const campaigns = getAllCampaigns();
    return campaigns.filter(c => c.adminEmails.includes(userEmail));
  } catch (error) {
    console.error('Error getting admin campaigns:', error);
    return [];
  }
}

// Add co-admin to campaign
export function addCampaignCoAdmin(campaignId: string, coAdminEmail: string): void {
  try {
    const campaign = getCampaignById(campaignId);
    if (!campaign) {
      console.error('Campaign not found');
      return;
    }
    
    // Check if already an admin
    if (campaign.adminEmails.includes(coAdminEmail)) {
      console.warn('User is already an admin');
      return;
    }
    
    // Add to admin list
    const updatedAdminEmails = [...campaign.adminEmails, coAdminEmail];
    updateCampaign(campaignId, { adminEmails: updatedAdminEmails });
  } catch (error) {
    console.error('Error adding co-admin:', error);
  }
}

// Remove co-admin from campaign (cannot remove creator)
export function removeCampaignCoAdmin(campaignId: string, coAdminEmail: string): void {
  try {
    const campaign = getCampaignById(campaignId);
    if (!campaign) {
      console.error('Campaign not found');
      return;
    }
    
    // Cannot remove the creator
    if (coAdminEmail === campaign.creatorEmail) {
      console.error('Cannot remove the campaign creator');
      return;
    }
    
    // Remove from admin list
    const updatedAdminEmails = campaign.adminEmails.filter(email => email !== coAdminEmail);
    updateCampaign(campaignId, { adminEmails: updatedAdminEmails });
  } catch (error) {
    console.error('Error removing co-admin:', error);
  }
}