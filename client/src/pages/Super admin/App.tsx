import { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Sidebar } from './components/Sidebar';
import { AdminOverview } from './components/AdminOverview';
import { CampaignsManagement } from './components/CampaignsManagement';
import { VoucherManagement } from './components/VoucherManagement';
import { TransactionManagement } from './components/TransactionManagement';
import { ReportsAnalytic } from './components/ReportsAnalytic';
import { UserManagement } from './components/UserManagement';
import { UserProfile } from './components/UserProfile';
import { CampaignDashboard } from './components/CampaignDashboard';

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

export default function App() {
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
        return (
          <CampaignDashboard 
            headerImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
            onClose={handleCloseCampaign}
          />
        );
      
      case 'vouchers':
        return <VoucherManagement />;
      
      case 'transactions':
        return <TransactionManagement />;
      
      case 'reports':
        return <ReportsAnalytic />;
      
      case 'members':
        return <UserManagement />;
      
      case 'profile':
        return <UserProfile onClose={() => handleNavigate('dashboard')} />;
      
      case 'vendors':
      case 'social':
      case 'draft':
        return (
          <div className="flex-1 bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)} - Coming soon
            </p>
          </div>
        );
      
      default:
        return <AdminOverview />;
    }
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        {renderContent()}
      </div>
    </AppProvider>
  );
}
