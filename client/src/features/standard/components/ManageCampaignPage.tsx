import { useState } from 'react';
import { ChevronLeft, Edit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
const campaignHeroImg = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail';

interface ManageCampaignPageProps {
  onNavigate: (page: Page) => void;
}

export function ManageCampaignPage({ onNavigate }: ManageCampaignPageProps) {
  const [inviteEmail, setInviteEmail] = useState('');

  const serviceProviders = [
    {
      name: 'Seaview Lodge',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzYyNjE3Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Tastebites Catering',
      rating: 5.0,
      reviews: 52,
      image: 'https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJyZWFrZmFzdCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjI2MTgxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const members = [
    {
      name: 'Alice',
      contributed: 'R6,000.00',
      progress: 75,
      initials: 'AL',
    },
    {
      name: 'John',
      contributed: 'R3,000.00',
      progress: 100,
      initials: 'JO',
    },
    {
      name: 'Jonathan',
      contributed: 'R0.00',
      progress: 0,
      initials: 'JN',
    },
  ];

  const totalContributed = 9000;
  const goal = 20000;
  const progressPercent = (totalContributed / goal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-64">
        <ImageWithFallback
          src={campaignHeroImg}
          alt="Campaign hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Service Provider Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Service Provider</h2>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {serviceProviders.map((provider, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">{provider.name}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(provider.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{provider.rating}</span>
                    <span className="text-gray-400">({provider.reviews} Reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Goal Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Campaign Goal</h2>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span>Goal: R{goal.toLocaleString()}.00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📅 Sep 1-Dec 5, 2025</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 mb-1">Contributed: R{totalContributed.toLocaleString()}.00</div>
              <div className="text-purple-600">{progressPercent}%</div>
            </div>
          </div>

          <Progress value={progressPercent} className="h-2 mb-2" />
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Members</h2>

          <div className="space-y-4 mb-6">
            {members.map((member, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900">{member.name}</span>
                    <span className="text-gray-700">{member.progress}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={member.progress} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-24">{member.contributed}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600"
                  onClick={() => onNavigate('contributorDetail')}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Campaign performance
          </Button>
        </div>

        {/* Invites Members Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-4">Invites Members</h2>

          <div className="flex gap-3">
            <Input
              placeholder="Search by Username or email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-purple-600 hover:bg-purple-700">
              Invite
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="border-gray-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700"
          >
            Pause Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
