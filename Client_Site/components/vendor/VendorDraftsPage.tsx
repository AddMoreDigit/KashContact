import { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { Toaster } from '../ui/sonner';
import { VendorSidebar } from './VendorSidebar';

type Page = 'vendorDashboard' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorProfile' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp';

interface VendorDraftsPageProps {
  onNavigate: (page: Page) => void;
}

export function VendorDraftsPage({ onNavigate }: VendorDraftsPageProps) {
  const [activePage] = useState<string>('drafts');

  const handleNavigation = (page: Page) => {
    onNavigate(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('login');
    }, 500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          <h1 className="text-[24px] font-medium text-black mb-1">Drafts</h1>
          <p className="text-[14px] text-gray-600 mb-8">Manage your draft services and vouchers</p>

          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-[18px] font-medium text-black mb-2">No Drafts Yet</h3>
            <p className="text-[14px] text-gray-600">Your draft services and vouchers will appear here</p>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}