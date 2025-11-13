import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Layout } from './Layout';

const chartData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 35 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 50 },
  { month: 'May', value: 30 },
];

const recentActivity = [
  { icon: '📄', text: 'GRC document will expire in 5 days', time: '1 hour ago' },
  { icon: '📊', text: 'Monthly platform report is now available to view', time: '4 hour ago' },
  { icon: '👤', text: 'New campaign has been created by user 00clsP', time: '4 days ago' },
  { icon: '👤', text: 'New campaign has been created by user 00clsP', time: '4 days ago' },
];

export function AdminOverview() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1>Admin overview</h1>
          <p className="text-sm text-gray-600">Here's an overview of Platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white">
            <div className="text-sm text-gray-600 mb-1">User Overview</div>
            <div className="text-3xl mb-1">1,200</div>
            <div className="text-xs text-gray-500">Total Users</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Active</span>
            </div>
          </Card>

          <Card className="p-4 bg-indigo-50">
            <div className="text-sm text-gray-600 mb-1">Campaigns Overview</div>
            <div className="text-3xl mb-1">65</div>
            <div className="text-xs text-gray-500"></div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Active</span>
            </div>
          </Card>

          <Card className="p-4 bg-green-50">
            <div className="text-sm text-gray-600 mb-1">Vendors Overview</div>
            <div className="text-3xl mb-1">80</div>
            <div className="text-xs text-gray-500"></div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Active Vendors</span>
            </div>
          </Card>

          <Card className="p-4 bg-pink-50">
            <div className="text-sm text-gray-600 mb-1">Corporate Overview</div>
            <div className="text-3xl mb-1">100</div>
            <div className="text-xs text-gray-500"></div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Active available</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Campaign Activity */}
          <Card className="p-6 bg-white col-span-2">
            <h3 className="mb-4">Campaign activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-sm mb-1">Active Campaigns</div>
                <div className="relative inline-flex items-center justify-center w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#6366f1"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.32} ${2 * Math.PI * 40}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-xl">32%</div>
                </div>
                <div className="text-sm text-green-600 mt-1">+2.2%</div>
              </div>
            </div>
          </Card>

          {/* Active this week */}
          <div className="space-y-6">
            <Card className="p-6 bg-white">
              <div className="text-sm text-gray-600 mb-2">Active this week</div>
              <div className="text-4xl mb-1">251</div>
              <div className="text-xs text-gray-500">New users this week</div>
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-32 bg-black p-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect x="0" y="0" width="20" height="20" fill="white"/>
                    <rect x="20" y="0" width="20" height="20" fill="black"/>
                    <rect x="40" y="0" width="20" height="20" fill="white"/>
                    <rect x="60" y="0" width="20" height="20" fill="black"/>
                    <rect x="80" y="0" width="20" height="20" fill="white"/>
                    <rect x="0" y="20" width="20" height="20" fill="black"/>
                    <rect x="20" y="20" width="20" height="20" fill="white"/>
                    <rect x="40" y="20" width="20" height="20" fill="black"/>
                    <rect x="60" y="20" width="20" height="20" fill="white"/>
                    <rect x="80" y="20" width="20" height="20" fill="black"/>
                    <rect x="0" y="40" width="20" height="20" fill="white"/>
                    <rect x="20" y="40" width="20" height="20" fill="black"/>
                    <rect x="40" y="40" width="20" height="20" fill="white"/>
                    <rect x="60" y="40" width="20" height="20" fill="black"/>
                    <rect x="80" y="40" width="20" height="20" fill="white"/>
                    <rect x="0" y="60" width="20" height="20" fill="black"/>
                    <rect x="20" y="60" width="20" height="20" fill="white"/>
                    <rect x="40" y="60" width="20" height="20" fill="black"/>
                    <rect x="60" y="60" width="20" height="20" fill="white"/>
                    <rect x="80" y="60" width="20" height="20" fill="black"/>
                    <rect x="0" y="80" width="20" height="20" fill="white"/>
                    <rect x="20" y="80" width="20" height="20" fill="black"/>
                    <rect x="40" y="80" width="20" height="20" fill="white"/>
                    <rect x="60" y="80" width="20" height="20" fill="black"/>
                    <rect x="80" y="80" width="20" height="20" fill="white"/>
                  </svg>
                </div>
              </div>
              <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Download QR</Button>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="mb-4">Recent activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
