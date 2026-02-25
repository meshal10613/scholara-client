import React from "react";
import { FaSearch, FaWpforms, FaCreditCard, FaChartLine } from "react-icons/fa";
import howIt from "../assets/how-itworks.png";

const steps = [
    {
        id: 1,
        title: "Search Scholarships",
        description:
            "Find scholarships tailored to your country, degree, and needs using our smart filters.",
        icon: <FaSearch />,
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Apply Easily",
        description:
            "Fill out your application form directly from our website with a simplified interface.",
        icon: <FaWpforms />,
        color: "bg-purple-500",
    },
    {
        id: 3,
        title: "Pay Securely",
        description:
            "Complete service charges using international cards through our encrypted gateway.",
        icon: <FaCreditCard />,
        color: "bg-green-500",
    },
    {
        id: 4,
        title: "Track Progress",
        description:
            "Get real-time updates and notifications on your application status via your dashboard.",
        icon: <FaChartLine />,
        color: "bg-orange-500",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        How It Works
                    </h3>
                    <p className="text-gray-500 text-lg">
                        A simple 4-step process designed to take you from
                        searching to winning your dream scholarship.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-8 relative">
                        <div className="hidden lg:block absolute left-[27px] top-10 bottom-10 w-0.5 bg-gray-100"></div>

                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className="group relative flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
                            >
                                <div
                                    className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {step.icon}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-900 text-xs font-bold flex items-center justify-center rounded-full shadow border border-gray-100">
                                        {step.id}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 relative w-full">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={howIt}
                                alt="Dashboard preview"
                                className="rounded-2xl w-full h-auto object-cover"
                            />

                            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-gray-50">
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    <FaChartLine />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                                        Status
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        Application Approved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
