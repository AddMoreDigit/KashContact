import { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { 
  EditCampaignModal,
  CancelCampaignDialog, 
  CorporateSidebar
} from './components/index';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule';

interface CorporateCampaignDetailPageProps {
  onNavigate: (page: Page) => void;
  onClose: () => void;
}

export function CorporateCampaignDetailPage({ onNavigate, onClose }: CorporateCampaignDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'members' | 'terms'>('overview');
  const [activePage, setActivePage] = useState<string>('campaigns');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const campaignData = {
    title: 'Swiss Adventure',
    image: 'https://images.unsplash.com/photo-1724053532329-35e7c4d98af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhZ2xpZGluZyUyMG1vdW50YWlucyUyMHN3aXNzfGVufDF8fHx8MTc2MzA4OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 70,
    goal: 25000,
    contributed: 10000,
    remaining: 15000,
    beneficiaries: 60,
    status: 'Active',
    description: 'Raise Funds for an initiative. Trip for 50 beneficiaries to cape Town. Covering Transportation, Food Transport and Activities.',
    vendors: [
      { id: 1, name: 'Seaview Lodge', type: 'Accommodation', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100' },
      { id: 2, name: 'Oceanview Dining', type: 'Meal', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100' },
      { id: 3, name: 'Island Paradise', type: 'Activities', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100' },
    ],
    members: [
      { id: 1, name: 'Sarah Mthize', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { id: 2, name: 'John', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { id: 3, name: 'Jabulani', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    ],
    sponsors: [],
    reports: [
      { id: 1, label: 'Trips Funded', value: 10, color: '#8363f2' },
      { id: 2, label: 'Nights Booked', value: 45, color: '#8363f2' },
      { id: 3, label: 'Most Sponsor', value: 120, color: '#8363f2' },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[900px] mx-auto px-8 py-8">
          {/* Hero Image */}
          <div className="relative mb-6 rounded-2xl overflow-hidden h-[300px]">
            <ImageWithFallback 
              src={campaignData.image} 
              alt={campaignData.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Badge */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-[24px] font-semibold text-black">{campaignData.title}</h1>
            <div className="px-4 py-1 bg-green-500 text-white rounded-full text-[12px] font-medium">
              {campaignData.status}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-gray-600">R10 000/ R25 000-70%</span>
              <span className="text-[16px] font-semibold text-black">{campaignData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${campaignData.progress}%` }}
              />
            </div>
          </div>

          {/* Beneficiaries Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-[14px] font-medium text-purple-700">{campaignData.beneficiaries} Beneficiaries</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#8363f2] text-[#8363f2]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'vendors'
                  ? 'border-[#8363f2] text-[#8363f2]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Vendors & Services
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'members'
                  ? 'border-[#8363f2] text-[#8363f2]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Members & Rules
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'terms'
                  ? 'border-[#8363f2] text-[#8363f2]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Terms & Conditions
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-[14px] text-gray-700 leading-relaxed">
              {campaignData.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-1">Goal</div>
              <div className="text-[20px] font-semibold text-black">R{campaignData.goal.toLocaleString()}.00</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-1">Contributed</div>
              <div className="text-[20px] font-semibold text-black">R{campaignData.contributed.toLocaleString()}.00</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-1">Remaining</div>
              <div className="text-[20px] font-semibold text-black">R{campaignData.remaining.toLocaleString()}.00</div>
            </div>
          </div>

          {/* Vendors & Services */}
          <div className="mb-8">
            <h3 className="text-[16px] font-semibold text-black mb-4">Vendors & Services</h3>
            <div className="space-y-3">
              {campaignData.vendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center gap-4">
                  <ImageWithFallback 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-[14px] font-medium text-black">{vendor.name}</div>
                    <div className="text-[12px] text-gray-600">{vendor.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="mb-8">
            <h3 className="text-[16px] font-semibold text-black mb-4">Members</h3>
            <div className="space-y-3">
              {campaignData.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <ImageWithFallback 
                    src={member.image} 
                    alt={member.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-[14px] font-medium text-black">{member.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors */}
          <div className="mb-8">
            <h3 className="text-[16px] font-semibold text-black mb-4">Sponsors</h3>
            <div className="text-[14px] text-gray-500">No sponsors yet</div>
          </div>

          {/* Report */}
          <div className="mb-8">
            <h3 className="text-[16px] font-semibold text-black mb-4">Report</h3>
            <div className="grid grid-cols-3 gap-4">
              {campaignData.reports.map((report) => (
                <div key={report.id} className="bg-[#8363f2] rounded-lg p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-[12px] mb-1">{report.label}</div>
                  <div className="text-[24px] font-bold">{report.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-6 py-2 text-[14px] bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Campaign
              </button>
              <button
                onClick={() => setShowCancelDialog(true)}
                className="px-6 py-2 text-[14px] bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0] transition-colors"
              >
                Pause Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditCampaignModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={() => {}}
      />

      <CancelCampaignDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={() => {}}
        campaignName={campaignData.title}
        campaignGoal={`R${campaignData.goal.toLocaleString()}`}
        campaignProgress={campaignData.progress}
        campaignRaised={campaignData.contributed}
        campaignTotal={campaignData.goal}
      />
    </div>
  );
}
