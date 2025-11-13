import { useState } from 'react';
import { X, Search, SlidersHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail';

interface ContributorsPageProps {
  onNavigate: (page: Page) => void;
}

export function ContributorsPage({ onNavigate }: ContributorsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const contributors = [
    {
      name: 'Devine Bila',
      progress: 74,
      paidTill: '00',
      daysLeft: '0 Days Left',
      status: 'Missed 1',
      statusColor: 'bg-green-100 text-green-700',
      initials: 'DB',
    },
    {
      name: 'Madimo SA',
      progress: 100,
      paidTill: '00',
      daysLeft: 'Missed 2',
      status: 'Behind',
      statusColor: 'bg-purple-100 text-purple-700',
      initials: 'MS',
    },
    {
      name: 'Devine Bila',
      progress: 85,
      paidTill: '00',
      daysLeft: 'Missed 3',
      status: 'Behind',
      statusColor: 'bg-red-100 text-red-700',
      initials: 'DB',
    },
    {
      name: 'Devine Bila',
      progress: 74,
      paidTill: '00',
      daysLeft: '0 Days Left',
      status: 'On Track',
      statusColor: 'bg-green-100 text-green-700',
      initials: 'DB',
    },
    {
      name: 'Devine Bila',
      progress: 74,
      paidTill: '00',
      daysLeft: '0 Days Left',
      status: 'On Track',
      statusColor: 'bg-green-100 text-green-700',
      initials: 'DB',
    },
    {
      name: 'Devine Bila',
      progress: 74,
      paidTill: '00',
      daysLeft: '0 Days Left',
      status: 'On Track',
      statusColor: 'bg-green-100 text-green-700',
      initials: 'DB',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-gray-900">Contributors</h1>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search and Filters */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by Name or Campaign"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="border-gray-300">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-gray-300">
            Sort by
          </Button>
        </div>

        {/* Campaign Contribution Progress */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Campaign Contribution Progress</h2>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4" />
              <span>6 Members</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Circular Progress */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.3)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-900">30%</span>
                </div>
              </div>
            </div>

            {/* Goal Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span className="text-gray-700">Goal: 0.000</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-700">Contributed: 0.000</span>
              </div>
            </div>

            {/* Message */}
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-gray-700 text-center">
                💚 Keep going Team! You're 30% to reach your goal
              </p>
            </div>
          </div>
        </div>

        {/* Individual Campaign Tracking */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-gray-900 mb-6">Individual Campaign Tracking</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all"
                onClick={() => onNavigate('contributorDetail')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {contributor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-gray-900">{contributor.name}</div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${contributor.statusColor}`}>
                        {contributor.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={contributor.progress === 100 ? '#22c55e' : '#8b5cf6'}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - contributor.progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-900">{contributor.progress}%</span>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">✓</span>
                    <span className="text-gray-700">Paid till {contributor.paidTill}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">📅</span>
                    <span className="text-gray-700">{contributor.daysLeft}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-gray-300">
                    Remove
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs border-gray-300">
                    Reschedule
                  </Button>
                  <Button size="sm" className="flex-1 text-xs bg-purple-600 hover:bg-purple-700">
                    Extend
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center">
            <Button variant="outline" className="border-gray-300">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
