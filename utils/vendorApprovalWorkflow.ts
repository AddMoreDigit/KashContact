// Vendor Approval Workflow System
export interface ApprovalRequest {
  id: string;
  type: 'campaign' | 'booking' | 'service';
  campaignId?: string;
  bookingId?: string;
  serviceId?: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  vendorId: string;
  vendorName: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  submittedAt: string;
  respondedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  details: any;
  priority: 'low' | 'medium' | 'high';
}

const APPROVAL_REQUESTS_KEY = 'approval_requests';
const APPROVAL_HISTORY_KEY = 'approval_history';

/**
 * Create a new approval request
 */
export function createApprovalRequest(
  request: Omit<ApprovalRequest, 'id' | 'status' | 'submittedAt'>
): ApprovalRequest {
  const newRequest: ApprovalRequest = {
    ...request,
    id: `approval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  
  const requests = getApprovalRequests();
  requests.push(newRequest);
  saveApprovalRequests(requests);
  
  // Notify vendor
  notifyVendor(newRequest);
  
  return newRequest;
}

/**
 * Get all approval requests
 */
export function getApprovalRequests(): ApprovalRequest[] {
  const stored = localStorage.getItem(APPROVAL_REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save approval requests
 */
function saveApprovalRequests(requests: ApprovalRequest[]): void {
  localStorage.setItem(APPROVAL_REQUESTS_KEY, JSON.stringify(requests));
}

/**
 * Get approval request by ID
 */
export function getApprovalRequestById(id: string): ApprovalRequest | null {
  const requests = getApprovalRequests();
  return requests.find(r => r.id === id) || null;
}

/**
 * Get approval requests by vendor
 */
export function getApprovalRequestsByVendor(vendorId: string): ApprovalRequest[] {
  const requests = getApprovalRequests();
  return requests.filter(r => r.vendorId === vendorId);
}

/**
 * Get pending approval requests for vendor
 */
export function getPendingApprovalsByVendor(vendorId: string): ApprovalRequest[] {
  const requests = getApprovalRequestsByVendor(vendorId);
  return requests.filter(r => r.status === 'pending');
}

/**
 * Get approval requests by requester
 */
export function getApprovalRequestsByRequester(requesterId: string): ApprovalRequest[] {
  const requests = getApprovalRequests();
  return requests.filter(r => r.requesterId === requesterId);
}

/**
 * Approve a request
 */
export function approveRequest(
  requestId: string,
  reviewerId: string,
  notes?: string
): boolean {
  const requests = getApprovalRequests();
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index === -1 || requests[index].status !== 'pending') {
    return false;
  }
  
  requests[index].status = 'approved';
  requests[index].respondedAt = new Date().toISOString();
  requests[index].reviewedBy = reviewerId;
  
  saveApprovalRequests(requests);
  
  // Add to history
  addToApprovalHistory(requests[index], 'approved', notes);
  
  // Notify requester
  notifyRequester(requests[index], 'approved');
  
  // Update related campaign/booking status
  updateRelatedEntity(requests[index], 'approved');
  
  return true;
}

/**
 * Reject a request
 */
export function rejectRequest(
  requestId: string,
  reviewerId: string,
  reason: string
): boolean {
  const requests = getApprovalRequests();
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index === -1 || requests[index].status !== 'pending') {
    return false;
  }
  
  requests[index].status = 'rejected';
  requests[index].respondedAt = new Date().toISOString();
  requests[index].reviewedBy = reviewerId;
  requests[index].rejectionReason = reason;
  
  saveApprovalRequests(requests);
  
  // Add to history
  addToApprovalHistory(requests[index], 'rejected', reason);
  
  // Notify requester
  notifyRequester(requests[index], 'rejected', reason);
  
  // Update related campaign/booking status
  updateRelatedEntity(requests[index], 'rejected');
  
  return true;
}

/**
 * Cancel a request (by requester)
 */
export function cancelRequest(requestId: string): boolean {
  const requests = getApprovalRequests();
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index === -1 || requests[index].status !== 'pending') {
    return false;
  }
  
  requests[index].status = 'cancelled';
  requests[index].respondedAt = new Date().toISOString();
  
  saveApprovalRequests(requests);
  
  // Add to history
  addToApprovalHistory(requests[index], 'cancelled');
  
  return true;
}

/**
 * Notify vendor of new request
 */
function notifyVendor(request: ApprovalRequest): void {
  const notification = {
    id: Date.now(),
    type: 'approval_request',
    title: `New ${request.type} request`,
    message: `${request.requesterName} has submitted a ${request.type} request for approval`,
    requestId: request.id,
    vendorId: request.vendorId,
    priority: request.priority,
    read: false,
    timestamp: new Date().toISOString()
  };
  
  // Add to vendor's notifications
  const notifications = JSON.parse(localStorage.getItem('vendor_notifications') || '[]');
  notifications.unshift(notification);
  localStorage.setItem('vendor_notifications', JSON.stringify(notifications));
}

/**
 * Notify requester of approval/rejection
 */
function notifyRequester(
  request: ApprovalRequest,
  action: 'approved' | 'rejected',
  reason?: string
): void {
  const notification = {
    id: Date.now(),
    type: `${request.type}_${action}`,
    title: `${request.type} ${action}`,
    message: action === 'approved' 
      ? `Your ${request.type} request has been approved by ${request.vendorName}`
      : `Your ${request.type} request was rejected. Reason: ${reason}`,
    requestId: request.id,
    campaignId: request.campaignId,
    bookingId: request.bookingId,
    read: false,
    timestamp: new Date().toISOString(),
    priority: action === 'rejected' ? 'high' : 'medium'
  };
  
  // Add to user's notifications
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  notifications.unshift(notification);
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

/**
 * Update related campaign or booking status
 */
function updateRelatedEntity(request: ApprovalRequest, status: 'approved' | 'rejected'): void {
  if (request.type === 'campaign' && request.campaignId) {
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    const index = campaigns.findIndex((c: any) => c.id === request.campaignId);
    
    if (index !== -1) {
      campaigns[index].approvalStatus = status;
      campaigns[index].vendorApproved = status === 'approved';
      campaigns[index].lastUpdated = new Date().toISOString();
      
      if (status === 'rejected' && request.rejectionReason) {
        campaigns[index].rejectionReason = request.rejectionReason;
      }
      
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
  }
  
  if (request.type === 'booking' && request.bookingId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const index = bookings.findIndex((b: any) => b.id === request.bookingId);
    
    if (index !== -1) {
      bookings[index].status = status === 'approved' ? 'confirmed' : 'rejected';
      bookings[index].lastUpdated = new Date().toISOString();
      
      if (status === 'rejected' && request.rejectionReason) {
        bookings[index].rejectionReason = request.rejectionReason;
      }
      
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }
}

/**
 * Add to approval history
 */
function addToApprovalHistory(
  request: ApprovalRequest,
  action: 'approved' | 'rejected' | 'cancelled',
  notes?: string
): void {
  const history = getApprovalHistory();
  
  history.push({
    requestId: request.id,
    type: request.type,
    action,
    requesterId: request.requesterId,
    vendorId: request.vendorId,
    reviewedBy: request.reviewedBy,
    timestamp: new Date().toISOString(),
    notes
  });
  
  localStorage.setItem(APPROVAL_HISTORY_KEY, JSON.stringify(history));
}

/**
 * Get approval history
 */
export function getApprovalHistory(): any[] {
  const stored = localStorage.getItem(APPROVAL_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get approval statistics for vendor
 */
export function getVendorApprovalStats(vendorId: string): {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
  avgResponseTime: number;
} {
  const requests = getApprovalRequestsByVendor(vendorId);
  
  let totalResponseTime = 0;
  let respondedCount = 0;
  
  requests.forEach(request => {
    if (request.respondedAt) {
      const submitted = new Date(request.submittedAt).getTime();
      const responded = new Date(request.respondedAt).getTime();
      totalResponseTime += (responded - submitted);
      respondedCount++;
    }
  });
  
  const avgResponseTime = respondedCount > 0 
    ? totalResponseTime / respondedCount / (1000 * 60 * 60) // in hours
    : 0;
  
  return {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10
  };
}

/**
 * Get approval statistics for requester
 */
export function getRequesterApprovalStats(requesterId: string): {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
} {
  const requests = getApprovalRequestsByRequester(requesterId);
  const total = requests.length;
  const approved = requests.filter(r => r.status === 'approved').length;
  
  return {
    total,
    pending: requests.filter(r => r.status === 'pending').length,
    approved,
    rejected: requests.filter(r => r.status === 'rejected').length,
    approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0
  };
}

/**
 * Clean up old completed requests (older than 90 days)
 */
export function cleanupOldRequests(): number {
  const requests = getApprovalRequests();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const filtered = requests.filter(r => {
    if (r.status === 'pending') return true;
    
    const respondedDate = r.respondedAt ? new Date(r.respondedAt) : new Date(r.submittedAt);
    return respondedDate > ninetyDaysAgo;
  });
  
  const deletedCount = requests.length - filtered.length;
  saveApprovalRequests(filtered);
  
  return deletedCount;
}

/**
 * Bulk approve requests
 */
export function bulkApproveRequests(
  requestIds: string[],
  reviewerId: string
): { success: number; failed: number } {
  let success = 0;
  let failed = 0;
  
  requestIds.forEach(id => {
    if (approveRequest(id, reviewerId)) {
      success++;
    } else {
      failed++;
    }
  });
  
  return { success, failed };
}

/**
 * Bulk reject requests
 */
export function bulkRejectRequests(
  requestIds: string[],
  reviewerId: string,
  reason: string
): { success: number; failed: number } {
  let success = 0;
  let failed = 0;
  
  requestIds.forEach(id => {
    if (rejectRequest(id, reviewerId, reason)) {
      success++;
    } else {
      failed++;
    }
  });
  
  return { success, failed };
}
