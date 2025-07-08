import React from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import Logo from '../../Components/Shared/Logo';
import loginImg from '../../assets/register.json'
import useAuthContext from '../../Hooks/useAuthContext';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const Login = () => {
    const {loginUser, setUser, loginWithGoogle} = useAuthContext();
    const axiosInstance = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        
        loginUser(email, password)
        .then(async(res) => {
            const user = res.user;
            setUser(user);
            const serverData = {
                email,
                lastSignInTime: new Date(user?.metadata?.lastSignInTime).toLocaleString()
            };
            const userRes = await axiosInstance.post("/users", serverData);
            if(userRes.data.modifiedCount){
                Swal.fire({
                    icon: "success",
                    title: "Congratulations!",
                    text: `Sign in successfully`,
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
            });
        })
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
        .then(async(res) => {
            const user = res.user;
            const serverData = {
                displayName: user?.displayName,
                email: user?.email,
                role: "user", //default
                creationTime: new Date(user?.metadata?.creationTime).toLocaleString(),
                lastSignInTime: new Date(user?.metadata?.lastSignInTime).toLocaleString(),
            };
            const userRes = await axiosInstance.post("/users", serverData);
            if(userRes.data.insertedId || userRes.data.modifiedCount){
                Swal.fire({
                    icon: "success",
                    title: "Congratulations!",
                    text: `Sign ${userRes.data.insertedId ? "up" : "in"} successfully`,
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
            });
        });
    };
    return (
        <div className=''>
            <div className="flex items-center justify-center">
                <div className='min-w-md flex flex-col items-center gap-10 flex-1'>
                    <Logo/>
                    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Welcome Back
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email"
                                        }
                                    })}
                                    className={`w-full mt-1 p-3 border rounded-xl
                                        ${errors.email ? "border-red-500" : "border-gray-300 dark:border-slate-600"}`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className={`w-full mt-1 p-3 border rounded-xl
                                        ${errors.password ? "border-red-500" : "border-gray-300 dark:border-slate-600"}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-block text-base-100 bg-secondary"
                            >
                                Log In
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            Don’t have an account?
                            <Link to="/register" className="ml-1 text-primary hover:underline">
                                Register
                            </Link>
                        </p>
                        <div className='divider'>Or</div>
                        {/* Google */}
                        <button onClick={handleGoogleLogin} className="btn btn-block bg-white text-black border-[#e5e5e5] mb-2">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                        </button>
                        {/* GitHub
                        <button className="btn btn-block bg-black text-white border-black">
                        <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                        Login with GitHub
                        </button> */}
                    </div>
                </div>
                <div className='hidden xl:block flex-1 bg-primary'>
                    <Lottie animationData={loginImg} loop={true} className='w-fit'/>
                </div>
            </div>
        </div>
    );
};

export default Login;