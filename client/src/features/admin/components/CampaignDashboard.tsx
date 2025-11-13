import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const vendors = [
  { name: 'Seaview Lodge', service: 'Accomodation', goal: 'R15 000', contributed: 'R15 000', status: 'Fulfilled', color: 'bg-indigo-500' },
  { name: 'Tassoletos Cafe', service: 'Dining', goal: 'R15 000', contributed: 'R15 000', status: 'Fulfilled', color: 'bg-orange-500' },
  { name: 'Greenfield Ranch', service: 'Activities', goal: 'R15 000', contributed: 'R15 000', status: 'Fulfilled', color: 'bg-green-500' },
  { name: 'Cape town cruises', service: 'Activities', goal: 'R15 000', contributed: 'R15 000', status: 'Fulfilled', color: 'bg-blue-500' },
  { name: 'City Explorer', service: 'Activities', goal: 'R15 000', contributed: 'R15 000', status: 'For Fill', color: 'bg-purple-500' },
];

const contributors = [
  { name: 'Gwen Bird', amount: 'R2 000/R2 000', progress: 100 },
  { name: 'Hope Mambo', amount: 'R2 000/R2 000', progress: 100 },
  { name: 'Hope Mambo', amount: 'R2 000/R2 000', progress: 100 },
  { name: 'Hope Mambo', amount: 'R2 000/R2 000', progress: 100 },
];

interface CampaignDashboardProps {
  headerImage: string;
  onClose?: () => void;
}

export function CampaignDashboard({ headerImage, onClose }: CampaignDashboardProps) {
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notifyMembersPause, setNotifyMembersPause] = useState(false);
  const [notifyVendorsPause, setNotifyVendorsPause] = useState(false);
  const [notifyMembersDelete, setNotifyMembersDelete] = useState(false);
  const [notifyVendorsDelete, setNotifyVendorsDelete] = useState(false);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
        <h1>Cape town Gateway weekend</h1>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Header Image */}
        <div className="mb-6 rounded-lg overflow-hidden h-48">
          <img src={headerImage} alt="Cape Town" className="w-full h-full object-cover" />
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Overview</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Active</span>
              <span className="text-sm">Aug 2-Jun5,25</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Budget</div>
              <div className="text-2xl">R30 000</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Contributed</div>
              <div className="text-2xl">R15 000</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Members</div>
              <div className="text-2xl">6</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Activities</div>
              <div className="text-2xl">3</div>
            </div>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-5 gap-4 pb-3 mb-3 border-b border-border text-sm text-gray-500">
            <div>Vendors</div>
            <div>Service</div>
            <div>Goal</div>
            <div>Contributed</div>
            <div>Status</div>
          </div>

          {vendors.map((vendor, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 py-3 border-b border-border last:border-0 items-center">
              <div className="flex items-center gap-3">
                <Avatar className={`${vendor.color} w-10 h-10 flex items-center justify-center text-white`}>
                  <div className="w-5 h-5 bg-white/30 rounded-full"></div>
                </Avatar>
                <span className="text-sm">{vendor.name}</span>
              </div>
              <div className="text-sm">{vendor.service}</div>
              <div className="text-sm">{vendor.goal}</div>
              <div className="text-sm">{vendor.contributed}</div>
              <div>
                <Badge
                  className={`${
                    vendor.status === 'Fulfilled'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                  }`}
                >
                  {vendor.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Contributors Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="mb-4">Contributors</h3>

          {contributors.map((contributor, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="bg-indigo-500 w-8 h-8 flex items-center justify-center text-white text-sm">
                  {contributor.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <span className="text-sm flex-1">{contributor.name}</span>
                <span className="text-sm">{contributor.amount}</span>
                <span className="text-sm text-green-600">100%</span>
              </div>
              <Progress value={contributor.progress} className="h-2" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => setPauseDialogOpen(true)} className="bg-indigo-500 hover:bg-indigo-600">
            Edit Campaign
          </Button>
          <Button onClick={() => setDeleteDialogOpen(true)} variant="destructive">
            Close campaign
          </Button>
        </div>
      </div>

      {/* Pause Campaign Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">
                ⏸
              </div>
              Pause Campaigns
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to pause this campaign?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="sr-only">Are you sure you want to pause this campaign?</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-members-pause"
                  checked={notifyMembersPause}
                  onCheckedChange={(checked) => setNotifyMembersPause(checked as boolean)}
                />
                <label htmlFor="notify-members-pause" className="text-sm">
                  Notify campaign members for Pause Changes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-vendors-pause"
                  checked={notifyVendorsPause}
                  onCheckedChange={(checked) => setNotifyVendorsPause(checked as boolean)}
                />
                <label htmlFor="notify-vendors-pause" className="text-sm">
                  Notify campaign Vendors who are not notified yet Changes
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPauseDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={() => setPauseDialogOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white">
                ⚠
              </div>
              Delete Campaigns
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone, are you sure you want to delete this campaigns
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="sr-only">This action cannot be undone, are you sure you want to delete this campaigns</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-members-delete"
                  checked={notifyMembersDelete}
                  onCheckedChange={(checked) => setNotifyMembersDelete(checked as boolean)}
                />
                <label htmlFor="notify-members-delete" className="text-sm">
                  Notify campaign members for Delete changes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-vendors-delete"
                  checked={notifyVendorsDelete}
                  onCheckedChange={(checked) => setNotifyVendorsDelete(checked as boolean)}
                />
                <label htmlFor="notify-vendors-delete" className="text-sm">
                  Notify campaign Vendors who are not notified yet Changes
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
