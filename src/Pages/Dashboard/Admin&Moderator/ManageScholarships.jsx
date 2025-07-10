import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageScholarships = () => {
    const axiosInstance = useAxiosSecure();
    const { data: manage = [], isLoading, refetch } = useQuery({
        queryKey: ["manage"],
        queryFn: async() => {
            const res = await axiosInstance.get(`/scholarships`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this scholarship?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#088395",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                try {
                const res = await axiosInstance.delete(`http://localhost:3000/scholarships/${id}`);
                if (res.data.deletedCount === 1 || res.data.message === "Scholarship deleted successfully") {
                    Swal.fire("Deleted!", "The scholarship has been deleted.", "success");
                    refetch(); // ⏬ Refetch after delete
                } else {
                    Swal.fire("Not Found", "Scholarship not found.", "error");
                }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete scholarship.", error.message);
                }
            }
        });
    };

    return (
        <div>
            <div className="mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Manage Scholarships</h1>

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
                        {manage?.map((scholarship, index) => (
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
                            <button className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(scholarship?._id)} className="btn btn-sm btn-error text-white tooltip" data-tip="Delete">
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

export default ManageScholarships;