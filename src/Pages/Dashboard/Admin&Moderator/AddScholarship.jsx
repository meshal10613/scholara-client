import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddScholarship = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuthContext();
    const axiosInstance = useAxiosSecure();
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();

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

    const removeImage = () => {
        setUploadedImageUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        clearErrors("universityImage");
    };

    const onSubmit = async (data) => {
        if (!uploadedImageUrl) {
            setError("universityImage", {
                type: "manual",
                message: "Please upload the image before submitting.",
            });
            return;
        }

        setSubmitting(true);
        try {
            const serverData = {
                ...data,
                rating: 0,
                applicationDeadline: new Date(data.date).toDateString(),
                postDate: new Date().toDateString(),
                universityImage: uploadedImageUrl,
                postedBy: user?.email,
            };

            const application = await axiosInstance.post(
                "/scholarships",
                serverData,
            );

            if (application.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Scholarship Added",
                    text: "Your scholarship has been published successfully",
                });
                reset();
                setUploadedImageUrl("");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error.response?.data?.message ||
                    "Failed to submit scholarship",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Add New Scholarship
                    </h1>
                    <p className="text-gray-600">
                        Help students discover life-changing opportunities
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

                                {uploadedImageUrl ? (
                                    <div className="relative max-w-xs mx-auto mb-5">
                                        <img
                                            src={uploadedImageUrl}
                                            alt="University preview"
                                            className="rounded-lg shadow-md w-fit h-auto"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition cursor-pointer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl w-full max-w-xs mx-auto h-48 flex items-center justify-center bg-gray-50 mb-5">
                                        <p className="text-gray-400">
                                            Image Preview
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            {...register("universityImage", {
                                                required:
                                                    "Please select an image",
                                            })}
                                            className="file-input file-input-md w-full h-11 rounded-lg border border-gray-300 bg-white text-sm text-gray-500 placeholder-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleImageUpload}
                                        disabled={uploading || !imageFile}
                                        className={`btn btn-secondary text-white flex-shrink-0 mt-6 sm:mt-0 ${uploading ? "opacity-75" : ""}`}
                                    >
                                        {uploading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Uploading...
                                            </>
                                        ) : (
                                            "Upload Image"
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
                                        <label
                                            htmlFor="scholarshipName"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Scholarship Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="scholarshipName"
                                            placeholder="Enter scholarship name"
                                            {...register("scholarshipName", {
                                                required:
                                                    "Scholarship name is required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.scholarshipName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.scholarshipName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="universityName"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            University Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="universityName"
                                            placeholder="Enter university name"
                                            {...register("universityName", {
                                                required:
                                                    "University name is required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.universityName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.universityName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="universityCountry"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Country{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="universityCountry"
                                            placeholder="Enter country"
                                            {...register("universityCountry", {
                                                required: "Country is required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.universityCountry && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.universityCountry
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="universityCity"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            City{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="universityCity"
                                            placeholder="Enter city"
                                            {...register("universityCity", {
                                                required: "City is required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.universityCity && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.universityCity.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="universityRank"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            World Rank
                                        </label>
                                        <input
                                            id="universityRank"
                                            type="number"
                                            placeholder="Enter university rank"
                                            {...register("universityRank")}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="subjectCategory"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Subject Category{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="subjectCategory"
                                            {...register("subjectCategory", {
                                                required:
                                                    "Subject category is required",
                                            })}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Subject Category
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
                                        {errors.subjectCategory && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.subjectCategory.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="scholarshipCategory"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Scholarship Type{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="scholarshipCategory"
                                            {...register(
                                                "scholarshipCategory",
                                                {
                                                    required:
                                                        "Scholarship type is required",
                                                },
                                            )}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Scholarship Type
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
                                        {errors.scholarshipCategory && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.scholarshipCategory
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="degree"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Degree Level{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="degree"
                                            {...register("degree", {
                                                required:
                                                    "Degree level is required",
                                            })}
                                            className="select select-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">
                                                Select Degree Level
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
                                        {errors.degree && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.degree.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="applicationFees"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Application Fee
                                        </label>
                                        <input
                                            id="applicationFees"
                                            type="number"
                                            placeholder="Enter application fee"
                                            {...register("applicationFees", {
                                                required:
                                                    "Application fee is required",
                                            })}
                                            className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.applicationFees && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.applicationFees.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div>
                                    <label
                                        htmlFor="tuitionFees"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Tuition Fees (Optional)
                                    </label>
                                    <input
                                        id="tuitionFees"
                                        type="number"
                                        placeholder="Enter tuition fees"
                                        {...register("tuitionFees")}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="stipend"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Stipend (Optional)
                                    </label>
                                    <input
                                        id="stipend"
                                        type="number"
                                        placeholder="Enter stipend amount"
                                        {...register("stipend")}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="serviceCharge"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Service Charge{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="serviceCharge"
                                        type="number"
                                        placeholder="Enter service charge"
                                        {...register("serviceCharge", {
                                            required:
                                                "Service charge is required",
                                        })}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.serviceCharge && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.serviceCharge.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Application Deadline{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        {...register("date", {
                                            required:
                                                "Application deadline is required",
                                        })}
                                        className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.date && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.date.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="scholarshipDescription"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Scholarship Description{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="scholarshipDescription"
                                        rows="4"
                                        {...register("scholarshipDescription", {
                                            required: "Description is required",
                                        })}
                                        className="input input-textarea resize-none h-full w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Detailed description of the scholarship..."
                                    ></textarea>
                                    {errors.scholarshipDescription && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.scholarshipDescription
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="text-sm text-gray-500">
                                        <p>Posted by: {user.displayName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting || uploading}
                                        className={`btn btn-secondary text-base-100 ${submitting ? "opacity-75" : ""}`}
                                    >
                                        {submitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            "Publish Scholarship"
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

export default AddScholarship;
