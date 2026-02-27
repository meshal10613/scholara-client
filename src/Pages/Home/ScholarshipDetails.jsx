// import React from 'react';
// import Loading from '../../Components/Loading';
// import { Link, useParams } from 'react-router';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import useScholarshipReviews from '../../Hooks/useScholarshipReviews';
// import ScholarshipReview from './ScholarshipReview';

// const scholarshipshipDetails = () => {
//     const {id} = useParams();
//     const axiosInstance = useAxiosSecure();
//     const {data: scholarship = [], isLoading} = useQuery({
//         queryKey: ["scholarship"],
//         queryFn: async() => {
//             const res = await axiosInstance.get(`/scholarships/${id}`);
//             return res.data;
//         }
//     });

//     const { data } = useScholarshipReviews(scholarship._id);

//     if(isLoading || !data){
//         return <Loading/>;
//     };
//     return (
//         <div>
//             <div>
//                 <div className="mx-auto p-4">
//                     <div className="card bg-base-100 shadow-xl">
//                         <figure className="p-4">
//                         <img
//                             src={scholarship?.universityImage}
//                             alt={scholarship?.universityName}
//                             className="h-[300px] object-contain"
//                         />
//                         </figure>
//                         <div className="card-body">
//                         <h2 className="card-title text-2xl font-bold">{scholarship?.universityName}</h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                             <div>
//                             <p className="text-lg"><span className="font-semibold">🎓 scholarship Category:</span> {scholarship?.scholarshipCategory}</p>
//                             <p className="text-lg"><span className="font-semibold">📍 Location:</span> {scholarship?.universityCity}, {scholarship?.universityCountry}</p>
//                             <p className="text-lg"><span className="font-semibold">🗂️ Subject:</span> {scholarship?.subjectCategory}</p>
//                             <p className="text-lg"><span className="font-semibold">🏅 Degree:</span> {scholarship?.degree}</p>
//                             <p className="text-lg"><span className="font-semibold">📅 Deadline:</span> {scholarship?.applicationDeadline}</p>

//                             </div>
//                             <div>
//                                 {scholarship?.stipend && <p className="text-lg"><span className="font-semibold">💰 Stipend:</span> {scholarship?.stipend}</p>}
//                                 <p className="text-lg"><span className="font-semibold">💳 Application Fees:</span>
//                                 {`${scholarship?.applicationFees}` || "None"}</p>
//                                 <p className="text-lg"><span className="font-semibold">🔧 Service Charge:</span> {scholarship?.serviceCharge || "No charge"}</p>
//                                 <p className='text-lg'><span className="font-semibold">⭐ Rating</span> {scholarship.rating}</p>
//                                 <p className="text-lg"><span className="font-semibold">🕓 Posted:</span> {scholarship?.postDate}</p>
//                             </div>
//                         </div>

//                         <div className="mt-4">
//                             <h3 className="text-xl font-bold">📝 scholarship Description</h3>
//                             <p className="text-justify text-lg">{scholarship?.scholarshipDescription}</p>
//                         </div>

//                         <div className="card-actions mt-6">
//                             <Link to={`/applyScholarship/${scholarship._id}`} className="btn btn-block border-none bg-secondary text-base-100">Apply scholarship</Link>
//                         </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ScholarshipReview data={data}/>
//         </div>
//     );
// };

// export default scholarshipshipDetails;

import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useScholarshipReviews from "../../Hooks/useScholarshipReviews";
import ScholarshipReview from "./ScholarshipReview";
import Loading from "../../Components/Loading";
import {
    FaGraduationCap,
    FaMapMarkerAlt,
    FaBookOpen,
    FaAward,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaTools,
    FaStar,
    FaClock,
} from "react-icons/fa";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxiosSecure();

    const { data: scholarship = {}, isLoading } = useQuery({
        queryKey: ["scholarship", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const { data: reviews } = useScholarshipReviews(scholarship._id);

    if (isLoading || !reviews) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
                        <div className="absolute -bottom-12 left-8 p-2 bg-white rounded-2xl shadow-lg">
                            <img
                                src={scholarship?.universityImage}
                                alt={scholarship?.universityName}
                                className="w-32 h-32 object-cover rounded-xl border border-gray-100"
                            />
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                                {scholarship?.universityName}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-gray-600">
                                <span className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" />
                                    {scholarship?.universityCity},{" "}
                                    {scholarship?.universityCountry}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaGraduationCap className="text-primary" />
                                    {scholarship?.scholarshipCategory}
                                </span>
                                <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-sm font-bold">
                                    <FaStar />{" "}
                                    {Number(scholarship.rating).toFixed(1) ||
                                        "New"}
                                </span>
                            </div>
                        </div>
                        <Link
                            to={`/applyScholarship/${scholarship._id}`}
                            className="w-full md:w-auto px-8 py-4 bg-secondary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 text-center"
                        >
                            Apply for Scholarship
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">
                                Key Information
                            </h3>

                            <div className="space-y-6">
                                <InfoItem
                                    icon={<FaBookOpen />}
                                    label="Subject"
                                    value={scholarship?.subjectCategory}
                                />
                                <InfoItem
                                    icon={<FaAward />}
                                    label="Degree"
                                    value={scholarship?.degree}
                                />
                                <InfoItem
                                    icon={<FaCalendarAlt />}
                                    label="Deadline"
                                    value={scholarship?.applicationDeadline}
                                    isHighlight
                                />
                                <hr className="border-gray-100" />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 flex items-center gap-2">
                                            <FaMoneyBillWave /> Stipend
                                        </span>
                                        <span className="font-bold text-green-600">
                                            ${scholarship?.stipend || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 flex items-center gap-2">
                                            <FaTools /> Service Charge
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            ${scholarship?.serviceCharge || "0"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-2 font-bold text-gray-900">
                                            Application Fee
                                        </span>
                                        <span className="text-2xl font-black text-primary">
                                            $
                                            {scholarship?.applicationFees ||
                                                "Free"}
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center gap-2 text-xs text-gray-400">
                                    <FaClock /> Posted on:{" "}
                                    {scholarship?.postDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                Scholarship Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-justify">
                                {scholarship?.scholarshipDescription}
                            </p>
                        </section>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <ScholarshipReview data={reviews} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value, isHighlight }) => (
    <div className="flex items-start gap-4">
        <div
            className={`p-3 rounded-xl ${isHighlight ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400"}`}
        >
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {label}
            </p>
            <p
                className={`text-base font-semibold ${isHighlight ? "text-red-600" : "text-gray-900"}`}
            >
                {value}
            </p>
        </div>
    </div>
);

export default ScholarshipDetails;
