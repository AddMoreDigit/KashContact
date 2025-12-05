// Contribution tracking and storage

export interface Contribution {
  id: string;
  campaignId: string;
  userId: string; // email
  amount: number;
  paymentMethod: 'ewallet' | 'debit' | 'eft';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  transactionId: string;
}

export interface UserContributionSummary {
  campaignId: string;
  totalContributed: number;
  contributionCount: number;
  lastContributionDate: string;
  contributions: Contribution[];
}

// Get all contributions from storage
export function getAllContributions(): Contribution[] {
  const stored = localStorage.getItem('contributions_data');
  return stored ? JSON.parse(stored) : [];
}

// Save contributions to storage
function saveContributions(contributions: Contribution[]): void {
  localStorage.setItem('contributions_data', JSON.stringify(contributions));
  // Dispatch event for real-time updates
  window.dispatchEvent(new Event('contributionsUpdated'));
}

// Generate unique contribution ID
function generateContributionId(): string {
  return `contrib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate transaction ID
function generateTransactionId(): string {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}

// Add a new contribution
export function addContribution(
  campaignId: string,
  userId: string,
  amount: number,
  paymentMethod: 'ewallet' | 'debit' | 'eft'
): Contribution {
  const contributions = getAllContributions();
  
  const newContribution: Contribution = {
    id: generateContributionId(),
    campaignId,
    userId,
    amount,
    paymentMethod,
    status: 'completed',
    date: new Date().toISOString(),
    transactionId: generateTransactionId()
  };
  
  contributions.push(newContribution);
  saveContributions(contributions);
  
  return newContribution;
}

// Get contributions for a specific campaign
export function getCampaignContributions(campaignId: string): Contribution[] {
  const allContributions = getAllContributions();
  return allContributions.filter(c => c.campaignId === campaignId);
}

// Get contributions by a specific user
export function getUserContributions(userId: string): Contribution[] {
  const allContributions = getAllContributions();
  return allContributions.filter(c => c.userId === userId);
}

// Get user's contribution summary for a campaign
export function getUserCampaignSummary(campaignId: string, userId: string): UserContributionSummary {
  const allContributions = getAllContributions();
  const userCampaignContributions = allContributions.filter(
    c => c.campaignId === campaignId && c.userId === userId
  );
  
  const totalContributed = userCampaignContributions.reduce((sum, c) => sum + c.amount, 0);
  const lastContribution = userCampaignContributions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  return {
    campaignId,
    totalContributed,
    contributionCount: userCampaignContributions.length,
    lastContributionDate: lastContribution?.date || '',
    contributions: userCampaignContributions
  };
}

// Get total contributed amount for a campaign
export function getCampaignTotalContributed(campaignId: string): number {
  const contributions = getCampaignContributions(campaignId);
  return contributions
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + c.amount, 0);
}

// Get all contribution summaries for a user
export function getUserAllCampaignSummaries(userId: string): UserContributionSummary[] {
  const userContributions = getUserContributions(userId);
  const campaignIds = [...new Set(userContributions.map(c => c.campaignId))];
  
  return campaignIds.map(campaignId => getUserCampaignSummary(campaignId, userId));
}

// Update contribution status
export function updateContributionStatus(contributionId: string, status: 'pending' | 'completed' | 'failed'): boolean {
  const contributions = getAllContributions();
  const index = contributions.findIndex(c => c.id === contributionId);
  
  if (index !== -1) {
    contributions[index].status = status;
    saveContributions(contributions);
    return true;
  }
  
  return false;
}

// Delete a contribution (admin function)
export function deleteContribution(contributionId: string): boolean {
  const contributions = getAllContributions();
  const filtered = contributions.filter(c => c.id !== contributionId);
  
  if (filtered.length !== contributions.length) {
    saveContributions(filtered);
    return true;
  }
  
  return false;
}

// Get contribution statistics for a campaign
export function getCampaignContributionStats(campaignId: string) {
  const contributions = getCampaignContributions(campaignId);
  const completedContributions = contributions.filter(c => c.status === 'completed');
  
  const totalAmount = completedContributions.reduce((sum, c) => sum + c.amount, 0);
  const uniqueContributors = new Set(completedContributions.map(c => c.userId)).size;
  const averageContribution = uniqueContributors > 0 ? totalAmount / completedContributions.length : 0;
  
  const paymentMethodBreakdown = {
    ewallet: completedContributions.filter(c => c.paymentMethod === 'ewallet').reduce((sum, c) => sum + c.amount, 0),
    debit: completedContributions.filter(c => c.paymentMethod === 'debit').reduce((sum, c) => sum + c.amount, 0),
    eft: completedContributions.filter(c => c.paymentMethod === 'eft').reduce((sum, c) => sum + c.amount, 0),
  };
  
  return {
    totalAmount,
    totalContributions: completedContributions.length,
    uniqueContributors,
    averageContribution,
    paymentMethodBreakdown
  };
}
