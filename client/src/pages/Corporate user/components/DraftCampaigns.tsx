import { Search, Bell, ShoppingCart, User as UserIcon, Star, MapPin, Users, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import image1 from 'figma:asset/94f3204e8d3899223bc6d569abc5e6e65fb4f789.png';
import image2 from 'figma:asset/c78af3e4a1c4651a128b16115e8e387ae924326b.png';
import image3 from 'figma:asset/272adeb67093e206cef1df23cce3aadfb5096c76.png';

export function DraftCampaigns() {
  const campaigns = [
    {
      id: 1,
      title: 'Magalies park gateway weekend',
      image: image1,
      rating: 5,
      reviews: 74,
      provider: 'Service Provider',
      providerName: 'Magalies Hotel',
      goal: 'R15 000.00',
      members: 10,
      step: '3 of 5',
      progress: 60
    },
    {
      id: 2,
      title: 'Magalies park gateway weekend',
      image: image2,
      rating: 5,
      reviews: 74,
      provider: 'Service Provider',
      providerName: 'Magalies Hotel',
      goal: 'R15 000.00',
      members: 10,
      step: '2 of 5',
      progress: 40
    },
    {
      id: 3,
      title: 'Gold reef city team building',
      image: image3,
      rating: 5,
      reviews: 104,
      provider: 'Service Provider',
      providerName: 'Magalies Hotel',
      goal: 'R15 000.00',
      members: 10,
      step: '1 of 5',
      progress: 20
    }
  ];

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
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Save as draft</h1>
          <p className="text-gray-600">
            These are the campaigns you've started but not completed, continue editing to finalize and launch your campaigns
          </p>
        </div>

        {/* Campaign Cards */}
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex gap-6">
                {/* Campaign Image */}
                <div className="w-48 h-32 flex-shrink-0">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Campaign Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-2">{campaign.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm">⭐ {campaign.rating}</span>
                        <span className="text-sm text-gray-500">({campaign.reviews} Reviews)</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Draft
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">{campaign.provider}</p>
                        <p>{campaign.providerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Goal</p>
                        <p>{campaign.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Member added</p>
                        <p>as for [{campaign.members}]</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Step {campaign.step}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline">Back</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">Continue editing</Button>
                    <Button variant="destructive">Delete Draft</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
