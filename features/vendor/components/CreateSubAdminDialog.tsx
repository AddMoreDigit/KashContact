import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VendorSidebar } from './VendorSidebar';

interface CreateSubAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: any) => void;
}

export interface SubAdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export function CreateSubAdminDialog({ open, onOpenChange, onNavigate }: CreateSubAdminDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  if (!open) return null;

  const handleCreate = () => {
    if (!firstName.trim()) {
      toast.error('Please enter first name');
      return;
    }

    if (!lastName.trim()) {
      toast.error('Please enter last name');
      return;
    }

    if (!email.trim()) {
      toast.error('Please enter email');
      return;
    }

    if (!role) {
      toast.error('Please select a role');
      return;
    }

    toast.success('Sub admin created successfully!');
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Sidebar */}
      <VendorSidebar currentPage="dashboard" onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-black mb-1">Create Sub Admin</h2>
            <p className="text-gray-500 text-sm">Please put the details of the Person you wanna add.</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-w-2xl">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              Role<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value=""></option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

