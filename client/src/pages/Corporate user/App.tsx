import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProfileSettings } from './components/ProfileSettings';
import { CampaignDetails } from './components/CampaignDetails';
import { CampaignSchedule } from './components/CampaignSchedule';
import { HelpSupport } from './components/HelpSupport';
import { DraftCampaigns } from './components/DraftCampaigns';
import { DashboardOverview } from './components/DashboardOverview';
import { ActiveCampaigns } from './components/ActiveCampaigns';
import { CreateCampaign } from './components/CreateCampaign';
import { PersonalGoals } from './components/PersonalGoals';
import { Transactions } from './components/Transactions';
import { TransactionsList } from './components/TransactionsList';
import { SendRemindersDialog } from './components/SendRemindersDialog';
import { AssignPackagesDialog } from './components/AssignPackagesDialog';
import { AddMembersDialog } from './components/AddMembersDialog';
import { ReviewConfirmDialog } from './components/ReviewConfirmDialog';

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showRemindersDialog, setShowRemindersDialog] = useState(false);
  const [showPackagesDialog, setShowPackagesDialog] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const renderView = () => {
    if (showCreateCampaign) {
      return <CreateCampaign />;
    }

    switch (activeView) {
      case 'profile':
        return <ProfileSettings />;
      case 'campaigns':
        return <ActiveCampaigns />;
      case 'dashboard':
        return <CampaignSchedule />;
      case 'help':
        return <HelpSupport />;
      case 'draft':
        return <DraftCampaigns />;
      case 'overview':
        return <DashboardOverview />;
      case 'verified':
        return <CampaignDetails />;
      case 'goals':
        return <PersonalGoals />;
      case 'transactions':
        return <TransactionsList />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>

      {/* Demo Buttons for Dialogs */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button 
          onClick={() => setShowRemindersDialog(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 text-sm"
        >
          Send Reminders
        </button>
        <button 
          onClick={() => setShowPackagesDialog(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 text-sm"
        >
          Assign Packages
        </button>
        <button 
          onClick={() => setShowMembersDialog(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 text-sm"
        >
          Add Members
        </button>
        <button 
          onClick={() => setShowReviewDialog(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 text-sm"
        >
          Review & Confirm
        </button>
      </div>

      {/* Dialogs */}
      <SendRemindersDialog 
        open={showRemindersDialog} 
        onOpenChange={setShowRemindersDialog}
      />
      <AssignPackagesDialog 
        open={showPackagesDialog} 
        onOpenChange={setShowPackagesDialog}
      />
      <AddMembersDialog 
        open={showMembersDialog} 
        onOpenChange={setShowMembersDialog}
      />
      <ReviewConfirmDialog 
        open={showReviewDialog} 
        onOpenChange={setShowReviewDialog}
      />
    </div>
  );
}
