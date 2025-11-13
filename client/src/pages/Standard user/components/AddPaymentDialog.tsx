import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { X } from 'lucide-react';

interface AddPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPaymentDialog({ open, onOpenChange }: AddPaymentDialogProps) {
  const [paymentType, setPaymentType] = useState('debit-card');
  const [frequency, setFrequency] = useState('once-off');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handleAddCard = () => {
    // Handle add card logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>Add a new payment</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Payment Type */}
          <RadioGroup value={paymentType} onValueChange={setPaymentType}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit-card" id="debit-card-dialog" />
                <Label htmlFor="debit-card-dialog" className="text-gray-700">Debit Card</Label>
              </div>
              <span className="text-blue-600">Visa</span>
            </div>
          </RadioGroup>

          {/* Frequency */}
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once-off" id="once-off" />
                <Label htmlFor="once-off" className="text-gray-700">Once Off</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recurring" id="recurring" />
                <Label htmlFor="recurring" className="text-gray-700">Recurring</Label>
              </div>
            </div>
          </RadioGroup>

          {/* Card Holder Name */}
          <div>
            <Label htmlFor="cardholder-name" className="text-gray-700">Card holder name</Label>
            <Input
              id="cardholder-name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Enter name here"
              className="mt-2"
            />
          </div>

          {/* Card Number */}
          <div>
            <Label htmlFor="card-number" className="text-gray-700">Card number</Label>
            <Input
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000000000000"
              className="mt-2"
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry-date" className="text-gray-700">Expiry Date</Label>
              <Input
                id="expiry-date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-gray-700">Cvv</Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="mt-2"
              />
            </div>
          </div>

          {/* Save Card */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="save-card"
              checked={saveCard}
              onCheckedChange={(checked) => setSaveCard(checked === true)}
            />
            <label
              htmlFor="save-card"
              className="text-sm text-gray-700"
            >
              Save card securely for future Paymets
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCard}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Add Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
