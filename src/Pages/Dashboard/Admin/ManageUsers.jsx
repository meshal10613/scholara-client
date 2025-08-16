import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import errorLogo from '../../../assets/error.json';
import Lottie from 'lottie-react';
import useAuthContext from '../../../Hooks/useAuthContext';

const ManageUsers = () => {
    const {deleteCurrentUser} = useAuthContext();
    const [filterRole, setFilterRole] = useState("");
    const axiosInstance = useAxiosSecure();
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", filterRole],
        queryFn: async() => {
            const res = await axiosInstance.get(`/users?role=${filterRole}`);
            return res.data;
        }
    });
    
    if(isLoading){
        return <Loading/>;
    };

    const handleFilterRole = (role) => {
        setFilterRole(role);
        refetch();
    };

    const handleRoleChange = async(id, value) => {
        try {
            await axiosInstance.patch(`/users/${id}`, { role: value });
            Swal.fire("Success", `User role updated to ${value}`, "success");
            refetch();
        } catch (error) {
            Swal.fire("Error", "Failed to update role", error.message);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
        title: "Are you sure?",
        text: "Delete this user account permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete!",
        confirmButtonColor: "#088395",
        cancelButtonColor: "#d33",
    }).then(async (result) => {
        if (result.isConfirmed) {
        try {
            const res = await axiosInstance.delete(`/users/${id}`);
            if (res.data.deletedCount) {
                deleteCurrentUser()
                .then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted",
                        icon: "success",
                        confirmButtonColor: "#088395"
                    });
                    refetch();
                })
                .then(() => {
                    Swal.fire("Error", "Something went wrong.", "error");
                })
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong.", "error");
        }
        }
    });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Users</h1>
                <select
                className="select select-bordered"
                defaultValue={filterRole}
                // onChange={(e) => setFilterRole(e.target.value)}
                onClick={(e) => handleFilterRole(e.target.value)}
                >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
                </select>
            </div>

            {
                users.length === 0 ?
                <div className='flex flex-col items-center justify-center gap-3 max-h-screen'>
                    <Lottie animationData={errorLogo} loop={true} className='w-98'/>
                </div> :
                <div className="overflow-x-auto">
                    <table className="table w-full min-w-[600px] text-sm sm:text-base">
                    <thead className="bg-secondary text-base-100">
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Creation Time</th>
                        <th>Role</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.creationTime).toLocaleDateString()}</td>
                            <td className=''>
                                <select
                                    className="select select-sm select-bordered w-fit max-w-xs"
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="btn btn-sm btn-error text-white"
                            >
                                <FaTrashAlt />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default ManageUsers;