/**
 * Key-Value Store Utilities
 * Provides simple storage functions using Supabase's built-in KV table
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = 'kv_store_5eb0ec17';

/**
 * Initialize the KV store table if it doesn't exist
 */
export async function initTable() {
  try {
    // Check if table exists by trying to query it
    const { error } = await supabase
      .from(TABLE_NAME)
      .select('key')
      .limit(1);
    
    if (error) {
      console.log('KV table not accessible:', error.message);
      // Table might not exist, but we can't create it here
      // It needs to be created in the Supabase dashboard
    } else {
      console.log('KV store table ready');
    }
  } catch (error) {
    console.log('Error checking KV table:', error);
  }
}

/**
 * Get a value by key
 */
export async function get(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - key doesn't exist
        return null;
      }
      throw error;
    }
    
    return data?.value ?? null;
  } catch (error) {
    console.log(`Error getting key "${key}":`, error);
    return null;
  }
}

/**
 * Set a value by key (creates or updates)
 */
export async function set(key: string, value: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(
        { 
          key, 
          value,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'key' }
      );
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(`Error setting key "${key}":`, error);
    throw error;
  }
}

/**
 * Delete a value by key
 */
export async function del(key: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('key', key);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(`Error deleting key "${key}":`, error);
    throw error;
  }
}

/**
 * Get multiple values by keys
 */
export async function mget(keys: string[]): Promise<Record<string, string | null>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('key, value')
      .in('key', keys);
    
    if (error) {
      throw error;
    }
    
    const result: Record<string, string | null> = {};
    keys.forEach(key => {
      const item = data?.find(d => d.key === key);
      result[key] = item?.value ?? null;
    });
    
    return result;
  } catch (error) {
    console.log('Error getting multiple keys:', error);
    return {};
  }
}

/**
 * Set multiple key-value pairs
 */
export async function mset(entries: Record<string, string>): Promise<void> {
  try {
    const records = Object.entries(entries).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString()
    }));
    
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(records, { onConflict: 'key' });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log('Error setting multiple keys:', error);
    throw error;
  }
}

/**
 * Delete multiple keys
 */
export async function mdel(keys: string[]): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .in('key', keys);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log('Error deleting multiple keys:', error);
    throw error;
  }
}

/**
 * Get all keys with a specific prefix
 */
export async function getByPrefix(prefix: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('key, value')
      .like('key', `${prefix}%`);
    
    if (error) {
      throw error;
    }
    
    const result: Record<string, string> = {};
    data?.forEach(item => {
      result[item.key] = item.value;
    });
    
    return result;
  } catch (error) {
    console.log(`Error getting keys with prefix "${prefix}":`, error);
    return {};
  }
}

// Initialize table on module load
initTable();
