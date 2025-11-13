import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, FileText, DollarSign, Users } from "lucide-react";

interface DraftCampaign {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  provider: string;
  cost: string;
  members: number;
  step: number;
  totalSteps: number;
  progress: number;
}

export function DraftPage() {
  const draftCampaigns: DraftCampaign[] = [
    {
      id: 1,
      title: "Megalies park gateway weekend",
      image: "https://images.unsplash.com/photo-1578648326394-134261db619b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXVzZW1lbnQlMjBwYXJrJTIwcmVzb3J0fGVufDF8fHx8MTc2MTY0MzY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      reviews: 124,
      provider: "Service Provider/Megalies Hotel",
      cost: "Cost:R10 000.00",
      members: 10,
      step: 3,
      totalSteps: 5,
      progress: 60,
    },
    {
      id: 2,
      title: "Megalies park gateway weekend",
      image: "https://images.unsplash.com/photo-1581450266720-7fef5aa20d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMHBhcmt8ZW58MXx8fHwxNzYxNjQzNjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      reviews: 24,
      provider: "Service Provider/Megalies Hotel",
      cost: "Cost:R10 000.00",
      members: 10,
      step: 2,
      totalSteps: 5,
      progress: 40,
    },
    {
      id: 3,
      title: "Gold reef city team building",
      image: "https://images.unsplash.com/photo-1559776587-6fecddf42fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmclMjB0b3VyfGVufDF8fHx8MTc2MTY0MzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      reviews: 1026,
      provider: "Service Provider/Megalies Hotel",
      cost: "Cost:R18 000.00",
      members: 10,
      step: 1,
      totalSteps: 5,
      progress: 20,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={`w-4 h-4 ${
              idx < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Save as draft</h1>
        <p className="text-gray-500">
          These are the campaigns you've started but not completed. continue editing to finish and
          launch your campaign
        </p>
      </div>

      <div className="space-y-4">
        {draftCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex gap-4">
              {/* Campaign Image */}
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-32 h-24 rounded-lg object-cover"
              />

              {/* Campaign Details */}
              <div className="flex-1 space-y-3">
                {/* Title and Rating */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{campaign.title}</h3>
                      {renderStars(campaign.rating)}
                      <span className="text-sm text-gray-500">
                        ({campaign.reviews} Reviews)
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-600">
                      <FileText className="w-3 h-3 mr-1" />
                      Draft
                    </Badge>
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{campaign.provider}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{campaign.cost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Member added to [{campaign.members}]</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Step {campaign.step} of {campaign.totalSteps}
                    </span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Back
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Continue editing
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    Delete Draft
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
