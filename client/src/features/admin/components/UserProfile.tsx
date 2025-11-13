import { X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { useState } from 'react';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fullName, setFullName] = useState('Ndzulamo Mireya Baloyi');
  const [email, setEmail] = useState('Ndzulamo@example.com');
  const [phone, setPhone] = useState('012356789');
  const [role, setRole] = useState('Admin');
  const [status, setStatus] = useState('Active');
  const [suspensionReason, setSuspensionReason] = useState('');

  return (
    <>
      <div className="flex-1 bg-white overflow-auto">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h2>User Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">View and manage all details of specific user.</p>

          {/* User Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span>{fullName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-indigo-600 hover:text-indigo-700"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Corporate</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-6">
            <div className="bg-indigo-50 px-4 py-2 mb-3">
              <h3 className="text-sm">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 px-4">
              <div>
                <p className="text-sm text-gray-600">Full names</p>
                <p className="text-sm">{fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm">{phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registered Date</p>
                <p className="text-sm">01 Aug 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last login date</p>
                <p className="text-sm">01 Aug 2025</p>
              </div>
            </div>
          </div>

          {/* Campaigns Activity */}
          <div className="mb-6">
            <div className="bg-indigo-50 px-4 py-2 mb-3">
              <h3 className="text-sm">Campaigns Activity</h3>
            </div>
            <div className="px-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Campaigns Owned</span>
                <span>3 Campaigns</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Campaigns Sponsor</span>
                <span>5 Campaigns</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Campaigns Contributed</span>
                <span>5 Campaigns</span>
              </div>
            </div>
          </div>

          {/* Performance/Reputation */}
          <div className="mb-6">
            <div className="bg-indigo-50 px-4 py-2 mb-3">
              <h3 className="text-sm">Performance/Reputation</h3>
            </div>
            <div className="px-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Campaigns Success</span>
                <span>80%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vendor Rating</span>
                <span>4.2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contribution Consistency</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <Button variant="outline">Reactivate</Button>
            <Button onClick={() => setEditDialogOpen(true)} className="bg-indigo-500 hover:bg-indigo-600">
              Edit User
            </Button>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(true)}>Delete User</Button>
            <Button variant="destructive" onClick={() => setSuspendDialogOpen(true)}>
              Suspend User
            </Button>
          </div>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="sr-only">
              Edit user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="fullname">Full Names</Label>
              <Input
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={() => setEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription className="sr-only">
              Suspend user access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-red-50 border-red-200">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  ⚠
                </div>
                <div>
                  <p className="text-sm text-red-900">Are you Sure you want to Suspend this user?</p>
                  <p className="text-xs text-red-700">This action will restrict their access until reactivated</p>
                </div>
              </div>
            </Alert>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <h4 className="text-sm">Personal Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Full names</p>
                  <p>{fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p>{email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p>{phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Currently role</p>
                  <p>{role}</p>
                </div>
                <div>
                  <p className="text-gray-600">Currently Status</p>
                  <p className="text-green-600">{status}</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Suspension</Label>
              <Textarea
                id="reason"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Enter reason..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setSuspendDialogOpen(false)}>
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="sr-only">
              Delete user permanently
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-red-50 border-red-200">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  ⚠
                </div>
                <div>
                  <p className="text-sm text-red-900">Are you Sure you want to Delete this user?</p>
                  <p className="text-xs text-red-700">This action will restrict their access until reactivated</p>
                </div>
              </div>
            </Alert>

            <div className="space-y-3">
              <h4 className="text-sm">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Full names</span>
                  <span>{fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email</span>
                  <span>{email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phone</span>
                  <span>{phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Currently role</span>
                  <span>{role}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Currently Status</span>
                  <span className="text-green-600">{status}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <Label htmlFor="delete-reason" className="text-sm text-gray-600">Reason for Suspension</Label>
                  <div className="mt-2 h-20 bg-gray-50 rounded border border-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
