// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuthContext from '../../Hooks/useAuthContext';
// import Loading from '../../Components/Loading';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router';
// import useUserRole from '../../Hooks/useUserRole';
// import AdminChart from './Admin/AdminChart';
// import useCountCollections from '../../Hooks/useCountCollections';
// import PaymentHistory from './Admin/PaymentHistory';

// const MyProfile = () => {
//     const {user, signOutUser} = useAuthContext();
//     const {role, roleLoading} = useUserRole();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const {data: people = [], isLoading} = useQuery({
//         queryKey: ["my-profile", user?.email],
//         queryFn: async() => {
//             const res = await axiosSecure.get(`/users/${user?.email}`);
//             return res.data;
//         }
//     });

//     const {data} = useCountCollections();

//     if(isLoading || roleLoading || !user || !data){
//         return <Loading/>;
//     };

//     const handleLogOut = () => {
//         Swal.fire({
//                     title: "Are you sure?",
//                     text: "You won't be able to revert this!",
//                     icon: "warning",
//                     showCancelButton: true,
//                     confirmButtonColor: "#088395",
//                     cancelButtonColor: "#d33",
//                     confirmButtonText: "Yes, logout!",
//                 })
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
//     };

//     const handleUpdateProfile = () => {
//         Swal.fire({
//             title: "Sorry!",
//             text: "Update profile hasn't implemented yet",
//             icon: "error",
//             confirmButtonColor: "#088395"
//         });
//     };

//     return (
//         <div className="max-w-full flex flex-col justify-center p-6">
//             <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full mx-auto text-center">
//                 <img
//                 src={user?.photoURL}
//                 alt={people.displayName}
//                 className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-secondary"
//                 />
//                 {(people.role === 'admin' || people.role === 'moderator') && (
//                     <span className="inline-block bg-accent text-primary text-sm font-medium px-4 py-1 rounded-full">
//                         {people.role.toUpperCase()}
//                     </span>
//                 )}
//                 <h1 className="text-2xl font-bold mb-2">{people.displayName}</h1>
//                 <p className="text-gray-600 mb-4">{people.email}</p>

//                 {/* Account Metadata */}
//                 <div className="mt-4 text-sm text-gray-700 space-y-1">
//                 <p>
//                     <strong>Account Created:</strong>{' '}
//                     {people?.creationTime.split(",")[0]}
//                 </p>
//                 <p>
//                     <strong>Last Login:</strong>{' '}
//                     {people?.lastSignInTime.split(",")[0]}
//                 </p>
//                 </div>

//                 <div className="mt-6 flex flex-row-reverse items-center justify-between gap-3">
//                     <button
//                         onClick={() => handleUpdateProfile()}
//                         className="bg-secondary text-white py-2 px-4 rounded cursor-pointer"
//                     >
//                         Update Profile
//                     </button>
//                     <button
//                         onClick={handleLogOut}
//                         className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {
//                 role === "admin" &&
//                 <div className="mt-6">
//                     <AdminChart data={data} />
//                 </div>
//             }

//             {
//                 role === "admin" &&
//                 <div className="mt-6">
//                     <PaymentHistory/>
//                 </div>
//             }
//         </div>
//     );
// };

// export default MyProfile;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    User,
    Mail,
    Calendar,
    LogOut,
    Edit3,
    ShieldCheck,
    Activity,
    CreditCard,
    LayoutDashboard,
    Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuthContext from "../../Hooks/useAuthContext";
import useUserRole from "../../Hooks/useUserRole";
import useCountCollections from "../../Hooks/useCountCollections";
import Loading from "../../Components/Loading";

import AdminChart from "./Admin/AdminChart";
import PaymentHistory from "./Admin/PaymentHistory";

const MyProfile = () => {
    const { user, signOutUser } = useAuthContext();
    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: people = {}, isLoading } = useQuery({
        queryKey: ["my-profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const { data: stats } = useCountCollections();

    if (isLoading || roleLoading || !user) return <Loading />;

    const handleLogOut = () => {
        Swal.fire({
            title: "Sign Out?",
            text: "Are you sure you want to logout of your session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Logout",
            borderRadius: "15px",
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser().then(() => {
                    navigate("/");
                });
            }
        });
    };

    const handleUpdateProfile = () => {
        Swal.fire({
            title: "Coming Soon",
            text: "Profile editing is currently being polished!",
            icon: "info",
            confirmButtonColor: "#6366F1",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* --- HEADER SECTION --- */}
                <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cover Decoration */}
                    <div className="h-32 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                    <div className="px-8 pb-8">
                        <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6">
                            <div className="relative">
                                <img
                                    src={user?.photoURL}
                                    alt={people.displayName}
                                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                                />
                                {role === "admin" && (
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-1.5 rounded-lg shadow-sm border-2 border-white">
                                        <ShieldCheck className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 pb-2 text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        {people.displayName}
                                    </h1>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            role === "admin"
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                    >
                                        {role}
                                    </span>
                                </div>
                                <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                                    <Mail className="w-4 h-4" /> {people.email}
                                </p>
                            </div>

                            <div className="flex gap-3 pb-2 w-full md:w-auto">
                                <button
                                    onClick={handleUpdateProfile}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-sm cursor-pointer"
                                >
                                    <Edit3 className="w-4 h-4" /> Edit Profile
                                </button>
                                <button
                                    onClick={handleLogOut}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-semibold cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Account Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-indigo-500" />{" "}
                                Account Activity
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">
                                            Joined On
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {people?.creationTime?.split(
                                                ",",
                                            )[0] || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">
                                            Last Login
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {people?.lastSignInTime?.split(
                                                ",",
                                            )[0] || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Card */}
                        {/* <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white">
                            <h4 className="font-bold text-lg mb-2">
                                Need Help?
                            </h4>
                            <p className="text-indigo-100 text-sm mb-4">
                                Check our documentation for scholarship guides.
                            </p>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all font-semibold text-sm">
                                View Documentation
                            </button>
                        </div> */}
                        <div className="bg-primary p-6 rounded-3xl shadow-xl shadow-primary/20 text-white relative overflow-hidden group">
                            {/* Decorative background circle */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            <h4 className="font-bold text-xl mb-2 relative z-10">
                                Need Help?
                            </h4>
                            <p className="text-white/80 text-sm mb-6 relative z-10 leading-relaxed">
                                Check our documentation for detailed scholarship
                                guides and application tips.
                            </p>

                            <button className="w-full py-3 bg-secondary rounded-xl backdrop-blur-md transition-all font-bold text-sm uppercase tracking-wider relative z-10 cursor-pointer">
                                View Documentation
                            </button>
                        </div>
                    </div>

                    {/* Main Section: Admin Dashboard / Statistics */}
                    <div className="lg:col-span-2 space-y-8">
                        {role === "admin" ? (
                            <>
                                <AdminChart data={stats} />
                            </>
                        ) : (
                            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Activity className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Welcome back, {people.displayName}!
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    You can track your scholarship applications
                                    in the Applied Scholarships menu.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- FULL WIDTH SECTION --- */}
                {role === "admin" && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <CreditCard className="text-primary" /> Recent
                                Transactions
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                View and manage your scholarship application
                                transactions.
                            </p>
                        </div>
                        <div className="p-2">
                            <PaymentHistory />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
