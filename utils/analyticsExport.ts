// Analytics Export and Reporting Utility
import { exportToCSV, exportAnalyticsPDF } from './pdfGenerator';

export interface CampaignAnalytics {
  campaignId: string;
  campaignName: string;
  totalGoal: number;
  totalContributed: number;
  completionRate: number;
  memberCount: number;
  averageContribution: number;
  startDate: string;
  endDate: string;
  status: string;
  contributionFrequency: string;
}

export interface MemberAnalytics {
  name: string;
  email: string;
  totalCampaigns: number;
  totalContributed: number;
  averageContribution: number;
  onTimePayments: number;
  latePayments: number;
  missedPayments: number;
  reliability: number;
}

export interface TransactionAnalytics {
  date: string;
  type: string;
  amount: number;
  campaign: string;
  member: string;
  paymentMethod: string;
  status: string;
}

export interface VendorAnalytics {
  vendorId: string;
  vendorName: string;
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  approvalRate: number;
  averageResponseTime: number;
  topServices: Array<{ name: string; bookings: number }>;
}

/**
 * Generate campaign analytics
 */
export function generateCampaignAnalytics(campaigns: any[]): CampaignAnalytics[] {
  return campaigns.map(campaign => ({
    campaignId: campaign.id,
    campaignName: campaign.title,
    totalGoal: campaign.goal,
    totalContributed: campaign.contributed || 0,
    completionRate: Math.round(((campaign.contributed || 0) / campaign.goal) * 100),
    memberCount: campaign.members?.length || 0,
    averageContribution: campaign.members?.length 
      ? (campaign.contributed || 0) / campaign.members.length 
      : 0,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    status: campaign.status,
    contributionFrequency: campaign.contributionFrequency
  }));
}

/**
 * Generate member analytics
 */
export function generateMemberAnalytics(campaigns: any[]): MemberAnalytics[] {
  const memberMap = new Map<string, any>();
  
  campaigns.forEach(campaign => {
    campaign.memberPerformance?.forEach((member: any) => {
      const key = member.email;
      
      if (!memberMap.has(key)) {
        memberMap.set(key, {
          name: member.name || member.email,
          email: member.email,
          totalCampaigns: 0,
          totalContributed: 0,
          contributions: [],
          onTimePayments: 0,
          latePayments: 0,
          missedPayments: member.missedPayments || 0
        });
      }
      
      const memberData = memberMap.get(key);
      memberData.totalCampaigns++;
      memberData.totalContributed += member.contributedAmount || 0;
      memberData.contributions.push(member.contributedAmount || 0);
      
      if (member.status === 'on-track' || member.status === 'completed') {
        memberData.onTimePayments++;
      } else {
        memberData.latePayments++;
      }
    });
  });
  
  return Array.from(memberMap.values()).map(member => {
    const totalPayments = member.onTimePayments + member.latePayments + member.missedPayments;
    const reliability = totalPayments > 0 
      ? Math.round((member.onTimePayments / totalPayments) * 100)
      : 100;
    
    return {
      name: member.name,
      email: member.email,
      totalCampaigns: member.totalCampaigns,
      totalContributed: Math.round(member.totalContributed),
      averageContribution: member.contributions.length > 0
        ? Math.round(member.totalContributed / member.contributions.length)
        : 0,
      onTimePayments: member.onTimePayments,
      latePayments: member.latePayments,
      missedPayments: member.missedPayments,
      reliability
    };
  });
}

/**
 * Generate transaction analytics
 */
export function generateTransactionAnalytics(transactions: any[]): TransactionAnalytics[] {
  return transactions.map(transaction => ({
    date: transaction.date,
    type: transaction.type || 'contribution',
    amount: transaction.amount,
    campaign: transaction.campaignName || transaction.campaign,
    member: transaction.memberName || transaction.payer,
    paymentMethod: transaction.paymentMethod,
    status: transaction.status || 'completed'
  }));
}

