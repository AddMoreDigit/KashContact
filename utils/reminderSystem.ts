// Automated Reminder System
export interface Reminder {
  id: string;
  type: 'payment' | 'campaign_start' | 'campaign_end' | 'booking' | 'contribution' | 'voucher_expiry';
  title: string;
  message: string;
  dueDate: string;
  campaignId?: string;
  userId?: string;
  status: 'pending' | 'sent' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  sentAt?: string;
  metadata?: any;
}

const REMINDERS_KEY = 'reminders';
const REMINDER_SETTINGS_KEY = 'reminder_settings';

export interface ReminderSettings {
  enabled: boolean;
  browserNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  advanceDays: {
    payment: number;
    campaignStart: number;
    campaignEnd: number;
    voucherExpiry: number;
  };
}

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: true,
  browserNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  advanceDays: {
    payment: 3,
    campaignStart: 7,
    campaignEnd: 1,
    voucherExpiry: 7
  }
};

/**
 * Initialize reminder system
 */
export function initializeReminderSystem(): void {
  // Request browser notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Start reminder check interval (every hour)
  setInterval(() => {
    checkAndSendReminders();
  }, 60 * 60 * 1000); // 1 hour
  
  // Initial check
  checkAndSendReminders();
}

/**
 * Create a reminder
 */
export function createReminder(reminder: Omit<Reminder, 'id' | 'status' | 'createdAt'>): Reminder {
  const newReminder: Reminder = {
    ...reminder,
    id: `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  const reminders = getReminders();
  reminders.push(newReminder);
  saveReminders(reminders);
  
  return newReminder;
}

/**
 * Get all reminders
 */
export function getReminders(): Reminder[] {
  const stored = localStorage.getItem(REMINDERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save reminders
 */
function saveReminders(reminders: Reminder[]): void {
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
}

/**
 * Get reminder settings
 */
export function getReminderSettings(): ReminderSettings {
  const stored = localStorage.getItem(REMINDER_SETTINGS_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
}

/**
 * Update reminder settings
 */
export function updateReminderSettings(settings: Partial<ReminderSettings>): void {
  const current = getReminderSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updated));
}

/**
 * Check and send due reminders
 */
export function checkAndSendReminders(): void {
  const settings = getReminderSettings();
  
  if (!settings.enabled) {
    return;
  }
  
  const reminders = getReminders();
  const now = new Date();
  
  reminders.forEach(reminder => {
    if (reminder.status === 'pending') {
      const dueDate = new Date(reminder.dueDate);
      
      // Check if reminder is due
      if (dueDate <= now) {
        sendReminder(reminder, settings);
      }
    }
  });
}

/**
 * Send a reminder through available channels
 */
function sendReminder(reminder: Reminder, settings: ReminderSettings): void {
  // Browser notification
  if (settings.browserNotifications && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(reminder.title, {
        body: reminder.message,
        icon: '/logo.png',
        badge: '/logo.png',
        tag: reminder.id,
        requireInteraction: reminder.priority === 'high'
      });
    }
  }
  
  // Update reminder status
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === reminder.id);
  if (index !== -1) {
    reminders[index].status = 'sent';
    reminders[index].sentAt = new Date().toISOString();
    saveReminders(reminders);
  }
  
  // Add to notification center
  addToNotificationCenter(reminder);
}

/**
 * Add reminder to notification center
 */
function addToNotificationCenter(reminder: Reminder): void {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  
  notifications.unshift({
    id: Date.now(),
    title: reminder.title,
    message: reminder.message,
    type: reminder.type,
    campaignId: reminder.campaignId,
    read: false,
    timestamp: new Date().toISOString(),
    priority: reminder.priority
  });
  
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

/**
 * Create payment reminders for campaigns
 */
export function createPaymentReminders(campaign: any): void {
  const settings = getReminderSettings();
  const now = new Date();
  
  // Get next payment date based on contribution frequency
  const nextPaymentDate = calculateNextPaymentDate(campaign);
  
  if (!nextPaymentDate) return;
  
  // Create reminder X days before payment
  const reminderDate = new Date(nextPaymentDate);
  reminderDate.setDate(reminderDate.getDate() - settings.advanceDays.payment);
  
  if (reminderDate > now) {
    createReminder({
      type: 'payment',
      title: 'Payment Reminder',
      message: `Your next contribution of R${calculateNextPaymentAmount(campaign)} for "${campaign.title}" is due on ${formatDate(nextPaymentDate)}`,
      dueDate: reminderDate.toISOString(),
      campaignId: campaign.id,
      priority: 'high'
    });
  }
}

/**
 * Create campaign start reminders
 */
export function createCampaignStartReminders(campaign: any): void {
  const settings = getReminderSettings();
  const startDate = new Date(campaign.startDate);
  const now = new Date();
  
  // Create reminder X days before campaign starts
  const reminderDate = new Date(startDate);
  reminderDate.setDate(reminderDate.getDate() - settings.advanceDays.campaignStart);
  
  if (reminderDate > now) {
    createReminder({
      type: 'campaign_start',
      title: 'Campaign Starting Soon',
      message: `Your campaign "${campaign.title}" starts on ${formatDate(startDate)}. Make sure all preparations are complete!`,
      dueDate: reminderDate.toISOString(),
      campaignId: campaign.id,
      priority: 'medium'
    });
  }
}

/**
 * Create campaign end reminders
 */
export function createCampaignEndReminders(campaign: any): void {
  const settings = getReminderSettings();
  const endDate = new Date(campaign.endDate);
  const now = new Date();
  
  // Create reminder X days before campaign ends
  const reminderDate = new Date(endDate);
  reminderDate.setDate(reminderDate.getDate() - settings.advanceDays.campaignEnd);
  
  if (reminderDate > now) {
    createReminder({
      type: 'campaign_end',
      title: 'Campaign Ending Soon',
      message: `Your campaign "${campaign.title}" ends on ${formatDate(endDate)}. Complete any final contributions!`,
      dueDate: reminderDate.toISOString(),
      campaignId: campaign.id,
      priority: 'medium'
    });
  }
}

/**
 * Create voucher expiry reminders
 */
export function createVoucherExpiryReminders(voucher: any): void {
  const settings = getReminderSettings();
  const expiryDate = new Date(voucher.expiryDate);
  const now = new Date();
  
  // Create reminder X days before voucher expires
  const reminderDate = new Date(expiryDate);
  reminderDate.setDate(reminderDate.getDate() - settings.advanceDays.voucherExpiry);
  
  if (reminderDate > now && voucher.status === 'active') {
    createReminder({
      type: 'voucher_expiry',
      title: 'Voucher Expiring Soon',
      message: `Your voucher for "${voucher.campaignName}" (R${voucher.amount}) expires on ${formatDate(expiryDate)}. Redeem it before it's too late!`,
      dueDate: reminderDate.toISOString(),
      priority: 'high',
      metadata: { voucherId: voucher.voucherId }
    });
  }
}

