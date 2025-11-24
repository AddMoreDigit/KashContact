// PDF Generation Utility for Invoices and Receipts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  vendorInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    taxNumber?: string;
  };
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  taxRate: number;
  discount?: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
}

export interface ReceiptData {
  receiptNumber: string;
  transactionId: string;
  date: string;
  payer: {
    name: string;
    email: string;
  };
  payee: {
    name: string;
    email: string;
  };
  campaignName: string;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

/**
 * Generate professional invoice PDF
 */
export async function generateInvoicePDF(data: InvoiceData): Promise<Blob> {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Header with purple branding
  pdf.setFillColor(131, 99, 242); // Purple #8363f2
  pdf.rect(0, 0, pageWidth, 30, 'F');
  
  // Logo/Company Name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text('KEAHCONT', 20, 20);
  
  // Invoice title
  pdf.setFontSize(12);
  pdf.text('INVOICE', pageWidth - 60, 20);
  
  // Reset text color
  pdf.setTextColor(0, 0, 0);
  
  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice #: ${data.invoiceNumber}`, 20, 45);
  pdf.text(`Date: ${formatDate(data.invoiceDate)}`, 20, 52);
  pdf.text(`Due Date: ${formatDate(data.dueDate)}`, 20, 59);
  
  // Vendor information
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'bold');
  pdf.text('From:', 20, 75);
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(10);
  pdf.text(data.vendorInfo.name, 20, 82);
  pdf.text(data.vendorInfo.email, 20, 89);
  pdf.text(data.vendorInfo.phone, 20, 96);
  if (data.vendorInfo.address) {
    pdf.text(data.vendorInfo.address, 20, 103);
  }
  if (data.vendorInfo.taxNumber) {
    pdf.text(`Tax #: ${data.vendorInfo.taxNumber}`, 20, 110);
  }
  
  // Client information
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'bold');
  pdf.text('Bill To:', pageWidth - 90, 75);
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(10);
  pdf.text(data.clientInfo.name, pageWidth - 90, 82);
  pdf.text(data.clientInfo.email, pageWidth - 90, 89);
  if (data.clientInfo.phone) {
    pdf.text(data.clientInfo.phone, pageWidth - 90, 96);
  }
  if (data.clientInfo.address) {
    pdf.text(data.clientInfo.address, pageWidth - 90, 103);
  }
  
  // Line items table
  let yPos = 130;
  
  // Table header
  pdf.setFillColor(240, 240, 240);
  pdf.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
  pdf.setFont(undefined, 'bold');
  pdf.text('Description', 25, yPos);
  pdf.text('Qty', pageWidth - 120, yPos);
  pdf.text('Unit Price', pageWidth - 90, yPos);
  pdf.text('Total', pageWidth - 50, yPos);
  
  pdf.setFont(undefined, 'normal');
  yPos += 10;
  
  // Table items
  data.items.forEach((item) => {
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = 30;
    }
    
    pdf.text(item.description, 25, yPos);
    pdf.text(item.quantity.toString(), pageWidth - 120, yPos);
    pdf.text(`R${item.unitPrice.toFixed(2)}`, pageWidth - 90, yPos);
    pdf.text(`R${item.total.toFixed(2)}`, pageWidth - 50, yPos);
    yPos += 7;
  });
  
  // Totals section
  yPos += 10;
  const totalsX = pageWidth - 90;
  
  pdf.text('Subtotal:', totalsX, yPos);
  pdf.text(`R${data.subtotal.toFixed(2)}`, pageWidth - 50, yPos);
  yPos += 7;
  
  if (data.discount && data.discount > 0) {
    pdf.text('Discount:', totalsX, yPos);
    pdf.text(`-R${data.discount.toFixed(2)}`, pageWidth - 50, yPos);
    yPos += 7;
  }
  
  pdf.text(`Tax (${data.taxRate}%):`, totalsX, yPos);
  pdf.text(`R${data.tax.toFixed(2)}`, pageWidth - 50, yPos);
  yPos += 7;
  
  // Total
  pdf.setFont(undefined, 'bold');
  pdf.setFontSize(12);
  pdf.text('Total:', totalsX, yPos);
  pdf.text(`R${data.total.toFixed(2)}`, pageWidth - 50, yPos);
  
  // Notes and payment terms
  if (data.notes || data.paymentTerms) {
    yPos += 20;
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(10);
    
    if (data.notes) {
      pdf.text('Notes:', 20, yPos);
      yPos += 7;
      const splitNotes = pdf.splitTextToSize(data.notes, pageWidth - 40);
      pdf.text(splitNotes, 20, yPos);
      yPos += splitNotes.length * 7;
    }
    
    if (data.paymentTerms) {
      yPos += 5;
      pdf.text('Payment Terms:', 20, yPos);
      yPos += 7;
      const splitTerms = pdf.splitTextToSize(data.paymentTerms, pageWidth - 40);
      pdf.text(splitTerms, 20, yPos);
    }
  }
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text('Thank you for your business!', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return pdf.output('blob');
}

/**
 * Generate payment receipt PDF
 */
