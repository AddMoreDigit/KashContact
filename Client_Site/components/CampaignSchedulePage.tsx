import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, List, Grid3x3, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { NavBar } from './NavBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory';

interface CampaignSchedulePageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface CalendarEvent {
  date: number;
  title: string;
  time: string;
  color: string;
}

export function CampaignSchedulePage({ onNavigate, onShowNotifications, hasUnreadNotifications, onShowCart }: CampaignSchedulePageProps) {
  const [currentMonth, setCurrentMonth] = useState('September 2025');
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');

  const events: CalendarEvent[] = [
    { date: 1, title: 'Departure to Magalies', time: '11:30 AM', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    { date: 3, title: 'Horse Riding', time: '11:30 AM', color: 'bg-red-100 text-red-700 border-red-300' },
    { date: 4, title: 'Boat Tour', time: '11:30 AM', color: 'bg-pink-100 text-pink-700 border-pink-300' },
    { date: 7, title: 'Checkout', time: '17:30 PM', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days for September 2025
  const generateCalendarDays = () => {
    const days = [];
    // Start with Aug 31 (Sunday)
    days.push({ date: 31, month: 'Aug', dayOfWeek: 0 });
    
    // September days
    for (let i = 1; i <= 20; i++) {
      const dayOfWeek = (i) % 7; // Simple calculation for demo
      days.push({ date: i, month: 'Sept', dayOfWeek });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getEventForDate = (date: number) => {
    return events.find(event => event.date === date);
  };

  const handlePrevMonth = () => {
    // Logic to go to previous month
  };

  const handleNextMonth = () => {
    // Logic to go to next month
  };

  return (
    <div className="flex-1 bg-white">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />
      
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-900">My Campaign Schedule</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-900">Schedule</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-purple-600 min-w-[150px] text-center">
                {currentMonth}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={viewType} onValueChange={(value: any) => setViewType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
              >
                <List className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none border-l"
              >
                <Grid3x3 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-8 py-6">
        <div className="bg-purple-50 rounded-lg overflow-hidden border border-purple-200">
          {/* Day Headers */}
          <div className="grid grid-cols-7 bg-purple-100 border-b border-purple-200">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-4 text-center text-gray-900 border-r border-purple-200 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const event = getEventForDate(day.date);
              const isCurrentMonth = day.month === 'Sept';
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-3 border-r border-b border-purple-200 ${
                    !isCurrentMonth ? 'bg-purple-50/50' : 'bg-white'
                  } ${index % 7 === 6 ? 'border-r-0' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                      {day.date}
                    </span>
                    {day.month === 'Aug' && (
                      <span className="text-xs text-gray-500">Aug</span>
                    )}
                  </div>

                  {event && (
                    <div className={`${event.color} rounded-lg p-2 border`}>
                      <p className="text-sm mb-1 line-clamp-2">{event.title}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}