import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import EmptyState from "../../../Components/EmptyState";
import {
    FaQuoteLeft,
    FaRegCalendarAlt,
    FaStar,
    FaTrashAlt,
    FaUniversity,
} from "react-icons/fa";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: allReviews = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["allReviews"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (allReviews.length < 1) {
        return <EmptyState message="No reviews found yet." />;
    }

    const deleteReview = async (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", // Red color for danger
            cancelButtonColor: "#6B7280", // Gray for cancel
            confirmButtonText: "Yes, delete it!",
            background: "#fff",
            customClass: {
                popup: "rounded-2xl",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (
                        res.data.deletedCount === 1 ||
                        res.data.message === "Scholarship deleted successfully"
                    ) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The review has been removed.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire(
                            "Error",
                            "Could not find the review.",
                            "error",
                        );
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete review.", "error");
                }
            }
        });
    };

    // Helper to render stars
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            All Reviews
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Manage user feedback and university ratings
                        </p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span className="font-semibold text-gray-700">
                            Total Reviews:{" "}
                        </span>
                        <span className="text-blue-600 font-bold">
                            {allReviews.length}
                        </span>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {allReviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden group"
                        >
                            {/* Card Body */}
                            <div className="p-6 flex-grow flex flex-col">
                                {/* User Profile Header */}
                                <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-4">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-gray-100">
                                            <img
                                                src={
                                                    review?.userImage ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                alt="Reviewer"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm">
                                            {review?.userName}
                                        </h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                            <FaRegCalendarAlt className="w-3 h-3" />
                                            <span>{review?.reviewDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* University Info */}
                                <div className="mb-4">
                                    <div className="flex items-start gap-2 text-gray-800">
                                        <FaUniversity className="mt-1 text-blue-500 flex-shrink-0" />
                                        <h3 className="text-lg font-bold leading-tight line-clamp-2">
                                            {review?.universityName}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-blue-600 font-medium ml-6 mt-1">
                                        {review?.subject}
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-4 ml-6">
                                    {renderStars(parseInt(review?.rating))}
                                    <span className="text-gray-400 text-sm ml-2">
                                        ({review?.rating})
                                    </span>
                                </div>

                                {/* Comment Bubble */}
                                <div className="bg-gray-50 rounded-xl p-4 relative mt-auto">
                                    <FaQuoteLeft className="text-gray-300 text-xl absolute -top-2 left-4 bg-gray-50 px-1" />
                                    <p className="text-gray-600 italic text-sm leading-relaxed relative z-10">
                                        "{review?.comment}"
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer / Action */}
                            <div className="bg-gray-50 p-4 border-t border-gray-100">
                                <button
                                    onClick={() => deleteReview(review._id)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors duration-200 font-medium group-hover:shadow-md cursor-pointer"
                                >
                                    <FaTrashAlt className="text-sm" />
                                    <span>Delete Review</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllReviews;
