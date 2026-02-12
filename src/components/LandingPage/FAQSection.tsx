import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who can access the Super Admin Portal?",
      answer: "The Student App is a personalized companion for students to stay on top of their academic journey. It displays real-time attendance records, upcoming class schedules, homework assignments, exam results. The Student App is a personalized companion for students to stay on top of their academic journey. It displays real-time attendance records, upcoming class schedules, homework assignments, exam results."
    },
    {
      question: "What financial features does the Accountant Portal offer?",
      answer: "The Accountant Portal offers detailed fee management, automated billing, expense tracking, and real-time financial reporting for the institution."
    },
    {
      question: "How can a school join this platform?",
      answer: "Schools can join by requesting a demo through our 'Request A Demo' button. Our team will reach out to guide you through the integration process."
    },
    {
      question: "Do I need internet to use the mobile apps?",
      answer: "While real-time updates require connectivity, basic features like viewing cached timetables and previously downloaded materials are available offline."
    },
    {
      question: "Is data secure across the portals and apps?",
      answer: "Yes, we use military-grade encryption and secure cloud servers to ensure absolute data sovereignty and system availability."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D3142] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm">
            Get answers to commonly asked questions about our app and its features.
          </p>
          <div className="w-10 h-0.5 bg-red-500 mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-300 ${isOpen ? 'bg-[#5D3FD3] border-[#5D3FD3] shadow-lg' : 'bg-white border-gray-200'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    {isOpen ? (
                      <ChevronsUp className="w-5 h-5 text-white/70" />
                    ) : (
                      <ChevronsDown className="w-5 h-5 text-[#5D3FD3]" />
                    )}
                    <span className={`font-semibold text-sm ${isOpen ? 'text-white' : 'text-gray-700'}`}>
                      {faq.question}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-14 pb-8 transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="w-full h-[1px] bg-white/20 mb-6"></div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;