export async function generateReceiptPDF(data: ReceiptData): Promise<Blob> {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Header with purple branding
  pdf.setFillColor(131, 99, 242);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.text('KEAHCONT', pageWidth / 2, 22, { align: 'center' });
  
  // Receipt title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.text('PAYMENT RECEIPT', pageWidth / 2, 55, { align: 'center' });
  
  // Status badge
  const statusColor = data.status === 'completed' ? [34, 197, 94] : 
                      data.status === 'pending' ? [234, 179, 8] : [239, 68, 68];
  pdf.setFillColor(...statusColor);
  pdf.roundedRect(pageWidth / 2 - 20, 62, 40, 8, 2, 2, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.text(data.status.toUpperCase(), pageWidth / 2, 68, { align: 'center' });
  
  // Receipt details
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(11);
  let yPos = 85;
  
  // Receipt info
  pdf.setFont(undefined, 'bold');
  pdf.text('Receipt Number:', 30, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.receiptNumber, 90, yPos);
  yPos += 8;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Transaction ID:', 30, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.transactionId, 90, yPos);
  yPos += 8;
  
  pdf.setFont(undefined, 'bold');
  pdf.text('Date:', 30, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(formatDate(data.date), 90, yPos);
  yPos += 15;
  
  // Payer info
  pdf.setFillColor(245, 245, 247);
  pdf.rect(20, yPos - 5, pageWidth - 40, 25, 'F');
  
  pdf.setFont(undefined, 'bold');
  pdf.text('From:', 25, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.payer.name, 25, yPos + 7);
  pdf.text(data.payer.email, 25, yPos + 14);
  yPos += 30;
  
  // Payee info
  pdf.setFont(undefined, 'bold');
  pdf.text('To:', 25, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.payee.name, 25, yPos + 7);
  pdf.text(data.payee.email, 25, yPos + 14);
  yPos += 25;
  
  // Campaign info
  pdf.setFont(undefined, 'bold');
  pdf.text('Campaign:', 25, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.campaignName, 25, yPos + 7);
  yPos += 15;
  
  // Payment method
  pdf.setFont(undefined, 'bold');
  pdf.text('Payment Method:', 25, yPos);
  pdf.setFont(undefined, 'normal');
  pdf.text(data.paymentMethod, 90, yPos);
  yPos += 20;
  
  // Amount section with highlight
  pdf.setFillColor(131, 99, 242);
  pdf.roundedRect(20, yPos - 5, pageWidth - 40, 20, 3, 3, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('Amount Paid:', 30, yPos + 7);
  pdf.setFontSize(18);
  pdf.text(`R${data.amount.toFixed(2)}`, pageWidth - 40, yPos + 7, { align: 'right' });
  
  // Description
  if (data.description) {
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    yPos += 30;
    pdf.text('Description:', 25, yPos);
    yPos += 7;
    const splitDesc = pdf.splitTextToSize(data.description, pageWidth - 50);
    pdf.text(splitDesc, 25, yPos);
  }
  
  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(128, 128, 128);
  pdf.text('This is a computer-generated receipt and does not require a signature.', 
           pageWidth / 2, pageHeight - 20, { align: 'center' });
  pdf.text('For inquiries, contact support@keahcont.co.za', 
           pageWidth / 2, pageHeight - 12, { align: 'center' });
  
  return pdf.output('blob');
}

/**
 * Export data to CSV
 */
export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) {
    throw new Error('No data to export');
  }
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csv = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Handle values with commas by wrapping in quotes
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    });
    csv += values.join(',') + '\n';
  });
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Export analytics report to PDF
 */
export async function exportAnalyticsPDF(
  title: string,
  data: any,
  charts?: HTMLElement[]
): Promise<Blob> {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  let yPos = 20;
  
  // Header
  pdf.setFillColor(131, 99, 242);
  pdf.rect(0, 0, pageWidth, 30, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text(title, pageWidth / 2, 20, { align: 'center' });
  
  // Date
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  yPos = 45;
  pdf.text(`Generated: ${formatDate(new Date().toISOString())}`, 20, yPos);
  yPos += 15;
  
  // Data summary
  pdf.setFontSize(12);
  Object.entries(data).forEach(([key, value]) => {
    pdf.text(`${formatKey(key)}: ${value}`, 20, yPos);
    yPos += 8;
  });
  
  // Add charts if provided
  if (charts && charts.length > 0) {
    for (const chart of charts) {
      const canvas = await html2canvas(chart);
      const imgData = canvas.toDataURL('image/png');
      
      yPos += 10;
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }
      
      pdf.addImage(imgData, 'PNG', 20, yPos, pageWidth - 40, 80);
      yPos += 90;
    }
  }
  
  return pdf.output('blob');
}

/**
 * Download blob as file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format object key for display
 */
function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Save invoice to localStorage
 */
export function saveInvoice(invoice: InvoiceData): void {
  const invoices = getInvoices();
  invoices.push(invoice);
  localStorage.setItem('invoices', JSON.stringify(invoices));
}

/**
 * Get all invoices
 */
export function getInvoices(): InvoiceData[] {
  const stored = localStorage.getItem('invoices');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save receipt to localStorage
 */
export function saveReceipt(receipt: ReceiptData): void {
  const receipts = getReceipts();
  receipts.push(receipt);
  localStorage.setItem('receipts', JSON.stringify(receipts));
}

/**
 * Get all receipts
 */
export function getReceipts(): ReceiptData[] {
  const stored = localStorage.getItem('receipts');
  return stored ? JSON.parse(stored) : [];
}
