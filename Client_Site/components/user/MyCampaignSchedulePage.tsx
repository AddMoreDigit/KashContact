import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, LayoutGrid, List } from 'lucide-react';
import imgKcLogoWhite2Transparent1 from 'figma:asset/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft' | 'schedule';

interface MyCampaignSchedulePageProps {
  onNavigate: (page: Page) => void;
}

const events = [
  {
    id: 1,
    date: '1 Sept',
    time: '11:30 AM',
    title: 'Standard Room',
    type: 'booked',
    dayOfWeek: 'Mon',
  },
  {
    id: 2,
    date: '3',
    time: '11:30 AM',
    title: 'Horse Riding',
    type: 'available',
    dayOfWeek: 'Wed',
  },
  {
    id: 3,
    date: '4',
    time: '11:30 AM',
    title: 'Boat Tour',
    type: 'pending',
    dayOfWeek: 'Thu',
  },
  {
    id: 4,
    date: '8',
    time: '17:30 PM',
    title: 'Deluxe Room',
    type: 'pending',
    dayOfWeek: 'Mon',
  },
  {
    id: 5,
    date: '9',
    time: '11:30 AM',
    title: 'Standard Room',
    type: 'reserved',
    dayOfWeek: 'Tue',
  },
];

export function MyCampaignSchedulePage({ onNavigate }: MyCampaignSchedulePageProps) {
  const [activePage, setActivePage] = useState<string>('schedule');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // September 2025
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const getEventForDate = (day: number) => {
    return events.filter(event => parseInt(event.date.split(' ')[0]) === day);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'booked':
        return 'bg-purple-100 border-l-4 border-purple-600 text-purple-900';
      case 'pending':
        return 'bg-orange-100 border-l-4 border-orange-400 text-orange-900';
      case 'reserved':
        return 'bg-black text-white border-l-4 border-black';
      case 'available':
        return 'bg-red-100 border-l-4 border-red-500 text-red-900';
      default:
        return 'bg-gray-100 border-l-4 border-gray-400 text-gray-900';
    }
  };

  const getLegendColor = (type: string) => {
    switch (type) {
      case 'booked':
        return 'bg-purple-600';
      case 'pending':
        return 'bg-orange-400';
      case 'reserved':
        return 'bg-black';
      case 'available':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-gray-200 flex flex-col">
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
            onClick={() => handleNavigation('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'dashboard' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation('campaigns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'campaigns' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Campaigns</span>
          </button>

          <button
            onClick={() => handleNavigation('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'services' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Services</span>
          </button>

          <button
            onClick={() => handleNavigation('transactions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'transactions' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Transactions</span>
          </button>

          <button
            onClick={() => handleNavigation('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'profile' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>

          <button
            onClick={() => handleNavigation('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'overview' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleNavigation('draft')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'draft' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Draft</span>
          </button>
        </nav>

        {/* Feedback Section */}
        <div className="px-3 pb-3">
          <p className="text-xs text-gray-500 mb-2 px-4">Feedback</p>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent w-64"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors flex items-center gap-2">
              <span>+</span>
              <span>Create</span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-2xl mb-6">My Campaign Schedule</h1>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                <span>Schedule</span>
                <span className="text-gray-400">|</span>
                <span className="text-purple-600">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span>Month</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('month')}
                className={`p-2 rounded transition-colors ${viewMode === 'month' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-purple-50 rounded-lg p-4">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2">
                  <span>{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="bg-white rounded-lg p-2 min-h-[100px]" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayEvents = getEventForDate(day);
                
                return (
                  <div key={day} className="bg-white rounded-lg p-2 min-h-[100px]">
                    <div className="text-sm mb-1">{day === 1 ? `31 Aug` : day}</div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div key={event.id} className={`text-xs p-1.5 rounded ${getEventColor(event.type)}`}>
                          <div>{event.title}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLegendColor('booked')}`}></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLegendColor('pending')}`}></div>
              <span className="text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLegendColor('reserved')}`}></div>
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLegendColor('available')}`}></div>
              <span className="text-sm">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}