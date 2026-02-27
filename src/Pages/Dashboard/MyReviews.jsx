// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../Components/Loading';
// import useAuthContext from '../../Hooks/useAuthContext';
// import { Link } from 'react-router';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// import EmptyState from '../../Components/EmptyState';

// const MyReviews = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selected, setSelected] = useState([]);
//     const { register, handleSubmit } = useForm();
//     const {user} = useAuthContext();
//     const axiosSecure = useAxiosSecure();
//     const { data: myReviews = [], isLoading, refetch } = useQuery({
//         queryKey: ["myReviews"],
//         queryFn: async() => {
//             const res = await axiosSecure.get(`/reviews/${user?.email}`);
//             return res.data;
//         }
//     });

//     if(isLoading){
//         return <Loading/>;
//     };

//     if(myReviews.length < 1){
//         return <EmptyState/>;
//     };

//     const handleEditReview = (data) => {
//         setSelected([]);
//         setSelected(data)
//         setIsOpen(true);
//     };

//     const onSubmit = async(data) => {
//         selected.rating = data.rating;
//         selected.comment = data.comment;
//         const res = await axiosSecure.patch(`/reviews/${selected._id}`, selected);
//         if(res.data.modifiedCount > 0){
//             refetch();
//             setIsOpen(false);
//             Swal.fire({
//                 icon: "success",
//                 title: "Congratulations!",
//                 text: `Review updated successfully`,
//             });
//         };
//     }

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Delete this review?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#088395",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete!",
//         })
//         .then(async(result) => {
//             if (result.isConfirmed) {
//                 try {
//                 const res = await axiosSecure.delete(`/reviews/${id}`);
//                 if(res.data.deletedCount === 1 || res.data.message === "Scholarship deleted successfully") {
//                     refetch(); // ⏬ Refetch after delete
//                     Swal.fire("Deleted!", "The review has been deleted.", "success");
//                 }else {
//                     Swal.fire("Not Found", "Scholarship not found.", "error");
//                 }
//                 }catch (error) {
//                     Swal.fire("Error", "Failed to delete scholarship.", error.message);
//                 }
//             }
//         });
//     };

//     return (
//         <div>
//             <div className="overflow-x-auto w-full mx-auto p-4">
//                 <h2 className="text-3xl font-semibold mb-6">My Reviews</h2>

//                 <table className="table w-full">
//                     <thead className="bg-secondary text-base-100">
//                     <tr>
//                         <th>#</th>
//                         <th>Scholarship Name</th>
//                         <th>University</th>
//                         <th>Comments</th>
//                         <th>Review Date</th>
//                         <th>Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {myReviews.map((review, index) => (
//                         <tr key={review._id}>
//                         <td>{index + 1}</td>
//                         <td>{review.scholarshipName}</td>
//                         <td>{review.universityName}</td>
//                         <td className="max-w-xs">{review.comment}</td>
//                         <td>{review.reviewDate}</td>
//                         <td className="space-x-2">
//                             <Link
//                             onClick={() => handleEditReview(review)}
//                             className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
//                                 <FaEdit />
//                             </Link>
//                             <button
//                             onClick={() => handleDelete(review?._id)}
//                             className="btn btn-sm btn-error text-white tooltip" data-tip="Delete">
//                                 <FaTrashAlt />
//                             </button>
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal */}
//             {isOpen && (
//                 <dialog open className="modal">
//                     <div className="modal-box max-w-xl">
//                         <h3 className="font-bold text-lg mb-4">Add Review</h3>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//                         <div>
//                             <label className="label">Rating (out of 5)</label>
//                             <input
//                             type="number"
//                             step="0.1"
//                             min="1"
//                             max="5"
//                             defaultValue={selected.rating}
//                             className="input input-bordered w-full"
//                             {...register('rating', { required: true })}
//                             />
//                         </div>

//                         {/* Comment */}
//                         <div>
//                             <label className="label">Comment</label>
//                             <textarea
//                             defaultValue={selected.comment}
//                             className="textarea textarea-bordered w-full"
//                             {...register('comment', { required: true })}
//                             ></textarea>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="modal-action justify-between items-center">
//                             <button onClick={() => setIsOpen(false)} type="button" className="btn">
//                             Cancel
//                             </button>
//                             <button type="submit" className="btn btn-secondary text-base-100">
//                             Submit Review
//                             </button>
//                         </div>
//                         </form>
//                     </div>
//                 </dialog>
//             )}
//         </div>
//     );
// };

// export default MyReviews;

import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAuthContext from "../../Hooks/useAuthContext";
import {
    FaEdit,
    FaTrashAlt,
    FaStar,
    FaUniversity,
    FaCalendarAlt,
    FaQuoteLeft,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import EmptyState from "../../Components/EmptyState";

const MyReviews = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        data: myReviews = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myReviews", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user?.email}`);
            return res.data;
        },
    });

    // Populate form when a review is selected for editing
    useEffect(() => {
        if (editingReview) {
            reset({
                rating: editingReview.rating,
                comment: editingReview.comment,
            });
        }
    }, [editingReview, reset]);

    const handleEditClick = (review) => {
        setEditingReview(review);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        setEditingReview(null);
        reset();
    };

    const onUpdateReview = async (data) => {
        try {
            const updatedData = {
                ...editingReview,
                rating: data.rating,
                comment: data.comment,
            };

            const res = await axiosSecure.patch(
                `/reviews/${editingReview._id}`,
                updatedData,
            );

            if (res.data.modifiedCount > 0) {
                refetch();
                onCloseModal();
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Your review has been updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update review", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Review removed.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete review.", "error");
                }
            }
        });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    if (isLoading) return <Loading />;
    if (myReviews.length < 1)
        return <EmptyState message="You haven't written any reviews yet." />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        My Reviews
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Manage your feedback and contributions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myReviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <FaUniversity className="text-lg" />
                                        <h3 className="font-bold text-gray-800 line-clamp-1">
                                            {review.universityName}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap bg-white px-2 py-1 rounded-full border">
                                        <FaCalendarAlt />
                                        <span>{review.reviewDate}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 font-medium line-clamp-1">
                                    {review.scholarshipName}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-grow">
                                <div className="flex items-center gap-1 mb-4">
                                    {renderStars(parseInt(review.rating))}
                                    <span className="ml-2 text-sm text-gray-400">
                                        ({review.rating}.0)
                                    </span>
                                </div>

                                <div className="relative">
                                    <FaQuoteLeft className="absolute -top-1 -left-1 text-gray-200 text-2xl z-0" />
                                    <p className="text-gray-600 text-sm relative z-10 pl-6 italic line-clamp-4">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleEditClick(review)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modern Modal using fixed overlay instead of DaisyUI dialog for better custom control */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Edit Review
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Updating review for{" "}
                                <span className="font-semibold text-blue-600">
                                    {editingReview?.universityName}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit(onUpdateReview)}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <select
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("rating", {
                                            required: true,
                                        })}
                                    >
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Comment
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full h-32 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        placeholder="Share your experience..."
                                        {...register("comment", {
                                            required: "Comment is required",
                                        })}
                                    ></textarea>
                                    {errors.comment && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.comment.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={onCloseModal}
                                        className="btn btn-ghost text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary text-white px-8"
                                    >
                                        Update Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
