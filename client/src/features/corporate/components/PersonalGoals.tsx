import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function PersonalGoals() {
  const [view, setView] = useState<'selective' | 'complete'>('complete');

  const goals = [
    {
      title: 'Fund 50 trip this year',
      progress: 50,
      current: '25/50 trips',
      deadline: 'Dec 2025',
      status: 'In-progress',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Sponsor R 50 000 in Education Package',
      progress: 100,
      current: 'R50 000/R50 000',
      deadline: 'Dec 2025',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      title: 'Sponsor R 50 000 in Food Package',
      progress: 0,
      current: 'R0 / R50 000',
      deadline: 'Dec 2025',
      status: 'Pending',
      statusColor: 'bg-orange-100 text-orange-700'
    }
  ];

  const contributionData = [
    { month: 'Jan', value: 1000 },
    { month: 'Feb', value: 1200 },
    { month: 'Mar', value: 1500 },
    { month: 'Apr', value: 2000 },
    { month: 'May', value: 2500 },
    { month: 'Jun', value: 3200 },
    { month: 'Jul', value: 4000 },
    { month: 'Aug', value: 5500 },
    { month: 'Sept', value: 7000 },
  ];

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl mb-2">Personal Goals Tracker</h1>
            <p className="text-sm text-gray-600">Track your Progress towards corporate impact goals</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={view === 'selective' ? 'default' : 'outline'}
              onClick={() => setView('selective')}
            >
              Seecective View
            </Button>
            <Button
              variant={view === 'complete' ? 'default' : 'outline'}
              onClick={() => setView('complete')}
              className={view === 'complete' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              Complete View
            </Button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {goals.map((goal, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="mb-4 min-h-[48px]">{goal.title}</h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{goal.current}</span>
                  <span className="text-sm">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      goal.status === 'Completed'
                        ? 'bg-green-500'
                        : goal.status === 'In-progress'
                        ? 'bg-purple-600'
                        : 'bg-orange-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Deadline and Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">{goal.deadline}</span>
                <Badge className={goal.statusColor}>{goal.status}</Badge>
              </div>

              <Button variant="outline" className="w-full">View Details</Button>
            </Card>
          ))}
        </div>

        {/* Contributions Chart */}
        <div>
          <h2 className="mb-4">Contributions</h2>
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={contributionData}>
                <defs>
                  <linearGradient id="colorContribution" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
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
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fill="url(#colorContribution)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline">Back</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Next</Button>
        </div>
      </div>
    </div>
  );
}
