import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAuthContext from '../../Hooks/useAuthContext';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { MdCancel, MdFeedback } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyApplication = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();
    const { data: myApplication = [], isLoading } = useQuery({
        queryKey: ["myApplication"],
        queryFn: async() => {
            const res = await AxiosSecure.get(`/appliedScholarships?email=${user?.email}`);
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
                                <button className='btn btn-sm btn-secondary text-white tooltip' data-tip="Review">
                                    <MdFeedback/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyApplication;