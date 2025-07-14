import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useScholarshipRating = (scholarshipId) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ['scholarshipRating', scholarshipId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/average-rating`, {
                params: { scholarshipId },
            });
        return res.data;
        },
        // enabled: !!scholarshipId, // only fetch when scholarshipId is available
    });
};

export default useScholarshipRating;