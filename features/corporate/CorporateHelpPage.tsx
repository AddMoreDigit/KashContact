import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { CorporateSidebar } from './components/CorporateSidebar';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateHelp' | 'corporateDrafts';

interface CorporateHelpPageProps {
  onNavigate: (page: Page) => void;
}

const faqs = [
  {
    id: 1,
    question: 'How do I create a campaign?',
    answer: 'To create a new campaign, go to campaign section and click on the "new campaign" button follow the on-screen instructions to set up your new campaigns'
  },
  {
    id: 2,
    question: 'How can I redeem a voucher',
    answer: ''
  },
  {
    id: 3,
    question: 'What should I do is transaction is pending',
    answer: ''
  },
  {
    id: 4,
    question: 'How to add member on the campaigns',
    answer: ''
  }
];

const guides = [
  { id: 1, title: 'Onboarding Guide' },
  { id: 2, title: 'Managing campaigns' },
  { id: 3, title: 'Using Vouchers' },
  { id: 4, title: 'Transaction Insights' }
];

export function CorporateHelpPage({ onNavigate }: CorporateHelpPageProps) {
  const [activePage, setActivePage] = useState<string>('help');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage="help"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          <h1 className="text-[24px] font-semibold text-black mb-8">Help & Support</h1>

          <div className="flex gap-8">
            {/* Left Column - FAQ */}
            <div className="flex-1">
              <h2 className="text-[16px] font-semibold text-black mb-4">Frequently Ask Questions</h2>
              
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg border border-gray-200">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-[14px] text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFaq === faq.id && faq.answer && (
                      <div className="px-4 pb-4">
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Support Card & Guides */}
            <div className="w-80 space-y-6">
              {/* Customer Support Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="text-[16px] font-semibold text-black">Customer Support</h3>
                </div>
                
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mb-4 text-[14px]">
                  Chat with us
                </button>

                <div className="space-y-2">
                  <div className="text-[12px] text-gray-600">Help@tkahconnect.co.za</div>
                  <div className="text-[12px] text-gray-600">+27 8100052589</div>
                </div>
              </div>

              {/* Guide & Tutorials */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-[16px] font-semibold text-black mb-4">Guide & Tutorials</h3>
                
                <div className="space-y-3">
                  {guides.map((guide) => (
                    <div key={guide.id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      <span className="text-[14px] text-gray-700">{guide.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
