import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuthContext from '../../Hooks/useAuthContext';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyProfile = () => {
    const {user, signOutUser} = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {data: people = [], isLoading} = useQuery({
        queryKey: ["my-profile", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    
    if(isLoading){
        return <Loading/>;
    };

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
    };

    const handleUpdateProfile = () => {
        Swal.fire({
            title: "Sorry!",
            text: "Update profile hasn't implemented yet",
            icon: "error",
            confirmButtonColor: "#088395"
        });
    };

    return (
        <div className="max-w-full flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                <img
                src={user?.photoURL}
                alt={people.displayName}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-secondary"
                />
                {(people.role === 'admin' || people.role === 'moderator') && (
                    <span className="inline-block bg-accent text-primary text-sm font-medium px-4 py-1 rounded-full">
                        {people.role.toUpperCase()}
                    </span>
                )}
                <h1 className="text-2xl font-bold mb-2">{people.displayName}</h1>
                <p className="text-gray-600 mb-4">{people.email}</p>

                {/* Account Metadata */}
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                    <strong>Account Created:</strong>{' '}
                    {people?.creationTime.split(",")[0]}
                </p>
                <p>
                    <strong>Last Login:</strong>{' '}
                    {people?.lastSignInTime.split(",")[0]}
                </p>
                </div>

                <div className="mt-6 flex flex-row-reverse items-center justify-between gap-3">
                    <button
                        onClick={() => handleUpdateProfile()}
                        className="bg-secondary text-white py-2 px-4 rounded cursor-pointer"
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={handleLogOut}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;