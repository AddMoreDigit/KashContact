import { useState } from 'react';
import { Search, Calendar, Users, Home } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CorporateSidebar } from './CorporateSidebar';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateHelp' | 'corporateDrafts';

interface CorporateDraftsPageProps {
  onNavigate: (page: Page) => void;
}

const draftCampaigns = [
  {
    id: 1,
    title: 'Magalies park getaway weekend',
    image: 'https://images.unsplash.com/photo-1757839939502-afa95e78dd60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhbGllcyUyMGhvdGVsJTIwcmVzb3J0fGVufDF8fHx8MTc2MzA5MDQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 2,
    reviews: 34,
    status: 'Draft',
    serviceProvider: 'Magalies Hotel',
    goal: 'R10 000.00',
    membersAdded: 10,
    step: 3,
    totalSteps: 5
  },
  {
    id: 2,
    title: 'Magalies park getaway weekend',
    image: 'https://images.unsplash.com/photo-1757839939502-afa95e78dd60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhbGllcyUyMGhvdGVsJTIwcmVzb3J0fGVufDF8fHx8MTc2MzA5MDQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 2,
    reviews: 34,
    status: 'Draft',
    serviceProvider: 'Magalies Hotel',
    goal: 'R10 000.00',
    membersAdded: 10,
    step: 2,
    totalSteps: 5
  },
  {
    id: 3,
    title: 'Gold reef city team building',
    image: 'https://images.unsplash.com/photo-1568557175160-8faa21f27bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmVlZiUyMGNpdHklMjB0aGVtZSUyMHBhcmt8ZW58MXx8fHwxNzYzMDkwNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 1,
    reviews: 108,
    status: 'Draft',
    serviceProvider: 'Gold reef city',
    goal: 'R18 000.00',
    membersAdded: 10,
    step: 1,
    totalSteps: 5
  }
];

export function CorporateDraftsPage({ onNavigate }: CorporateDraftsPageProps) {
  const [activePage, setActivePage] = useState<string>('drafts');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage="drafts"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Create
          </button>
        </div>

        {/* Drafts List */}
        <div className="p-8">
          <h1 className="text-[24px] font-semibold text-black mb-6">Save as draft</h1>
          <p className="text-[14px] text-gray-600 mb-6">
            These are the campaigns you've started but not completed, continue editing to finalize and launch your campaigns
          </p>

          <div className="space-y-4">
            {draftCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex gap-6">
                  {/* Campaign Image */}
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Campaign Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-[16px] font-semibold text-black mb-2">{campaign.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          {renderStars(campaign.rating)}
                          <span className="text-[12px] text-gray-500">({campaign.reviews} Reviews)</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[12px] border border-blue-200 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {campaign.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-[14px] text-gray-700">
                        <Home className="w-4 h-4 text-gray-500" />
                        <span>Service Provider: {campaign.serviceProvider}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px] text-gray-700">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Goal: {campaign.goal}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px] text-gray-700">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Member added on [{campaign.membersAdded}]</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] text-gray-600">Step {campaign.step} of {campaign.totalSteps}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(campaign.step / campaign.totalSteps) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="text-[14px] text-gray-700 hover:text-gray-900 transition-colors">
                        Back
                      </button>
                      <button className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Continue editing
                      </button>
                      <button className="px-6 py-2 text-[14px] text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        Delete Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}