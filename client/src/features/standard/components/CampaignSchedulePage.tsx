import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory';

interface CampaignSchedulePageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
}

export function CampaignSchedulePage({ onNavigate, onShowNotifications }: CampaignSchedulePageProps) {
  const [currentMonth, setCurrentMonth] = useState('September 2025');

  const events = [
    { date: 1, day: 'Mon', title: 'Departure to Magalies', time: '11:30 AM', color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { date: 3, day: 'Wed', title: 'Horse Riding', time: '11:30 AM', color: 'bg-red-100 border-red-300 text-red-700' },
    { date: 4, day: 'Thu', title: 'Boat Tour', time: '11:30 AM', color: 'bg-pink-100 border-pink-300 text-pink-700' },
    { date: 8, day: 'Mon', title: 'Checkout', time: '17:30 PM', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days (31 Aug - 20 Sept)
  const calendarDays = [
    { date: 31, month: 'Aug', day: 'Sun' },
    { date: 1, month: 'Sept', day: 'Mon' },
    { date: 2, month: 'Sept', day: 'Tue' },
    { date: 3, month: 'Sept', day: 'Wed' },
    { date: 4, month: 'Sept', day: 'Thu' },
    { date: 5, month: 'Sept', day: 'Fri' },
    { date: 6, month: 'Sept', day: 'Sat' },
    { date: 7, month: 'Sept', day: 'Sun' },
    { date: 8, month: 'Sept', day: 'Mon' },
    { date: 9, month: 'Sept', day: 'Tue' },
    { date: 10, month: 'Sept', day: 'Wed' },
    { date: 11, month: 'Sept', day: 'Thu' },
    { date: 12, month: 'Sept', day: 'Fri' },
    { date: 13, month: 'Sept', day: 'Sat' },
    { date: 14, month: 'Sept', day: 'Sun' },
    { date: 15, month: 'Sept', day: 'Mon' },
    { date: 16, month: 'Sept', day: 'Tue' },
    { date: 17, month: 'Sept', day: 'Wed' },
    { date: 18, month: 'Sept', day: 'Thu' },
    { date: 19, month: 'Sept', day: 'Fri' },
    { date: 20, month: 'Sept', day: 'Sat' },
  ];

  const getEventForDate = (date: number, month: string) => {
    if (month !== 'Sept') return null;
    return events.find(event => event.date === date);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => onNavigate('howItWorks')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <button 
            onClick={onShowNotifications}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white rounded-lg p-6">
          {/* Title and Controls */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-gray-900">My Campaign Schedule</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-300">
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Grid3x3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Schedule</span>
                <span className="text-gray-400">|</span>
                <span className="text-purple-600">{currentMonth}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Select defaultValue="month">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calendar Grid */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 bg-purple-50">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-3 text-center text-gray-700 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const event = getEventForDate(day.date, day.month);
                return (
                  <div
                    key={index}
                    className="min-h-[100px] p-2 border-r border-b border-gray-200 last:border-r-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${day.month === 'Aug' ? 'text-gray-400' : 'text-gray-700'}`}>
                        {day.date} {day.month}
                      </span>
                    </div>
                    {event && (
                      <div className={`p-2 rounded border ${event.color} text-sm`}>
                        <div className="mb-1">{event.title}</div>
                        <div className="flex items-center gap-1 text-xs">
                          <CalendarIcon className="w-3 h-3" />
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
    </div>
  );
}
