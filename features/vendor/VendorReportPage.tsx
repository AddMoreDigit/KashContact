import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Eye, Printer } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft';

interface VendorReportPageProps {
  onNavigate: (page: Page) => void;
}

const orders = [
  {
    id: 1,
    orderNumber: '#100212',
    sku: '11236',
    campaignName: 'Cape town Gateway Weekend',
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '11 Aug-12 Dec 2025',
    amount: '400 000',
    status: 'Upload',
    productImage: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
  {
    id: 2,
    orderNumber: '#100213',
    sku: '11237',
    campaignName: 'Cape town Gateway Weekend',
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '11 Aug-12 Dec 2025',
    amount: '85 000',
    status: 'Upload',
    productImage: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
  {
    id: 3,
    orderNumber: '#102168',
    sku: '11238',
    campaignName: 'Cape town Gateway Weekend',
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '11 Aug-12 Dec 2025',
    amount: '85 000',
    status: 'Upload',
    productImage: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
  {
    id: 4,
    orderNumber: '#20058',
    sku: '25471',
    campaignName: "Magalies park Hartbeespoort",
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '30 Aug-12 Dec 2025',
    amount: 'R12 000',
    status: 'Paid',
    productImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
  {
    id: 5,
    orderNumber: '#85236',
    sku: '00254',
    campaignName: 'Sun City Wave water Park',
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '01 Nov-12 Dec 2025',
    amount: '88 000',
    status: 'Paid',
    productImage: 'https://images.unsplash.com/photo-1561730386-1f53f9db2b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
  {
    id: 6,
    orderNumber: '#89990',
    sku: '44750',
    campaignName: 'God Reef City Theme Park',
    customer: 'Moodle,Thato Ukahile,bunga & more',
    dates: '01 Nov-12 Dec 2025',
    amount: '88 000',
    status: 'Pending',
    productImage: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100',
  },
];

export function VendorReportPage({ onNavigate }: VendorReportPageProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const handleView = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.info(`Viewing order ${order.orderNumber}`);
    }
  };

  const handlePrint = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.success(`Printing order ${order.orderNumber}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upload':
        return 'bg-red-500 text-white';
      case 'Paid':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-orange-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors">
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header with Title and Filters */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl">Report</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">Filter By</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-sm">Sort by</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-600">Total Orders</span>
              </div>
              <p className="text-2xl">1,239</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">Total Sales</span>
              </div>
              <p className="text-2xl">R12000.00</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">Confirmed orders</span>
              </div>
              <p className="text-2xl">8</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">Rejected</span>
              </div>
              <p className="text-2xl">0</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm text-gray-600">Change Back</span>
              </div>
              <p className="text-2xl">R12000.00</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg">Orders</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Product</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Order#</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">SKU</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Campaign Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Costumer</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Dates</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Amount</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <ImageWithFallback
                          src={order.productImage}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-sm">{order.sku}</td>
                      <td className="px-6 py-4 text-sm">{order.campaignName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.dates}</td>
                      <td className="px-6 py-4 text-sm">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(order.id)}
                            className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handlePrint(order.id)}
                            className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Printer className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
