import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAuthContext from '../../Hooks/useAuthContext';
import { Link } from 'react-router';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import EmptyState from '../../Components/EmptyState';

const MyReviews = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const { register, handleSubmit } = useForm();
    const {user} = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const { data: myReviews = [], isLoading, refetch } = useQuery({
        queryKey: ["myReviews"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews/${user?.email}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    if(myReviews.length < 1){
        return <EmptyState/>;
    };

    const handleEditReview = (data) => {
        setSelected(data)
        setIsOpen(true);
    };

    const onSubmit = async(data) => {
        selected.rating = data.rating;
        selected.comment = data.comment;
        const res = await axiosSecure.put(`/reviews/${selected._id}`, selected);
        if(res.data.modifiedCount > 0){
            refetch();
            setIsOpen(false);
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Review updated successfully`,
            });
        };
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#088395",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!",
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                try {
                const res = await axiosSecure.delete(`http://localhost:3000/reviews/${id}`);
                if(res.data.deletedCount === 1 || res.data.message === "Scholarship deleted successfully") {
                    refetch(); // ⏬ Refetch after delete
                    Swal.fire("Deleted!", "The review has been deleted.", "success");
                }else {
                    Swal.fire("Not Found", "Scholarship not found.", "error");
                }
                }catch (error) {
                    Swal.fire("Error", "Failed to delete scholarship.", error.message);
                }
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto w-full mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-6">My Reviews</h2>

                <table className="table w-full">
                    <thead className="bg-secondary text-base-100">
                    <tr>
                        <th>#</th>
                        <th>Scholarship Name</th>
                        <th>University</th>
                        <th>Comments</th>
                        <th>Review Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myReviews.map((review, index) => (
                        <tr key={review._id}>
                        <td>{index + 1}</td>
                        <td>{review.scholarshipName}</td>
                        <td>{review.universityName}</td>
                        <td className="max-w-xs">{review.comment}</td>
                        <td>{review.reviewDate}</td>
                        <td className="space-x-2">
                            <Link
                            onClick={() => handleEditReview(review)}
                            className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
                                <FaEdit />
                            </Link>
                            <button 
                            onClick={() => handleDelete(review?._id)} 
                            className="btn btn-sm btn-error text-white tooltip" data-tip="Delete">
                                <FaTrashAlt />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isOpen && (
                <dialog open className="modal">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-lg mb-4">Add Review</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        <div>
                            <label className="label">Rating (out of 5)</label>
                            <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            defaultValue={selected.rating}
                            className="input input-bordered w-full"
                            {...register('rating', { required: true })}
                            />
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="label">Comment</label>
                            <textarea
                            defaultValue={selected.comment}
                            className="textarea textarea-bordered w-full"
                            {...register('comment', { required: true })}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="modal-action justify-between items-center">
                            <button onClick={() => setIsOpen(false)} type="button" className="btn">
                            Cancel
                            </button>
                            <button type="submit" className="btn btn-secondary text-base-100">
                            Submit Review
                            </button>
                        </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyReviews;