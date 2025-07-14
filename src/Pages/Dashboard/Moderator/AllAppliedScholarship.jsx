import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import { MdCancel, MdFeedback } from 'react-icons/md';
import Swal from 'sweetalert2';

const AllAppliedScholarship = () => {
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState([]);
    const [feedback, setFeedback] = useState("");
    const axiosSecure = useAxiosSecure();
    const { data: appliedScholarships = [], isLoading } = useQuery({
        queryKey: ["manage"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/appliedScholarships`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const handleFeedback = (data) => {
        setModal([]);
        setModal(data);
        setIsOpen(true);
    };

    const handleAddFeedback = async() => {
        if(!feedback){
            return
        };
        const serverData = {
            ...modal,
            feedback
        };
        const userRes = await axiosSecure.put(`/appliedScholarships/${modal._id}`, serverData);
        if(userRes.data.modifiedCount > 0){
            setIsOpen(false);
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Review added successfully`,
                confirmButtonColor: "#088395",
            });
        }else{
            setIsOpen(false);
            Swal.fire({
                icon: "error",
                title: "Sorry!",
                text: `Please change you review`,
                confirmButtonColor: "#088395"
            });
        };
    };

    const openDetails = (scholarship) => {
        setSelected(scholarship);
        document.getElementById("scholarshipModal").showModal();
    };

    const closeDetails = () => setSelected(null);

    return (
    <div>
        <div>
            <div className="mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">All Applied Scholarships</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                    <thead className="bg-secondary text-base-100">
                        <tr>
                        <th>#</th>
                        <th>University Name</th>
                        <th>Scholarship</th>
                        <th>Subject Category</th>
                        <th>Applicant Number</th>
                        <th>Application Status</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedScholarships?.map((scholarship, index) => (
                        <tr key={scholarship?._id || index}>
                            <th>{index + 1}</th>
                            <td>{scholarship?.universityName}</td>
                            <td>{scholarship?.scholarshipCategory}</td>
                            <td>{scholarship?.subject}</td>
                            <td>{scholarship?.applicantPhoneNumber}</td>
                            <td>{scholarship?.applicationStatus}</td>
                            <td className="flex gap-2">
                            <button onClick={() => openDetails(scholarship)} className="btn btn-sm btn-info text-white tooltip" data-tip="Details">
                                <FaEye />
                            </button>
                            <Link onClick={() => {handleFeedback(scholarship)}} className="btn btn-sm btn-warning text-white tooltip" data-tip="Feedback">
                                <MdFeedback />
                            </Link>
                            <button className="btn btn-sm btn-error text-white tooltip" data-tip="Cancel">
                                <MdCancel />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>


            {isOpen && (
            <dialog id="feedback-modal" className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Give Feedback!</h3>
                    <textarea
                        // {...register("message", { required: "Message is required" })}
                        rows="4"
                        className="textarea textarea-bordered w-full"
                        placeholder="Your feedback..."
                        defaultValue={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                    <div className="modal-action flex items-center justify-between">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => setIsOpen(false)} className="btn">Close</button>
                        </form>
                        <button onClick={handleAddFeedback} className='btn btn-secondary text-base-100'>Add Feedback</button>
                    </div>
                </div>
            </dialog>
            )}
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

                {selected?.applicantPhotoURL && (
                    <img
                    src={selected?.applicantPhotoURL}
                    alt={selected.universityName}
                    className="mt-4 w-20 h-20 rounded-full mx-auto shadow"
                    />
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                    <span className="font-medium">University Name:</span>{" "}
                    {selected.universityName}
                    </p>
                    <p>
                    <span className="font-medium">Applicant Phone Number:</span> {selected.applicantPhoneNumber}
                    </p>
                    <p>
                    <span className="font-medium">Scholarship:</span> {selected.scholarshipCategory}
                    </p>
                    <p>
                    <span className="font-medium">Applicant Gender:</span> {selected.applicantGender}
                    </p>
                    <p>
                    <span className="font-medium">subject:</span> {selected.subject}
                    </p>
                    <p>
                    <span className="font-medium">SSC Result:</span> {selected.sscResult}
                    </p>
                    <p>
                    <span className="font-medium">Applying Degree:</span> {selected.applyingDegree}
                    </p>
                    <p>
                    <span className="font-medium">HSC Result:</span>{" "}
                    {selected.hscResult}
                    </p>
                    <p>
                    <span className="font-medium">Apply Date:</span>{" "}
                    {selected.currentDate}
                    </p>
                    <p>
                    <span className="font-medium">Study Gap:</span>{" "}
                    {selected.studyGap ? `${selected.studyGap}` : "N/A"}
                    </p>
                    <p className="col-span-2">
                    <span className="font-medium">Address:</span>{" "}
                    {selected.applicantAddress}
                    </p>
                </div>
            </div>
            )}
            </form>
        </dialog>
    </div>
    );
};

export default AllAppliedScholarship;