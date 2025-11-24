import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star, X, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import campaignHeroImg from 'figma:asset/a64ebe77553aa82e4a689f7e2da3681d3bb61b59.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign';

interface LeaveReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: Page) => void;
}

export function LeaveReviewDialog({ open, onOpenChange, onNavigate }: LeaveReviewDialogProps) {
  const [ratings, setRatings] = useState({
    seaview: 0,
    restaurant: 0,
    sightseeing: 0,
    overall: 0,
  });

  const [feedback, setFeedback] = useState({
    seaview: '',
    restaurant: '',
    sightseeing: '',
  });

  const StarRating = ({ 
    rating, 
    onRate 
  }: { 
    rating: number; 
    onRate: (rating: number) => void;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            className="focus:outline-none"
          >
            <Star
              size={20}
              className={
                star <= rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-none text-gray-300'
              }
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    onOpenChange(false);
    onNavigate('dashboard');
  };

  const handleSkip = () => {
    onOpenChange(false);
    onNavigate('dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-gray-700" />
            <DialogTitle>Leave a Review</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 text-sm">
            Your feedback helps us improve services for future campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Campaign Summary */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={campaignHeroImg}
                  alt="Cape town gateway weekend"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 text-sm mb-1">Cape town gateway weekend</h3>
                <p className="text-gray-600 text-xs mb-2">Completed on 21 July 2025</p>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span>R20 000.00 Of R20 000.00 Reached</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seaview Lodge Review */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzYyNjE3Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Seaview Lodge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Seaview Lodge</p>
                <p className="text-gray-500 text-xs">Accommodation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Your Rating:</span>
              <StarRating
                rating={ratings.seaview}
                onRate={(rating) => setRatings({ ...ratings, seaview: rating })}
              />
            </div>
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback.seaview}
              onChange={(e) => setFeedback({ ...feedback, seaview: e.target.value })}
              className="min-h-[60px] text-sm"
            />
          </div>

          {/* Docann's Restaurant Review */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJyZWFrZmFzdCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjI2MTgxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Docann's Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">Docann's Restaurant</p>
                <p className="text-gray-500 text-xs">Food</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Your Rating:</span>
              <StarRating
                rating={ratings.restaurant}
                onRate={(rating) => setRatings({ ...ratings, restaurant: rating })}
              />
            </div>
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback.restaurant}
              onChange={(e) => setFeedback({ ...feedback, restaurant: e.target.value })}
              className="min-h-[60px] text-sm"
            />
          </div>

          {/* City Sightseeing Review */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1687755012083-9eba77d3cd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwdG91ciUyMG9jZWFufGVufDF8fHx8MTc2MjYxODkwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="City Sightseeing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">City Sightseeing</p>
                <p className="text-gray-500 text-xs">Activity</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Your Rating:</span>
              <StarRating
                rating={ratings.sightseeing}
                onRate={(rating) => setRatings({ ...ratings, sightseeing: rating })}
              />
            </div>
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback.sightseeing}
              onChange={(e) => setFeedback({ ...feedback, sightseeing: e.target.value })}
              className="min-h-[60px] text-sm"
            />
          </div>

          {/* Overall Rating */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <p className="text-gray-700 text-sm">How would you rate this campaign overall?</p>
            <StarRating
              rating={ratings.overall}
              onRate={(rating) => setRatings({ ...ratings, overall: rating })}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="border-gray-300"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Submitting feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
