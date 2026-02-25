import React from 'react';
import Banner from '../Components/Banner';
import TopScholarship from '../Components/TopScholarship';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Components/Loading';
import HowItWorks from '../Components/HowItWorks';
import FaqSection from '../Components/FaqSection';
import NewsLetter from '../Components/NewsLetter';
import Impact from '../Components/Impact';
import { Blog } from '../Components/Blog';
import { Team } from '../Components/Team';

const Home = () => {
    const axiosInstance = useAxios();
    const { data: topS = [], isLoading } = useQuery({
        queryKey: ["topS",],
        queryFn: async() => {
            const res = await axiosInstance.get(`/scholarships`);
            return res.data;
        }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scholarships = topS
        ?.filter((item) => {
            if (!item.applicationDeadline) return false;
            const deadlineDate = new Date(item.applicationDeadline);
            return deadlineDate >= today;
        })
        .slice(0, 8);

    if(isLoading){
        return <Loading/>;
    };

    return (
        <div className=''>
            <Banner/>
            <Impact/>
            <TopScholarship topS={scholarships}/>
            <HowItWorks/>
            <FaqSection/>
            <Blog/>
            <Team/>
            {/* <NewsLetter/> */}
        </div>
    );
};

export default Home;