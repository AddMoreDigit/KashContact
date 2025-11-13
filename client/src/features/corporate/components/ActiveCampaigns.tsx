import { Search, Bell, ShoppingCart, User as UserIcon, Calendar, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EditCampaignDialog } from './EditCampaignDialog';
import { CancelCampaignDialog } from './CancelCampaignDialog';
const image1 = "https://via.placeholder.com/400x300?text=Image";
const image2 = "https://via.placeholder.com/400x300?text=Image";
const image3 = "https://via.placeholder.com/400x300?text=Image";

export function ActiveCampaigns() {
  const [editCampaignOpen, setEditCampaignOpen] = useState(false);
  const [cancelCampaignOpen, setCancelCampaignOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const campaigns = [
    {
      id: 1,
      title: 'Swiss Adventure',
      image: image1,
      status: 'Active',
      progress: 70,
      raised: 'R10 000',
      goal: 'R25 000',
      vendors: ['Blue Hotel', "Bear's Dining", 'Sky Games'],
      details: { duration: '3 Months', members: 5, contributors: 150 },
      timeline: 'Nov 15, 2025-Feb 10, 2025',
      impact: { beneficiaries: 150, trips: 8 }
    },
    {
      id: 2,
      title: 'Cape Town Trip',
      image: image2,
      status: 'Active',
      progress: 70,
      raised: 'R10 000',
      goal: 'R25 000',
      vendors: ['Blue Hotel', "Bear's Dining", 'Sky Games'],
      details: { duration: '1 Months', members: 3, contributors: 90 },
      timeline: 'Nov 15, 2025-Feb 10, 2025',
      impact: { beneficiaries: 90, trips: 0 }
    },
    {
      id: 3,
      title: 'Durban South Coast',
      image: image3,
      status: 'Active',
      progress: 70,
      raised: 'R10 000',
      goal: 'R25 000',
      vendors: ['Blue Hotel', "Bear's Dining", 'Sky Games'],
      details: { duration: '3 Months', members: 6, contributors: 150 },
      timeline: 'Nov 15, 2025-Feb 10, 2025',
      impact: { beneficiaries: 150, trips: 0 }
    }
  ];

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setEditCampaignOpen(true);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search" className="pl-10 w-64" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-purple-600 hover:bg-purple-700">Create</Button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <UserIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Header with Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Active Campaigns</h1>
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Members</SelectItem>
                <SelectItem value="5">5+</SelectItem>
                <SelectItem value="10">10+</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Date Range</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Category</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Campaign Image */}
              <div className="relative h-40">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Campaign Content */}
              <div className="p-4">
                {/* Title and Status */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg">{campaign.title}</h3>
                  <Badge className="bg-green-500 text-white hover:bg-green-600">
                    {campaign.status}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {campaign.raised} | {campaign.goal}
                  </p>
                </div>

                {/* Vendors Involved */}
                <div className="mb-4">
                  <p className="text-sm mb-2">Vendors Involved</p>
                  <div className="space-y-1">
                    {campaign.vendors.map((vendor, idx) => (
                      <p key={idx} className="text-sm text-gray-600">{vendor}</p>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="border-t border-gray-200 pt-3 mb-3">
                  <p className="text-sm mb-2">Details</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{campaign.details.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span>{campaign.details.members}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span>{campaign.details.contributors}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 pt-3 mb-3">
                  <p className="text-sm mb-2">Timeline</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{campaign.timeline}</span>
                  </div>
                </div>

                {/* Impact */}
                <div className="border-t border-gray-200 pt-3 mb-4">
                  <p className="text-sm mb-2">Impact</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span>{campaign.impact.beneficiaries}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{campaign.impact.trips}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleEditCampaign(campaign)}
                  >
                    Edit Campaign
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <EditCampaignDialog 
        open={editCampaignOpen} 
        onOpenChange={setEditCampaignOpen}
        campaign={selectedCampaign}
        onCancel={() => setCancelCampaignOpen(true)}
      />
      <CancelCampaignDialog 
        open={cancelCampaignOpen} 
        onOpenChange={setCancelCampaignOpen}
        campaign={selectedCampaign}
      />
    </div>
  );
}
