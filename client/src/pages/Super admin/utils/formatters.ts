/**
 * Format currency in South African Rand
 */
export function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString('en-ZA')}`;
}

/**
 * Format date string
 */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date;
  }
  return date.toLocaleDateString('en-ZA');
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Get status color classes for badges
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700 hover:bg-green-100',
    'Pending': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    'Completed': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100',
    'Cancelled': 'bg-pink-100 text-pink-700 hover:bg-pink-100',
    'Failed': 'bg-red-100 text-red-700 hover:bg-red-100',
    'Refund': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100',
    'Suspended': 'bg-red-100 text-red-700 hover:bg-red-100',
    'Expired': 'bg-gray-100 text-gray-700 hover:bg-gray-100',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';
}