/**
 * Create booking reminders
 */
export function createBookingReminders(booking: any): void {
  const checkInDate = new Date(booking.checkIn || booking.date);
  const now = new Date();
  
  // Create reminder 2 days before booking
  const reminderDate = new Date(checkInDate);
  reminderDate.setDate(reminderDate.getDate() - 2);
  
  if (reminderDate > now) {
    createReminder({
      type: 'booking',
      title: 'Upcoming Booking',
      message: `Reminder: Your booking at ${booking.serviceName} is on ${formatDate(checkInDate)}`,
      dueDate: reminderDate.toISOString(),
      priority: 'medium',
      metadata: { bookingId: booking.id }
    });
  }
}

/**
 * Dismiss a reminder
 */
export function dismissReminder(reminderId: string): void {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === reminderId);
  
  if (index !== -1) {
    reminders[index].status = 'dismissed';
    saveReminders(reminders);
  }
}

/**
 * Get pending reminders
 */
export function getPendingReminders(): Reminder[] {
  const reminders = getReminders();
  return reminders.filter(r => r.status === 'pending');
}

/**
 * Get reminders by campaign
 */
export function getRemindersByCampaign(campaignId: string): Reminder[] {
  const reminders = getReminders();
  return reminders.filter(r => r.campaignId === campaignId);
}

/**
 * Delete old reminders (older than 30 days)
 */
export function cleanupOldReminders(): number {
  const reminders = getReminders();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filtered = reminders.filter(r => {
    const createdDate = new Date(r.createdAt);
    return createdDate > thirtyDaysAgo || r.status === 'pending';
  });
  
  const deletedCount = reminders.length - filtered.length;
  saveReminders(filtered);
  
  return deletedCount;
}

/**
 * Helper: Calculate next payment date
 */
function calculateNextPaymentDate(campaign: any): Date | null {
  const frequency = campaign.contributionFrequency;
  const startDate = new Date(campaign.startDate);
  const now = new Date();
  
  if (startDate > now) {
    return startDate;
  }
  
  let nextDate = new Date(startDate);
  
  switch (frequency) {
    case 'weekly':
      while (nextDate < now) {
        nextDate.setDate(nextDate.getDate() + 7);
      }
      break;
    case 'monthly':
      while (nextDate < now) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      break;
    case 'once-off':
      return null;
    default:
      return null;
  }
  
  return nextDate;
}

/**
 * Helper: Calculate next payment amount
 */
function calculateNextPaymentAmount(campaign: any): number {
  const totalGoal = campaign.goal;
  const memberCount = campaign.members?.length || 1;
  const perMemberGoal = totalGoal / memberCount;
  
  // Calculate based on frequency
  const frequency = campaign.contributionFrequency;
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  switch (frequency) {
    case 'weekly':
      const weeks = Math.ceil(totalDays / 7);
      return Math.ceil(perMemberGoal / weeks);
    case 'monthly':
      const months = Math.ceil(totalDays / 30);
      return Math.ceil(perMemberGoal / months);
    case 'once-off':
      return perMemberGoal;
    default:
      return perMemberGoal;
  }
}

/**
 * Helper: Format date
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Schedule all reminders for a campaign
 */
export function scheduleAllCampaignReminders(campaign: any): void {
  createPaymentReminders(campaign);
  createCampaignStartReminders(campaign);
  createCampaignEndReminders(campaign);
}
