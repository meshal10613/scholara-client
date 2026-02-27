import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Eye,
    MessageSquare,
    XCircle,
    Filter,
    ChevronRight,
    GraduationCap,
    Phone,
    Calendar,
    ClipboardList,
    User,
    MapPin,
    X,
} from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import EmptyState from "../../../Components/EmptyState";

const AllAppliedScholarship = () => {
    const [selected, setSelected] = useState(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [targetApplication, setTargetApplication] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [filterRole, setFilterRole] = useState("");

    const axiosSecure = useAxiosSecure();

    const {
        data: applications = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["all-applied", filterRole],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/appliedScholarships?role=${filterRole}`,
            );
            return res.data;
        },
    });

    if (applications.length < 1 && !filterRole) return <EmptyState />;

    const handleFeedbackClick = (app) => {
        setTargetApplication(app);
        setFeedback(app.feedback || "");
        setIsFeedbackOpen(true);
    };

    const submitFeedback = async () => {
        if (!feedback) return;
        try {
            const res = await axiosSecure.put(
                `/appliedScholarships/${targetApplication._id}`,
                { ...targetApplication, feedback },
            );
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Feedback Saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsFeedbackOpen(false);
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Could not update feedback", err.message);
        }
    };

    const handleCancel = (id) => {
        Swal.fire({
            title: "Reject Application?",
            text: "This will change the status to rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, Reject",
            borderRadius: "15px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/appliedScholarships/${id}`,
                );
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        "Updated",
                        "Application status updated.",
                        "success",
                    );
                    refetch();
                }
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-orange-100 text-orange-600 border-orange-200";
            case "processing":
                return "bg-blue-100 text-blue-600 border-blue-200";
            case "completed":
                return "bg-green-100 text-green-600 border-green-200";
            case "rejected":
                return "bg-red-100 text-red-600 border-red-200";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* --- HEADER & FILTER --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                        <ClipboardList size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Applied Scholarships
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Total: {applications.length} applications
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter size={18} className="text-gray-400" />
                    <select
                        className="select select-bordered select-sm rounded-xl w-full sm:w-48 bg-gray-50"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="currentDate">Applied Date</option>
                        <option value="applicationDeadline">
                            Scholarship Deadline
                        </option>
                    </select>
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {/* --- DESKTOP TABLE --- */}
                    <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="table w-full border-collapse">
                            <thead className="bg-gray-50/50">
                                <tr className="text-gray-500 border-b border-gray-100">
                                    <th className="py-5 pl-8 font-semibold">
                                        University & Scholarship
                                    </th>
                                    <th className="font-semibold">Subject</th>
                                    <th className="font-semibold">
                                        Applicant Contact
                                    </th>
                                    <th className="font-semibold">Status</th>
                                    <th className="text-right pr-8 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {applications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="py-5 pl-8">
                                            <div className="font-bold text-gray-800">
                                                {app.universityName}
                                            </div>
                                            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                                {app.scholarshipCategory}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-sm text-gray-600 font-medium px-2 py-1 bg-gray-100 rounded-lg">
                                                {app.subject}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Phone
                                                    size={14}
                                                    className="text-gray-400"
                                                />{" "}
                                                {app.applicantPhoneNumber}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(app.applicationStatus)}`}
                                            >
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                        <td className="text-right pr-8">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelected(app);
                                                        document
                                                            .getElementById(
                                                                "details_modal",
                                                            )
                                                            .showModal();
                                                    }}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                                    title="View Details"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleFeedbackClick(app)
                                                    }
                                                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                                                    title="Feedback"
                                                >
                                                    <MessageSquare size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleCancel(app._id)
                                                    }
                                                    disabled={
                                                        app.applicationStatus ===
                                                        "rejected"
                                                    }
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-30 cursor-pointer"
                                                    title="Cancel/Reject"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- MOBILE CARDS --- */}
                    <div className="lg:hidden grid grid-cols-1 gap-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="max-w-[70%]">
                                        <h3 className="font-bold text-gray-800 leading-tight">
                                            {app.universityName}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                                            {app.scholarshipCategory}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${getStatusColor(app.applicationStatus)}`}
                                    >
                                        {app.applicationStatus}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 py-3 border-y border-dashed border-gray-100">
                                    <div className="text-[11px]">
                                        <span className="text-gray-400 block uppercase font-bold">
                                            Subject
                                        </span>{" "}
                                        {app.subject}
                                    </div>
                                    <div className="text-[11px]">
                                        <span className="text-gray-400 block uppercase font-bold">
                                            Contact
                                        </span>{" "}
                                        {app.applicantPhoneNumber}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelected(app);
                                            document
                                                .getElementById("details_modal")
                                                .showModal();
                                        }}
                                        className="flex-1 btn btn-sm bg-blue-50 text-blue-600 border-none rounded-xl"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleFeedbackClick(app)}
                                        className="flex-1 btn btn-sm bg-amber-50 text-amber-600 border-none rounded-xl"
                                    >
                                        Feedback
                                    </button>
                                    <button
                                        onClick={() => handleCancel(app._id)}
                                        disabled={
                                            app.applicationStatus === "rejected"
                                        }
                                        className="btn btn-sm bg-red-50 text-red-600 border-none rounded-xl"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- FEEDBACK MODAL --- */}
            {isFeedbackOpen && (
                <div className="modal modal-open">
                    <div className="modal-box rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <MessageSquare className="text-amber-500" />{" "}
                            Application Feedback
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 italic">
                            Providing feedback helps students improve their
                            future applications.
                        </p>
                        <textarea
                            rows="4"
                            className="textarea textarea-bordered w-full rounded-2xl bg-gray-50 focus:border-secondary"
                            placeholder="Type your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <div className="modal-action gap-3">
                            <button
                                onClick={() => setIsFeedbackOpen(false)}
                                className="btn btn-ghost rounded-xl px-6"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitFeedback}
                                className="btn bg-secondary border-none text-white rounded-xl px-8 hover:bg-secondary/90"
                            >
                                Save Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DETAILS MODAL --- */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <button
                        onClick={() =>
                            document.getElementById("details_modal").close()
                        }
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-20 bg-white/50"
                    >
                        <X size={18} />
                    </button>

                    {selected && (
                        <div>
                            <div className="bg-gradient-to-r from-secondary to-indigo-600 p-8 text-white relative">
                                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                    <img
                                        src={selected.applicantPhotoURL}
                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
                                        alt="Applicant"
                                    />
                                    <div className="text-center md:text-left">
                                        <h2 className="text-2xl font-bold">
                                            {selected.universityName}
                                        </h2>
                                        <p className="text-white/80 font-medium italic">
                                            {selected.scholarshipCategory}
                                        </p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                                            <span className="px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold uppercase">
                                                {selected.applyingDegree}
                                            </span>
                                            <span className="px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold uppercase">
                                                SSC: {selected.sscResult}
                                            </span>
                                            <span className="px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold uppercase">
                                                HSC: {selected.hscResult}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                                <DetailBox
                                    icon={<User size={16} />}
                                    label="Applicant Gender"
                                    value={selected.applicantGender}
                                />
                                <DetailBox
                                    icon={<Phone size={16} />}
                                    label="Contact Number"
                                    value={selected.applicantPhoneNumber}
                                />
                                <DetailBox
                                    icon={<Calendar size={16} />}
                                    label="Application Date"
                                    value={selected.currentDate}
                                />
                                <DetailBox
                                    icon={<GraduationCap size={16} />}
                                    label="Study Gap"
                                    value={selected.studyGap || "No Gap"}
                                />
                                <div className="md:col-span-2">
                                    <DetailBox
                                        icon={<MapPin size={16} />}
                                        label="Residential Address"
                                        value={selected.applicantAddress}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

const DetailBox = ({ icon, label, value }) => (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="p-2 bg-white rounded-lg shadow-sm text-secondary">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-700">{value}</p>
        </div>
    </div>
);

export default AllAppliedScholarship;
