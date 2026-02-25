import React from "react";
import {
    MapPin,
    Calendar,
    CircleDollarSign,
    ArrowRight,
    Clock,
} from "lucide-react";
import { Link } from "react-router";

const TopScholarship = ({ topS }) => {
    const checkIsExpired = (deadline) => {
        if (!deadline) return false;
        const today = new Date();
        const expiry = new Date(deadline);
        today.setHours(0, 0, 0, 0);
        return expiry < today;
    };

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Top Scholarships
                        </h2>
                        <div className="h-1.5 w-20 bg-secondary mt-2 rounded-full"></div>
                    </div>
                    <Link
                        to="/all-scholarships"
                        className="text-secondary font-semibold flex items-center gap-2 hover:underline"
                    >
                        View All <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {topS.map((scholarship) => {
                        const isExpired = checkIsExpired(
                            scholarship?.applicationDeadline,
                        );

                        return (
                            <div
                                key={scholarship._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full max-w-80 mx-auto"
                            >
                                <div className="relative p-6 bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                                    <img
                                        src={scholarship?.universityImage}
                                        alt={scholarship?.universityName}
                                        className="h-20 w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-md border border-gray-100 uppercase tracking-wider text-gray-600 shadow-sm">
                                            {scholarship?.subjectCategory ||
                                                "Academic"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-secondary transition-colors">
                                        {scholarship?.scholarshipName}
                                    </h3>

                                    <div className="flex items-center gap-1.5 text-gray-500 mb-4">
                                        <MapPin
                                            size={14}
                                            className="shrink-0"
                                        />
                                        <span className="text-xs font-medium truncate">
                                            {scholarship?.universityName},{" "}
                                            {scholarship?.universityCountry}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-grow">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar
                                                    size={16}
                                                    className={
                                                        isExpired
                                                            ? "text-red-500"
                                                            : "text-secondary"
                                                    }
                                                />
                                                <span>Deadline</span>
                                            </div>
                                            <span
                                                className={`font-semibold px-2 py-0.5 rounded text-xs border ${
                                                    isExpired
                                                        ? "bg-red-50 text-red-600 border-red-100"
                                                        : "bg-green-50 text-green-700 border-green-100"
                                                }`}
                                            >
                                                {isExpired ? "Expired: " : ""}
                                                {
                                                    scholarship?.applicationDeadline
                                                }
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <CircleDollarSign
                                                    size={16}
                                                    className="text-secondary"
                                                />
                                                <span>App Fee</span>
                                            </div>
                                            <span className="font-bold text-gray-900">
                                                ${scholarship.applicationFees}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/scholarshipDetails/${scholarship._id}`}
                                        className={`w-full py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                                            isExpired
                                                ? "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-200"
                                                : "bg-primary text-white hover:bg-secondary"
                                        }`}
                                    >
                                        {isExpired
                                            ? "View Details (Closed)"
                                            : "See Details"}
                                        <ArrowRight
                                            size={16}
                                            className="group-hover/btn:translate-x-1 transition-transform"
                                        />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopScholarship;
