// import React, { useState } from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../../Components/Loading';
// import { FaTrashAlt } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import errorLogo from '../../../assets/error.json';
// import Lottie from 'lottie-react';
// import useAuthContext from '../../../Hooks/useAuthContext';

// const ManageUsers = () => {
//     const {deleteCurrentUser} = useAuthContext();
//     const [filterRole, setFilterRole] = useState("");
//     const axiosInstance = useAxiosSecure();
//     const { data: users = [], isLoading, refetch } = useQuery({
//         queryKey: ["users", filterRole],
//         queryFn: async() => {
//             const res = await axiosInstance.get(`/users?role=${filterRole}`);
//             return res.data;
//         }
//     });

//     if(isLoading){
//         return <Loading/>;
//     };

//     const handleFilterRole = (role) => {
//         setFilterRole(role);
//         refetch();
//     };

//     const handleRoleChange = async(id, value) => {
//         try {
//             await axiosInstance.patch(`/users/${id}`, { role: value });
//             Swal.fire("Success", `User role updated to ${value}`, "success");
//             refetch();
//         } catch (error) {
//             Swal.fire("Error", "Failed to update role", error.message);
//         }
//     };

//     const handleDelete = (id) => {
//         Swal.fire({
//         title: "Are you sure?",
//         text: "Delete this user account permanently?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete!",
//         confirmButtonColor: "#088395",
//         cancelButtonColor: "#d33",
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//         try {
//             const res = await axiosInstance.delete(`/users/${id}`);
//             if (res.data.deletedCount) {
//                 deleteCurrentUser()
//                 .then(() => {
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "User has been deleted",
//                         icon: "success",
//                         confirmButtonColor: "#088395"
//                     });
//                     refetch();
//                 })
//                 .then(() => {
//                     Swal.fire("Error", "Something went wrong.", "error");
//                 })
//             }
//         } catch (err) {
//             console.error(err);
//             Swal.fire("Error", "Something went wrong.", "error");
//         }
//         }
//     });
//     };

//     return (
//         <div className="p-4">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Manage Users</h1>
//                 <select
//                 className="select select-bordered"
//                 defaultValue={filterRole}
//                 // onChange={(e) => setFilterRole(e.target.value)}
//                 onClick={(e) => handleFilterRole(e.target.value)}
//                 >
//                 <option value="">All Roles</option>
//                 <option value="user">User</option>
//                 <option value="moderator">Moderator</option>
//                 <option value="admin">Admin</option>
//                 </select>
//             </div>

//             {
//                 users.length === 0 ?
//                 <div className='flex flex-col items-center justify-center gap-3 max-h-screen'>
//                     <Lottie animationData={errorLogo} loop={true} className='w-98'/>
//                 </div> :
//                 <div className="overflow-x-auto">
//                     <table className="table w-full min-w-[600px] text-sm sm:text-base">
//                     <thead className="bg-secondary text-base-100">
//                         <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Creation Time</th>
//                         <th>Role</th>
//                         <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                         <tr key={user._id}>
//                             <th>{index + 1}</th>
//                             <td>{user.displayName}</td>
//                             <td>{user.email}</td>
//                             <td>{new Date(user.creationTime).toLocaleDateString()}</td>
//                             <td className=''>
//                                 <select
//                                     className="select select-sm select-bordered w-fit max-w-xs"
//                                     value={user.role}
//                                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                                 >
//                                     <option value="user">User</option>
//                                     <option value="moderator">Moderator</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </td>
//                             <td>
//                             <button
//                                 onClick={() => handleDelete(user._id)}
//                                 className="btn btn-sm btn-error text-white"
//                             >
//                                 <FaTrashAlt />
//                             </button>
//                             </td>
//                         </tr>
//                         ))}
//                     </tbody>
//                     </table>
//                 </div>
//             }
//         </div>
//     );
// };

// export default ManageUsers;

