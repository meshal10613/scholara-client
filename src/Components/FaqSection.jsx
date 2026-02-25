import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I apply for a scholarship?",
            answer: "Browse available scholarships, click on the one that suits you, fill in your details, upload documents, and complete the payment if required. Our automated system will guide you through every step.",
        },
        {
            question: "Is there a service charge for applying?",
            answer: "Some premium scholarships may have a small service charge to cover processing. This is clearly displayed on the checkout page before any payment is made.",
        },
        {
            question: "Can I track my application status?",
            answer: 'Absolutely! Navigate to your Dashboard and select "My Applications." You will see real-time updates on whether your application is pending, under review, or approved.',
        },
        {
            question: "What happens if I don’t get selected?",
            answer: "Don’t be discouraged! We add dozens of new opportunities weekly. Our recommendation engine will suggest alternative scholarships based on your profile and previous applications.",
        },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20">
            <div className="max-w-7xl conatiner mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-primary/10 text-primary">
                        <FaQuestionCircle className="text-2xl" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Everything you need to know about the scholarship
                        process. Can't find the answer? Contact our support
                        team.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group border rounded-2xl transition-all duration-300 ${
                                activeIndex === index
                                    ? "bg-white border-primary/30 shadow-xl shadow-primary/5"
                                    : "bg-white border-gray-200 hover:border-primary/20"
                            }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                            >
                                <span
                                    className={`text-lg font-semibold transition-colors duration-300 ${
                                        activeIndex === index
                                            ? "text-primary"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {faq.question}
                                </span>
                                <span
                                    className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                                        activeIndex === index
                                            ? "bg-primary text-white rotate-180"
                                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                    }`}
                                >
                                    <FaChevronDown size={14} />
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    activeIndex === index
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-5 md:px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 mt-1">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center p-8 rounded-3xl bg-white border border-dashed border-gray-300">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <button className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/25 cursor-pointer">
                        Contact Support Team
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
