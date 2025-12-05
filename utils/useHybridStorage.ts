import { useState, useEffect, useCallback } from 'react';
import { storage } from './hybridStorage';

/**
 * React Hook for Hybrid Storage
 * Provides automatic syncing between localStorage and Supabase
 */

interface UseHybridStorageOptions {
  autoSync?: boolean;
  syncInterval?: number;
  forceRefresh?: boolean;
}

export function useHybridStorage<T>(
  key: string,
  defaultValue: T,
  options: UseHybridStorageOptions = {}
) {
  const { autoSync = true, syncInterval = 30000, forceRefresh = false } = options;
  
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [key, forceRefresh]);

  // Auto-sync at intervals
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(() => {
      syncData();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [autoSync, syncInterval, data]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await storage.get<T>(key, { forceRefresh });
      if (result !== null) {
        setData(result);
      } else {
        setData(defaultValue);
      }
    } catch (err) {
      setError(err as Error);
      console.error(`Error loading ${key}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const saveData = useCallback(async (newData: T) => {
    try {
      await storage.set(key, newData);
      setData(newData);
      return true;
    } catch (err) {
      setError(err as Error);
      console.error(`Error saving ${key}:`, err);
      return false;
    }
  }, [key]);

  const syncData = async () => {
    setSyncing(true);
    try {
      await storage.set(key, data);
    } catch (err) {
      console.error(`Error syncing ${key}:`, err);
    } finally {
      setSyncing(false);
    }
  };

  const refresh = async () => {
    await loadData();
  };

  return {
    data,
    loading,
    syncing,
    error,
    setData: saveData,
    refresh,
    sync: syncData,
  };
}

/**
 * Hook for campaigns
 */
export function useCampaigns() {
  return useHybridStorage('campaigns', [], { autoSync: true });
}

/**
 * Hook for user profile
 */
export function useProfile() {
  return useHybridStorage('userProfile', null, { autoSync: true });
}

/**
 * Hook for transactions
 */
export function useTransactions() {
  return useHybridStorage('transactions', [], { autoSync: true });
}

/**
 * Hook for notifications
 */
export function useNotifications() {
  return useHybridStorage('notifications', [], { autoSync: true });
}

/**
 * Hook for cart
 */
export function useCart() {
  return useHybridStorage('cart', [], { autoSync: true });
}
