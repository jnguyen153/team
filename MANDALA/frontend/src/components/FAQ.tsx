import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What are your operating hours?',
    answer: 'We are open Monday through Saturday from 9:00 AM to 7:00 PM. Sundays we are open from 10:00 AM to 5:00 PM.',
  },
  {
    question: 'Do I need to make an appointment?',
    answer: 'While we do accept walk-ins, we recommend booking an appointment to ensure you get your preferred time slot and stylist.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We require at least 24 hours notice for cancellations. Late cancellations may be subject to a fee.',
  },
  {
    question: 'Do you offer consultations?',
    answer: 'Yes, we offer free consultations for color services and major style changes.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;