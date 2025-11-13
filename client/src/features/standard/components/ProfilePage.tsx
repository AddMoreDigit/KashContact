import { useState } from 'react';
import { Edit, ChevronRight, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
const profileImage = "https://via.placeholder.com/400x300?text=Image";

export function ProfilePage() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null);
  const [formData, setFormData] = useState({
    name: 'Michael Scott',
    email: 'michael@keahcont.co.za',
    phone: '+27 800 0525 89',
  });

  const handleEdit = (field: 'name' | 'email' | 'phone') => {
    setEditField(field);
    setShowEditDialog(true);
  };

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setShowEditDialog(false);
    setEditField(null);
  };
  const profileTasks = [
    { label: 'Setup Account', progress: 100, completed: true },
    { label: 'Upload your photo', progress: 75, completed: false },
    { label: 'Personal Information', progress: 75, completed: false },
    { label: 'Location', progress: 15, completed: false },
    { label: 'Bank Details', progress: 0, completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <ChevronRight size={20} />
          <span>K</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <img 
                  src={profileImage} 
                  alt="Profile header" 
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Edit size={16} className="text-gray-700" />
                </button>
              </div>
              
              {/* Avatar and Name */}
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-12">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 mb-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-gray-900">{formData.name}</h1>
                      <button 
                        onClick={() => handleEdit('name')}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600">Vulkona User</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Personal information</h2>
                <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Full names</label>
                  <div className="text-gray-900">{formData.name}</div>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Surname</label>
                  <div className="text-gray-900">Scott</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Email</label>
                    <div className="text-gray-900">{formData.email}</div>
                  </div>
                  <button 
                    onClick={() => handleEdit('email')}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    <Edit size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Phone number</label>
                    <div className="text-gray-900">{formData.phone}</div>
                  </div>
                  <button 
                    onClick={() => handleEdit('phone')}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    <Edit size={16} />
                  </button>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Address</label>
                  <div className="text-gray-900">123 Dunder Mifflin St, Scranton, PA</div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-gray-900 mb-6">Security</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Password</label>
                  <div className="text-gray-900">••••••••••</div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Two-Factor Authentication</label>
                  <div className="text-gray-900">Off</div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Recovery Email</label>
                  <div className="text-gray-900">Vulkonahlayl@Gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Completion */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-gray-900 mb-6">Complete Your Profile</h2>

              <div className="space-y-4 mb-8">
                {profileTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                      task.completed ? 'bg-purple-600' : 'border-2 border-gray-300'
                    }`}>
                      {task.completed && <Check size={14} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{task.label}</div>
                      <div className="text-purple-600">{task.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Circular Progress */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#8b5cf6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.5)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900">50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {editField === 'name' ? 'Name' : editField === 'email' ? 'Email' : 'Phone Number'}
            </DialogTitle>
            <DialogDescription>
              Update your {editField === 'name' ? 'full name' : editField === 'email' ? 'email address' : 'phone number'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="editField">
              {editField === 'name' ? 'Full Name' : editField === 'email' ? 'Email Address' : 'Phone Number'}
            </Label>
            <Input
              id="editField"
              type={editField === 'email' ? 'email' : editField === 'phone' ? 'tel' : 'text'}
              value={editField ? formData[editField] : ''}
              onChange={(e) => editField && setFormData({ ...formData, [editField]: e.target.value })}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
