import React from 'react';
import Loading from '../../../Components/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuthContext from '../../../Hooks/useAuthContext';

const PaymentHistory = () => {
    const {user} = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const {data: payment = [], isLoading} = useQuery({
        queryKey: ["payment-history", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/appliedScholarships`);
            return res.data;
        }
    });

    
    if(isLoading || !user){
        return <Loading/>;
    };
    return (
    <div className="overflow-x-auto">
        <table className="table w-full">
            <thead className="bg-secondary text-base-100">
                <tr>
                <th>#</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>University Name</th>
                <th>Scholarship</th>
                <th>Applicant Number</th>
                <th>Payment</th>
                </tr>
            </thead>
            <tbody>
                {payment?.map((scholarship, index) => (
                <tr key={scholarship?._id || index}>
                    <th>{index + 1}</th>
                    <td>{scholarship?.userName}</td>
                    <td>{scholarship?.userEmail}</td>
                    <td>{scholarship?.universityName}</td>
                    <td>{scholarship?.scholarshipCategory}</td>
                    <td>{scholarship?.applicantPhoneNumber}</td>
                    <td>
                        {
                            parseInt(scholarship?.applicationFees) + parseInt(scholarship?.serviceCharge)
                        }
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default PaymentHistory;