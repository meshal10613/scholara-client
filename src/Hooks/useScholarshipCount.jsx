import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useScholarshipCount = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['scholarshipCount'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/scholarshipsCount`);
            return res.data;
        },
        // enabled: !!scholarshipId, // only fetch when scholarshipId is available
    });
};

export default useScholarshipCount;