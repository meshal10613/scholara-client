import React from 'react';

const FaqSection = () => {
    const faqs = [
        {
        question: 'How do I apply for a scholarship?',
        answer:
            'Browse available scholarships, click on the one that suits you, fill in your details, upload documents, and complete the payment if required.',
        },
        {
        question: 'Is there a service charge for applying?',
        answer:
            'Some scholarships may have a small service charge. It will be clearly mentioned before you proceed with payment.',
        },
        {
        question: 'Can I track my application status?',
        answer:
            'Yes! After applying, you can track your application status from your dashboard under "My Applications".',
        },
        {
        question: 'What happens if I don’t get selected?',
        answer:
            'Don’t worry. We frequently add new opportunities. You can always apply for another scholarship that matches your profile.',
        },
    ];

    return (
        <section className="px-4 py-10 bg-base-100 md:px-8 lg:px-20">
        <div className="w-full mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-base-content mb-8">
            Here are some of the common questions students ask.
            </p>
        </div>

        <div className="w-full mx-auto space-y-4">
            {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">
                {faq.question}
                </div>
                <div className="collapse-content text-base-content">
                <p>{faq.answer}</p>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default FaqSection;
