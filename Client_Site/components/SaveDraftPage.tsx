import { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Trash2, Edit, X, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NavBar } from './NavBar';
import { toast } from 'sonner@2.0.3';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices';

interface CartItem {
  id: number;
  type: 'room' | 'food' | 'transport' | 'activity';
  name: string;
  price: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  provider?: string;
  image?: string;
}

interface Draft {
  id: number;
  name: string;
  category: string;
  goal: string;
  startDate: string;
  endDate: string;
  step: number;
  progress: number;
  services: CartItem[];
  createdAt: string;
}

interface SaveDraftPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  onEditDraft?: (draft: Draft) => void;
}

export function SaveDraftPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart, onEditDraft }: SaveDraftPageProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('campaignDrafts') || '[]');
    setDrafts(savedDrafts);
  }, []);

  const handleDeleteDraft = (draftId: number) => {
    setSelectedDraftId(draftId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedDraftId) {
      const updatedDrafts = drafts.filter(d => d.id !== selectedDraftId);
      setDrafts(updatedDrafts);
      localStorage.setItem('campaignDrafts', JSON.stringify(updatedDrafts));
      toast.success('Draft deleted successfully');
    }
    setShowDeleteDialog(false);
    setSelectedDraftId(null);
  };

  const handleContinueEditing = (draft: Draft) => {
    if (onEditDraft) {
      onEditDraft(draft);
    }
    toast.info('Continuing campaign creation...');
    onNavigate('createCampaign');
  };

  return (
    <div className="flex-1 bg-gray-50">
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Save as draft</h1>
          <p className="text-gray-600">These are the campaigns you've started but not completed, continue editing to finishing and launch your campaign.</p>
        </div>

        {/* Draft Cards */}
        <div className="space-y-6">
          {drafts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500 mb-4">No drafts found</p>
                <Button 
                  onClick={() => onNavigate('selectServices')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create New Campaign
                </Button>
            </div>
          ) : (
            drafts.map((draft) => (
            <div key={draft.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex gap-4 p-6">
                {/* Draft Image */}
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={draft.services[0]?.image || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwcmVzb3J0fGVufDF8fHx8MTc2MjYyMzI1Mnww&ixlib=rb-4.1.0&q=80&w=1080'}
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
                        <div className="text-sm text-gray-600">{draft.category}</div>
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
                        <div className="text-sm text-gray-600">{draft.services.length} Services</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-gray-600">Step {draft.step} of 3</span>
                    </div>
                    <Progress value={draft.progress} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => onNavigate('campaigns')}
                      className="text-gray-700 hover:text-gray-900"
                      variant="link"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => handleContinueEditing(draft)}
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
          ))
          )}
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