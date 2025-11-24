import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Bell, ShoppingCart, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule';

interface CorporateCampaignSchedulePageProps {
  onNavigate: (page: Page) => void;
}

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  color: string;
}

export function CorporateCampaignSchedulePage({ onNavigate }: CorporateCampaignSchedulePageProps) {
  const [currentMonth, setCurrentMonth] = useState('September 2025');
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [activePage, setActivePage] = useState<string>('schedule');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const events: ScheduleEvent[] = [
    { id: 1, title: 'Departure to Magalies', date: '2025-09-01', time: '11:30 AM', color: '#8363f2' },
    { id: 2, title: 'Horse Riding', date: '2025-09-03', time: '11:30 AM', color: '#e84393' },
    { id: 3, title: 'Boat Tour', date: '2025-09-04', time: '11:30 AM', color: '#8363f2' },
    { id: 4, title: 'Checkout', date: '2025-09-08', time: '17:30 PM', color: '#f39c12' },
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days for September 2025
  const generateCalendarDays = () => {
    const days = [];
    // August 31 (Sunday)
    days.push({ date: 31, month: 'Aug', isCurrentMonth: false });
    
    // September 1-30
    for (let i = 1; i <= 30; i++) {
      days.push({ date: i, month: 'Sept', isCurrentMonth: true });
    }
    
    // Fill remaining days to complete the grid
    const remainingDays = 35 - days.length; // 5 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: i, month: 'Oct', isCurrentMonth: false });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getEventsForDate = (date: number, month: string) => {
    if (month !== 'Sept') return [];
    return events.filter(event => {
      const eventDate = new Date(event.date).getDate();
      return eventDate === date;
    });
  };

  const handlePreviousMonth = () => {
    // Handle previous month navigation
  };

  const handleNextMonth = () => {
    // Handle next month navigation
  };

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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-[14px]">Drafts</span>
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

        <div className="px-3 pb-3 border-t border-gray-200 pt-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors">
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-[#8363f2] hover:bg-[#7050e0] text-white text-[14px]">
                Create
              </Button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={() => onNavigate('corporateProfile')}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
              >
                <UserIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-[1200px] mx-auto px-8 py-8">
            {/* Page Title */}
            <h1 className="text-[24px] font-semibold text-black mb-6">My Campaign Schedule</h1>

            {/* Schedule Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-[14px] text-black">Schedule</span>
                <span className="text-[14px] text-[#8363f2] font-medium">{currentMonth}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousMonth}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as 'month' | 'week')}
                  className="px-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="month">Month</option>
                  <option value="week">Week</option>
                </select>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    className="p-2 rounded bg-white shadow-sm"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-purple-50 border-b border-gray-200">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="px-4 py-3 text-center text-[14px] font-medium text-gray-700"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date, day.month);

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] border-b border-r border-gray-200 p-3 ${
                        !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[14px] ${
                            day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {day.date} {day.month !== 'Sept' && day.month}
                        </span>
                      </div>

                      {/* Events for this day */}
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="text-[11px] px-2 py-1 rounded"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                                <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                              </svg>
                              <span>{event.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
