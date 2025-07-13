import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const AllAppliedScholarship = () => {
    const AxiosSecure = useAxiosSecure();
    const { data: appliedScholarships = [], isLoading } = useQuery({
        queryKey: ["manage"],
        queryFn: async() => {
            const res = await AxiosSecure.get(`/appliedScholarships`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    console.log(appliedScholarships)
    return (
        <div>
            <div className="mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">All Applied Scholarships</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                    <thead className="bg-secondary text-base-100">
                        <tr>
                        <th>#</th>
                        <th>Scholarship Name</th>
                        <th>University Name</th>
                        <th>Subject Category</th>
                        <th>Degree</th>
                        <th>Application Fees</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedScholarships?.map((scholarship, index) => (
                        <tr key={scholarship?._id || index}>
                            <th>{index + 1}</th>
                            <td>{scholarship?.scholarshipName}</td>
                            <td>{scholarship?.universityName}</td>
                            <td>{scholarship?.subjectCategory}</td>
                            <td>{scholarship?.degree}</td>
                            <td>${scholarship?.applicationFees || "N/A"}</td>
                            <td className="flex gap-2">
                            <button className="btn btn-sm btn-info text-white tooltip" data-tip="Details">
                                <FaEye />
                            </button>
                            <Link to={`/dashboard/manage-scholarships/${scholarship._id}`} className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
                                <FaEdit />
                            </Link>
                            <button className="btn btn-sm btn-error text-white tooltip" data-tip="Delete">
                                <FaTrashAlt />
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

export default AllAppliedScholarship;