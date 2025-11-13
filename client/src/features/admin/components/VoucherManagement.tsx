import { ArrowLeft, Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from './Layout';
import { useState } from 'react';

const vouchers = [
  { id: 1, name: 'Room/food/YVehiv', vendor: 'Vendor C', discount: '15% OFF', validity: '01/08/2025', status: 'Expired', redemption: '50/100' },
  { id: 2, name: 'Room/food/YVehiv', vendor: 'Vendor D', discount: '15% OFF', validity: '01/08/2025', status: 'Completed', redemption: '50/100' },
  { id: 3, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Redeemed', redemption: '50/100' },
  { id: 4, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Active', redemption: '50/100' },
  { id: 5, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Active', redemption: '50/100' },
  { id: 6, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Active', redemption: '50/100' },
  { id: 7, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Redeemed', redemption: '50/100' },
  { id: 8, name: 'Room/food/YVehiv', vendor: 'Vendor E', discount: '15% OFF', validity: '01/08/2025', status: 'Redeemed', redemption: '50/100' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700 hover:bg-green-100';
    case 'Expired':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
    case 'Completed':
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
    case 'Redeemed':
      return 'bg-pink-100 text-pink-700 hover:bg-pink-100';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

export function VoucherManagement() {
  const [viewVoucherOpen, setViewVoucherOpen] = useState(false);
  const [editVoucherOpen, setEditVoucherOpen] = useState(false);
  const [voucherName, setVoucherName] = useState('Room_aasfhcdkfhaP');
  const [selectedVendor, setSelectedVendor] = useState('Seaview Lodge hotel');
  const [selectedDiscount, setSelectedDiscount] = useState('15% OFF');
  const [validity, setValidity] = useState('01 Sept 2025-06 Sept 2025');
  const [status, setStatus] = useState('Active');

  return (
    <>
      <Layout>
        <div className="p-6">
          <h1 className="mb-6">Voucher Management</h1>

          {/* Tabs */}
          <div className="mb-6">
            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2">
              All
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Total Vouchers</div>
              <div className="text-3xl">120</div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Active Vouchers</div>
              <div className="text-3xl">80</div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Redeemed</div>
              <div className="text-3xl">25</div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Cancelled</div>
              <div className="text-3xl text-red-600">0</div>
            </div>
          </div>

          {/* Sort button */}
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sort by
            </Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">Voucher name</th>
                  <th className="px-6 py-3 text-left text-sm">Vendor</th>
                  <th className="px-6 py-3 text-left text-sm">Discount</th>
                  <th className="px-6 py-3 text-left text-sm">Validity</th>
                  <th className="px-6 py-3 text-left text-sm">Status</th>
                  <th className="px-6 py-3 text-left text-sm">Redemption</th>
                  <th className="px-6 py-3 text-left text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{voucher.name}</td>
                    <td className="px-6 py-4 text-sm">{voucher.vendor}</td>
                    <td className="px-6 py-4 text-sm">{voucher.discount}</td>
                    <td className="px-6 py-4 text-sm">{voucher.validity}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(voucher.status)}>
                        {voucher.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">{voucher.redemption}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setViewVoucherOpen(true)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setEditVoucherOpen(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4" />
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

      {/* View Voucher Dialog */}
      <Dialog open={viewVoucherOpen} onOpenChange={setViewVoucherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>View Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              View voucher details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left side - Details */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm mb-1">Voucher name</div>
                  <div className="text-sm">Room_aasfhcdchfhbP</div>
                </div>

                <div>
                  <div className="text-sm mb-1">Vendor</div>
                  <div className="text-sm">Seaview Lodge hotel</div>
                </div>

                <div>
                  <div className="text-sm mb-1">Discount/value</div>
                  <div className="text-sm">15% OFF</div>
                </div>

                <div>
                  <div className="text-sm mb-1">Validity</div>
                  <div className="text-sm">01 Sept 2025-08 Sept 2025</div>
                </div>
              </div>

              {/* Right side - QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 border-4 border-indigo-600 rounded-lg p-2 mb-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* QR Code pattern */}
                    <rect x="10" y="10" width="30" height="30" fill="#4f46e5" />
                    <rect x="60" y="10" width="30" height="30" fill="#4f46e5" />
                    <rect x="10" y="60" width="30" height="30" fill="#4f46e5" />
                    <rect x="20" y="20" width="10" height="10" fill="white" />
                    <rect x="70" y="20" width="10" height="10" fill="white" />
                    <rect x="20" y="70" width="10" height="10" fill="white" />
                    <rect x="50" y="30" width="5" height="5" fill="#4f46e5" />
                    <rect x="50" y="40" width="5" height="5" fill="#4f46e5" />
                    <rect x="60" y="50" width="5" height="5" fill="#4f46e5" />
                    <rect x="70" y="60" width="5" height="5" fill="#4f46e5" />
                    <rect x="50" y="70" width="5" height="5" fill="#4f46e5" />
                    <rect x="30" y="50" width="5" height="5" fill="#4f46e5" />
                    <rect x="40" y="60" width="5" height="5" fill="#4f46e5" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-sm mb-1">Redemption</div>
                  <div className="text-sm">1/5</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Export as Pdf
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Voucher Dialog */}
      <Dialog open={editVoucherOpen} onOpenChange={setEditVoucherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              Edit voucher details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="voucher-name">Voucher name</Label>
              <Input
                id="voucher-name"
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Seaview Lodge hotel">Seaview Lodge hotel</SelectItem>
                  <SelectItem value="Paradise Motel">Paradise Motel</SelectItem>
                  <SelectItem value="South Beach Hotel">South Beach Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discount">Discount/value</Label>
              <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15% OFF">15% OFF</SelectItem>
                  <SelectItem value="20% OFF">20% OFF</SelectItem>
                  <SelectItem value="25% OFF">25% OFF</SelectItem>
                  <SelectItem value="R100 OFF">R100 OFF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validity">Validity</Label>
                <Input
                  id="validity"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Redeemed">Redeemed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setEditVoucherOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
