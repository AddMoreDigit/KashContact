import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const scheduleEvents = [
  {
    date: 1,
    month: "Sept",
    events: [
      { name: "Standard Room", time: "11:30 AM", status: "booked" },
    ],
  },
  {
    date: 3,
    month: "Sept",
    events: [
      { name: "Horse Riding", time: "11:30 AM", status: "available" },
    ],
  },
  {
    date: 4,
    month: "Sept",
    events: [
      { name: "Boat Tour", time: "01:00 AM", status: "pending" },
    ],
  },
  {
    date: 7,
    month: "Sept",
    events: [
      { name: "Deluxe Room", time: "17:30 PM", status: "pending" },
    ],
  },
  {
    date: 8,
    month: "Sept",
    events: [
      { name: "Standard Room", time: "11:30 AM", status: "reserved" },
    ],
  },
];

const statusColors = {
  booked: "bg-purple-600",
  pending: "bg-orange-400",
  reserved: "bg-gray-900",
  available: "bg-blue-600",
};

export function CampaignSchedulePage() {
  const [currentMonth] = useState("September 2025");
  const [viewMode, setViewMode] = useState<"month" | "list">("month");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = 30; // September has 30 days
  const startDay = 0; // September 2025 starts on a Monday, but we'll show from Sunday

  const getEventsForDate = (date: number) => {
    const event = scheduleEvents.find((e) => e.date === date);
    return event?.events || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">My Campaign Schedule</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Schedule</span>
              <span className="text-purple-600">| {currentMonth}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              className={viewMode === "month" ? "bg-purple-600 hover:bg-purple-700" : ""}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              className={viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : ""}
              onClick={() => setViewMode("list")}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 bg-purple-50">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm text-gray-700 border-b border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {/* Previous month days (padding) */}
            {Array.from({ length: startDay }).map((_, idx) => (
              <div
                key={`prev-${idx}`}
                className="min-h-24 p-2 border-b border-r last:border-r-0 bg-gray-50"
              />
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const date = idx + 1;
              const events = getEventsForDate(date);
              const isStartOfWeek = (startDay + idx) % 7 === 0;
              
              // Get the month label for first occurrence
              const monthLabel = scheduleEvents.find(e => e.date === date)?.month;

              return (
                <div
                  key={date}
                  className={`min-h-24 p-2 border-b border-r last:border-r-0 ${
                    isStartOfWeek ? "col-start-1" : ""
                  } ${events.length > 0 ? "bg-white" : "bg-white hover:bg-gray-50"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-gray-900">
                      {monthLabel && `${date} ${monthLabel}`}
                      {!monthLabel && date}
                    </span>
                  </div>
                  
                  {events.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className={`rounded px-2 py-1 mb-1 ${
                        statusColors[event.status as keyof typeof statusColors]
                      }`}
                    >
                      <p className="text-xs text-white truncate">{event.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-white">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-900"></div>
            <span className="text-sm text-gray-600">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
