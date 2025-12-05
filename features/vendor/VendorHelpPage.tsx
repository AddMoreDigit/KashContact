import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'vendorDashboard' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorProfile' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp';

interface VendorHelpPageProps {
  onNavigate: (page: Page) => void;
}

export function VendorHelpPage({ onNavigate }: VendorHelpPageProps) {
  const [activePage] = useState<string>('help');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleNavigation = (page: Page) => {
    onNavigate(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('login' as Page);
    }, 500);
  };

  const faqs = [
    { question: 'How do I create a new service?', answer: 'Click the Create button in your dashboard and select "New Service" to add a new offering to your catalog.' },
    { question: 'How do I manage bookings?', answer: 'Navigate to Campaigns page to view all your bookings. You can approve, reject, or modify bookings from there.' },
    { question: 'How do I receive payments?', answer: 'Payments are processed automatically through our secure payment gateway and deposited to your registered bank account.' },
    { question: 'How can I track my revenue?', answer: 'Visit the Overview or Transactions page to see detailed revenue analytics and transaction history.' },
    { question: 'How do I contact support?', answer: 'You can reach our support team at support@example.com or call +27 11 234 5678 during business hours.' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[900px] mx-auto px-8 py-8">
          <h1 className="text-[24px] font-medium text-black mb-1">Help & Support</h1>
          <p className="text-[14px] text-gray-600 mb-8">Find answers to common questions</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#8363f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-[16px] font-medium text-black mb-2">Email Support</h3>
              <p className="text-[14px] text-gray-600">support@example.com</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#8363f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 className="text-[16px] font-medium text-black mb-2">Phone Support</h3>
              <p className="text-[14px] text-gray-600">+27 11 234 5678</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#8363f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-[16px] font-medium text-black mb-2">Business Hours</h3>
              <p className="text-[14px] text-gray-600">Mon-Fri, 9AM-5PM</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  >
                    <span className="text-[14px] font-medium text-black">{faq.question}</span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedQuestion === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {selectedQuestion === index && (
                    <p className="mt-3 text-[14px] text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
