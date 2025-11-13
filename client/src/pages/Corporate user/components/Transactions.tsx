import { Search, Bell, ShoppingCart, User as UserIcon, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function Transactions() {
  const transactions = [
    {
      id: '#100212',
      date: '11 Aug 12',
      dateEnd: 'Dec 2025',
      campaign: 'Sun City Cabana',
      vendor: 'Seview Lodge',
      amount: 'R20 000',
      status: 'Unpaid',
      statusColor: 'bg-red-500 text-white'
    },
    {
      id: '#100213',
      date: '11 Aug 12',
      dateEnd: 'Dec 2025',
      campaign: 'Kruger National Park',
      vendor: 'Magaliles',
      amount: 'R15 000',
      status: 'Paid',
      statusColor: 'bg-green-500 text-white'
    },
    {
      id: '#102156',
      date: '11 Aug 12',
      dateEnd: 'Dec 2025',
      campaign: 'School uniform Donation',
      vendor: 'Magaliles',
      amount: 'R5 000',
      status: 'Paid',
      statusColor: 'bg-green-500 text-white'
    },
    {
      id: '#20058',
      date: '11 Aug 12',
      dateEnd: 'Dec 2025',
      campaign: 'Weekend Team building @ protea hotel',
      vendor: 'Magaliles',
      amount: 'R10 000',
      status: 'Refund',
      statusColor: 'bg-orange-500 text-white'
    },
    {
      id: '#55236',
      date: '11 Aug 12',
      dateEnd: 'Dec 2025',
      campaign: '',
      vendor: 'Magaliles',
      amount: 'R12 000',
      status: 'Paid',
      statusColor: 'bg-green-500 text-white'
    }
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
            <UserIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2">
            All Transactions
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-2">
            Today
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-2">
            QR Code
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-600 hover:bg-purple-600">
                <TableHead className="text-white">Transaction ID</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Campaign name</TableHead>
                <TableHead className="text-white">Vendor name</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{transaction.date}</div>
                      <div className="text-gray-500">{transaction.dateEnd}</div>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.campaign}</TableCell>
                  <TableCell>{transaction.vendor}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge className={transaction.statusColor}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-xs text-purple-600">View</span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-teal-600" />
                      </button>
                      <span className="text-xs text-teal-600">Download</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Prev</Button>
              <Button variant="outline" size="sm" className="bg-purple-50 text-purple-600">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">Download CSV</Button>
              <Button variant="outline">Download PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
