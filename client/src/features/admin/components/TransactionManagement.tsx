import { Eye, Edit2, Trash2, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Layout } from './Layout';
import { useState } from 'react';

const transactions = [
  { id: '#6252', date: 'Aug 20,2025', user: 'Manila Mayo', vendor: 'Game', amount: 'R1900.00', status: 'Completed' },
  { id: '#6252', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Failed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Failed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Refund' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700 hover:bg-green-100';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
    case 'Failed':
      return 'bg-red-100 text-red-700 hover:bg-red-100';
    case 'Refund':
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

export function TransactionManagement() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editTransactionOpen, setEditTransactionOpen] = useState(false);

  return (
    <>
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-1">Transaction Management</h1>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2 h-auto">
                  All
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Sort by
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Show Transactions
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">ID</th>
                  <th className="px-6 py-3 text-left text-sm">Date</th>
                  <th className="px-6 py-3 text-left text-sm">User</th>
                  <th className="px-6 py-3 text-left text-sm">Vendor</th>
                  <th className="px-6 py-3 text-left text-sm">Amount</th>
                  <th className="px-6 py-3 text-left text-sm">Status</th>
                  <th className="px-6 py-3 text-left text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">{transaction.user}</td>
                    <td className="px-6 py-4 text-sm">{transaction.vendor}</td>
                    <td className="px-6 py-4 text-sm">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setViewDetailsOpen(true)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setEditTransactionOpen(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setDeleteDialogOpen(true)}
                        >
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

      {/* View Transaction Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setViewDetailsOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle>Transaction Details</DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              View transaction details
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm">#5252</div>
            </div>
            <div>
              <div className="text-sm">Aug 20,2025</div>
            </div>
            <div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Completed
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">User</div>
                <div className="text-sm">Manila Mayo</div>
              </div>
              <div>
                <div className="text-sm mb-2">Items Purchased</div>
                <div className="text-sm">Seaview lodge -2 nights</div>
                <div className="text-sm">Tastelofuls catering</div>
                <div className="text-sm">Horse riding</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">Vendor</div>
                <div className="text-sm">Game</div>
              </div>
              <div>
                <div className="text-sm mb-2">Notes/Description</div>
                <div className="text-sm">Client paid via ewallet</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">Payment Methods</div>
                <div className="text-sm">E-wallet</div>
              </div>
              <div>
                <div className="text-sm mb-2">Reference</div>
                <div className="text-sm">9754625625215</div>
              </div>
            </div>

            <div>
              <div className="text-sm mb-2">Amount</div>
              <div className="text-sm">R7500.00</div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setViewDetailsOpen(false);
                setDeleteDialogOpen(true);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Export PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={editTransactionOpen} onOpenChange={setEditTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setEditTransactionOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle>Edit Transaction</DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              Edit transaction details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="order-id">Order ID</Label>
              <Input
                id="order-id"
                defaultValue="#5252"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="order-name">Oder name</Label>
              <Input
                id="order-name"
                defaultValue="Seaview lodge -2 nights"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                defaultValue="R7500.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="payment-method">Payment Methods</Label>
              <Input
                id="payment-method"
                defaultValue="E-wallet"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                defaultValue="Aug 20,2025"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="reference">Reference number</Label>
              <Input
                id="reference"
                defaultValue="9754625625215"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTransactionOpen(false)}>
              Close
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setEditTransactionOpen(false)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Transaction Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <span className="text-sm">⚠</span>
              </div>
              Delete Transaction
            </DialogTitle>
            <DialogDescription className="sr-only">
              Delete transaction confirmation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              This action cannot be undone. are you sure you want to delete this transaction
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-red-500 hover:bg-red-600"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
