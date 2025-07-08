import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from './Logo';
import useAuthContext from '../../Hooks/useAuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const {user, signOutUser} = useAuthContext();
    const navigate = useNavigate();
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-scholarship">All Scholarship</NavLink></li>
        <li><NavLink to="/dashboard/my-profile">Dashboard</NavLink></li>
    </>;

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#088395",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        })
        .then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                .then(() => {
                    Swal.fire({
                        title: "Logout!",
                        text: "Your have logout successfully",
                        icon: "success",
                        confirmButtonColor: "#088395"
                    });
                    navigate("/");
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.message}`,
                    });
                })
            }
        });
    }

    return (
        <div className="navbar px-0 2xl:px-[7%] bg-primary text-accent pr-1 md:pr-0">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow navlinksm">
                    {links}
                </ul>
                </div>
                <Logo/>
            </div>
            <div className="navbar-end items-center gap-2">
                <ul className="menu menu-horizontal px-1 navlinklg hidden md:flex">
                    {links}
                </ul>
                {
                    user ?
                    <div className='flex items-center gap-2'>
                        <h2 className='tooltip tooltip-bottom' data-tip={user?.displayName}>{user?.displayName.split(" ")[0]}</h2>
                        <img src={user?.photoURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 rounded-full border cursor-pointer'/>
                        <button onClick={handleLogOut} className='btn border-none bg-secondary text-base-100'>Logout</button>
                    </div> :
                    <>
                        <Link to='/login' className='btn border-none bg-secondary text-base-100'>Login</Link>
                        {/* <Link to='/register' className='btn border-none bg-secondary text-base-100'>Register</Link> */}
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;