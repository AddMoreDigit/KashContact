import { useState } from 'react';
import { X, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

interface Sponsor {
  id: number;
  name: string;
  contribution: string;
}

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditCampaignModal({ isOpen, onClose, onUpdate }: EditCampaignModalProps) {
  const [campaignName, setCampaignName] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    { id: 1, name: 'Sponsor A', contribution: 'R10 000' },
    { id: 2, name: 'Sponsor B', contribution: 'R15 000' }
  ]);

  const progress = 70;
  const raised = 10000;
  const total = 25000;

  const handleAddSponsor = () => {
    const newSponsor: Sponsor = {
      id: sponsors.length + 1,
      name: `Sponsor ${String.fromCharCode(65 + sponsors.length)}`,
      contribution: 'R0'
    };
    setSponsors([...sponsors, newSponsor]);
  };

  const handleRemoveSponsor = (id: number) => {
    setSponsors(sponsors.filter(s => s.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-0 gap-0">
        <DialogTitle className="sr-only">Edit Campaign</DialogTitle>
        <DialogDescription className="sr-only">
          Edit your campaign details, goal, description, and manage sponsors
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-[18px] font-medium text-black">Edit Campaign</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[600px] overflow-y-auto">
          <div className="flex gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              {/* Campaign Name */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Campaign name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Progress */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Progress
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-gray-900">R{raised.toLocaleString()}/ R{total.toLocaleString()}</span>
                    <span className="text-[14px] font-medium text-gray-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sponsors */}
            <div className="w-[240px]">
              <label className="block text-[14px] font-medium text-gray-900 mb-3">
                Sponsors
              </label>

              {/* Sponsors Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr,80px,40px] bg-gray-50 border-b border-gray-200">
                  <div className="px-3 py-2 text-[12px] font-medium text-gray-700">Sponsors</div>
                  <div className="px-3 py-2 text-[12px] font-medium text-gray-700">Contribution</div>
                  <div className="px-3 py-2 text-[12px] font-medium text-gray-700">Action</div>
                </div>

                {/* Table Body */}
                {sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="grid grid-cols-[1fr,80px,40px] border-b border-gray-200 last:border-b-0">
                    <div className="px-3 py-2 text-[12px] text-gray-900">{sponsor.name}</div>
                    <div className="px-3 py-2 text-[12px] text-gray-900">{sponsor.contribution}</div>
                    <div className="px-3 py-2 flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-3 h-3 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleRemoveSponsor(sponsor.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Sponsor Button */}
              <button
                onClick={handleAddSponsor}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[14px] text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Sponsor
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Campaign
          </button>
          <button
            onClick={() => {
              onUpdate();
              onClose();
            }}
            className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Update Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
