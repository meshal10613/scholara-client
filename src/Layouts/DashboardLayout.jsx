import React, { useState } from 'react';
import { FaClipboardList, FaComments, FaUsersCog } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';
import Logo from '../Components/Shared/Logo';
import { MdManageSearch, MdPerson, MdPostAdd, MdRateReview } from 'react-icons/md';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { RiFileSettingsLine, RiListCheck2 } from 'react-icons/ri';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading';
import useAuthContext from '../Hooks/useAuthContext';

const DashboardLayout = () => {
    const {user} = useAuthContext();
    const {role, roleLoading} = useUserRole();
    const [dash, setDash] = useState("My Profile");

    if(roleLoading || !user){
        return <Loading/>;
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
            {/* Navbar */}
                <div className="navbar bg-base-300 w-full md:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 md:hidden">{dash}</div>
                </div>
                {/* page content here */}
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-64 2xl:w-80 p-4 dashlink">
                    <Logo/>
                    {/* Sidebar content here */}
                    {
                        !roleLoading && role==="user" &&
                        <>
                            <li>
                                <NavLink to="/dashboard/my-profile" onClick={() => setDash("My Profile")}>
                                    <MdPerson className="inline-block mr-2" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-application" onClick={() => setDash("My Application")}>
                                    <FaClipboardList className="inline-block mr-2" />
                                    My Application
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-reviews" onClick={() => setDash("My Reviews")}>
                                    <MdRateReview className="inline-block mr-2" />
                                    My Reviews
                                </NavLink>
                            </li>
                        </>
                    }
                    {
                        !roleLoading && role==="moderator" &&
                        <>
                            <li>
                                <NavLink to="/dashboard/my-profile" onClick={() => setDash("My Profile")}>
                                    <MdPerson className="inline-block mr-2" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-scholarships" onClick={() => setDash("Manage Scholarship")}>
                                    <RiFileSettingsLine className="inline-block mr-2" />
                                    Manage Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-reviews" onClick={() => setDash("All Reviews")}>
                                    <FaComments className="inline-block mr-2" />
                                    All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-applied-scholarship" onClick={() => setDash("All Applied Scholarship")}>
                                    <HiOutlineClipboardCheck className="inline-block mr-2" />
                                    All Applied Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-scholarship" onClick={() => setDash("Add Scholarship")}>
                                    <MdPostAdd className="inline-block mr-2" />
                                    Add Scholarship
                                </NavLink>
                            </li>
                        </>
                    }
                    {
                        !roleLoading && role==="admin" &&
                        <>
                            <li>
                                <NavLink to="/dashboard/my-profile" onClick={() => setDash("My Profile")}>
                                    <MdPerson className="inline-block mr-2" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-scholarship" onClick={() => setDash("Add Scholarship")}>
                                    <MdPostAdd className="inline-block mr-2" />
                                    Add Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-scholarships" onClick={() => setDash("Manage Scholarship")}>
                                    <RiFileSettingsLine className="inline-block mr-2" />
                                    Manage Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-applied-scholarship" onClick={() => setDash("All Applied Scholarship")}>
                                    <HiOutlineClipboardCheck className="inline-block mr-2" />
                                    All Applied Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-reviews" onClick={() => setDash("All Reviews")}>
                                    <FaComments className="inline-block mr-2" />
                                    All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users" onClick={() => setDash("Manage Users")}>
                                    <FaUsersCog className="inline-block mr-2" />
                                    Manage Users
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;