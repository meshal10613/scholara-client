// import React from "react";
// import { FaStar, FaQuoteLeft, FaRegCalendarAlt } from "react-icons/fa";

// const CustomerReviews = ({ data }) => {
//     // Helper to render stars based on rating number
//     const renderStars = (rating) => {
//         return [...Array(5)].map((_, index) => (
//             <FaStar
//                 key={index}
//                 className={
//                     index < Math.floor(rating)
//                         ? "text-yellow-400"
//                         : "text-gray-200"
//                 }
//             />
//         ));
//     };

//     return (
//         <section className="py-12 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
//                     <div>
//                         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                             Student Stories
//                         </h2>
//                         <p className="text-gray-500 mt-1">
//                             Real experiences from our scholarship recipients
//                         </p>
//                     </div>
//                     {data.length > 0 && (
//                         <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
//                             <span className="text-primary font-bold">
//                                 {data.length} Total Reviews
//                             </span>
//                         </div>
//                     )}
//                 </div>

//                 {data.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-16 text-center">
//                         <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
//                             <FaQuoteLeft className="text-gray-200 text-3xl" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                             No reviews yet
//                         </h3>
//                         <p className="text-gray-500 max-w-sm">
//                             Be the first student to share your experience with
//                             this scholarship and help others!
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         {data.map((review) => (
//                             <div
//                                 key={review._id}
//                                 className="group relative bg-gray-50 hover:bg-white p-8 rounded-3xl border border-transparent hover:border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 w-80 mx-auto"
//                             >
//                                 {/* Quote Icon Decoration */}
//                                 <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
//                                     <FaQuoteLeft size={30} />
//                                 </div>

//                                 {/* User Header */}
//                                 <div className="flex items-center gap-4 mb-6">
//                                     <div className="relative">
//                                         <img
//                                             src={review.userImage}
//                                             alt={review.userName}
//                                             className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-sm"
//                                         />
//                                         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-gray-900 leading-tight">
//                                             {review.userName}
//                                         </h4>
//                                         <p className="text-xs text-primary font-medium mt-0.5">
//                                             Verified Scholar
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-1 mb-4">
//                                     <div className="flex text-sm mr-2">
//                                         {renderStars(review.rating)}
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-900">
//                                         {review.rating}
//                                     </span>
//                                 </div>

//                                 <p className="text-gray-600 leading-relaxed italic mb-6">
//                                     "{review.comment}"
//                                 </p>

//                                 <div className="pt-6 border-t border-gray-200/60 mt-auto">
//                                     <p className="text-sm text-gray-700 font-semibold truncate">
//                                         {review.scholarshipName}
//                                     </p>
//                                     <p className="text-xs text-gray-500">
//                                         {review.universityName}
//                                     </p>

//                                     {/* Optional Date (if available in your DB) */}
//                                     {review.reviewDate && (
//                                         <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400 font-medium">
//                                             <FaRegCalendarAlt />
//                                             {new Date(
//                                                 review.reviewDate,
//                                             ).toLocaleDateString()}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default CustomerReviews;

import React from "react";
import { FaStar, FaQuoteLeft, FaRegCalendarAlt } from "react-icons/fa";

const CustomerReviews = ({ data }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={
                    index < Math.floor(rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                }
            />
        ));
    };

    return (
        <section className="py-12 bg-white mt-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Student Stories
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Real experiences from our scholarship recipients
                        </p>
                    </div>
                    {data.length > 0 && (
                        <div className="px-4 py-2 rounded-xl border border-primary/10">
                            <span className="text-primary font-bold">
                                {data.length} Total Reviews
                            </span>
                        </div>
                    )}
                </div>

                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <FaQuoteLeft className="text-gray-200 text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No reviews yet
                        </h3>
                        <p className="text-gray-500 max-w-sm">
                            Be the first student to share your experience!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {data.map((review) => (
                            <div
                                key={review._id}
                                className="group flex flex-col relative bg-gray-50 hover:bg-white p-8 rounded-3xl border border-transparent hover:border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 h-full w-80 mx-auto"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                                    <FaQuoteLeft size={30} />
                                </div>

                                {/* User Header (Fixed) */}
                                <div className="flex items-center gap-4 mb-6 shrink-0">
                                    <div className="relative">
                                        <img
                                            src={review.userImage}
                                            alt={review.userName}
                                            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight">
                                            {review.userName}
                                        </h4>
                                        <p className="text-xs text-primary font-medium mt-0.5">
                                            Verified Scholar
                                        </p>
                                    </div>
                                </div>

                                {/* Rating (Fixed) */}
                                <div className="flex items-center gap-1 mb-4 shrink-0">
                                    <div className="flex text-sm mr-2">
                                        {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                        {review.rating}
                                    </span>
                                </div>

                                {/* Scrollable Comment Section (Flexible) */}
                                <div className="flex-grow overflow-y-auto mb-6 pr-2 max-h-40 custom-scrollbar">
                                    <p className="text-gray-600 leading-relaxed italic">
                                        "{review.comment}"
                                    </p>
                                </div>

                                {/* Footer (Fixed & Pushed to bottom) */}
                                <div className="pt-6 border-t border-gray-200/60 mt-auto shrink-0">
                                    <p className="text-sm text-gray-700 font-semibold truncate">
                                        {review.scholarshipName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {review.universityName}
                                    </p>

                                    {review.reviewDate && (
                                        <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400 font-medium">
                                            <FaRegCalendarAlt />
                                            {new Date(
                                                review.reviewDate,
                                            ).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Injected CSS for the custom scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: #3b82f6; /* Changes to primary color on hover */
                }
            `}</style>
        </section>
    );
};

export default CustomerReviews;
