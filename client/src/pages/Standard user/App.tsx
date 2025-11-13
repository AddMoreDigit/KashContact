import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProfilePage } from './components/ProfilePage';
import { DashboardPage } from './components/DashboardPage';
import { ServiceProvidersPage } from './components/ServiceProvidersPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { CampaignDetailPage } from './components/CampaignDetailPage';
import { MessagingPage } from './components/MessagingPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { SelectedServicesPage } from './components/SelectedServicesPage';
import { CreateCampaignPage } from './components/CreateCampaignPage';
import { ManageCampaignPage } from './components/ManageCampaignPage';
import { ContributorsPage } from './components/ContributorsPage';
import { ContributorDetailPage } from './components/ContributorDetailPage';
import { CampaignSchedulePage } from './components/CampaignSchedulePage';
import { CampaignsHistoryPage } from './components/CampaignsHistoryPage';
import { ContributePage } from './components/ContributePage';
import { OverviewPage } from './components/OverviewPage';
import { VouchersPage } from './components/VouchersPage';
import { IndividualCampaignPage } from './components/IndividualCampaignPage';
import { GroupCampaignPage } from './components/GroupCampaignPage';
import { ManagingCampaignsPage } from './components/ManagingCampaignsPage';
import { HelpSupportPage } from './components/HelpSupportPage';
import { SaveDraftPage } from './components/SaveDraftPage';
import { NotificationsDialog } from './components/NotificationsDialog';
import { SelectCampaignDialog } from './components/SelectCampaignDialog';
import { AddCampaignPanel } from './components/AddCampaignPanel';
import { Toaster } from './components/ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSelectCampaign, setShowSelectCampaign] = useState(false);
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  const handleAcceptInvitation = () => {
    setCurrentPage('campaignDetail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'overview':
        return <OverviewPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowSelectCampaign={() => setShowSelectCampaign(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'campaigns':
        return <ServiceProvidersPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'vouchers':
        return <VouchersPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'individualCampaign':
        return <IndividualCampaignPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'groupCampaign':
        return <GroupCampaignPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'managingCampaigns':
        return <ManagingCampaignsPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'helpSupport':
        return <HelpSupportPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'saveDraft':
      case 'draft':
        return <SaveDraftPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowAddCampaign={() => setShowAddCampaign(true)} />;
      case 'howItWorks':
        return <HowItWorksPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'campaignDetail':
        return <CampaignDetailPage onNavigate={setCurrentPage} />;
      case 'messaging':
        return <MessagingPage />;
      case 'serviceDetail':
        return <ServiceDetailPage onNavigate={setCurrentPage} />;
      case 'selectedServices':
        return <SelectedServicesPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'createCampaign':
        return <CreateCampaignPage onNavigate={setCurrentPage} />;
      case 'manageCampaign':
        return <ManageCampaignPage onNavigate={setCurrentPage} />;
      case 'contributors':
        return <ContributorsPage onNavigate={setCurrentPage} />;
      case 'contributorDetail':
        return <ContributorDetailPage onNavigate={setCurrentPage} />;
      case 'campaignSchedule':
        return <CampaignSchedulePage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'campaignsHistory':
        return <CampaignsHistoryPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
      case 'contribute':
        return <ContributePage onNavigate={setCurrentPage} />;
      default:
        return <HowItWorksPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} />;
    }
  };

  // Messaging page and full-width pages have their own layouts
  if (currentPage === 'messaging') {
    return (
      <>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
          <MessagingPage />
        </div>
        <NotificationsDialog 
          open={showNotifications} 
          onOpenChange={setShowNotifications}
          onAccept={handleAcceptInvitation}
        />
      </>
    );
  }

  // Full-width pages without sidebar
  if (currentPage === 'createCampaign' || currentPage === 'serviceDetail' || currentPage === 'manageCampaign' || currentPage === 'contributors') {
    return (
      <>
        {renderPage()}
        <NotificationsDialog 
          open={showNotifications} 
          onOpenChange={setShowNotifications}
          onAccept={handleAcceptInvitation}
        />
        <SelectCampaignDialog
          open={showSelectCampaign}
          onOpenChange={setShowSelectCampaign}
          onNavigate={setCurrentPage}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <NotificationsDialog 
        open={showNotifications} 
        onOpenChange={setShowNotifications}
        onAccept={handleAcceptInvitation}
      />
      <SelectCampaignDialog
        open={showSelectCampaign}
        onOpenChange={setShowSelectCampaign}
        onNavigate={setCurrentPage}
      />

      <AddCampaignPanel
        open={showAddCampaign}
        onOpenChange={setShowAddCampaign}
        onNavigate={setCurrentPage}
      />
      <Toaster />
    </div>
  );
}
