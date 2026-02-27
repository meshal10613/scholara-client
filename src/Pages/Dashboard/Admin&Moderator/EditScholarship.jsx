// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../../Components/Loading';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const EditScholarship = () => {
//     const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//     const [uploading, setUploading] = useState(false);
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const axiosInstance = useAxiosSecure();
//     const {data: scholarship = [], isLoading} = useQuery({
//         queryKey: ["scholarship"],
//         queryFn: async() => {
//             const res = await axiosInstance.get(`/scholarships/${id}`);
//             return res.data;
//         }
//     });
//     const {
//             register,
//             handleSubmit,
//             watch,
//             setError,
//             clearErrors,
//             formState: { errors, isDirty  },
//     } = useForm();

//     const imageFile = watch("universityImage");

//     if(isLoading){
//         return <Loading/>;
//     };

//     // 🔺 Upload to imgbb
//     const handleImageUpload = async () => {
//         const file = imageFile?.[0];
//         if (!file) {
//             setError("universityImage", { type: "manual", message: "Please select a file first." });
//             return;
//         }

//         clearErrors("universityImage");

//         const formData = new FormData();
//         formData.append("image", file);

//         setUploading(true);
//         try {
//         const uploadKey = import.meta.env.VITE_imgbb_apikey;
//         const res = await axios.post(
//             `https://api.imgbb.com/1/upload?key=${uploadKey}`,
//             formData,
//             {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             }
//         );

//         setUploadedImageUrl(res.data.data.url);
//         } catch (err) {
//         console.error("Image upload failed:", err);
//         } finally {
//         setUploading(false);
//         }
//     };

//     const onSubmit = async(data) => {
//         if(!isDirty){
//             Swal.fire({
//                 icon: "error",
//                 title: "Sorry!",
//                 text: `Please chnage the scholarship details`,
//             });
//             return;
//         }
//         data.universityImage = uploadedImageUrl || scholarship.universityImage;
//         const serverData = {
//             ...data,
//             rating: scholarship?.rating,
//             applicationDeadline: new Date(data.date).toDateString(),
//             postDate: scholarship.postDate
//         };

//         const application = await axiosInstance.put(`/scholarships/${scholarship?._id}`, serverData);
//         if(application.data.modifiedCount){
//             Swal.fire({
//                 icon: "success",
//                 title: "Congratulations!",
//                 text: `Scholarship updated successfully`,
//             });
//             navigate("/dashboard/manage-scholarships");
//         };
//     };

//     return (
//         <div className='mx-5 my-5'>
//             <div className="mx-auto w-full max-w-6xl p-4 bg-white shadow-2xl rounded-2xl mt-6">
//                 <h2 className="text-2xl font-bold mb-6 text-primary text-center">Edit Scholarship</h2>
//                 <div className="w-72 mx-auto">
//                     <img src={ uploadedImageUrl ? uploadedImageUrl : scholarship.universityImage} alt="Preview" className="w-98 my-4 border border-secondary shadow" />
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                     <input placeholder="Scholarship Name" {...register('scholarshipName', { required: 'Scholarship Name is required' })} defaultValue={scholarship?.scholarshipName} className="input input-bordered w-full" />
//                     {errors.scholarshipName && <p className="text-red-500 text-sm mt-1">{errors.scholarshipName.message}</p>}
//                     </div>

//                     <div>
//                     <input placeholder="University Name" {...register('universityName', { required: 'University Name is required' })} defaultValue={scholarship?.universityName} className="input input-bordered w-full" />
//                     {errors.universityName && <p className="text-red-500 text-sm mt-1">{errors.universityName.message}</p>}
//                     </div>

//                     {/* File Input */}
//                     <div className='md:col-span-2'>
//                         <div className='flex items-center gap-2'>
//                             <div className='flex-1'>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     {...register("universityImage")}
//                                     className="file-input file-input-md w-full"
//                                 />
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={handleImageUpload}
//                                 className="btn btn-secondary text-base-100"
//                                 disabled={uploading}
//                             >
//                                 {uploading ? "Uploading..." : "Upload Image"}
//                             </button>
//                         </div>
//                     </div>

//                     <div>
//                     <input placeholder="University Country" {...register('universityCountry', { required: 'University Country is required' })} defaultValue={scholarship?.universityCountry} className="input input-bordered w-full" />
//                     {errors.universityCountry && <p className="text-red-500 text-sm mt-1">{errors.universityCountry.message}</p>}
//                     </div>

