import axios from 'axios';
import React from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: "https://assignment-12-server-xi-six.vercel.app",
})

const useAxiosSecure = () => {
    const {signOutUser} = useAuthContext();
    const navigate = useNavigate();
    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }), error => {
        return Promise.reject(error);
    };

    axiosInstance.interceptors.response.use(res => {
    return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            signOutUser()
            .then(() => {
                navigate('/login')
            })
            .catch((error) => { console.log(error) })
    }

        return Promise.reject(error);
    })

    return axiosInstance;
};

export default useAxiosSecure;