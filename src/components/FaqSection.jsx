import React, { useState } from 'react';

const FaqSection = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            question: "How long does shipping normally take?",
            answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on customs processing in your country."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return window for unworn items with tags attached. Once we receive your return, refunds are processed within 5-7 business days to your original payment method."
        },
        {
            question: "Can I modify my order after placing it?",
            answer: "Orders can be modified within 1 hour of placement. After this window, our warehouse team has already started processing your package, and changes cannot be guaranteed."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 150 countries worldwide. International shipping costs are calculated at checkout based on destination and package weight."
        }
    ];

    return (
        <section className="bg-white py-24 px-6 md:px-14 lg:px-20 border-t border-gray-100 font-sans">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-12 text-center text-black">Frequently Asked Questions</h2>
                <div className="border-t border-gray-100">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100">
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                            >
                                <span className={`text-lg md:text-xl font-medium transition-colors ${activeFaq === index ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-500 text-lg leading-relaxed pr-8">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
