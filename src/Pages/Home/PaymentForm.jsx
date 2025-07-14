import { useForm } from "react-hook-form";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import useAuthContext from "../../Hooks/useAuthContext";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdError } from "react-icons/md";
import Swal from "sweetalert2";


const PaymentForm = ({ scholarship, id}) => {
    const axiosSecure = useAxiosSecure();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [error, setError] = useState();
    const {user} = useAuthContext();
    const stripe = useStripe();
    const elements = useElements();
    const { register, handleSubmit } = useForm();

    const applicationFees = parseInt(scholarship?.applicationFees);
    const serviceCharge = parseInt(scholarship?.serviceCharge);
    const amount = applicationFees + serviceCharge;
    const amountInCents = amount * 100;


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

    const onSubmit = async (data) => {
        setError("");
        if (!stripe || !elements) {
            setError("Stripe is not loaded yet.");
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setError("Card information is required.");
            return;
        };

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            return setError(error.message)
        }else{
            setError("");
        };

        //step-2: create payment intent
        const res = await axiosSecure.post(`/create-payment-intent`, {
            amountInCents,
            id
        });
        const clientSecret = res.data.clientSecret;
        
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                }
            }
        });

        if(result.error){
            setError(result.error.message);
            return;
        }else{
            setError("");
            if(result.paymentIntent.status === 'succeeded'){
                const serverData = {
                    ...data,
                    scholarshipName: scholarship?.scholarshipName,
                    universityCity: scholarship.universityCity,
                    universityCountry: scholarship.universityCountry,
                    applicationFees: scholarship.applicationFees,
                    serviceCharge: scholarship.serviceCharge,
                    applicantPhotoURL: uploadedImageUrl,
                    userName: user?.displayName,
                    userEmail: user?.email,
                    userId: user?._id,
                    scholarshipId: scholarship._id,
                    currentDate: new Date().toDateString(),
                    applicationStatus: "pending"
                };
                const userRes = await axiosSecure.post("/appliedScholarships", serverData);
                if(userRes.data.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations!",
                        text: `Apply scholarship successfully`,
                    });
                }
            }
        };
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-5 md:mx-auto my-10 p-6 bg-white rounded-lg shadow space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Scholarship Application</h2>

            {
                uploadedImageUrl &&
                <div>
                    <img src={uploadedImageUrl} alt="" className="w-20 h-20 rounded-full mx-auto" />
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-medium">Phone</span>
                    </label>
                    <input type="text" {...register("applicantPhoneNumber")} placeholder="Enter your phone number" required className="input input-bordered w-full" />
                </div>

                {/* Photo Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Photo</span>
                    </label>
                    <input type="file" onChange={handleImageUpload} required className="file-input file-input-bordered w-full" />
                </div>
            </div>

            {/* Address */}
            <div className="form-control">
                <label className="label">
                <span className="label-text font-medium">Address</span>
                </label>
                <input type="text" {...register("applicantAddress")} placeholder="Village, District, Country" required className="input input-bordered w-full" />
            </div>

            {/* Gender & Degree */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Gender</span>
                </label>
                <select {...register("applicantGender")} required className="select select-bordered w-full">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Degree</span>
                </label>
                <select {...register("applyingDegree")} required className="select select-bordered w-full">
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
                <input type="text" {...register("sscResult")} placeholder="e.g. 4.50" required className="input input-bordered w-full" />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">HSC Result</span>
                </label>
                <input type="text" {...register("hscResult")} placeholder="e.g. 5.00" required className="input input-bordered w-full" />
                </div>
            </div>

            {/* Study Gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-medium">Any Study Gap?</span>
                    </label>
                    <select {...register("studyGap")} className="select select-bordered w-full">
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
                    {...register("universityName")}
                    placeholder="University Name"
                    className="input input-bordered w-full"
                    value={scholarship?.universityName}
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
                    {...register("scholarshipCategory")}
                    placeholder="Scholarship Category"
                    className="input input-bordered w-full"
                    value={scholarship?.scholarshipCategory}
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
                    {...register("subject")}
                    placeholder="Subject Name"
                    className="input input-bordered w-full"
                    value={scholarship?.subjectCategory}
                    readOnly
                    required
                    />
                </div>
            </div>

            {/* Stripe Card Element */}
            <div className="form-control">
                <label className="label">
                <span className="label-text font-medium">Payment Information</span>
                </label>
                <CardElement 
                className='p-2 border rounded'
                options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-secondary text-base-100 w-full" disabled={!stripe}>Pay ${amount} & Apply</button>
            {
                error && 
                <p className='text-red-500 text-center flex items-center justify-center gap-1'><MdError size={20}/>{error}</p>
            }
        </form>
    );
};

export default PaymentForm;