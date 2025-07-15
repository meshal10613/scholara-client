import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAuthContext from '../../Hooks/useAuthContext';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { MdCancel, MdFeedback } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MyApplication = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const { data: myApplication = [], isLoading } = useQuery({
        queryKey: ["myApplication"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/appliedScholarships?email=${user?.email}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const handleEditApplication = (data) => {
        if(data.applicationStatus !== "pending"){
            Swal.fire({
                icon: "error",
                title: "Sorry!",
                text: `Can not edit the application`,
            });
        }else{
            navigate(`/dashboard/my-application/${data?._id}`);
        };
    };

    const handleReview = (data) => {
        setSelected(data)
        setIsOpen(true);
    };

    const onSubmit = async(data) => {
        const serverData = {
            ...data,
            reviewDate: new Date().toLocaleDateString(),
            subject: selected?.subject,
            scholarshipName: selected?.scholarshipName,
            universityName: selected?.universityName,
            scholarshipId: selected?.scholarshipId,
            userEmail: user?.email,
            userName: user?.displayName,
            userImage: user?.photoURL,
        };
        const userRes = await axiosSecure.post("/reviews", serverData);
        if(userRes.data.insertedId || userRes.data.modifiedCount){
            setIsOpen(false);
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Review ${userRes.data.insertedId ? "added" : "updated"} successfully`,
            });
        };
    };

    return (
        <div>
            <div className="mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">My Application</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                    <thead className="bg-secondary text-base-100">
                        <tr>
                        <th>#</th>
                        <th>University Name</th>
                        <th>University Address</th>
                        <th>Application Feedback</th>
                        <th>Subject Category</th>
                        <th>Degree</th>
                        <th>Application Fees</th>
                        <th>Service Charge</th>
                        <th>Application Status</th>
                        <th>Actions</th>
                        <th>Add Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myApplication?.map((scholarship, index) => (
                        <tr key={scholarship?._id || index}>
                            <th>{index + 1}</th>
                            <td>{scholarship?.universityName}</td>
                            <td>{scholarship?.universityCity}, {scholarship?.universityCountry}</td>
                            <td>{scholarship?.feedback ? scholarship?.feedback : "N/A"}</td>
                            <td>{scholarship?.subject}</td>
                            <td>{scholarship?.applyingDegree}</td>
                            <td>${scholarship?.applicationFees || "N/A"}</td>
                            <td>${scholarship?.serviceCharge || "N/A"}</td>
                            <td>{scholarship?.applicationStatus || "N/A"}</td>
                            <td className="flex gap-2">
                            <button className="btn btn-sm btn-info text-white tooltip" data-tip="Details">
                                <FaEye />
                            </button>
                            <Link onClick={() => handleEditApplication(scholarship)} className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
                                <FaEdit />
                            </Link>
                            <button className="btn btn-sm btn-error text-white tooltip" data-tip="Cancel">
                                <MdCancel />
                            </button>
                            </td>
                            <td className=''>
                                <button onClick={() => handleReview(scholarship)} className='btn btn-sm btn-secondary text-white tooltip' data-tip="Review">
                                    <MdFeedback/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
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
                            className="input input-bordered w-full"
                            {...register('rating', { required: true })}
                            />
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="label">Comment</label>
                            <textarea
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

export default MyApplication;