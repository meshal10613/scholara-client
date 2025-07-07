import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='px-0 2xl:px-[7%]'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;