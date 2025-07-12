import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const ManageScholarships = () => {
    const [selected, setSelected] = useState(null);
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

    const openDetails = (scholarship) => {
        setSelected(scholarship);
        document.getElementById("scholarshipModal").showModal();
    };

    const closeDetails = () => setSelected(null);

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
                            <button onClick={() => openDetails(scholarship)} className="btn btn-sm btn-info text-white tooltip" data-tip="Details">
                                <FaEye />
                            </button>
                            <Link to={`/dashboard/manage-scholarships/${scholarship._id}`} className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
                                <FaEdit />
                            </Link>
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

             {/* ---------- DaisyUI Modal ---------- */}
            <dialog id="scholarshipModal" className="modal">
                <form method="dialog" className="modal-box max-w-2xl">
                <button
                    onClick={closeDetails}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>

                {selected && (
                    <div className="space-y-2">
                    <h3 className="text-xl font-bold mb-2">{selected.scholarshipName}</h3>

                    {selected.universityImage && (
                        <img
                        src={selected.universityImage}
                        alt={selected.universityName}
                        className="mt-4 w-full rounded shadow"
                        />
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p>
                        <span className="font-medium">University:</span> {selected.universityName}
                        </p>
                        <p>
                        <span className="font-medium">Country:</span> {selected.universityCountry}
                        </p>
                        <p>
                        <span className="font-medium">City:</span> {selected.universityCity}
                        </p>
                        <p>
                        <span className="font-medium">World Rank:</span> {selected.universityRank}
                        </p>
                        <p>
                        <span className="font-medium">Subject Category:</span> {selected.subjectCategory}
                        </p>
                        <p>
                        <span className="font-medium">Degree:</span> {selected.degree}
                        </p>
                        <p>
                        <span className="font-medium">Scholarship Category:</span>{" "}
                        {selected.scholarshipCategory}
                        </p>
                        <p>
                        <span className="font-medium">Tuition Fee:</span>{" "}
                        {selected.tuitionFees ? `$${selected.tuitionFees}` : "N/A"}
                        </p>
                        <p>
                        <span className="font-medium">Application Fees:</span>{" "}
                        {selected.applicationFees ? `$${selected.applicationFees}` : "N/A"}
                        </p>
                        <p>
                        <span className="font-medium">Stipend:</span>{" "}
                        {selected.stipend ? `$${selected.stipend}` : "N/A"}
                        </p>
                        <p className="col-span-2">
                        <span className="font-medium">Application Deadline:</span>{" "}
                        {selected.applicationDeadline}
                        </p>
                    </div>
                    </div>
                )}
                </form>
            </dialog>
        </div>
    );
};

export default ManageScholarships;