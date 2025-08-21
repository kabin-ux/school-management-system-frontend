import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
import FAQItem from './FAQItem';

const FAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    "Who can access the Super Admin Portal?",
    "What financial features does the Accountant Portal offer?",
    "How can a school join the platform?",
    "Do I need internet to use the mobile app?",
    "Is data secure across the portals and apps?"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Answer To Your<br />
              <span className="text-[#CBD72B]">Questions</span>
            </h2>
            <p className="text-[#7B8304] mb-8">
              Get answers to commonly asked <br/> questions about our app and its features.
            </p>
            <button className="bg-[#CBD72B] text-white font-semibold text-xl px-8 py-3 rounded-4xl hover:bg-[#A8B122] transition-colors">
              Contact Us
            </button>
          </div>
          
          <div className="space-y-4">
            {faqs.map((question, index) => (
              <FAQItem
                key={index}
                question={question}
                isOpen={openFaq === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;