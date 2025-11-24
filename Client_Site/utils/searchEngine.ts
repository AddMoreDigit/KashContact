// Advanced Search Engine with Fuzzy Search
import Fuse from 'fuse.js';

export interface SearchResult<T> {
  item: T;
  score: number;
  matches?: any[];
}

export interface SearchHistory {
  query: string;
  timestamp: string;
  resultsCount: number;
}

const SEARCH_HISTORY_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 20;

/**
 * Search campaigns with fuzzy matching
 */
export function searchCampaigns(
  campaigns: any[],
  query: string,
  options?: {
    keys?: string[];
    threshold?: number;
  }
): SearchResult<any>[] {
  if (!query || query.trim() === '') {
    return campaigns.map(item => ({ item, score: 0 }));
  }
  
  const fuseOptions = {
    keys: options?.keys || [
      'title',
      'category',
      'provider',
      'members.name',
      'members.email',
      'services.name',
      'services.type'
    ],
    threshold: options?.threshold || 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  };
  
  const fuse = new Fuse(campaigns, fuseOptions);
  const results = fuse.search(query);
  
  // Save to search history
  addToSearchHistory(query, results.length);
  
  return results.map(result => ({
    item: result.item,
    score: result.score || 0,
    matches: result.matches
  }));
}

/**
 * Search services with fuzzy matching
 */
export function searchServices(
  services: any[],
  query: string,
  filters?: {
    category?: string;
    location?: string;
    priceRange?: { min: number; max: number };
    available?: boolean;
  }
): SearchResult<any>[] {
  let filteredServices = services;
  
  // Apply filters first
  if (filters) {
    filteredServices = services.filter(service => {
      if (filters.category && service.category !== filters.category) {
        return false;
      }
      if (filters.location && service.location !== filters.location) {
        return false;
      }
      if (filters.available !== undefined && service.available !== filters.available) {
        return false;
      }
      if (filters.priceRange) {
        const price = parseFloat(service.priceRate || service.price?.replace(/[^0-9.]/g, '') || '0');
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }
      return true;
    });
  }
  
  if (!query || query.trim() === '') {
    return filteredServices.map(item => ({ item, score: 0 }));
  }
  
  const fuseOptions = {
    keys: [
      'name',
      'description',
      'category',
      'location',
      'serviceProviderName'
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
  };
  
  const fuse = new Fuse(filteredServices, fuseOptions);
  const results = fuse.search(query);
  
  addToSearchHistory(query, results.length);
  
  return results.map(result => ({
    item: result.item,
    score: result.score || 0,
    matches: result.matches
  }));
}

/**
 * Search members/contributors
 */
export function searchMembers(
  members: any[],
  query: string
): SearchResult<any>[] {
  if (!query || query.trim() === '') {
    return members.map(item => ({ item, score: 0 }));
  }
  
  const fuseOptions = {
    keys: ['name', 'email'],
    threshold: 0.3,
    includeScore: true,
  };
  
  const fuse = new Fuse(members, fuseOptions);
  const results = fuse.search(query);
  
  return results.map(result => ({
    item: result.item,
    score: result.score || 0
  }));
}

/**
 * Search transactions
 */
export function searchTransactions(
  transactions: any[],
  query: string,
  filters?: {
    dateFrom?: string;
    dateTo?: string;
    type?: string;
    amountRange?: { min: number; max: number };
  }
): SearchResult<any>[] {
  let filteredTransactions = transactions;
  
  // Apply filters
  if (filters) {
    filteredTransactions = transactions.filter(transaction => {
      if (filters.dateFrom) {
        const transDate = new Date(transaction.date);
        const fromDate = new Date(filters.dateFrom);
        if (transDate < fromDate) return false;
      }
      if (filters.dateTo) {
        const transDate = new Date(transaction.date);
        const toDate = new Date(filters.dateTo);
        if (transDate > toDate) return false;
      }
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }
      if (filters.amountRange) {
        const amount = transaction.amount;
        if (amount < filters.amountRange.min || amount > filters.amountRange.max) {
          return false;
        }
      }
      return true;
    });
  }
  
  if (!query || query.trim() === '') {
    return filteredTransactions.map(item => ({ item, score: 0 }));
  }
  
  const fuseOptions = {
    keys: [
      'description',
      'campaignName',
      'paymentMethod',
      'recipient',
      'sender'
    ],
    threshold: 0.4,
    includeScore: true,
  };
  
  const fuse = new Fuse(filteredTransactions, fuseOptions);
  const results = fuse.search(query);
  
  return results.map(result => ({
    item: result.item,
    score: result.score || 0
  }));
}

