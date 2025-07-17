import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthContext from '../../../Hooks/useAuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddScholarship = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const {user} = useAuthContext();
    const axiosInstance = useAxiosSecure();
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

    // 🔺 Upload to imgbb
    const handleImageUpload = async () => {
        const file = imageFile?.[0];
        if (!file) {
            setError("universityImage", { type: "manual", message: "Please select a file first." });
            return;
        }

        clearErrors("universityImage");

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
        const uploadKey = import.meta.env.VITE_imgbb_apikey;
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${uploadKey}`,
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );

        setUploadedImageUrl(res.data.data.url);
        } catch (err) {
        console.error("Image upload failed:", err);
        } finally {
        setUploading(false);
        }
    };

    const onSubmit = async(data) => {
        if (!uploadedImageUrl) {
            setError("universityImage", {
                type: "manual",
                message: "Please upload the image before submitting the form.",
            });
            return;
        }
        data.universityImage = uploadedImageUrl;
        const serverData = {
            ...data,
            rating: 0,
            applicationDeadline: new Date(data.date).toDateString(),
            postDate: new Date().toDateString()
        };

        const application = await axiosInstance.post("/scholarships", serverData);
        if(application.data.insertedId){
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Scholarship added successfully`,
            });
            reset();
            setUploadedImageUrl("");
        };
    };

    return (
        <div className='mx-5 my-5'>
            <div className="mx-auto w-full max-w-6xl p-4 bg-white shadow-2xl rounded-2xl mt-6">
                <h2 className="text-2xl font-bold mb-6 text-primary text-center">Add Scholarship</h2>
                {uploadedImageUrl && (
                    <div className="w-fit mx-auto">
                        <img src={uploadedImageUrl} alt="Preview" className="w-98 my-4 border border-secondary shadow" />
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <input placeholder="Scholarship Name" {...register('scholarshipName', { required: 'Scholarship Name is required' })} className="input input-bordered w-full" />
                    {errors.scholarshipName && <p className="text-red-500 text-sm mt-1">{errors.scholarshipName.message}</p>}
                    </div>

                    <div>
                    <input placeholder="University Name" {...register('universityName', { required: 'University Name is required' })} className="input input-bordered w-full" />
                    {errors.universityName && <p className="text-red-500 text-sm mt-1">{errors.universityName.message}</p>}
                    </div>

                    {/* File Input */}
                    <div className='md:col-span-2'>
                        <div className='flex items-center gap-2'>
                            <div className='flex-1'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("universityImage", { required: "Please select an image" })}
                                    className="file-input file-input-md w-full"
                                />
                                {errors.universityImage && (
                                    <p className="text-red-500 text-sm mt-1">{errors.universityImage.message}</p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleImageUpload}
                                className="btn btn-secondary text-base-100"
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Upload Image"}
                            </button>
                        </div>
                    </div>

                    <div>
                    <input placeholder="University Country" {...register('universityCountry', { required: 'University Country is required' })} className="input input-bordered w-full" />
                    {errors.universityCountry && <p className="text-red-500 text-sm mt-1">{errors.universityCountry.message}</p>}
                    </div>

                    <div>
                    <input placeholder="University City" {...register('universityCity', { required: 'University City is required' })} className="input input-bordered w-full" />
                    {errors.universityCity && <p className="text-red-500 text-sm mt-1">{errors.universityCity.message}</p>}
                    </div>

                    <div>
                    <input placeholder="University World Rank" {...register('universityRank', { required: 'University Rank is required' })} className="input input-bordered w-full" />
                    {errors.universityRank && <p className="text-red-500 text-sm mt-1">{errors.universityRank.message}</p>}
                    </div>

                    <div>
                    <select {...register('subjectCategory', { required: 'Subject Category is required' })} className="select select-bordered w-full">
                        <option value="">Select Subject Category</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Economics">Economics</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Sociology">Sociology</option>
                        <option value="English">English</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Law">Law</option>
                        <option value="Education">Education</option>
                        <option value="Architecture">Architecture</option>
                    </select>
                    {errors.subjectCategory && <p className="text-red-500 text-sm mt-1">{errors.subjectCategory.message}</p>}
                    </div>

                    <div>
                    <select {...register('scholarshipCategory', { required: 'Scholarship Category is required' })} className="select select-bordered w-full">
                        <option value="">Select Scholarship Category</option>
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                    {errors.scholarshipCategory && <p className="text-red-500 text-sm mt-1">{errors.scholarshipCategory.message}</p>}
                    </div>

                    <div>
                    <select {...register('degree', { required: 'Degree is required' })} className="select select-bordered w-full">
                        <option value="">Select Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                    </select>
                    {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>}
                    </div>

                    <div>
                    <input placeholder="Tuition Fees (Optional)" {...register('tuitionFees')} className="input input-bordered w-full" />
                    </div>

                    <div>
                    <input placeholder="Application Fees" {...register('applicationFees', { required: 'Application Fees are required' })} className="input input-bordered w-full" />
                    {errors.applicationFees && <p className="text-red-500 text-sm mt-1">{errors.applicationFees.message}</p>}
                    </div>

                    <div className="">
                    <input placeholder="Stipend (Optional)" {...register('stipend')} className="input input-bordered w-full" />
                    </div>

                    <div>
                    <input placeholder="Service Charge" {...register('serviceCharge', { required: 'Service Charge is required' })} className="input input-bordered w-full" />
                    {errors.serviceCharge && <p className="text-red-500 text-sm mt-1">{errors.serviceCharge.message}</p>}
                    </div>

                    <div>
                    <input type="date" placeholder="Application Deadline" {...register('date', { required: 'Application Deadline is required' })} className="input input-bordered w-full" />
                    {errors.applicationDeadline && <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline.message}</p>}
                    </div>

                    <div className=''>
                    <input placeholder="Posted User Email" value={user?.email} readOnly type="email" {...register('postedEmail', { required: 'Email is required' })} className="input input-bordered w-full" />
                    {errors.postedEmail && <p className="text-red-500 text-sm mt-1">{errors.postedEmail.message}</p>}
                    </div>

                    {/* <div>
                    <input type="date" placeholder="Scholarship Post Date" {...register('postDate', { required: 'Post Date is required' })} className="input input-bordered w-full" />
                    {errors.postDate && <p className="text-red-500 text-sm mt-1">{errors.postDate.message}</p>}
                    </div> */}

                    <div className='md:col-span-2'>
                    <input placeholder="Scholarship Description" type="text" {...register('scholarshipDescription', { required: 'Scholarship Description is required' })} className="input input-bordered w-full" />
                    {errors.scholarshipDescription && <p className="text-red-500 text-sm mt-1">{errors.scholarshipDescription.message}</p>}
                    </div>

                    <div className="md:col-span-2 text-center">
                    <button type="submit" disabled={uploading} className="btn btn-secondary text-base-100 mt-4 w-full md:w-auto">Submit Scholarship</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;
