import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const EditMyApplication = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const {id} = useParams();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const { data: editApplication = {}, isLoading, refetch } = useQuery({
        queryKey: ["editApplication"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/appliedScholarships/${id}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    // 🔺 Upload to imgbb
    const handleImageUpload = async(e) => {
        setUploadedImageUrl("");
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
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
        }
    };

    const onSubmit = async(data) => {
        const serverData = {
            ...data,
            currentDate: editApplication?.currentDate,
            applicationFees: editApplication?.applicationFees,
            applicationStatus: editApplication?.applicationStatus,
            feedback: editApplication?.feedback,
            scholarshipId: editApplication?.scholarshipId,
            serviceCharge: editApplication?.serviceCharge,
            scholarshipName: editApplication?.scholarshipName,
            universityCity: editApplication?.universityCity,
            universityCountry: editApplication?.universityCountry,
            userEmail: editApplication?.userEmail,
            userName: editApplication?.userName,
            applicantPhotoURL: uploadedImageUrl || editApplication?.applicantPhotoURL
        };
        const res = await axiosSecure.put(`/editAppliedScholarship/${id}`, serverData);
        if(res.data.modifiedCount){
            refetch();
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Scholarship updated successfully`,
            });
        }else{
            Swal.fire({
                icon: "question",
                title: "Sorry!",
                text: `Please edit your application`,
            });
        };
    };
    
    return (
        <div>
            <div className='mx-auto p-4'>
                <h1 className="text-3xl font-bold mb-6">Edit Application</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-5 md:mx-auto my-10 p-6 bg-white rounded-lg shadow space-y-6">
                    
                    <div>
                        <img src={ uploadedImageUrl ? uploadedImageUrl : editApplication.applicantPhotoURL} alt="" className="w-20 h-20 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-medium">Phone</span>
                            </label>
                            <input type="text" defaultValue={editApplication?.applicantPhoneNumber} {...register("applicantPhoneNumber")} placeholder="Enter your phone number" required className="input input-bordered w-full" />
                        </div>

                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Photo</span>
                            </label>
                            <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text font-medium">Address</span>
                        </label>
                        <input type="text" defaultValue={editApplication?.applicantAddress} {...register("applicantAddress")} placeholder="Village, District, Country" required className="input input-bordered w-full" />
                    </div>

                    {/* Gender & Degree */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Gender</span>
                        </label>
                        <select defaultValue={editApplication?.applicantGender} {...register("applicantGender")} required className="select select-bordered w-full">
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Degree</span>
                        </label>
                        <select defaultValue={editApplication?.applyingDegree} required {...register("applyingDegree")} className="select select-bordered w-full">
                            <option value="">Select degree</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                        </select>
                        </div>
                    </div>

                    {/* SSC & HSC Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">SSC Result</span>
                        </label>
                        <input type="text" defaultValue={editApplication?.sscResult} {...register("sscResult")} placeholder="e.g. 4.50" required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">HSC Result</span>
                        </label>
                        <input type="text" defaultValue={editApplication?.hscResult} {...register("hscResult")} placeholder="e.g. 5.00" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* Study Gap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-medium">Any Study Gap?</span>
                            </label>
                            <select defaultValue={editApplication?.studyGap} {...register("studyGap")} className="select select-bordered w-full">
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {/* Display Selected Scholarship Info */}
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-medium">University</span>
                            </label>
                            <input
                            type="text"
                            placeholder="University Name"
                            className="input input-bordered w-full"
                            value={editApplication?.universityName}
                            {...register("universityName")}
                            readOnly
                            required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-medium">Scholarship Category</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Scholarship Category"
                            className="input input-bordered w-full"
                            value={editApplication?.scholarshipCategory}
                            {...register("scholarshipCategory")}
                            readOnly
                            required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                            <span className="label-text font-medium">Subject</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Subject Name"
                            className="input input-bordered w-full"
                            value={editApplication?.subject}
                            {...register("subject")}
                            readOnly
                            required
                            />
                        </div>
                    </div>

                    <button type='submit' className='btn btn-block bg-secondary text-base-100'>Update Scholarship Application</button>
                </form>
            </div>
        </div>
    );
};

export default EditMyApplication;