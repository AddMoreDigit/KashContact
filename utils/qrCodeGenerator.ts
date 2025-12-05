// QR Code Generation Utility
import QRCode from 'qrcode';

export interface VoucherQRData {
  voucherId: string;
  campaignId: string;
  campaignName: string;
  amount: number;
  issueDate: string;
  expiryDate: string;
  redeemedDate?: string;
  status: 'active' | 'redeemed' | 'expired';
  recipientEmail: string;
}

/**
 * Generate QR code as data URL for vouchers
 */
export async function generateVoucherQRCode(data: VoucherQRData): Promise<string> {
  try {
    const qrData = JSON.stringify(data);
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#8363f2',
        light: '#ffffff'
      }
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Validate and decode QR code data
 */
export function validateVoucherQR(qrData: string): VoucherQRData | null {
  try {
    const data = JSON.parse(qrData) as VoucherQRData;
    
    // Check if voucher is expired
    const now = new Date();
    const expiryDate = new Date(data.expiryDate);
    
    if (expiryDate < now && data.status !== 'expired') {
      data.status = 'expired';
    }
    
    return data;
  } catch (error) {
    console.error('Invalid QR code data:', error);
    return null;
  }
}

/**
 * Check if voucher can be redeemed
 */
export function canRedeemVoucher(voucher: VoucherQRData): { canRedeem: boolean; reason?: string } {
  const now = new Date();
  const expiryDate = new Date(voucher.expiryDate);
  
  if (voucher.status === 'redeemed') {
    return { canRedeem: false, reason: 'Voucher has already been redeemed' };
  }
  
  if (expiryDate < now || voucher.status === 'expired') {
    return { canRedeem: false, reason: 'Voucher has expired' };
  }
  
  return { canRedeem: true };
}

/**
 * Redeem voucher and update status
 */
export function redeemVoucher(voucherId: string): boolean {
  try {
    const vouchers = getVouchers();
    const voucher = vouchers.find(v => v.voucherId === voucherId);
    
    if (!voucher) {
      return false;
    }
    
    const validation = canRedeemVoucher(voucher);
    if (!validation.canRedeem) {
      return false;
    }
    
    voucher.status = 'redeemed';
    voucher.redeemedDate = new Date().toISOString();
    
    saveVouchers(vouchers);
    
    // Add to redemption history
    addRedemptionHistory({
      voucherId,
      campaignName: voucher.campaignName,
      amount: voucher.amount,
      redeemedDate: voucher.redeemedDate,
      recipientEmail: voucher.recipientEmail
    });
    
    return true;
  } catch (error) {
    console.error('Error redeeming voucher:', error);
    return false;
  }
}

// Voucher Storage Management
const VOUCHERS_KEY = 'vouchers';
const REDEMPTION_HISTORY_KEY = 'voucher_redemption_history';

export function getVouchers(): VoucherQRData[] {
  const stored = localStorage.getItem(VOUCHERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveVouchers(vouchers: VoucherQRData[]): void {
  localStorage.setItem(VOUCHERS_KEY, JSON.stringify(vouchers));
}

export function addVoucher(voucher: VoucherQRData): void {
  const vouchers = getVouchers();
  vouchers.push(voucher);
  saveVouchers(vouchers);
}

export function getVoucherById(voucherId: string): VoucherQRData | null {
  const vouchers = getVouchers();
  return vouchers.find(v => v.voucherId === voucherId) || null;
}

export function getVouchersByCampaign(campaignId: string): VoucherQRData[] {
  const vouchers = getVouchers();
  return vouchers.filter(v => v.campaignId === campaignId);
}

export function getRedemptionHistory(): any[] {
  const stored = localStorage.getItem(REDEMPTION_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

function addRedemptionHistory(redemption: any): void {
  const history = getRedemptionHistory();
  history.push(redemption);
  localStorage.setItem(REDEMPTION_HISTORY_KEY, JSON.stringify(history));
}

/**
 * Clean up expired vouchers
 */
export function cleanupExpiredVouchers(): number {
  const vouchers = getVouchers();
  const now = new Date();
  let cleanedCount = 0;
  
  const updated = vouchers.map(voucher => {
    const expiryDate = new Date(voucher.expiryDate);
    if (expiryDate < now && voucher.status !== 'expired' && voucher.status !== 'redeemed') {
      voucher.status = 'expired';
      cleanedCount++;
    }
    return voucher;
  });
  
  saveVouchers(updated);
  return cleanedCount;
}

/**
 * Get voucher statistics
 */
export function getVoucherStats() {
  const vouchers = getVouchers();
  
  return {
    total: vouchers.length,
    active: vouchers.filter(v => v.status === 'active').length,
    redeemed: vouchers.filter(v => v.status === 'redeemed').length,
    expired: vouchers.filter(v => v.status === 'expired').length,
    totalValue: vouchers.reduce((sum, v) => sum + v.amount, 0),
    redeemedValue: vouchers.filter(v => v.status === 'redeemed').reduce((sum, v) => sum + v.amount, 0)
  };
}
