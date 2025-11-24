// Centralized notification and campaign status management

export interface CampaignNotification {
  id: string;
  type: 'campaign_created' | 'campaign_accepted' | 'campaign_declined';
  campaignId: string;
  campaignName: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userType: 'user' | 'vendor' | 'corporate';
  userId?: string;
  vendorId?: string;
  metadata?: {
    organizer?: string;
    serviceProvider?: string;
    totalAmount?: number;
    dates?: string;
    servicesBooked?: string;
  };
}

export interface CampaignStatus {
  campaignId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  vendorId?: string;
}

const NOTIFICATIONS_KEY = 'campaign_notifications';
const CAMPAIGN_STATUS_KEY = 'campaign_statuses';

// Notification Management
export function getNotifications(userType: 'user' | 'vendor' | 'corporate'): CampaignNotification[] {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!stored) return [];
    
    const allNotifications: CampaignNotification[] = JSON.parse(stored);
    return allNotifications.filter(n => n.userType === userType);
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
}

export function addNotification(notification: CampaignNotification): void {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    const notifications: CampaignNotification[] = stored ? JSON.parse(stored) : [];
    
    notifications.push({
      ...notification,
      timestamp: new Date(),
      read: false
    });
    
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error adding notification:', error);
  }
}

export function markNotificationAsRead(notificationId: string): void {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!stored) return;
    
    const notifications: CampaignNotification[] = JSON.parse(stored);
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

export function getUnreadNotificationCount(userType: 'user' | 'vendor' | 'corporate'): number {
  const notifications = getNotifications(userType);
  return notifications.filter(n => !n.read).length;
}

// Campaign Status Management
export function getCampaignStatus(campaignId: string): CampaignStatus | null {
  try {
    const stored = localStorage.getItem(CAMPAIGN_STATUS_KEY);
    if (!stored) return null;
    
    const statuses: CampaignStatus[] = JSON.parse(stored);
    return statuses.find(s => s.campaignId === campaignId) || null;
  } catch (error) {
    console.error('Error loading campaign status:', error);
    return null;
  }
}

export function getAllCampaignStatuses(): CampaignStatus[] {
  try {
    const stored = localStorage.getItem(CAMPAIGN_STATUS_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading campaign statuses:', error);
    return [];
  }
}

export function setCampaignStatus(status: CampaignStatus): void {
  try {
    const stored = localStorage.getItem(CAMPAIGN_STATUS_KEY);
    const statuses: CampaignStatus[] = stored ? JSON.parse(stored) : [];
    
    // Remove existing status for this campaign if any
    const filtered = statuses.filter(s => s.campaignId !== status.campaignId);
    
    filtered.push({
      ...status,
      updatedAt: new Date()
    });
    
    localStorage.setItem(CAMPAIGN_STATUS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error setting campaign status:', error);
  }
}

export function updateCampaignStatus(
  campaignId: string, 
  newStatus: 'pending' | 'accepted' | 'declined',
  vendorId?: string
): void {
  try {
    const existing = getCampaignStatus(campaignId);
    if (!existing) {
      console.error('Campaign status not found');
      return;
    }
    
    setCampaignStatus({
      ...existing,
      status: newStatus,
      updatedAt: new Date(),
      vendorId: vendorId || existing.vendorId
    });
  } catch (error) {
    console.error('Error updating campaign status:', error);
  }
}

// Helper function to create campaign with pending status
export function createCampaignWithStatus(
  campaignId: string,
  createdBy: string,
  vendorId?: string
): void {
  setCampaignStatus({
    campaignId,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy,
    vendorId
  });
}

// Helper function to send notification to vendor when campaign is created
export function notifyVendorOfNewCampaign(
  campaignId: string,
  campaignName: string,
  organizer: string,
  metadata?: {
    serviceProvider?: string;
    totalAmount?: number;
    dates?: string;
    servicesBooked?: string;
  }
): void {
  addNotification({
    id: `vendor-${campaignId}-${Date.now()}`,
    type: 'campaign_created',
    campaignId,
    campaignName,
    message: `New campaign "${campaignName}" has been created by ${organizer}`,
    timestamp: new Date(),
    read: false,
    userType: 'vendor',
    metadata: {
      organizer,
      ...metadata
    }
  });
}

// Helper function to send notification to user when campaign status changes
export function notifyUserOfStatusChange(
  campaignId: string,
  campaignName: string,
  status: 'accepted' | 'declined',
  userId: string,
  vendorName?: string
): void {
  const message = status === 'accepted'
    ? `Your campaign "${campaignName}" has been accepted by ${vendorName || 'the vendor'}!`
    : `Your campaign "${campaignName}" has been declined by ${vendorName || 'the vendor'}.`;
  
  addNotification({
    id: `user-${campaignId}-${status}-${Date.now()}`,
    type: status === 'accepted' ? 'campaign_accepted' : 'campaign_declined',
    campaignId,
    campaignName,
    message,
    timestamp: new Date(),
    read: false,
    userType: 'user',
    userId,
    metadata: {
      serviceProvider: vendorName
    }
  });
}