//                     <div>
//                     <input placeholder="University City" {...register('universityCity', { required: 'University City is required' })} defaultValue={scholarship?.universityCity} className="input input-bordered w-full" />
//                     {errors.universityCity && <p className="text-red-500 text-sm mt-1">{errors.universityCity.message}</p>}
//                     </div>

//                     <div>
//                     <input placeholder="University World Rank" {...register('universityRank', { required: 'University Rank is required' })} defaultValue={scholarship?.universityRank} className="input input-bordered w-full" />
//                     {errors.universityRank && <p className="text-red-500 text-sm mt-1">{errors.universityRank.message}</p>}
//                     </div>

//                     <div>
//                     <select {...register('subjectCategory', { required: 'Subject Category is required' })} defaultValue={scholarship?.subjectCategory} className="select select-bordered w-full">
//                         <option value="">Select Subject Category</option>
//                         <option value="Computer Science">Computer Science</option>
//                         <option value="Electrical Engineering">Electrical Engineering</option>
//                         <option value="Mechanical Engineering">Mechanical Engineering</option>
//                         <option value="Civil Engineering">Civil Engineering</option>
//                         <option value="Business Administration">Business Administration</option>
//                         <option value="Accounting">Accounting</option>
//                         <option value="Marketing">Marketing</option>
//                         <option value="Finance">Finance</option>
//                         <option value="Economics">Economics</option>
//                         <option value="Psychology">Psychology</option>
//                         <option value="Sociology">Sociology</option>
//                         <option value="English">English</option>
//                         <option value="Mathematics">Mathematics</option>
//                         <option value="Physics">Physics</option>
//                         <option value="Chemistry">Chemistry</option>
//                         <option value="Biology">Biology</option>
//                         <option value="Pharmacy">Pharmacy</option>
//                         <option value="Law">Law</option>
//                         <option value="Education">Education</option>
//                         <option value="Architecture">Architecture</option>
//                     </select>
//                     {errors.subjectCategory && <p className="text-red-500 text-sm mt-1">{errors.subjectCategory.message}</p>}
//                     </div>

//                     <div>
//                     <select {...register('scholarshipCategory', { required: 'Scholarship Category is required' })} defaultValue={scholarship?.scholarshipCategory}
//                     className="select select-bordered w-full">
//                         <option value="">Select Scholarship Category</option>
//                         <option value="Full fund">Full fund</option>
//                         <option value="Partial">Partial</option>
//                         <option value="Self-fund">Self-fund</option>
//                     </select>
//                     {errors.scholarshipCategory && <p className="text-red-500 text-sm mt-1">{errors.scholarshipCategory.message}</p>}
//                     </div>

//                     <div>
//                     <select {...register('degree', { required: 'Degree is required' })} defaultValue={scholarship?.degree} className="select select-bordered w-full">
//                         <option value="">Select Degree</option>
//                         <option value="Diploma">Diploma</option>
//                         <option value="Bachelor">Bachelor</option>
//                         <option value="Masters">Masters</option>
//                     </select>
//                     {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>}
//                     </div>

//                     <div>
//                     <input placeholder="Tuition Fees (Optional)" {...register('tuitionFees')} defaultValue={scholarship?.tuitionFees} className="input input-bordered w-full" />
//                     </div>

//                     <div>
//                     <input placeholder="Application Fees" {...register('applicationFees', { required: 'Application Fees are required' })} defaultValue={scholarship?.applicationFees} className="input input-bordered w-full" />
//                     {errors.applicationFees && <p className="text-red-500 text-sm mt-1">{errors.applicationFees.message}</p>}
//                     </div>

//                     <div className="">
//                     <input placeholder="Stipend (Optional)" {...register('stipend')} defaultValue={scholarship?.stipend} className="input input-bordered w-full" />
//                     </div>

//                     <div>
//                     <input placeholder="Service Charge" {...register('serviceCharge', { required: 'Service Charge is required' })} defaultValue={scholarship?.serviceCharge} className="input input-bordered w-full" />
//                     {errors.serviceCharge && <p className="text-red-500 text-sm mt-1">{errors.serviceCharge.message}</p>}
//                     </div>

//                     <div>
//                     <input type="date" placeholder="Application Deadline" {...register('date', { required: 'Application Deadline is required' })} defaultValue={new Date(scholarship?.applicationDeadline).toISOString().split("T")[0]} className="input input-bordered w-full" />
//                     {errors.applicationDeadline && <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline.message}</p>}
//                     </div>

