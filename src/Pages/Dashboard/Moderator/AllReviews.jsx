import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allReviews = [], isLoading, refetch } = useQuery({
        queryKey: ["allReviews"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const deleteReview = async(id) => {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if(res.data.deletedCount){
            refetch();
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Review deleted successfully`,
                confirmButtonColor: "#088395",
            });
        };
    };

    return (
        <div>
            <div className="mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-6">All Reviews</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {allReviews.map((review) => (
                    <div key={review._id} className="bg-white shadow-md rounded-xl p-4 space-y-3 max-w-88 mx-auto">
                        <img
                            src={review?.userImage}
                            alt="Reviewer"
                            className="w-12 h-12 mx-auto rounded-full object-cover"
                        />
                        <h3 className="text-xl font-bold">{review?.universityName}</h3>

                        <div className="flex flex-col">
                            <p className="text-gray-600">{review?.subject}</p>
                            <p className="">{review?.userName}</p>
                            <p className="text-gray-500">
                            {review.reviewDate}
                            </p>
                            <p className="text-primary font-bold">{review?.rating}⭐</p>
                            <p className="text-gray-700 italic">"{review?.comment}"</p>
                        </div>

                        <button
                        onClick={() => deleteReview(review._id)}
                        // disabled={isPending}
                        className="btn bg-red-600 text-base-100 w-full"
                        >
                        {/* {isPending ? 'Deleting...' : 'Delete'} */}Delete
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllReviews;