import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useScholarshipRating = (id) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ['scholarReviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?scholarshipId=${id}`);
            return res.data;
        },
        // enabled: !!id, // only fetch when scholarshipId is available
    });
};

export default useScholarshipRating;