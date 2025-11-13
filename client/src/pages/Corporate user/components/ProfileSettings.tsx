import { Edit } from 'lucide-react';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import bannerImage from 'figma:asset/cce1fa97d5bc27a16d1d71fb1aa6282eac46c1f3.png';

export function ProfileSettings() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header Banner */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <img src={bannerImage} alt="Digital Banner" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-transparent flex items-center px-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 60 60" className="w-12 h-12">
              <path
                d="M30 10 L20 25 L30 22 L40 25 Z M30 22 L30 40 M25 40 L35 40 M20 45 L40 45"
                stroke="#14B8A6"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Add more Digital Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2>Add more Digital</h2>
          <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
            <Edit className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      </div>

      {/* Corporate Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Corporate information</h3>
          <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
            <Edit className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Full name</label>
            <Input placeholder="Enter full name" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <Input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Phone number</label>
            <Input type="tel" placeholder="Enter phone number" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Address</label>
            <Input placeholder="Enter address" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="mb-6">Security</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <Input type="password" value="••••••••••" readOnly />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">Two-Factor Authentication</label>
            <span className="text-sm text-gray-500">Off</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">Recovery Email</label>
            <span className="text-sm text-gray-700">VukunHayi@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Complete Your Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="mb-6">Complete Your Profile</h3>
        <div className="flex items-start gap-8">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox checked id="setup" />
              <label htmlFor="setup" className="text-sm">
                Setup Account <span className="text-gray-400">100%</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked id="upload" />
              <label htmlFor="upload" className="text-sm">
                Upload your photo <span className="text-gray-400">5%</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked id="personal" />
              <label htmlFor="personal" className="text-sm">
                Personal Information <span className="text-gray-400">5%</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="bank" />
              <label htmlFor="bank" className="text-sm text-gray-400">
                Bank Details <span>100%</span>
              </label>
            </div>
          </div>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56 * 0.5} ${2 * Math.PI * 56}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
