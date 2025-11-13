import { ChevronLeft, ChevronRight, Search, Bell, ShoppingCart, User, Grid3x3, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function CampaignSchedule() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const events = [
    { date: 1, month: 'Sept', title: 'Departure to Magalies', time: '11:30 AM', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    { date: 3, month: 'Sept', title: 'Horse Riding', time: '11:30 AM', color: 'bg-red-100 text-red-700 border-red-300' },
    { date: 4, month: 'Sept', title: 'Boat Tour', time: '11:30 AM', color: 'bg-pink-100 text-pink-700 border-pink-300' },
    { date: 8, month: 'Sept', title: 'Checkout', time: '17:30 PM', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  ];

  const getEventForDate = (date: number) => {
    return events.find(e => e.date === date);
  };

  const calendarDays = [
    { date: 31, month: 'Aug' },
    ...Array.from({ length: 30 }, (_, i) => ({ date: i + 1, month: 'Sept' })),
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
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-3xl mb-6">My Campaign Schedule</h1>

        {/* Schedule Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Schedule</span>
              <span className="text-purple-600">September 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-gray-200 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <button className="p-2 hover:bg-gray-100 rounded border border-gray-200">
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded border border-gray-200">
              <CalendarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 bg-purple-50">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 text-center text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const event = getEventForDate(day.date);
              const isCurrentMonth = day.month === 'Sept';
              
              return (
                <div
                  key={idx}
                  className={`border-r border-b border-gray-200 p-3 min-h-[120px] ${
                    !isCurrentMonth ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
                      {day.date}
                    </span>
                  </div>
                  {event && (
                    <div className={`${event.color} border rounded-lg p-2 text-xs`}>
                      <div className="mb-1">{event.month}</div>
                      <div>{event.title}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                        </svg>
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