/**
 * Universal search across all data types
 */
export function universalSearch(
  data: {
    campaigns?: any[];
    services?: any[];
    members?: any[];
    transactions?: any[];
  },
  query: string
): {
  campaigns: SearchResult<any>[];
  services: SearchResult<any>[];
  members: SearchResult<any>[];
  transactions: SearchResult<any>[];
} {
  return {
    campaigns: data.campaigns ? searchCampaigns(data.campaigns, query) : [],
    services: data.services ? searchServices(data.services, query) : [],
    members: data.members ? searchMembers(data.members, query) : [],
    transactions: data.transactions ? searchTransactions(data.transactions, query) : [],
  };
}

/**
 * Add query to search history
 */
export function addToSearchHistory(query: string, resultsCount: number): void {
  if (!query || query.trim() === '') return;
  
  const history = getSearchHistory();
  
  // Check if query already exists
  const existingIndex = history.findIndex(
    h => h.query.toLowerCase() === query.toLowerCase()
  );
  
  const newEntry: SearchHistory = {
    query: query.trim(),
    timestamp: new Date().toISOString(),
    resultsCount
  };
  
  if (existingIndex !== -1) {
    // Update existing entry
    history[existingIndex] = newEntry;
  } else {
    // Add new entry
    history.unshift(newEntry);
  }
  
  // Keep only the most recent entries
  const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
  
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmedHistory));
}

/**
 * Get search history
 */
export function getSearchHistory(): SearchHistory[] {
  const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
}

/**
 * Get popular searches
 */
export function getPopularSearches(limit: number = 5): SearchHistory[] {
  const history = getSearchHistory();
  
  // Sort by results count (descending)
  return history
    .sort((a, b) => b.resultsCount - a.resultsCount)
    .slice(0, limit);
}

/**
 * Get recent searches
 */
export function getRecentSearches(limit: number = 5): SearchHistory[] {
  const history = getSearchHistory();
  return history.slice(0, limit);
}

/**
 * Sort and filter results
 */
export function sortResults<T>(
  results: SearchResult<T>[],
  sortBy: 'relevance' | 'name' | 'date' | 'price',
  order: 'asc' | 'desc' = 'desc'
): SearchResult<T>[] {
  const sorted = [...results];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'relevance':
        comparison = a.score - b.score;
        break;
      case 'name':
        const nameA = (a.item.name || a.item.title || '').toLowerCase();
        const nameB = (b.item.name || b.item.title || '').toLowerCase();
        comparison = nameA.localeCompare(nameB);
        break;
      case 'date':
        const dateA = new Date(a.item.date || a.item.startDate || 0).getTime();
        const dateB = new Date(b.item.date || b.item.startDate || 0).getTime();
        comparison = dateA - dateB;
        break;
      case 'price':
        const priceA = parseFloat(a.item.price?.replace(/[^0-9.]/g, '') || a.item.priceRate || '0');
        const priceB = parseFloat(b.item.price?.replace(/[^0-9.]/g, '') || b.item.priceRate || '0');
        comparison = priceA - priceB;
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}

/**
 * Highlight matches in text
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(
  partialQuery: string,
  allData: any[],
  fields: string[] = ['name', 'title']
): string[] {
  if (!partialQuery || partialQuery.length < 2) {
    return [];
  }
  
  const suggestions = new Set<string>();
  const lowerQuery = partialQuery.toLowerCase();
  
  allData.forEach(item => {
    fields.forEach(field => {
      const value = item[field];
      if (value && typeof value === 'string') {
        if (value.toLowerCase().includes(lowerQuery)) {
          suggestions.add(value);
        }
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 10);
}
