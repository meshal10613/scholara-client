import React from 'react';
import emptyData from '../assets/empty-state.json'
import Lottie from 'lottie-react';

const EmptyState = () => {
    return (
        <div className='w-fit mx-auto'>
            <Lottie animationData={emptyData} loop={true} className='w-98'/>
        </div>
    );
};

export default EmptyState;