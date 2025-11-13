import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
const bannerImage = "https://via.placeholder.com/400x300?text=Image";

export function CampaignDetails() {
  const vendors = [
    { name: 'Serafine Lodge', type: 'Accommodation', image: '🏨' },
    { name: 'Oceanview Dining', type: 'Meal', image: '🍽️' },
    { name: 'Island Paradise', type: 'Activities', image: '🏖️' },
  ];

  const members = [
    { name: 'Shaun Mkhize', role: 'Lead' },
    { name: 'John', role: 'Member' },
    { name: 'Jabuani', role: 'Member' },
  ];

  return (
    <div className="p-8 max-w-5xl">
      {/* Header with Close Button */}
      <div className="flex justify-end mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Campaign Banner */}
      <div className="relative mb-6 rounded-xl overflow-hidden">
        <img src={bannerImage} alt="Swiss Adventure" className="w-full h-64 object-cover" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
            <h2>Swiss Adventure</h2>
          </div>
          <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Active</span>
        </div>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded text-sm">
          70%
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }} />
          </div>
          <span className="text-sm">70%</span>
        </div>
        <p className="text-sm text-gray-600">R10 000 | R25 000-70%</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">Vendors & Services</TabsTrigger>
          <TabsTrigger value="members">Members & Roles</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <p className="text-sm text-gray-600">
            Raise Funds for an inclusive Trip for 50 beneficiaries to cape Town, Covering
            Accommodation, Food, Transport and Activities
          </p>
        </TabsContent>
      </Tabs>

      {/* Goal, Contributed, Remaining */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <p className="text-sm text-gray-600 mb-1">Goal</p>
          <p className="text-xl">R25 000,00</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Contributed</p>
          <p className="text-xl">R10 000,00</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Remaining</p>
          <p className="text-xl">R15 000,00</p>
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
              />
            ))}
          </div>
          <span className="text-sm">50 Beneficiaries</span>
        </div>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Vendors & Services */}
        <div>
          <h3 className="mb-4">Vendors & Services</h3>
          <div className="space-y-3">
            {vendors.map((vendor, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                  {vendor.image}
                </div>
                <div>
                  <p className="text-sm">{vendor.name}</p>
                  <p className="text-xs text-gray-500">{vendor.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <h3 className="mb-4">Members</h3>
          <div className="space-y-3">
            {members.map((member, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                <div>
                  <p className="text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors */}
        <div>
          <h3 className="mb-4">Sponsors</h3>
          <p className="text-sm text-gray-500">No sponsors yet</p>
        </div>
      </div>

      {/* Report */}
      <div className="mb-8">
        <h3 className="mb-4">Report</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-xl">📄</span>
            </div>
            <p className="text-sm text-gray-700">Trips Funded</p>
            <p className="text-xl">10</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-xl">📅</span>
            </div>
            <p className="text-sm text-gray-700">Night Booked</p>
            <p className="text-xl">46</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
            <p className="text-sm text-gray-700">Meal Sponsor</p>
            <p className="text-xl">120</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline">Back</Button>
        <Button variant="outline">Edit Campaign</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Raise Campaign</Button>
      </div>
    </div>
  );
}
