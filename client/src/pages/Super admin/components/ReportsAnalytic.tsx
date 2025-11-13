import { FileDown, Calendar, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Layout } from './Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const contributionData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 140 },
  { month: 'Mar', value: 160 },
  { month: 'Apr', value: 180 },
  { month: 'May', value: 200 },
];

const vendorsData = [
  {
    name: 'Banquet Hotel',
    rating: 4,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1695619881322-0e41b49f9d3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF2aWV3JTIwaG90ZWx8ZW58MXx8fHwxNzYyNjkzNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    name: 'Durban Hotel',
    rating: 4,
    reviews: 8800,
    image: 'https://images.unsplash.com/photo-1655551998935-2c6a43f7d67d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwaG90ZWx8ZW58MXx8fHwxNzYyNjkzNzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    name: 'Tastelofuls Catering',
    rating: 4,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1690299564220-70b5329e887e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5xdWV0JTIwY2F0ZXJpbmd8ZW58MXx8fHwxNzYyNjkzNzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    name: 'Paradise resort',
    rating: 4,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1651213084058-c3420ea21852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhZGlzZSUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzYyNjkzNzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
];

const pieData = [
  { name: 'Accommodation', value: 40, color: '#4f46e5' },
  { name: 'Transport', value: 20, color: '#06b6d4' },
  { name: 'Food', value: 25, color: '#8b5cf6' },
  { name: 'Activity', value: 15, color: '#ec4899' },
];

const reports = [
  { name: 'Total Contribution', value: 'R258,500', date: '2025/02/02', user: '1200+' },
  { name: 'Total active users', value: 'R2,500', date: '2025/02/02', user: '1200+' },
];

export function ReportsAnalytic() {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Reports & Analytic</h1>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2 h-auto">
                Lastest
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              Sort by
            </Button>
            <Button variant="outline" className="gap-2">
              Excel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              PDF
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Active users</div>
            <div className="text-3xl mb-1">1,200</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Active Campaigns</div>
            <div className="text-3xl mb-1">800</div>
            <div className="text-sm text-green-600">Active Campaigns</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Contribution</div>
            <div className="text-3xl">R249.500</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Contribution over time */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Contribution over time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Vendors/Corporates */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Top Vendors/Corporates</h3>
            <div className="space-y-3">
              {vendorsData.map((vendor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">{vendor.name}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(vendor.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600">({vendor.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Categories */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Campaign Categories</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Report</th>
                <th className="px-6 py-3 text-left text-sm">Value</th>
                <th className="px-6 py-3 text-left text-sm">Date</th>
                <th className="px-6 py-3 text-left text-sm">User</th>
                <th className="px-6 py-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{report.name}</td>
                  <td className="px-6 py-4 text-sm">{report.value}</td>
                  <td className="px-6 py-4 text-sm">{report.date}</td>
                  <td className="px-6 py-4 text-sm">{report.user}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                        <FileDown className="w-4 h-4" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Report
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
