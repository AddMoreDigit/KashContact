import { X, Search, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMembersDialog({ open, onOpenChange }: AddMembersDialogProps) {
  const members = [
    { name: 'Alicia Jones', role: 'Admin' },
    { name: 'Ayanda Khumalo', role: 'Contributor' }
  ];

  const sponsors = [
    { name: 'Kash Contact Group', type: 'Corporate Sponsor', icon: '🛡️' },
    { name: 'Chibulo Moonde', type: 'Individual Sponsor' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
          <DialogDescription>
            Invite the team members to manage campaign & sponsors to sponsor it
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mt-4">
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Campaign Details
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Assign Packages
          </button>
          <button className="text-purple-600 border-b-2 border-purple-600 pb-3 px-2">
            Add members
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Review
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left Column - Add Members */}
          <div>
            <h3 className="mb-4">Add Members</h3>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search by email or username" className="pl-9" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Select defaultValue="role">
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="role">Role</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Invites
              </Button>
            </div>

            {/* Members List */}
            <div className="space-y-2">
              {members.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p>{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Add Sponsor */}
          <div>
            <h3 className="mb-4">Add Sponsor</h3>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search by company name or Sponsor" className="pl-9" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Select defaultValue="type">
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sponsor Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type">Sponsor Type</SelectItem>
                  <SelectItem value="corporate">Corporate Sponsor</SelectItem>
                  <SelectItem value="individual">Individual Sponsor</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Add sponsor
              </Button>
            </div>

            {/* Sponsors List */}
            <div className="space-y-2">
              {sponsors.map((sponsor, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      {sponsor.icon ? (
                        <span className="text-lg">{sponsor.icon}</span>
                      ) : (
                        <User className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p>{sponsor.name}</p>
                      <p className="text-sm text-gray-600">{sponsor.type}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 pt-4 border-t mt-6">
          <Button variant="outline">Back</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
