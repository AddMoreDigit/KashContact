import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

interface SendRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

const recentReminders = [
  {
    dateSent: 'Aug 10',
    audience: 'Sponsors',
    campaign: 'Cape town Weekend',
    status: 'Sent',
    statusColor: 'text-green-600'
  },
  {
    dateSent: 'Aug 15',
    audience: 'Vendors',
    campaign: 'Durban oceanview',
    status: 'Scheduled',
    statusColor: 'text-gray-600'
  },
  {
    dateSent: 'Aug 20',
    audience: 'Members',
    campaign: 'Zanzibar Adventure',
    status: 'Failed',
    statusColor: 'text-red-600'
  }
];

export function SendRemindersModal({ isOpen, onClose, onNext }: SendRemindersModalProps) {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [sponsorsChecked, setSponsorsChecked] = useState(true);
  const [vendorsChecked, setVendorsChecked] = useState(true);
  const [membersChecked, setMembersChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('12/08/2025');
  const [scheduleTime, setScheduleTime] = useState('12:00 PM');

  const handleAllChange = (checked: boolean) => {
    setAllChecked(checked);
    setMembersChecked(checked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 gap-0">
        <DialogTitle className="sr-only">Send Reminders</DialogTitle>
        <DialogDescription className="sr-only">
          Send reminders to sponsors, vendors, and members for your campaign
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Send Reminders</h2>
            <p className="text-[12px] text-gray-600 mt-0.5">
              Set up your corporate campaign, assign package, invite members
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Left Panel - Reminder Setup */}
          <div className="flex-1 p-6 border-r border-gray-200">
            <h3 className="text-[14px] font-medium text-black mb-3">Select campaign</h3>
            <input
              type="text"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
            />

            {/* Reminder Setup */}
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold text-black mb-4">Reminder Setup</h3>
              
              {/* Audience */}
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-gray-900 mb-2">Audience</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sponsorsChecked}
                      onChange={(e) => setSponsorsChecked(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[13px] text-gray-900">Sponsors</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={membersChecked}
                      onChange={(e) => setMembersChecked(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[13px] text-gray-900">Members</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={vendorsChecked}
                      onChange={(e) => setVendorsChecked(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[13px] text-gray-900">Vendors</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={(e) => handleAllChange(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[13px] text-gray-900">All</span>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-gray-900 mb-2">Message</label>
                <div className="space-y-2">
                  <div className="text-[12px] text-gray-700">Reminder: Campaign end in 5 days.</div>
                  <div className="text-[12px] text-gray-700">Reminder: Please Confirm your booking</div>
                  <div className="text-[12px] text-gray-700">Reminder: contribution Pending.</div>
                </div>
              </div>

              {/* Schedule Reminder */}
              <div>
                <label className="block text-[13px] font-medium text-gray-900 mb-3">Schedule Reminder</label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="schedule"
                    defaultChecked
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-[13px] text-gray-900">Schedule for later</span>
                  <input
                    type="text"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="px-3 py-1.5 text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Panel - Recent Reminders */}
          <div className="w-[280px] p-6">
            <h3 className="text-[14px] font-semibold text-black mb-4">Recent Reminders</h3>
            
            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-2 bg-gray-50 border-b border-gray-200 px-2 py-2">
                <div className="text-[10px] font-medium text-gray-700">Date sent</div>
                <div className="text-[10px] font-medium text-gray-700">Audience</div>
                <div className="text-[10px] font-medium text-gray-700">Campaign</div>
                <div className="text-[10px] font-medium text-gray-700">Status</div>
              </div>

              {/* Table Body */}
              {recentReminders.map((reminder, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-2 border-b border-gray-200 last:border-b-0 px-2 py-2"
                >
                  <div className="text-[10px] text-gray-900">{reminder.dateSent}</div>
                  <div className="text-[10px] text-gray-900">{reminder.audience}</div>
                  <div className="text-[10px] text-gray-900">{reminder.campaign}</div>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      reminder.status === 'Sent' ? 'bg-green-600' :
                      reminder.status === 'Failed' ? 'bg-red-600' : 'bg-gray-600'
                    }`} />
                    <span className={`text-[10px] ${reminder.statusColor}`}>{reminder.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
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
