import { ChevronDown, ChevronUp, MessageSquare, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function HelpSupport() {
  const faqs = [
    {
      question: 'How do I create a campaign ?',
      answer: 'To create a new campaign, go to campaign section and click on the "new campaign" button follow the on-screen instructions to set up your new campaigns'
    },
    {
      question: 'How can i redeem a voucher',
      answer: 'You can redeem a voucher by going to the vouchers section and entering your voucher code.'
    },
    {
      question: 'What should I do is transaction is pending',
      answer: 'If your transaction is pending, please wait for confirmation. Contact support if it takes longer than expected.'
    },
    {
      question: 'How to add member on the campaigns',
      answer: 'Navigate to your campaign, go to the members section, and click "Add Member" to invite new participants.'
    }
  ];

  const guides = [
    'Onboarding Guide',
    'Managing campaigns',
    'Using Vouchers',
    'Transaction insights'
  ];

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl">Help & Support</h1>
          <button className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="col-span-2">
            <h2 className="mb-6">Frequently Ask Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Support */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <h3>Customer Support</h3>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                Chat with us
              </Button>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Help@keanconnect.co.za</p>
                <p>+27 800052589</p>
              </div>
            </div>

            {/* Guide & Tutorials */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="mb-4">Guide & Tutorials</h3>
              <ul className="space-y-2">
                {guides.map((guide, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                    <span>{guide}</span>
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
