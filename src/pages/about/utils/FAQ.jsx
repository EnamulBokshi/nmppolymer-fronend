import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange."
        },
        {
            question: "How do I track my order?",
            answer: "You can track your order using the tracking number provided in your order confirmation email."
        },
        {
            question: "Can I purchase items again?",
            answer: "Yes, you can purchase items again by visiting our store and placing a new order."
        }
    ];
    faqs.push({
        question: "What is the quality of your products?",
        answer: "We ensure that all our products meet the highest quality standards. Each product goes through rigorous testing and quality control before it reaches you."
    });
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 ">

            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default FAQ;
