// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router';
// import Logo from './Logo';
// import useAuthContext from '../../Hooks/useAuthContext';
// import Swal from 'sweetalert2';

// const Navbar = () => {
//     const {user, signOutUser} = useAuthContext();
//     const navigate = useNavigate();
//     const links = <>
//         <li><NavLink to="/">Home</NavLink></li>
//         <li><NavLink to="/all-scholarship">All Scholarship</NavLink></li>
//         <li><NavLink to="/dashboard/my-profile">Dashboard</NavLink></li>
//     </>;

//     const handleLogOut = () => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#088395",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, logout!",
//         })
//         .then((result) => {
//             if (result.isConfirmed) {
//                 signOutUser()
//                 .then(() => {
//                     Swal.fire({
//                         title: "Logout!",
//                         text: "Your have logout successfully",
//                         icon: "success",
//                         confirmButtonColor: "#088395"
//                     });
//                     navigate("/");
//                 })
//                 .catch((error) => {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: `${error.message}`,
//                     });
//                 })
//             }
//         });
//     }

//     return (
//         <div className="navbar px-0 2xl:px-[7%] bg-primary text-accent pr-1 md:pr-0 sticky top-0 z-20">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                 <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                 </div>
//                 <ul
//                     tabIndex={0}
//                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow navlinksm">
//                     {links}
//                 </ul>
//                 </div>
//                 <Logo/>
//             </div>
//             <div className="navbar-end items-center gap-2">
//                 <ul className="menu menu-horizontal px-1 navlinklg hidden md:flex">
//                     {links}
//                 </ul>
//                 {
//                     user ?
//                     <div className='flex items-center gap-2'>
//                         <h2 className='tooltip tooltip-bottom' data-tip={user?.displayName}>{user?.displayName.split(" ")[0]}</h2>
//                         <img src={user?.photoURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 rounded-full border cursor-pointer'/>
//                         <button onClick={handleLogOut} className='btn border-none bg-secondary text-base-100'>Logout</button>
//                     </div> :
//                     <>
//                         <Link to='/login' className='btn border-none bg-secondary text-base-100'>Login</Link>
//                         {/* <Link to='/register' className='btn border-none bg-secondary text-base-100'>Register</Link> */}
//                     </>
//                 }
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import {
    Home,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    User,
    Settings,
    ChevronDown,
    Menu,
} from "lucide-react";

const Navbar = () => {
    const { user, signOutUser } = useAuthContext();
    const navigate = useNavigate();

    const links = [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        {
            name: "All Scholarship",
            path: "/all-scholarship",
            icon: <GraduationCap size={18} />,
        },
        {
            name: "Dashboard",
            path: "/dashboard/my-profile",
            icon: <LayoutDashboard size={18} />,
        },
    ];

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your session.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#088395",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser().then(() => {
                    Swal.fire({
                        title: "Logged Out",
                        text: "You have successfully logged out.",
                        icon: "success",
                        confirmButtonColor: "#088395",
                    });
                    navigate("/");
                });
            }
        });
    };

    return (
        <div className="sticky top-0 z-50 w-full px-4 md:px-8 lg:px-[7%] bg-primary/90 backdrop-blur-md border-b border-white/10">
            <div className="navbar p-0 min-h-[70px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden text-accent mr-2"
                        >
                            <Menu size={24} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-56 p-2 shadow-2xl border border-gray-100 text-gray-800"
                        >
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className="flex items-center gap-3 py-3"
                                    >
                                        {link.icon} {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Logo />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-8 px-1">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `
                                        flex items-center gap-2 text-sm font-medium transition-all duration-300 relative py-2
                                        ${isActive ? "text-secondary" : "text-accent/80 hover:text-secondary"}
                                        ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary' : ""}
                                    `}
                                >
                                    {link.icon}
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end gap-4">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-2 p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
                            >
                                <div className="avatar">
                                    <div className="w-9 h-9 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-1">
                                        <img
                                            src={user?.photoURL}
                                            referrerPolicy="no-referrer"
                                            alt="User profile"
                                        />
                                    </div>
                                </div>
                                {/* <div className="hidden md:block text-left">
                                    <p className="text-xs font-bold text-accent leading-none">
                                        {user?.displayName?.split(" ")[0]}
                                    </p>
                                    <p className="text-[10px] text-accent/60">
                                        Verified
                                    </p>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className="text-accent/60"
                                /> */}
                            </div>

                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-64 border border-gray-100 text-gray-800"
                            >
                                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                    <p className="font-bold text-gray-900">
                                        {user?.displayName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <li>
                                    <Link
                                        to="/dashboard/my-profile"
                                        className="py-3 flex gap-3"
                                    >
                                        <User size={18} /> My Profile
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        to="/dashboard/settings"
                                        className="py-3 flex gap-3"
                                    >
                                        <Settings size={18} /> Settings
                                    </Link>
                                </li> */}
                                <div className="divider my-0"></div>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="py-3 text-red-600 hover:bg-red-50 flex gap-3"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="btn btn-ghost text-accent hover:bg-white/10 hidden sm:flex"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/login"
                                className="btn bg-secondary hover:bg-secondary/90 border-none text-white px-8 rounded-xl shadow-lg shadow-secondary/20"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
