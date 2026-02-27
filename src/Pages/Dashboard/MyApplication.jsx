// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../Components/Loading';
// import useAuthContext from '../../Hooks/useAuthContext';
// import { FaEdit, FaEye } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router';
// import { MdCancel, MdFeedback } from 'react-icons/md';
// import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// import EmptyState from '../../Components/EmptyState';

// const MyApplication = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selected, setSelected] = useState([]);
//     const {user} = useAuthContext();
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const axiosSecure = useAxiosSecure();
//     const { data: myApplication = [], isLoading, refetch } = useQuery({
//         queryKey: ["myApplication"],
//         queryFn: async() => {
//             const res = await axiosSecure.get(`/appliedScholarships?email=${user?.email}`);
//             return res.data;
//         }
//     });

//     if(isLoading){
//         return <Loading/>;
//     };

//     if(myApplication.length < 1){
//         return <EmptyState/>;
//     };

//     const handleEditApplication = (data) => {
//         if(data.applicationStatus !== "pending"){
//             Swal.fire({
//                 icon: "error",
//                 title: "Sorry!",
//                 text: `Can not edit the application`,
//             });
//         }else{
//             navigate(`/dashboard/my-application/${data?._id}`);
//         };
//     };

//     const handleReview = (data) => {
//         setSelected(data)
//         setIsOpen(true);
//     };

//     const onSubmit = async(data) => {
//         const serverData = {
//             ...data,
//             reviewDate: new Date().toLocaleDateString(),
//             subject: selected?.subject,
//             scholarshipName: selected?.scholarshipName,
//             universityName: selected?.universityName,
//             scholarshipId: selected?.scholarshipId,
//             userEmail: user?.email,
//             userName: user?.displayName,
//             userImage: user?.photoURL,
//         };
//         const userRes = await axiosSecure.post("/reviews", serverData);
//         if(userRes.data.insertedId || userRes.data.modifiedCount){
//             setIsOpen(false);
//             Swal.fire({
//                 icon: "success",
//                 title: "Congratulations!",
//                 text: `Review ${userRes.data.insertedId ? "added" : "updated"} successfully`,
//             });
//         };
//     };

//     const openDetails = (scholarship) => {
//         setSelected(scholarship);
//         document.getElementById("scholarshipModal").showModal();
//     };

//     const closeDetails = () => setSelected(null);

//     const handleCancelApplication = async(id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Cancel this application?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#088395",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, cancel!",
//         })
//         .then(async(result) => {
//             if (result.isConfirmed) {
//                 try {
//                 const userRes = await axiosSecure.delete(`/appliedScholarships/${id}`);
//                 if(userRes.data.deletedCount === 1 || userRes.data.message === "Scholarship deleted successfully") {
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
//             <div className="mx-auto p-4">
//                 <h1 className="text-3xl font-bold mb-6">My Application</h1>

