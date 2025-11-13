import { X, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EditCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: any;
  onCancel?: () => void;
}

export function EditCampaignDialog({ open, onOpenChange, campaign, onCancel }: EditCampaignDialogProps) {
  if (!campaign) return null;

  const sponsors = [
    { name: 'Sponsor A', contribution: 'R10 000' },
    { name: 'Sponsor B', contribution: 'R15 000' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
          <DialogDescription>
            Update campaign details, goal, description, and sponsors
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Left Column - Form Fields */}
          <div className="col-span-2 space-y-4">
            <div>
              <label className="text-sm mb-2 block">Campaign name</label>
              <Input defaultValue={campaign.title} />
            </div>

            <div>
              <label className="text-sm mb-2 block">Goal</label>
              <Input defaultValue={campaign.goal} />
            </div>

            <div>
              <label className="text-sm mb-2 block">Description</label>
              <Textarea 
                className="min-h-[120px]"
                placeholder="Enter campaign description"
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Progress</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-sm text-gray-600">{campaign.raised}/ {campaign.goal}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sponsors */}
          <div>
            <label className="text-sm mb-3 block">Sponsors</label>
            
            <Tabs defaultValue="sponsors" className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sponsors" className="text-xs">Sponsors</TabsTrigger>
                <TabsTrigger value="contribution" className="text-xs">Contribution</TabsTrigger>
                <TabsTrigger value="action" className="text-xs">Action</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-3 mb-4">
              {sponsors.map((sponsor, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                  <span className="text-sm">{sponsor.name}</span>
                  <span className="text-sm">{sponsor.contribution}</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              + Add Sponsor
            </Button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 mt-6 pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onCancel?.();
            }}
          >
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button variant="outline">Back to Campaign</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Update Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
