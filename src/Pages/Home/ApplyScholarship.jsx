import React from 'react';
import { useParams } from 'react-router';
import Loading from '../../Components/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_publishable_key)

const ApplyScholarship = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {data: scholarship = [], isLoading} = useQuery({
        queryKey: ["scholarship"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm scholarship={scholarship} id={id}/>
            </Elements>
        </div>
    );
};

export default ApplyScholarship;