import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCountCollections = () => {
    const axiosSecure = useAxiosSecure();
    return useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-stats`);
            return res.data;
        },
        // enabled: !!scholarshipId, // only fetch when scholarshipId is available
    });
};

export default useCountCollections;