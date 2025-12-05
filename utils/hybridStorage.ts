import { projectId, publicAnonKey } from './supabase/info';

/**
 * Hybrid Storage Manager
 * - localStorage for fast offline access and caching
 * - Supabase for persistent cloud storage and cross-device sync
 */

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-5eb0ec17`;

interface SyncOptions {
  forceRefresh?: boolean;
  skipCache?: boolean;
}

class HybridStorage {
  private syncInProgress = new Set<string>();
  private userId: string | null = null;

  constructor() {
    // Load user ID from localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        this.userId = parsed.email || parsed.userId || 'default';
      } catch (e) {
        this.userId = 'default';
      }
    } else {
      this.userId = 'default';
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId || 'default';
  }

  /**
   * Get data - checks localStorage first (fast), then Supabase (persistent)
   */
  async get<T>(key: string, options: SyncOptions = {}): Promise<T | null> {
    const { forceRefresh = false, skipCache = false } = options;

    // If not forcing refresh, try localStorage first
    if (!forceRefresh && !skipCache) {
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          return JSON.parse(cached) as T;
        } catch (e) {
          console.error(`Error parsing cached data for ${key}:`, e);
        }
      }
    }

    // Fetch from Supabase
    try {
      const endpoint = this.getEndpoint(key);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data !== null) {
        // Update localStorage cache
        localStorage.setItem(key, JSON.stringify(result.data));
        return result.data as T;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching from Supabase for ${key}:`, error);
      
      // Fallback to localStorage if Supabase fails
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          return JSON.parse(cached) as T;
        } catch (e) {
          return null;
        }
      }
      
      return null;
    }
  }

  /**
   * Set data - updates localStorage immediately and Supabase asynchronously
   */
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      // Update localStorage immediately (fast, offline-first)
      localStorage.setItem(key, JSON.stringify(value));

      // Sync to Supabase asynchronously (persistent, cross-device)
      this.syncToSupabase(key, value);

      return true;
    } catch (error) {
      console.error(`Error setting data for ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete data - removes from both localStorage and Supabase
   */
  async delete(key: string): Promise<boolean> {
    try {
      // Remove from localStorage
      localStorage.removeItem(key);

      // Delete from Supabase
      const endpoint = this.getEndpoint(key);
      await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (error) {
      console.error(`Error deleting data for ${key}:`, error);
      return false;
    }
  }

  /**
   * Sync to Supabase in the background
   */
  private async syncToSupabase<T>(key: string, value: T): Promise<void> {
    // Prevent duplicate sync requests
    if (this.syncInProgress.has(key)) {
      return;
    }

    this.syncInProgress.add(key);

    try {
      const endpoint = this.getEndpoint(key);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        console.error(`Failed to sync ${key} to Supabase:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error syncing ${key} to Supabase:`, error);
    } finally {
      this.syncInProgress.delete(key);
    }
  }

  /**
   * Bulk sync all user data
   */
  async syncAll(): Promise<boolean> {
    try {
      const userId = this.getUserId();
      
      // Get data from localStorage
      const campaigns = localStorage.getItem('campaigns');
      const profile = localStorage.getItem('userProfile');
      const transactions = localStorage.getItem('transactions');
      const notifications = localStorage.getItem('notifications');
      const cart = localStorage.getItem('cart');

      const syncData: any = {};
      
      if (campaigns) syncData.campaigns = JSON.parse(campaigns);
      if (profile) syncData.profile = JSON.parse(profile);
      if (transactions) syncData.transactions = JSON.parse(transactions);
      if (notifications) syncData.notifications = JSON.parse(notifications);
      if (cart) syncData.cart = JSON.parse(cart);

      const response = await fetch(`${API_BASE}/sync/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(syncData),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error syncing all data:', error);
      return false;
    }
  }

  /**
   * Fetch all user data from Supabase
   */
  async fetchAll(): Promise<boolean> {
    try {
      const userId = this.getUserId();
      
      const response = await fetch(`${API_BASE}/sync/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        // Update localStorage with fetched data
        if (result.data.campaigns) {
          localStorage.setItem('campaigns', JSON.stringify(result.data.campaigns));
        }
        if (result.data.profile) {
          localStorage.setItem('userProfile', JSON.stringify(result.data.profile));
        }
        if (result.data.transactions) {
          localStorage.setItem('transactions', JSON.stringify(result.data.transactions));
        }
        if (result.data.notifications) {
          localStorage.setItem('notifications', JSON.stringify(result.data.notifications));
        }
        if (result.data.cart) {
          localStorage.setItem('cart', JSON.stringify(result.data.cart));
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error fetching all data:', error);
      return false;
    }
  }

  /**
   * Get the appropriate endpoint for a key
   */
  private getEndpoint(key: string): string {
    const userId = this.getUserId();

    // Map localStorage keys to API endpoints
    if (key === 'campaigns') return `${API_BASE}/campaigns/${userId}`;
    if (key === 'userProfile') return `${API_BASE}/profile/${userId}`;
    if (key === 'transactions') return `${API_BASE}/transactions/${userId}`;
    if (key === 'notifications') return `${API_BASE}/notifications/${userId}`;
    if (key === 'cart') return `${API_BASE}/cart/${userId}`;
    if (key === 'serviceProviders') return `${API_BASE}/service-providers`;

    // Default endpoint
    return `${API_BASE}/data/${userId}/${key}`;
  }

  /**
   * Check if online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Clear all data (both localStorage and Supabase)
   */
  async clearAll(): Promise<void> {
    const keys = ['campaigns', 'userProfile', 'transactions', 'notifications', 'cart'];
    
    // Clear localStorage
    keys.forEach(key => localStorage.removeItem(key));
    
    // Note: We don't delete from Supabase as this is just a local clear
    // If you want to delete from Supabase, call delete() for each key
  }
}

// Export singleton instance
export const storage = new HybridStorage();

// Helper functions for common operations
export const getCampaigns = () => storage.get('campaigns');
export const setCampaigns = (campaigns: any) => storage.set('campaigns', campaigns);

export const getProfile = () => storage.get('userProfile');
export const setProfile = (profile: any) => storage.set('userProfile', profile);

export const getTransactions = () => storage.get('transactions');
export const setTransactions = (transactions: any) => storage.set('transactions', transactions);

export const getNotifications = () => storage.get('notifications');
export const setNotifications = (notifications: any) => storage.set('notifications', notifications);

export const getCart = () => storage.get('cart');
export const setCart = (cart: any) => storage.set('cart', cart);

export const syncAll = () => storage.syncAll();
export const fetchAll = () => storage.fetchAll();
