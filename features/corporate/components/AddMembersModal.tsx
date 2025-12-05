import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

interface AddMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

interface Sponsor {
  id: number;
  name: string;
  type: string;
  logo?: string;
}

export function AddMembersModal({ isOpen, onClose, onNext, onBack }: AddMembersModalProps) {
  const [activeStep, setActiveStep] = useState(2);
  const [searchMember, setSearchMember] = useState('');
  const [searchSponsor, setSearchSponsor] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSponsorType, setSelectedSponsorType] = useState('');

  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Alicia Jones', role: 'Admin' },
    { id: 2, name: 'Ayanda Khumalo', role: 'Contributor' }
  ]);

  const [sponsors, setSponsors] = useState<Sponsor[]>([
    { id: 1, name: 'Kash Contact Group', type: 'Corporate Sponsor' },
    { id: 2, name: 'Chibulo Moonde', type: 'Individual Sponsor' }
  ]);

  const steps = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];

  const removeMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const removeSponsor = (id: number) => {
    setSponsors(sponsors.filter(s => s.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] p-0 gap-0">
        <DialogTitle className="sr-only">Add Members</DialogTitle>
        <DialogDescription className="sr-only">
          Invite team members to manage campaign and sponsors to sponsor it
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Add Members</h2>
            <p className="text-[12px] text-gray-600 mt-0.5">
              Invite the team members to manage campaign & sponsors to sponsor it
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {steps.map((step, index) => (
            <button
              key={step}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                index === activeStep
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Panel - Add Members */}
            <div>
              <h3 className="text-[16px] font-semibold text-black mb-4">Add Members</h3>
              
              {/* Search and Role */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by email or username"
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex-1 px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="contributor">Contributor</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button className="px-6 py-2 text-[13px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Invites
                </button>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-black">{member.name}</div>
                        <div className="text-[12px] text-gray-600">{member.role}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Add Sponsor */}
            <div>
              <h3 className="text-[16px] font-semibold text-black mb-4">Add Sponsor</h3>
              
              {/* Search and Sponsor Type */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by company name or Sponsor"
                    value={searchSponsor}
                    onChange={(e) => setSearchSponsor(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <select
                  value={selectedSponsorType}
                  onChange={(e) => setSelectedSponsorType(e.target.value)}
                  className="flex-1 px-3 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Sponsor Type</option>
                  <option value="corporate">Corporate Sponsor</option>
                  <option value="individual">Individual Sponsor</option>
                </select>
                <button className="px-6 py-2 text-[13px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Add sponsor
                </button>
              </div>

              {/* Sponsors List */}
              <div className="space-y-3">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-black">{sponsor.name}</div>
                        <div className="text-[12px] text-gray-600">{sponsor.type}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSponsor(sponsor.id)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
