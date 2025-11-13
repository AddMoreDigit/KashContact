import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CampaignCardProps {
  title: string;
  dateRange: string;
  saved: string;
  spent: string;
  progress: number;
  imageUrl?: string;
  onCancel?: () => void;
}

export function CampaignCard({ title, dateRange, saved, spent, progress, onCancel }: CampaignCardProps) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-start justify-between">
        <h3 className="text-gray-900">{title}</h3>
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onCancel}
          >
            <X className="w-4 h-4 text-gray-500" />
          </Button>
        )}
      </div>
      <p className="text-purple-600 text-sm">
        <span className="text-gray-600">Date:</span> {dateRange}
      </p>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Saved:</span>
        <span className="text-green-600">{saved}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">Spent:</span>
        <span className="text-red-600">{spent}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-gray-600 text-sm">{progress}%</p>
    </div>
  );
}