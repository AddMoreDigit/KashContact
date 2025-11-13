import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function HelpSupportPage() {
  const faqs = [
    {
      question: "How do I create a campaign?",
      answer: "To create a new campaign, go to campaign section and click on the 'new campaign' button follow the on-screen instructions to set up your new campaigns",
    },
    {
      question: "How can I redeem a voucher",
      answer: "To redeem a voucher, navigate to the vouchers section and enter your voucher code. The discount will be applied automatically to your next booking.",
    },
    {
      question: "What should I do is transaction is pending",
      answer: "If your transaction is pending, please wait 24-48 hours for processing. If the issue persists, contact our support team with your transaction ID.",
    },
    {
      question: "How to add member on the campaigns",
      answer: "To add members to your campaign, go to the campaign details page and click on 'Add Member'. You can invite members via email or select from your contacts.",
    },
  ];

  const guides = [
    { title: "Onboarding Guide", color: "text-purple-600" },
    { title: "Managing campaigns", color: "text-purple-600" },
    { title: "Using Vouchers", color: "text-purple-600" },
    { title: "Transaction insights", color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Help & Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-4">Frequently Ask Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-sm text-gray-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Support */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900">Customer Support</h3>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
              Chat with us
            </Button>

            <div className="space-y-1 text-sm text-gray-600">
              <p>Help@lastcontact.co.za</p>
              <p>+27 800052589</p>
            </div>
          </Card>

          {/* Guide & Tutorials */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Guide & Tutorials</h3>
            
            <div className="space-y-3">
              {guides.map((guide, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <a href="#" className={`text-sm ${guide.color} hover:underline`}>
                    {guide.title}
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
