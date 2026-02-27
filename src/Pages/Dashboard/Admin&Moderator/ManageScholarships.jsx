import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Search,
    Plus,
    Eye,
    Edit3,
    Trash2,
    Globe,
    MapPin,
    GraduationCap,
    DollarSign,
    Calendar,
    Trophy,
    BookOpen,
    X,
} from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const ManageScholarships = () => {
    const [selected, setSelected] = useState(null);
    const axiosSecure = useAxiosSecure();

    const {
        data: scholarships = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["manage-scholarships"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Scholarship?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
            borderRadius: "15px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/scholarships/${id}`);
                    if (res.data.deletedCount > 0 || res.data.message) {
                        Swal.fire(
                            "Deleted!",
                            "Scholarship removed successfully.",
                            "success",
                        );
                        refetch();
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete.", error.message);
                }
            }
        });
    };

    const openDetails = (scholarship) => {
        setSelected(scholarship);
        document.getElementById("scholarshipModal").showModal();
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Manage Scholarships
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Review, update, or remove scholarship listings.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-primary/5 px-5 py-3 rounded-2xl border border-primary/10">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Total Listings
                        </p>
                        <p className="text-2xl font-black text-primary leading-none">
                            {scholarships.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- DESKTOP VIEW (TABLE) --- */}
            <div className="hidden lg:block overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm">
                <table className="table w-full border-collapse">
                    <thead className="bg-gray-50/50">
                        <tr className="text-gray-600 border-b border-gray-100">
                            <th className="py-5 pl-8">
                                Scholarship & University
                            </th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>App Fee</th>
                            <th className="text-right pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {scholarships.map((s) => (
                            <tr
                                key={s._id}
                                className="hover:bg-blue-50/30 transition-colors group"
                            >
                                <td className="py-4 pl-8">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                                            {s.scholarshipName}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1 italic">
                                            <Globe className="w-3 h-3" />{" "}
                                            {s.universityName}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                        {s.subjectCategory}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge border-none font-bold text-[10px] uppercase tracking-wider ${
                                            s.degree === "Masters"
                                                ? "bg-purple-100 text-purple-600"
                                                : s.degree === "PhD"
                                                  ? "bg-orange-100 text-orange-600"
                                                  : "bg-blue-100 text-blue-600"
                                        }`}
                                    >
                                        {s.degree}
                                    </span>
                                </td>
                                <td className="font-bold text-gray-700">
                                    ${s.applicationFees}
                                </td>
                                <td className="text-right pr-8">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openDetails(s)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                            title="View"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <Link
                                            to={`/dashboard/manage-scholarships/${s._id}`}
                                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit3 className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarships.map((s) => (
                    <div
                        key={s._id}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-800 leading-tight">
                                    {s.scholarshipName}
                                </h3>
                                <p className="text-xs text-gray-400 italic mt-1">
                                    {s.universityName}
                                </p>
                            </div>
                            <span className="text-lg font-bold text-primary">
                                ${s.applicationFees}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold uppercase">
                                {s.degree}
                            </span>
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">
                                {s.subjectCategory}
                            </span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-50">
                            <button
                                onClick={() => openDetails(s)}
                                className="flex-1 btn btn-sm bg-blue-50 text-blue-600 border-none hover:bg-blue-100 cursor-pointer"
                            >
                                <Eye size={16} />
                            </button>
                            <Link
                                to={`/dashboard/manage-scholarships/${s._id}`}
                                className="flex-1 btn btn-sm bg-amber-50 text-amber-600 border-none hover:bg-amber-100"
                            >
                                <Edit3 size={16} />
                            </Link>
                            <button
                                onClick={() => handleDelete(s._id)}
                                className="flex-1 btn btn-sm bg-red-50 text-red-600 border-none hover:bg-red-100 cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DETAIL MODAL --- */}
            <dialog
                id="scholarshipModal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box max-w-3xl p-0 overflow-hidden rounded-3xl">
                    <button
                        onClick={() =>
                            document.getElementById("scholarshipModal").close()
                        }
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 bg-white/50 backdrop-blur-md"
                    >
                        <X size={18} />
                    </button>

                    {selected && (
                        <div>
                            {/* Modal Header/Image */}
                            <div className="relative h-48 w-full">
                                <img
                                    src={selected.universityImage}
                                    alt={selected.universityName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <h2 className="text-2xl font-bold">
                                            {selected.scholarshipName}
                                        </h2>
                                        <p className="flex items-center gap-2 text-white/80">
                                            <MapPin size={14} />{" "}
                                            {selected.universityName},{" "}
                                            {selected.universityCity}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                                <div className="space-y-6">
                                    <DetailItem
                                        icon={
                                            <GraduationCap className="text-primary" />
                                        }
                                        label="Degree Level"
                                        value={selected.degree}
                                    />
                                    <DetailItem
                                        icon={
                                            <BookOpen className="text-primary" />
                                        }
                                        label="Subject Category"
                                        value={selected.subjectCategory}
                                    />
                                    <DetailItem
                                        icon={
                                            <Trophy className="text-primary" />
                                        }
                                        label="University Rank"
                                        value={`#${selected.universityRank} World Rank`}
                                    />
                                </div>
                                <div className="space-y-6">
                                    <DetailItem
                                        icon={
                                            <DollarSign className="text-green-500" />
                                        }
                                        label="Tuition Fees"
                                        value={
                                            selected.tuitionFees
                                                ? `$${selected.tuitionFees}`
                                                : "Free"
                                        }
                                    />
                                    <DetailItem
                                        icon={
                                            <DollarSign className="text-green-500" />
                                        }
                                        label="Application Fees"
                                        value={`$${selected.applicationFees}`}
                                    />
                                    <DetailItem
                                        icon={
                                            <Calendar className="text-red-400" />
                                        }
                                        label="Application Deadline"
                                        value={selected.applicationDeadline}
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

// Helper component for modal items
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {label}
            </p>
            <p className="text-gray-700 font-semibold">{value}</p>
        </div>
    </div>
);

export default ManageScholarships;
