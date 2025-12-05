import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Bell, ShoppingCart, User as UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';

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
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NavBar */}
        <NavBar 
          onNavigate={handleNavigation}
          userType="corporate"
        />

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
