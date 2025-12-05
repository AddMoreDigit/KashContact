import { useState } from 'react';
import { FileText, PlusCircle, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { NavBar } from '../../components/layout';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail';

interface HowItWorksPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function HowItWorksPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart }: HowItWorksPageProps) {
  const steps = [
    {
      icon: FileText,
      label: 'Pick service provider',
      color: 'text-purple-600',
    },
    {
      icon: PlusCircle,
      label: 'Create Campaign',
      color: 'text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Contribute',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">How it Works</h1>
          <p className="text-gray-600 text-lg">Simple steps to reach your goals</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className={step.color} size={32} />
              </div>
              <h3 className="text-lg mb-2">Step {index + 1}</h3>
              <p className="text-gray-600">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => onNavigate('dashboard')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
