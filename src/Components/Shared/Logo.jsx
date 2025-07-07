import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="" className='w-12'/>
            <span className='text-2xl font-bold'>Scholara</span>
        </Link>
    );
};

export default Logo;