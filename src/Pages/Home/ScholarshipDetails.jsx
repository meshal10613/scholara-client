import React from 'react';
import Loading from '../../Components/Loading';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useScholarshipRating from '../../Hooks/useScholarshipRating';

const scholarshipshipDetails = () => {
    const {id} = useParams();
    const axiosInstance = useAxiosSecure();
    const {data: scholarship = [], isLoading} = useQuery({
        queryKey: ["scholarship"],
        queryFn: async() => {
            const res = await axiosInstance.get(`/scholarships/${id}`);
            return res.data;
        }
    });
    const {data} = useScholarshipRating(scholarship._id);

    if(isLoading || !data){
        return <Loading/>;
    };
    return (
        <div>
            <div>
                <div className="mx-auto p-4">
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="p-4">
                        <img
                            src={scholarship?.universityImage}
                            alt={scholarship?.universityName}
                            className="h-[300px] object-contain"
                        />
                        </figure>
                        <div className="card-body">
                        <h2 className="card-title text-2xl font-bold">{scholarship?.universityName}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                            <p className="text-lg"><span className="font-semibold">🎓 scholarship Category:</span> {scholarship?.scholarshipCategory}</p>
                            <p className="text-lg"><span className="font-semibold">📍 Location:</span> {scholarship?.universityCity}, {scholarship?.universityCountry}</p>
                            <p className="text-lg"><span className="font-semibold">🗂️ Subject:</span> {scholarship?.subjectCategory}</p>
                            <p className="text-lg"><span className="font-semibold">📅 Deadline:</span> {scholarship?.applicationDeadline}</p>
                            <p className="text-lg"><span className="font-semibold">🕓 Posted:</span> {scholarship?.postDate}</p>
                            </div>
                            <div>
                                {scholarship?.stipend && <p className="text-lg"><span className="font-semibold">💰 Stipend:</span> {scholarship?.stipend}</p>}
                                <p className="text-lg"><span className="font-semibold">💳 Application Fees:</span> 
                                {`${scholarship?.applicationFees}` || "None"}</p>
                                <p className="text-lg"><span className="font-semibold">🔧 Service Charge:</span> {scholarship?.serviceCharge || "No charge"}</p>
                                <p className='text-lg'><span className="font-semibold">⭐ Rating</span> {data.averageRating}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-bold">📝 scholarship Description</h3>
                            <p className="text-justify text-lg">{scholarship?.scholarshipDescription}</p>
                        </div>

                        <div className="card-actions mt-6">
                            <Link to={`/applyScholarship/${scholarship._id}`} className="btn btn-block border-none bg-secondary text-base-100">Apply scholarship</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default scholarshipshipDetails;