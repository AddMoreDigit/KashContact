import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Layout } from './Layout';
import { campaigns, campaignStats } from '../data/mockData';
import { getStatusColor, formatCurrency } from '../utils/formatters';

interface CampaignsManagementProps {
  onViewCampaign?: (campaignId: string) => void;
}

export function CampaignsManagement({ onViewCampaign }: CampaignsManagementProps) {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6">Campaigns Management</h1>

        {/* Tabs */}
        <div className="mb-6">
          <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2">
            All
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Campaigns</div>
            <div className="text-3xl">{campaignStats.totalCampaigns}</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Active Campaigns</div>
            <div className="text-3xl">{campaignStats.activeCampaigns}</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Best Campaigns</div>
            <div className="text-3xl">{campaignStats.bestCampaigns}</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Best Vendors</div>
            <div className="text-3xl">{campaignStats.bestVendors}</div>
          </div>
        </div>

        {/* Sort button */}
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Sort by
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Campaigns</th>
                <th className="px-6 py-3 text-left text-sm">Owner</th>
                <th className="px-6 py-3 text-left text-sm">Vendors Involved</th>
                <th className="px-6 py-3 text-left text-sm">Goal vs Raised</th>
                <th className="px-6 py-3 text-left text-sm">Status</th>
                <th className="px-6 py-3 text-left text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr 
                  key={campaign.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onViewCampaign?.(campaign.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="text-sm">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{campaign.owner}</td>
                  <td className="px-6 py-4 text-sm text-center">{campaign.vendorsInvolved}</td>
                  <td className="px-6 py-4 text-sm">{formatCurrency(campaign.goal)}/{formatCurrency(campaign.raised)}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{campaign.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
