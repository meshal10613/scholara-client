import React from 'react';

const CustomerReviews = ({data}) => {
    return (
        <div>
            {
                data.length === 0 ?
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/7486/7486817.png"
                        alt="No Reviews"
                        className="w-28 h-28 mb-4 opacity-70"
                    />
                    <p className="text-lg">No reviews available at the moment.</p>
                    <p className="text-sm text-gray-400">Be the first to leave a review!</p>
                </div> :
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">What Our Students Say</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-4">
                            <img
                                src={review.userImage}
                                alt={review.userName}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-semibold text-lg">{review.userName}</h4>
                                <p className="text-sm text-gray-500">
                                {review.scholarshipName} <br />
                                <span className="italic">{review.universityName}</span>
                                </p>
                            </div>
                            </div>
                            <div className='text-[16px] font-semibold'>{review.rating} <span className='text-yellow-400'>★</span></div>
                            <p className="text-gray-700 italic">"{review.comment}"</p>
                        </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default CustomerReviews;
