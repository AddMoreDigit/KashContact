import { useState } from 'react';
import { AppProvider } from '../contexts/AppContext';
import { Sidebar } from '../components/Sidebar';
import { AdminOverview } from '../components/AdminOverview';
import { CampaignsManagement } from '../components/CampaignsManagement';
import { VoucherManagement } from '../components/VoucherManagement';
import { TransactionManagement } from '../components/TransactionManagement';
import { ReportsAnalytic } from '../components/ReportsAnalytic';
import { UserManagement } from '../components/UserManagement';
import { UserProfile } from '../components/UserProfile';
import { CampaignDashboard } from '../components/CampaignDashboard';

export type ViewType = 
  | 'dashboard' 
  | 'campaigns' 
  | 'campaign-detail'
  | 'vouchers' 
  | 'transactions' 
  | 'reports' 
  | 'vendors'
  | 'members' 
  | 'profile'
  | 'social'
  | 'draft';

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    if (view !== 'campaign-detail') {
      setSelectedCampaignId(null);
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setActiveView('campaign-detail');
  };

  const handleCloseCampaign = () => {
    setActiveView('campaigns');
    setSelectedCampaignId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminOverview />;
      case 'campaigns':
        return <CampaignsManagement onViewCampaign={handleViewCampaign} />;
      case 'campaign-detail':
        return selectedCampaignId ? (
          <CampaignDashboard headerImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" onClose={handleCloseCampaign} />
        ) : (
          <CampaignsManagement onViewCampaign={handleViewCampaign} />
        );
      case 'vouchers':
        return <VoucherManagement />;
      case 'transactions':
        return <TransactionManagement />;
      case 'reports':
        return <ReportsAnalytic />;
      case 'vendors':
      case 'members':
        return <UserManagement />;
      case 'profile':
        return <UserProfile onClose={() => handleNavigate('dashboard')} />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </AppProvider>
  );
}
