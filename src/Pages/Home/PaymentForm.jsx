import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { MdError } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentForm = ({scholarship, id}) => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const elements = useElements();
    const [error, setError] = useState();
    const applicationFees = parseInt(scholarship?.applicationFees);
    const serviceCharge = parseInt(scholarship?.serviceCharge);
    const amount = applicationFees + serviceCharge;
    const amountInCents = amount * 100;

    console.log(scholarship)

    const handlePayment = async(e) => {
        e.preventDefault();

        setError("");
        if(!stripe || !elements){
            return;
        };

        const card = elements.getElement(CardElement);
        if(card == null){
            return;
        };

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
        }else{
            setError("");
            
            //step-2: create payment intent
            const res = await axiosSecure.post(`/create-payment-intent`, {
                amountInCents,
                id
            });
            const clientSecret = res.data.clientSecret;
            console.log(clientSecret)
            
            // const result = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: elements.getElement(CardElement),
            //         billing_details: {
            //             name: parcel?.senderName,
            //             email: parcel?.created_by,
            //         }
            //     }
            // });
        }
    };

    return (
        <div className='p-10'>
            <form onSubmit={handlePayment} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto '>
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
                <button type="submit" className="btn btn-secondary text-base-100 w-full" disabled={!stripe}>
                    Pay ${amount}
                </button>
                {
                    error && 
                    <p className='text-red-500 text-center flex items-center justify-center gap-1'><MdError size={20}/>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;