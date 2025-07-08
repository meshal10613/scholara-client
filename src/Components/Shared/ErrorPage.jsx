import React from 'react';
import { Link, useRouteError } from 'react-router';
import errorLogo from '../../assets/error.json';
import Lottie from 'lottie-react';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='flex flex-col items-center justify-center gap-3 max-h-screen'>
            <Lottie animationData={errorLogo} loop={true} className='w-98'/>
            <h2 className='text-2xl'>{error.error.message}</h2>
            <Link to='/' className='btn border-none bg-secondary text-base-100'>Home</Link>
        </div>
    );
};

export default ErrorPage;