//                     <div className=''>
//                     <input placeholder="Posted User Email" readOnly type="email" {...register('postedEmail', { required: 'Email is required' })} defaultValue={scholarship?.postedEmail} className="input input-bordered w-full" />
//                     {errors.postedEmail && <p className="text-red-500 text-sm mt-1">{errors.postedEmail.message}</p>}
//                     </div>

//                     <div className='md:col-span-2'>
//                     <input placeholder="Scholarship Description" type="text" {...register('scholarshipDescription', { required: 'Scholarship Description is required' })} defaultValue={scholarship?.scholarshipDescription} className="input input-bordered w-full" />
//                     {errors.scholarshipDescription && <p className="text-red-500 text-sm mt-1">{errors.scholarshipDescription.message}</p>}
//                     </div>

//                     <div className="md:col-span-2 text-center">
//                     <button type="submit" className="btn btn-secondary text-base-100 mt-4 w-full md:w-auto"
//                     disabled={uploading}>Update Scholarship</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditScholarship;

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading"; // Ensure path is correct

const EditScholarship = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxiosSecure();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch existing scholarship data
    const {
        data: scholarship = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["scholarship", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty },
    } = useForm();

    // Reset form values when scholarship data is loaded
    useEffect(() => {
        if (scholarship._id) {
            reset({
                scholarshipName: scholarship.scholarshipName,
                universityName: scholarship.universityName,
                universityCountry: scholarship.universityCountry,
                universityCity: scholarship.universityCity,
                universityRank: scholarship.universityRank,
                subjectCategory: scholarship.subjectCategory,
                scholarshipCategory: scholarship.scholarshipCategory,
                degree: scholarship.degree,
                tuitionFees: scholarship.tuitionFees,
                applicationFees: scholarship.applicationFees,
                stipend: scholarship.stipend,
                serviceCharge: scholarship.serviceCharge,
                scholarshipDescription: scholarship.scholarshipDescription,
                postedEmail: scholarship.postedUserEmail || scholarship.email,
                // Format date for input type="date"
                date: scholarship.applicationDeadline
                    ? new Date(scholarship.applicationDeadline)
                          .toISOString()
                          .split("T")[0]
                    : "",
            });
        }
    }, [scholarship, reset]);

    const imageFile = watch("universityImage");

    const handleImageUpload = async () => {
        const file = imageFile?.[0];
        if (!file) {
            setError("universityImage", {
                type: "manual",
                message: "Please select a file first.",
            });
            return;
        }

        clearErrors("universityImage");
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const uploadKey = import.meta.env.VITE_imgbb_apikey;
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${uploadKey}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            setUploadedImageUrl(res.data.data.url);
            Swal.fire({
                icon: "success",
                title: "Image Uploaded",
                text: "New image ready for submission.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Image upload failed:", err);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Failed to upload image. Please try again.",
            });
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        // If no changes made and no new image uploaded
        if (!isDirty && !uploadedImageUrl) {
            Swal.fire({
                icon: "info",
                title: "No Changes",
                text: "You haven't made any changes to the scholarship.",
            });
            return;
        }

        setSubmitting(true);
        try {
            const serverData = {
                ...data,
                // Use new image if uploaded, otherwise keep existing
                universityImage:
                    uploadedImageUrl || scholarship.universityImage,
                applicationDeadline: new Date(data.date).toDateString(),
                // Preserve original rating and postDate
                rating: scholarship.rating,
                postDate: scholarship.postDate,
            };

            const response = await axiosInstance.put(
                `/scholarships/${scholarship._id}`,
                serverData,
            );

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                    text: "Scholarship details have been updated.",
                });
                refetch();
                navigate("/dashboard/manage-scholarships");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    error.response?.data?.message ||
                    "Failed to update scholarship",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Edit Scholarship
                    </h1>
                    <p className="text-gray-600">
                        Update details for {scholarship.universityName}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Image Preview Section */}
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <h3 className="font-semibold text-gray-700 mb-4">
                                    University Image
                                </h3>

                                <div className="relative max-w-xs mx-auto mb-5">
                                    <img
                                        // Show new image if uploaded, otherwise show existing from DB
                                        src={
                                            uploadedImageUrl ||
                                            scholarship.universityImage
                                        }
                                        alt="University preview"
                                        className="rounded-lg shadow-md w-fit h-auto mx-auto max-h-48"
                                    />
                                    {uploadedImageUrl && (
                                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            New
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            {...register("universityImage")}
                                            className="file-input file-input-md w-full h-11 rounded-lg border border-gray-300 bg-white text-sm text-gray-500"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleImageUpload}
                                        disabled={uploading || !imageFile}
                                        className={`btn btn-secondary text-white flex-shrink-0 mt-6 sm:mt-0 ${
                                            uploading ? "opacity-75" : ""
                                        }`}
                                    >
                                        {uploading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Uploading...
                                            </>
                                        ) : (
                                            "Change Image"
                                        )}
                                    </button>
                                </div>
                                {errors.universityImage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.universityImage.message}
                                    </p>
                                )}
                            </div>

                            {/* Main Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Scholarship Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("scholarshipName", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                        {errors.scholarshipName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.scholarshipName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            University Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("universityName", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                        {errors.universityName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.universityName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("universityCountry", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("universityCity", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            World Rank
                                        </label>
                                        <input
                                            type="number"
                                            {...register("universityRank", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject Category{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            {...register("subjectCategory", {
                                                required: "Required",
                                            })}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            <option value="Computer Science">
                                                Computer Science
                                            </option>
                                            <option value="Electrical Engineering">
                                                Electrical Engineering
                                            </option>
                                            <option value="Mechanical Engineering">
                                                Mechanical Engineering
                                            </option>
                                            <option value="Civil Engineering">
                                                Civil Engineering
                                            </option>
                                            <option value="Business Administration">
                                                Business Administration
                                            </option>
                                            <option value="Accounting">
                                                Accounting
                                            </option>
                                            <option value="Marketing">
                                                Marketing
                                            </option>
                                            <option value="Finance">
                                                Finance
                                            </option>
                                            <option value="Economics">
                                                Economics
                                            </option>
                                            <option value="Psychology">
                                                Psychology
                                            </option>
                                            <option value="Sociology">
                                                Sociology
                                            </option>
                                            <option value="English">
                                                English
                                            </option>
                                            <option value="Mathematics">
                                                Mathematics
                                            </option>
                                            <option value="Physics">
                                                Physics
                                            </option>
                                            <option value="Chemistry">
                                                Chemistry
                                            </option>
                                            <option value="Biology">
                                                Biology
                                            </option>
                                            <option value="Pharmacy">
                                                Pharmacy
                                            </option>
                                            <option value="Law">Law</option>
                                            <option value="Education">
                                                Education
                                            </option>
                                            <option value="Architecture">
                                                Architecture
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Scholarship Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            {...register(
                                                "scholarshipCategory",
                                                { required: "Required" },
                                            )}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        >
                                            <option value="">
                                                Select Type
                                            </option>
                                            <option value="Full fund">
                                                Full Scholarship
                                            </option>
                                            <option value="Partial">
                                                Partial Scholarship
                                            </option>
                                            <option value="Self-fund">
                                                Self-Funded
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Degree Level{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            {...register("degree", {
                                                required: "Required",
                                            })}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        >
                                            <option value="">
                                                Select Degree
                                            </option>
                                            <option value="Diploma">
                                                Diploma
                                            </option>
                                            <option value="Bachelor">
                                                Bachelor
                                            </option>
                                            <option value="Masters">
                                                Masters
                                            </option>
                                            <option value="PhD">PhD</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Application Fee ($)
                                        </label>
                                        <input
                                            type="number"
                                            {...register("applicationFees", {
                                                required: "Required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tuition Fees (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("tuitionFees")}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stipend (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("stipend")}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Charge{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register("serviceCharge", {
                                            required: "Required",
                                        })}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Application Deadline{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        {...register("date", {
                                            required: "Required",
                                        })}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Poster Email (Read Only)
                                    </label>
                                    <input
                                        readOnly
                                        {...register("postedEmail")}
                                        className="input input-bordered w-full rounded-lg border-gray-300 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Scholarship Description{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows="4"
                                        {...register("scholarshipDescription", {
                                            required: "Required",
                                        })}
                                        className="input input-textarea resize-none h-full w-full rounded-lg border-gray-300 focus:ring-blue-500 pt-3"
                                        placeholder="Detailed description..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="btn btn-ghost text-gray-500 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || uploading}
                                        className={`btn btn-secondary text-base-100 min-w-[150px] ${
                                            submitting ? "opacity-75" : ""
                                        }`}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Scholarship"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditScholarship;
