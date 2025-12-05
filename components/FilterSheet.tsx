import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { serviceStorage } from '../utils/serviceStorage';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  selectedLocations: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onLocationChange: (location: string, checked: boolean) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export function FilterSheet({
  open,
  onOpenChange,
  selectedCategories,
  selectedLocations,
  onCategoryChange,
  onLocationChange,
  onClearAll,
  onApply,
}: FilterSheetProps) {
  // Get categories and locations from centralized data
  const categoryList = serviceStorage.getUniqueCategories();
  const locationList = serviceStorage.getUniqueLocations();
  
  const categories = categoryList.map(cat => ({ id: cat.toLowerCase(), label: cat }));
  const locations = locationList.map(loc => ({ id: loc, label: loc }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Filter Service Providers</SheetTitle>
          <SheetDescription className="sr-only">
            Filter service providers by category and location
          </SheetDescription>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="text-gray-900 mb-4">Category</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      onCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-gray-700 cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-gray-900 mb-4">Location</h3>
            <div className="space-y-3">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={location.id}
                    checked={selectedLocations.includes(location.id)}
                    onCheckedChange={(checked) =>
                      onLocationChange(location.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={location.id}
                    className="text-gray-700 cursor-pointer"
                  >
                    {location.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 flex gap-3">
          <Button
            variant="outline"
            onClick={onClearAll}
            className="flex-1 border-gray-300"
          >
            Clear All
          </Button>
          <Button
            onClick={onApply}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
