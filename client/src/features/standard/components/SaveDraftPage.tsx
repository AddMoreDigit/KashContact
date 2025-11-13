import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

interface SaveDraftPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowAddCampaign?: () => void;
}

export function SaveDraftPage({ onNavigate, onShowNotifications, onShowAddCampaign }: SaveDraftPageProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);

  const drafts = [
    {
      id: 1,
      name: 'Magallies park gateway weekend',
      rating: 4.9,
      reviews: 124,
      service: 'Service Provider/Magellies Hotel',
      goal: 'R10 000.00',
      memberCount: 'Member added (x Jan13)',
      step: '1 of 5',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwcmVzb3J0fGVufDF8fHx8MTc2MjYyMzI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Magallies park gateway weekend',
      rating: 4.9,
      reviews: 124,
      service: 'Service Provider/Magellies Hotel',
      goal: 'R10 000.00',
      memberCount: 'Member added (x Jan13)',
      step: '2 of 5',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjYxNzI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Gold reef city team building',
      rating: 5.0,
      reviews: 150,
      service: 'Service Provider/Magellies Hotel',
      goal: 'R18 000.00',
      memberCount: 'Member added (x Jan10)',
      step: '1 of 5',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwY2VudGVyfGVufDF8fHx8MTc2MjYyMzAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleDeleteDraft = (draftId: number) => {
    setSelectedDraftId(draftId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    toast.success('Draft deleted successfully');
    setShowDeleteDialog(false);
    setSelectedDraftId(null);
  };

  const handleContinueEditing = (draftId: number) => {
    toast.info('Continuing campaign creation...');
    onNavigate('createCampaign');
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={onShowAddCampaign}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <button 
            onClick={onShowNotifications}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Save as draft</h1>
          <p className="text-gray-600">These are the campaigns you've started but not completed, continue editing to finishing and launch your campaign.</p>
        </div>

        {/* Draft Cards */}
        <div className="space-y-6">
          {drafts.map((draft) => (
            <div key={draft.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex gap-4 p-6">
                {/* Draft Image */}
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={draft.image}
                    alt={draft.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Draft Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{draft.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-700">{draft.rating}</span>
                          <span className="text-gray-500">({draft.reviews} Reviews)</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        Draft
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">{draft.service}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-sm text-gray-600">Goal: {draft.goal}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">{draft.memberCount}</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-gray-600">Step {draft.step}</span>
                    </div>
                    <Progress value={draft.progress} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => onNavigate('createCampaign')}
                      className="text-gray-700 hover:text-gray-900"
                      variant="link"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => handleContinueEditing(draft.id)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Continue editing
                    </Button>
                    <Button
                      onClick={() => handleDeleteDraft(draft.id)}
                      variant="destructive"
                    >
                      Delete Draft
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Draft</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this draft? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
