import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { NavBar } from './NavBar';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices';

interface HelpSupportPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function HelpSupportPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart }: HelpSupportPageProps) {
  const faqs = [
    {
      question: 'How do I create a campaign?',
      answer: 'To create a new campaign, go to campaign section and click on the "new campaign" button, follow the on-screen instructions to set up your new campaigns.',
    },
    {
      question: 'How can I redeem a voucher',
      answer: 'To redeem a voucher, go to the Vouchers section in your dashboard. Select the voucher you want to redeem and click on the "Redeem" button. You can then generate a QR code to use at the service provider.',
    },
    {
      question: 'What should I do is transaction is pending',
      answer: 'If your transaction is pending, please wait for a few minutes. If the issue persists, contact our support team for assistance. Make sure you have a stable internet connection and sufficient funds.',
    },
    {
      question: 'How to add member on the campaigns',
      answer: 'To add members to your campaign, go to the campaign details page and click on "Manage Contributors". From there, you can invite new members by entering their email addresses or selecting from your contacts.',
    },
  ];

  const guides = [
    'Onboarding Guide',
    'Managing campaigns',
    'Using Vouchers',
    'Transaction insights',
  ];

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
        <h1 className="text-gray-900 mb-8">Help & Support</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQs Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Frequently Ask Questions</h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-gray-900 hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Customer Support */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-gray-900">Customer Support</h3>
              </div>

              <Button 
                onClick={() => onNavigate('messaging')}
                className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
              >
                Chat with us
              </Button>

              <div className="space-y-2 text-sm">
                <div className="text-gray-600">Help@keahcont.co.za</div>
                <div className="text-gray-600">+27 800052589</div>
              </div>
            </div>

            {/* Guide & Tutorials */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Guide & Tutorials</h3>

              <ul className="space-y-3">
                {guides.map((guide, index) => (
                  <li key={index}>
                    <button className="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></span>
                      {guide}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}