/**
 * Generate vendor analytics
 */
export function generateVendorAnalytics(
  bookings: any[],
  approvals: any[]
): VendorAnalytics[] {
  const vendorMap = new Map<string, any>();
  
  // Process bookings
  bookings.forEach(booking => {
    const vendorId = booking.vendorId || booking.serviceProviderId;
    const vendorName = booking.vendorName || booking.serviceProviderName;
    
    if (!vendorMap.has(vendorId)) {
      vendorMap.set(vendorId, {
        vendorId,
        vendorName,
        totalBookings: 0,
        totalRevenue: 0,
        services: new Map()
      });
    }
    
    const vendor = vendorMap.get(vendorId);
    vendor.totalBookings++;
    vendor.totalRevenue += booking.amount || 0;
    
    const serviceName = booking.serviceName || booking.name;
    if (serviceName) {
      const serviceCount = vendor.services.get(serviceName) || 0;
      vendor.services.set(serviceName, serviceCount + 1);
    }
  });
  
  // Process approvals for rates and response times
  const approvalStats = new Map<string, any>();
  approvals.forEach(approval => {
    const vendorId = approval.vendorId;
    
    if (!approvalStats.has(vendorId)) {
      approvalStats.set(vendorId, {
        total: 0,
        approved: 0,
        responseTimes: []
      });
    }
    
    const stats = approvalStats.get(vendorId);
    stats.total++;
    
    if (approval.status === 'approved') {
      stats.approved++;
    }
    
    if (approval.respondedAt) {
      const submitted = new Date(approval.submittedAt).getTime();
      const responded = new Date(approval.respondedAt).getTime();
      const responseTime = (responded - submitted) / (1000 * 60 * 60); // hours
      stats.responseTimes.push(responseTime);
    }
  });
  
  // Combine data
  return Array.from(vendorMap.values()).map(vendor => {
    const stats = approvalStats.get(vendor.vendorId) || {
      total: 0,
      approved: 0,
      responseTimes: []
    };
    
    const topServices = Array.from(vendor.services.entries())
      .map(([name, bookings]) => ({ name, bookings: bookings as number }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
    
    const avgResponseTime = stats.responseTimes.length > 0
      ? stats.responseTimes.reduce((a: number, b: number) => a + b, 0) / stats.responseTimes.length
      : 0;
    
    return {
      vendorId: vendor.vendorId,
      vendorName: vendor.vendorName,
      totalBookings: vendor.totalBookings,
      totalRevenue: Math.round(vendor.totalRevenue),
      averageBookingValue: vendor.totalBookings > 0
        ? Math.round(vendor.totalRevenue / vendor.totalBookings)
        : 0,
      approvalRate: stats.total > 0
        ? Math.round((stats.approved / stats.total) * 100)
        : 100,
      averageResponseTime: Math.round(avgResponseTime * 10) / 10,
      topServices
    };
  });
}

/**
 * Export campaign analytics to CSV
 */
export function exportCampaignAnalyticsCSV(campaigns: any[]): void {
  const analytics = generateCampaignAnalytics(campaigns);
  exportToCSV(analytics, `campaign_analytics_${Date.now()}`);
}

/**
 * Export member analytics to CSV
 */
export function exportMemberAnalyticsCSV(campaigns: any[]): void {
  const analytics = generateMemberAnalytics(campaigns);
  exportToCSV(analytics, `member_analytics_${Date.now()}`);
}

/**
 * Export transaction analytics to CSV
 */
export function exportTransactionAnalyticsCSV(transactions: any[]): void {
  const analytics = generateTransactionAnalytics(transactions);
  exportToCSV(analytics, `transaction_analytics_${Date.now()}`);
}

/**
 * Export vendor analytics to CSV
 */
export function exportVendorAnalyticsCSV(bookings: any[], approvals: any[]): void {
  const analytics = generateVendorAnalytics(bookings, approvals);
  
  // Flatten top services for CSV
  const flattenedData = analytics.map(vendor => ({
    vendorId: vendor.vendorId,
    vendorName: vendor.vendorName,
    totalBookings: vendor.totalBookings,
    totalRevenue: vendor.totalRevenue,
    averageBookingValue: vendor.averageBookingValue,
    approvalRate: vendor.approvalRate,
    averageResponseTime: vendor.averageResponseTime,
    topService1: vendor.topServices[0]?.name || '',
    topService1Bookings: vendor.topServices[0]?.bookings || 0,
    topService2: vendor.topServices[1]?.name || '',
    topService2Bookings: vendor.topServices[1]?.bookings || 0,
    topService3: vendor.topServices[2]?.name || '',
    topService3Bookings: vendor.topServices[2]?.bookings || 0
  }));
  
  exportToCSV(flattenedData, `vendor_analytics_${Date.now()}`);
}

/**
 * Generate comprehensive analytics report
 */
export async function generateComprehensiveReport(data: {
  campaigns: any[];
  transactions: any[];
  bookings?: any[];
  approvals?: any[];
}): Promise<void> {
  const summary = {
    totalCampaigns: data.campaigns.length,
    activeCampaigns: data.campaigns.filter((c: any) => c.status === 'active').length,
    totalGoal: data.campaigns.reduce((sum: number, c: any) => sum + c.goal, 0),
    totalContributed: data.campaigns.reduce((sum: number, c: any) => sum + (c.contributed || 0), 0),
    totalTransactions: data.transactions.length,
    totalMembers: new Set(data.campaigns.flatMap((c: any) => c.members?.map((m: any) => m.email) || [])).size
  };
  
  // Generate PDF report
  const blob = await exportAnalyticsPDF('Comprehensive Analytics Report', summary);
  
  // Download
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `comprehensive_report_${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary(campaigns: any[], transactions: any[]): any {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const recentTransactions = transactions.filter((t: any) => 
    new Date(t.date) > thirtyDaysAgo
  );
  
  const activeCampaigns = campaigns.filter((c: any) => 
    c.status === 'active' || c.status === 'contribute' || c.status === 'manage'
  );
  
  return {
    totalCampaigns: campaigns.length,
    activeCampaigns: activeCampaigns.length,
    completedCampaigns: campaigns.filter((c: any) => c.status === 'completed').length,
    totalMembers: new Set(campaigns.flatMap((c: any) => 
      c.members?.map((m: any) => m.email) || []
    )).size,
    totalGoal: campaigns.reduce((sum: number, c: any) => sum + c.goal, 0),
    totalContributed: campaigns.reduce((sum: number, c: any) => sum + (c.contributed || 0), 0),
    totalTransactions: transactions.length,
    recentTransactions: recentTransactions.length,
    averageContribution: transactions.length > 0
      ? transactions.reduce((sum: number, t: any) => sum + t.amount, 0) / transactions.length
      : 0,
    completionRate: campaigns.length > 0
      ? Math.round((campaigns.filter((c: any) => c.status === 'completed').length / campaigns.length) * 100)
      : 0
  };
}

/**
 * Get trend data for charts
 */
export function getTrendData(
  transactions: any[],
  period: 'week' | 'month' | 'year' = 'month'
): Array<{ date: string; amount: number; count: number }> {
  const trendMap = new Map<string, { amount: number; count: number }>();
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    let key: string;
    
    switch (period) {
      case 'week':
        // Group by day
        key = date.toISOString().split('T')[0];
        break;
      case 'month':
        // Group by week
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'year':
        // Group by month
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
    }
    
    if (!trendMap.has(key)) {
      trendMap.set(key, { amount: 0, count: 0 });
    }
    
    const trend = trendMap.get(key)!;
    trend.amount += transaction.amount;
    trend.count++;
  });
  
  return Array.from(trendMap.entries())
    .map(([date, data]) => ({
      date,
      amount: Math.round(data.amount),
      count: data.count
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
