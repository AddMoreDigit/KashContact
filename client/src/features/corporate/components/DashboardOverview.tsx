import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function DashboardOverview() {
  const contributionData = [
    { month: 'Jan', value: 3000 },
    { month: 'Feb', value: 4000 },
    { month: 'Mar', value: 3500 },
    { month: 'Apr', value: 5000 },
    { month: 'May', value: 4500 },
    { month: 'Jun', value: 6000 },
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 6500 },
    { month: 'Sep', value: 8000 },
    { month: 'Oct', value: 9000 },
    { month: 'Nov', value: 8500 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">Welcome back/addmore digital</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Impact
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total contribution</p>
          <p className="text-3xl mb-1">R42 000.00</p>
          <p className="text-sm text-green-600">+22% vs last month</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Campaigns Sponsored</p>
          <p className="text-3xl mb-1">5</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">72% towards goal</p>
          </div>
        </Card>

        <Card className="p-6 bg-purple-600 text-white">
          <p className="text-sm mb-2 opacity-90">Beneficiaries Supported</p>
          <p className="text-4xl">120</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Vendors Involved</p>
          <p className="text-3xl">3</p>
        </Card>
      </div>

      {/* Impact & Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Impact Cards */}
          <div>
            <h2 className="mb-4">Impact</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-purple-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 mb-1">Trips Funded</p>
                <p className="text-3xl">5</p>
              </Card>

              <Card className="p-6 bg-purple-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 mb-1">Nights Sponsored</p>
                <p className="text-3xl">150</p>
              </Card>
            </div>
          </div>

          {/* Contribution Over Time Chart */}
          <Card className="p-6">
            <h3 className="mb-4">Contribution Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={contributionData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Right Column - Contribution Distribution */}
        <div>
          <h2 className="mb-4">Contribution Distribution</h2>
          <Card className="p-6">
            {/* Pie Chart */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Accommodation - 50% */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 70 * 0.5} ${2 * Math.PI * 70}`}
                  strokeDashoffset="0"
                />
                {/* Transport - 30% */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 70 * 0.3} ${2 * Math.PI * 70}`}
                  strokeDashoffset={`${-2 * Math.PI * 70 * 0.5}`}
                />
                {/* Foods - 20% */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="40"
                  strokeDasharray={`${2 * Math.PI * 70 * 0.2} ${2 * Math.PI * 70}`}
                  strokeDashoffset={`${-2 * Math.PI * 70 * 0.8}`}
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-lg">
                    🏨
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">Accommodation</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-lg">
                    🚗
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">Transport</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-lg">
                    🍽️
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">Foods</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