//                 <div className="overflow-x-auto">
//                     <table className="table w-full">
//                     <thead className="bg-secondary text-base-100">
//                         <tr>
//                         <th>#</th>
//                         <th>University Name</th>
//                         <th>University Address</th>
//                         <th>Application Feedback</th>
//                         <th>Subject Category</th>
//                         <th>Degree</th>
//                         <th>Application Fees</th>
//                         <th>Service Charge</th>
//                         <th>Application Status</th>
//                         <th>Actions</th>
//                         <th>Add Review</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {myApplication?.map((scholarship, index) => (
//                         <tr key={scholarship?._id || index}>
//                             <th>{index + 1}</th>
//                             <td>{scholarship?.universityName}</td>
//                             <td>{scholarship?.universityCity}, {scholarship?.universityCountry}</td>
//                             <td>{scholarship?.feedback ? scholarship?.feedback : "N/A"}</td>
//                             <td>{scholarship?.subject}</td>
//                             <td>{scholarship?.applyingDegree}</td>
//                             <td>${scholarship?.applicationFees || "N/A"}</td>
//                             <td>${scholarship?.serviceCharge || "N/A"}</td>
//                             <td>{scholarship?.applicationStatus || "N/A"}</td>
//                             <td className="flex gap-2">
//                             <button onClick={() => openDetails(scholarship)} className="btn btn-sm btn-info text-white tooltip" data-tip="Details">
//                                 <FaEye />
//                             </button>
//                             <Link onClick={() => handleEditApplication(scholarship)} className="btn btn-sm btn-warning text-white tooltip" data-tip="Edit">
//                                 <FaEdit />
//                             </Link>
//                             <button onClick={() => handleCancelApplication(scholarship._id)} className="btn btn-sm btn-error text-white tooltip" data-tip="Cancel">
//                                 <MdCancel />
//                             </button>
//                             </td>
//                             <td className=''>
//                                 <button onClick={() => handleReview(scholarship)} className='btn btn-sm btn-secondary text-white tooltip' data-tip="Review">
//                                     <MdFeedback/>
//                                 </button>
//                             </td>
//                         </tr>
//                         ))}
//                     </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* ---------- DaisyUI Modal ---------- */}
//             <dialog id="scholarshipModal" className="modal">
//                 <form method="dialog" className="modal-box max-w-2xl">
//                 <button
//                     onClick={closeDetails}
//                     className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                 >
//                     ✕
//                 </button>

//                 {selected && (
//                 <div className="space-y-2">
//                     <h3 className="text-xl font-bold mb-2">{selected.scholarshipName}</h3>

//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                         <p>
//                         <span className="font-medium">University Name:</span>{" "}
//                         {selected.universityName}
//                         </p>
//                         <p>
//                         <span className="font-medium">Applicant Phone Number:</span> {selected.applicantPhoneNumber}
//                         </p>
//                         <p>
//                         <span className="font-medium">Scholarship:</span> {selected.scholarshipCategory}
//                         </p>
//                         <p>
//                         <span className="font-medium">Applicant Gender:</span> {selected.applicantGender}
//                         </p>
//                         <p>
//                         <span className="font-medium">subject:</span> {selected.subject}
//                         </p>
//                         <p>
//                         <span className="font-medium">SSC Result:</span> {selected.sscResult}
//                         </p>
//                         <p>
//                         <span className="font-medium">Applying Degree:</span> {selected.applyingDegree}
//                         </p>
//                         <p>
//                         <span className="font-medium">HSC Result:</span>{" "}
//                         {selected.hscResult}
//                         </p>
//                         <p>
//                         <span className="font-medium">Apply Date:</span>{" "}
//                         {selected.currentDate}
//                         </p>
//                         <p>
//                         <span className="font-medium">Study Gap:</span>{" "}
//                         {selected.studyGap ? `${selected.studyGap}` : "N/A"}
//                         </p>
//                         <p className="col-span-2">
//                         <span className="font-medium">Address:</span>{" "}
//                         {selected.applicantAddress}
//                         </p>
//                     </div>
//                 </div>
//                 )}
//                 </form>
//             </dialog>

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
//                             className="input input-bordered w-full"
//                             {...register('rating', { required: true })}
//                             />
//                         </div>

//                         {/* Comment */}
//                         <div>
//                             <label className="label">Comment</label>
//                             <textarea
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

// export default MyApplication;

