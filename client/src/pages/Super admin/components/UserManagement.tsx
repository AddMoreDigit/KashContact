import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Layout } from './Layout';

const users = [
  { name: 'Joshua Blla', email: 'JoshuaBlla@gamil.com', role: 'User', status: 'Active', lastLogin: '01/08/2025', ratings: 'R1000', comment: 'Text' },
  { name: 'John Smith', email: 'JoshuaBlla@gamil.com', role: 'User', status: 'Active', lastLogin: '11/08/2025', ratings: 'R500', comment: 'Text' },
  { name: 'John Smith', email: 'JoshuaBlla@gamil.com', role: 'User', status: 'Suspended', lastLogin: '11/08/2025', ratings: 'R1000', comment: 'Text' },
  { name: 'Seaview lodge', email: 'JoshuaBlla@gamil.com', role: 'Vendor', status: 'Active', lastLogin: '11/08/2025', ratings: 'R1000', comment: 'Text' },
  { name: 'Tastobites', email: 'JoshuaBlla@gamil.com', role: 'Vendor', status: 'Active', lastLogin: '11/08/2025', ratings: 'R1000', comment: 'Text' },
  { name: 'John Smith', email: 'JoshuaBlla@gamil.com', role: 'Corporate', status: 'Active', lastLogin: '11/08/2025', ratings: 'R1000', comment: 'Text' },
];

export function UserManagement() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6">User Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Users</div>
            <div className="text-3xl">+1,200</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Active Users</div>
            <div className="text-3xl text-green-600">+965</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Suspended Users</div>
            <div className="text-3xl text-red-600">20</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Banned Users</div>
            <div className="text-3xl text-red-600">0</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Registered" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="suspend">Suspend</SelectItem>
                <SelectItem value="activate">Activate</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1"></div>

            <Button variant="outline">Filter action</Button>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Name</th>
                <th className="px-6 py-3 text-left text-sm">Email</th>
                <th className="px-6 py-3 text-left text-sm">Role</th>
                <th className="px-6 py-3 text-left text-sm">Status</th>
                <th className="px-6 py-3 text-left text-sm">Last login</th>
                <th className="px-6 py-3 text-left text-sm">Ratings</th>
                <th className="px-6 py-3 text-left text-sm">Comment</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{user.name}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.role}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-red-100 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-sm">{user.ratings}</td>
                  <td className="px-6 py-4 text-sm">{user.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
