import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who can access the Super Admin Portal?",
      answer: "The Admin Portal is designed for institutional owners and high-level administrators to manage global school configurations, staff credentials, and overall data oversight."
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
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2D3142] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Get answers to commonly asked questions about our app and its features.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-red-500 mx-auto mt-4 rounded-full"
          />
        </motion.div>

        <motion.div
          layout
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className={`overflow-hidden border rounded-2xl transition-colors duration-500 ${isOpen ? 'bg-[#5D3FD3] border-[#5D3FD3] shadow-xl' : 'bg-white border-gray-200'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    {/* Icon Animation */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      {isOpen ? (
                        <ChevronsUp className="w-5 h-5 text-white/90" />
                      ) : (
                        <ChevronsDown className="w-5 h-5 text-[#5D3FD3]" />
                      )}
                    </motion.div>
                    <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-700'
                      }`}>
                      {faq.question}
                    </span>
                  </div>
                </button>

                {/* Smooth Expand/Collapse Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-16 pb-8">
                        <div className="w-full h-[1px] bg-white/20 mb-6" />
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-white/80 text-sm leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;