import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAuthContext from "../../Hooks/useAuthContext";
import {
    FaEdit,
    FaEye,
    FaUniversity,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaStar,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { MdCancel, MdFeedback } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import EmptyState from "../../Components/EmptyState";

const MyApplication = () => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const {
        data: myApplication = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myApplication", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/appliedScholarships?email=${user?.email}`,
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (myApplication.length < 1)
        return (
            <EmptyState message="You haven't applied to any scholarships yet." />
        );

    // --- Handlers ---

    const handleEditApplication = (app) => {
        if (app.applicationStatus !== "pending") {
            Swal.fire({
                icon: "error",
                title: "Action Not Allowed",
                text: "You can only edit applications that are pending.",
            });
        } else {
            navigate(`/dashboard/my-application/${app._id}`);
        }
    };

    const handleReviewClick = (app) => {
        setSelectedApp(app);
        setIsReviewModalOpen(true);
        reset(); // Reset form for new entry
    };

    const handleDetailsClick = (app) => {
        setSelectedApp(app);
        setIsDetailsModalOpen(true);
    };

    const onSubmitReview = async (data) => {
        const serverData = {
            rating: data.rating,
            comment: data.comment,
            reviewDate: new Date().toLocaleDateString(),
            subject: selectedApp?.subject,
            scholarshipName: selectedApp?.scholarshipName,
            universityName: selectedApp?.universityName,
            scholarshipId: selectedApp?.scholarshipId,
            userEmail: user?.email,
            userName: user?.displayName,
            userImage: user?.photoURL,
        };

        try {
            const userRes = await axiosSecure.post("/reviews", serverData);
            if (userRes.data.insertedId) {
                setIsReviewModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Review Submitted",
                    text: "Thank you for your feedback!",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire("Error", "Failed to submit review", "error");
        }
    };

    const handleCancelApplication = async (id) => {
        Swal.fire({
            title: "Cancel Application?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const userRes = await axiosSecure.delete(
                        `/appliedScholarships/${id}`,
                    );
                    if (userRes.data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            "Cancelled!",
                            "Your application has been withdrawn.",
                            "success",
                        );
                    }
                } catch (error) {
                    Swal.fire(
                        "Error",
                        "Failed to cancel application.",
                        "error",
                    );
                }
            }
        });
    };

    // Helper for Status Badge Color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "processing":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Applications
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track status and manage your scholarship applications
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myApplication.map((app) => (
                        <div
                            key={app._id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex justify-between items-start mb-2">
                                    <div
                                        className={`text-xs font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${getStatusColor(app.applicationStatus)}`}
                                    >
                                        {app.applicationStatus || "Pending"}
                                    </div>
                                    <div className="text-xs text-gray-400 font-medium">
                                        Applied: {app.currentDate}
                                    </div>
                                </div>
                                <h3
                                    className="text-lg font-bold text-gray-800 line-clamp-1"
                                    title={app.universityName}
                                >
                                    {app.universityName}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <FaMapMarkerAlt className="text-gray-400" />
                                    <span className="truncate">
                                        {app.universityCity},{" "}
                                        {app.universityCountry}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-grow space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FaGraduationCap /> Degree
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {app.applyingDegree}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subject
                                    </span>
                                    <span className="font-medium text-gray-800 text-right">
                                        {app.subject}
                                    </span>
                                </div>
                                <div className="divider my-2"></div>
                                <div className="flex justify-between text-sm">
                                    <div className="text-center">
                                        <p className="text-gray-400 text-xs">
                                            App Fee
                                        </p>
                                        <p className="font-semibold text-gray-700">
                                            ${app.applicationFees || 0}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-400 text-xs">
                                            Service Charge
                                        </p>
                                        <p className="font-semibold text-gray-700">
                                            ${app.serviceCharge || 0}
                                        </p>
                                    </div>
                                </div>
                                {app.feedback && (
                                    <div className="mt-3 bg-red-50 p-3 rounded-lg text-xs text-red-600 border border-red-100">
                                        <span className="font-bold">
                                            Feedback:
                                        </span>{" "}
                                        {app.feedback}
                                    </div>
                                )}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => handleDetailsClick(app)}
                                    className="btn btn-sm btn-ghost bg-white border-gray-200 text-blue-600 hover:bg-blue-50 tooltip"
                                    data-tip="View Details"
                                >
                                    <FaEye />
                                </button>

                                <button
                                    onClick={() => handleEditApplication(app)}
                                    disabled={
                                        app.applicationStatus !== "pending"
                                    }
                                    className="btn btn-sm btn-ghost bg-white border-gray-200 text-amber-500 hover:bg-amber-50 disabled:bg-gray-100 disabled:text-gray-300 tooltip"
                                    data-tip={
                                        app.applicationStatus !== "pending"
                                            ? "Cannot edit"
                                            : "Edit Application"
                                    }
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    onClick={() => handleReviewClick(app)}
                                    className="btn btn-sm btn-ghost bg-white border-gray-200 text-purple-600 hover:bg-purple-50 tooltip"
                                    data-tip="Add Review"
                                >
                                    <MdFeedback />
                                </button>

                                <button
                                    onClick={() =>
                                        handleCancelApplication(app._id)
                                    }
                                    className="btn btn-sm btn-ghost bg-white border-gray-200 text-red-500 hover:bg-red-50 tooltip"
                                    data-tip="Cancel Application"
                                >
                                    <MdCancel />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Details Modal --- */}
            {isDetailsModalOpen && selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-secondary p-4 flex justify-between items-center text-white">
                            <h3 className="text-lg font-bold">
                                Application Details
                            </h3>
                            <button
                                onClick={() => setIsDetailsModalOpen(false)}
                                className="btn btn-sm btn-circle btn-ghost hover:bg-secondary text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                {selectedApp.scholarshipName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <DetailItem
                                    label="University"
                                    value={selectedApp.universityName}
                                />
                                <DetailItem
                                    label="Apply Date"
                                    value={selectedApp.currentDate}
                                />
                                <DetailItem
                                    label="Degree"
                                    value={selectedApp.applyingDegree}
                                />
                                <DetailItem
                                    label="Subject"
                                    value={selectedApp.subject}
                                />
                                <DetailItem
                                    label="Applicant Gender"
                                    value={selectedApp.applicantGender}
                                />
                                <DetailItem
                                    label="Phone Number"
                                    value={selectedApp.applicantPhoneNumber}
                                />
                                <DetailItem
                                    label="SSC Result"
                                    value={selectedApp.sscResult}
                                />
                                <DetailItem
                                    label="HSC Result"
                                    value={selectedApp.hscResult}
                                />
                                <DetailItem
                                    label="Study Gap"
                                    value={selectedApp.studyGap || "None"}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">
                                        Applicant Address
                                    </p>
                                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        {selectedApp.applicantAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Review Modal --- */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-purple-600 p-4 flex justify-between items-center text-white">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <MdFeedback /> Write a Review
                            </h3>
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="btn btn-sm btn-circle btn-ghost hover:bg-purple-700 text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-4">
                                Sharing experience for{" "}
                                <span className="font-semibold text-purple-600">
                                    {selectedApp?.universityName}
                                </span>
                            </p>
                            <form
                                onSubmit={handleSubmit(onSubmitReview)}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rating
                                    </label>
                                    <div className="relative">
                                        <FaStar className="absolute left-3 top-3 text-yellow-400" />
                                        <select
                                            className="select select-bordered w-full pl-10 focus:ring-purple-500 focus:border-purple-500"
                                            {...register("rating", {
                                                required: true,
                                            })}
                                        >
                                            <option value="5">
                                                5 - Excellent
                                            </option>
                                            <option value="4">
                                                4 - Very Good
                                            </option>
                                            <option value="3">3 - Good</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="1">1 - Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Comment
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full h-24 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Tell us about your application experience..."
                                        {...register("comment", {
                                            required: true,
                                        })}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsReviewModalOpen(false)
                                        }
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        Submit Review
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

// Simple helper component for the Details Modal
const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-xs uppercase font-bold mb-0.5">
            {label}
        </p>
        <p className="text-gray-800 font-medium">{value || "N/A"}</p>
    </div>
);

export default MyApplication;