import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import { FaTrashAlt, FaUserShield, FaUsers, FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";
import errorLogo from "../../../assets/error.json";
import Lottie from "lottie-react";

const ManageUsers = () => {
    const [filterRole, setFilterRole] = useState("");
    const axiosInstance = useAxiosSecure();

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users", filterRole],
        queryFn: async () => {
            const res = await axiosInstance.get(
                filterRole ? `/users?role=${filterRole}` : "/users",
            );
            return res.data;
        },
    });

    const handleRoleChange = async (user, newRole) => {
        // optimistically update UI or wait for response
        if (user.role === newRole) return;

        Swal.fire({
            title: "Change Role?",
            text: `Are you sure you want to change ${user.displayName}'s role to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Update",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.patch(`/users/${user._id}`, {
                        role: newRole,
                    });
                    Swal.fire({
                        icon: "success",
                        title: "Role Updated",
                        text: `User is now a ${newRole}`,
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    refetch();
                } catch (error) {
                    Swal.fire("Error", "Failed to update role", "error");
                }
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete User?",
            text: "This action will permanently remove the user from the database.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosInstance.delete(`/users/${id}`);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been removed.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to delete user.", "error");
                }
            }
        });
    };

    // Helper to get initials
    // const getInitials = (name) => {
    //     if (!name) return "U";
    //     return name
    //         .split(" ")
    //         .map((n) => n[0])
    //         .join("")
    //         .toUpperCase()
    //         .slice(0, 2);
    // };

    // Helper for role badge colors
    const getRoleColor = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-700 border-purple-200";
            case "moderator":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-green-100 text-green-700 border-green-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <FaUserShield className="text-secondary" />
                            Manage Users
                        </h1>
                        <p className="text-gray-500 mt-1 hidden md:block">
                            View, manage, and organize system users
                        </p>
                    </div>

                    {/* Filter & Stats */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-xs text-gray-400 uppercase font-semibold">
                                Total Users
                            </span>
                            <span className="text-2xl font-bold text-gray-800">
                                {users.length}
                            </span>
                        </div>

                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                className="select select-bordered pl-10 pr-10 w-full md:w-48 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading && <Loading />}

                {/* Content Section */}
                {!isLoading && users.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-64 h-64">
                            <Lottie animationData={errorLogo} loop={true} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mt-4">
                            No Users Found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your filters.
                        </p>
                        <button
                            onClick={() => setFilterRole("")}
                            className="mt-4 btn btn-ghost text-blue-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* Table Head */}
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="py-4 pl-6">
                                            User Profile
                                        </th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined Date</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-blue-50/30 transition-colors duration-200"
                                        >
                                            {/* Name & Avatar */}
                                            <td className="pl-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 ring ring-offset-2 ring-gray-100">
                                                            <span className="text-sm font-bold">
                                                                {getInitials(
                                                                    user.displayName,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div> */}
                                                    <div>
                                                        <div className="font-bold text-gray-800">
                                                            {user.displayName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="text-gray-600 font-medium">
                                                {user.email}
                                            </td>

                                            {/* Role Selector */}
                                            <td>
                                                <div
                                                    className={`badge ${getRoleColor(user.role)} gap-2 p-3 font-semibold border rounded-lg`}
                                                >
                                                    <select
                                                        className="bg-transparent border-none outline-none text-xs uppercase cursor-pointer focus:ring-0"
                                                        value={user.role}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user,
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value="user"
                                                            className="text-gray-800 bg-white"
                                                        >
                                                            User
                                                        </option>
                                                        <option
                                                            value="moderator"
                                                            className="text-gray-800 bg-white"
                                                        >
                                                            Moderator
                                                        </option>
                                                        <option
                                                            value="admin"
                                                            className="text-gray-800 bg-white"
                                                        >
                                                            Admin
                                                        </option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="text-gray-500 text-sm">
                                                {user.creationTime
                                                    ? new Date(
                                                          user.creationTime,
                                                      ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                              year: "numeric",
                                                              month: "short",
                                                              day: "numeric",
                                                          },
                                                      )
                                                    : "N/A"}
                                            </td>

                                            {/* Actions */}
                                            <td className="text-center">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                    className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 hover:text-red-700 transition-all rounded-lg"
                                                    title="Delete User"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
