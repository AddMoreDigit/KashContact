import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface AddPaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPaymentMethod: (method: PaymentMethodData) => void;
}

export interface PaymentMethodData {
  type: 'debit' | 'credit';
  paymentType: 'once' | 'recurring';
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export function AddPaymentMethodDialog({
  open,
  onOpenChange,
  onAddPaymentMethod,
}: AddPaymentMethodDialogProps) {
  const [cardType, setCardType] = useState<'debit' | 'credit'>('debit');
  const [paymentType, setPaymentType] = useState<'once' | 'recurring'>('once');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handleAddCard = () => {
    if (!cardholderName.trim()) {
      toast.error('Please enter cardholder name');
      return;
    }
    if (!cardNumber.trim() || cardNumber.length < 13) {
      toast.error('Please enter a valid card number');
      return;
    }
    if (!expiryDate.trim()) {
      toast.error('Please enter expiry date');
      return;
    }
    if (!cvv.trim() || cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    const paymentMethod: PaymentMethodData = {
      type: cardType,
      paymentType,
      cardholderName,
      cardNumber,
      expiryDate,
      cvv,
      saveCard,
    };

    onAddPaymentMethod(paymentMethod);
    
    // Reset form
    setCardholderName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setSaveCard(false);
    
    toast.success('Payment method added successfully');
    onOpenChange(false);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gray-900 text-2xl">
              Add a new payment
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Add a new payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Card Type Selection */}
          <div className="flex items-center justify-between p-4 border border-purple-600 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-600" />
              <span className="text-gray-900">Debit Card</span>
            </div>
            <span className="text-purple-600 font-semibold">Visa</span>
          </div>

          {/* Payment Type */}
          <div>
            <RadioGroup value={paymentType} onValueChange={(value: any) => setPaymentType(value)}>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="once" id="once" />
                  <Label htmlFor="once" className="text-gray-900 cursor-pointer">
                    Once Off
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="recurring" id="recurring" />
                  <Label htmlFor="recurring" className="text-gray-900 cursor-pointer">
                    Recurring
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Card Holder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="text-gray-900">
              Card holder name
            </Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Enter name here"
              className="w-full"
            />
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-gray-900">
              Card number
            </Label>
            <Input
              id="cardNumber"
              type="text"
              value={formatCardNumber(cardNumber)}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className="w-full"
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-gray-900">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                type="text"
                value={formatExpiryDate(expiryDate)}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-gray-900">
                Cvv
              </Label>
              <Input
                id="cvv"
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                className="w-full"
              />
            </div>
          </div>

          {/* Save Card Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="saveCard"
              checked={saveCard}
              onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            />
            <Label
              htmlFor="saveCard"
              className="text-gray-700 cursor-pointer text-sm"
            >
              Save card securely for future Paymeta
            </Label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCard}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
