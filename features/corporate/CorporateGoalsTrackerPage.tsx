import { useState } from 'react';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateHelp' | 'corporateDrafts' | 'corporateGoals' | 'corporateTransactions';

interface CorporateGoalsTrackerPageProps {
  onNavigate: (page: Page) => void;
}

const goals = [
  {
    id: 1,
    title: 'Fund 50 trip this year',
    progress: '25/50 trips',
    percentage: 50,
    date: 'Dec 2025',
    status: 'In-progress',
    statusColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: 2,
    title: 'Sponsor R 50 000 in Education Package',
    progress: 'R50 000/R50 000',
    percentage: 100,
    date: 'Dec 2025',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    title: 'Sponsor R 50 000 in Education Package',
    progress: 'R0 / R50 000',
    percentage: 100,
    date: 'Dec 2025',
    status: 'Pending',
    statusColor: 'bg-orange-100 text-orange-700'
  }
];

const contributionsData = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 45 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 55 },
  { month: 'Aug', value: 70 },
  { month: 'Sept', value: 85 }
];

export function CorporateGoalsTrackerPage({ onNavigate }: CorporateGoalsTrackerPageProps) {
  const [activePage, setActivePage] = useState<string>('goals');
  const [viewMode, setViewMode] = useState<'selective' | 'complete'>('complete');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const maxValue = Math.max(...contributionsData.map(d => d.value));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <button
            onClick={() => handleNavigation('corporateDashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'dashboard' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-[14px]">Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateCampaigns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'campaigns' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[14px]">Campaigns</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Vouchers</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateTransactions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'transactions' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-[14px]">Transactions</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateProfile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'profile' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[14px]">Profile</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[14px]">Overview</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateDrafts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'drafts' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-[14px]">Draft</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Verified</span>
          </button>
        </nav>

        {/* Feedback Section */}
        <div className="px-3 pb-3">
          <div className="text-[12px] text-gray-500 mb-2 px-4">Feedback</div>
          <button
            onClick={() => handleNavigation('corporateHelp')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'help' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Help</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[14px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-semibold text-black mb-1">Personal Goals Tracker</h1>
            <p className="text-[14px] text-gray-600">Track your Progress towards corporate impact goals</p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('selective')}
              className={`px-4 py-2 text-[14px] rounded-lg transition-colors ${
                viewMode === 'selective'
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Selective View
            </button>
            <button
              onClick={() => setViewMode('complete')}
              className={`px-4 py-2 text-[14px] rounded-lg transition-colors ${
                viewMode === 'complete'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Complete View
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-[14px] font-medium text-black mb-4">{goal.title}</h3>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      goal.id === 1 ? 'bg-purple-600' : goal.id === 2 ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-600">{goal.progress}</span>
                  <span className="text-[12px] font-medium text-gray-900">{goal.percentage}%</span>
                </div>
              </div>

              {/* Date and Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] text-gray-600">{goal.date}</span>
                <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${goal.statusColor}`}>
                  {goal.status}
                </span>
              </div>

              {/* View Details Button */}
              <button className="w-full py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Contributions Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-[16px] font-semibold text-black mb-6">Contributions</h3>
          
          <div className="relative h-64">
            {/* Chart */}
            <svg className="w-full h-full" viewBox="0 0 600 200">
              {/* Grid lines */}
              <line x1="0" y1="180" x2="600" y2="180" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Line chart */}
              <polyline
                fill="none"
                stroke="#8363f2"
                strokeWidth="2"
                points={contributionsData.map((d, i) => {
                  const x = (i / (contributionsData.length - 1)) * 550 + 25;
                  const y = 180 - (d.value / maxValue) * 150;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Month labels */}
              {contributionsData.map((d, i) => {
                const x = (i / (contributionsData.length - 1)) * 550 + 25;
                return (
                  <text
                    key={d.month}
                    x={x}
                    y="195"
                    textAnchor="middle"
                    className="text-[12px] fill-gray-600"
                  >
                    {d.month}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button className="px-6 py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
