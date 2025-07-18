import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import Loading from '../Components/Loading';
import { Link } from 'react-router';

const AllScholarship = () => {
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const numberOfPage = Math.ceil(count / itemsPerPage);
    //shortcut
    const pages = [...Array(numberOfPage).keys()];

    useEffect( () =>{
        fetch('http://localhost:3000/scholarshipsCount')
        .then(res => res.json())
        .then(data => {
            setCount(data.count),
            setItemsPerPage(4)
        })
    }, [])

    const axiosInstance = useAxios();
    const {data: scholarships = [], isLoading} = useQuery({
        queryKey: ["scholarships", itemsPerPage, currentPage],
        queryFn: async() => {
            const res = await axiosInstance.get(`/scholarships?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    });

    if(isLoading){
        return <Loading/>;
    };

    const handleSearch = () => {
        console.log(search)
    };

    const handlePrevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1);
        }
    };

    return (
    <div className="w-full mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

        {/* Search Box */}
        <div className="flex items-center gap-4 mb-6 justify-center mx-5 md:mx-0">
            <input
            type="text"
            placeholder="Search by university, subject, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            />
            <button
            className="btn border-none bg-secondary text-base-100"
            onClick={handleSearch}
            >
            Search
            </button>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mx-5 md:mx-0">
            {scholarships.length === 0 ? (
            <p className="text-center col-span-full">No scholarships found.</p>
            ) : (
            scholarships.map((sch) => (
                <div key={sch?._id} className="border-2 border-primary rounded-xl p-4 shadow hover:shadow-md transition duration-300">
                <div className="flex flex-col items-center">
                    <img src={sch?.universityImage} referrerPolicy='no-referrer' alt={sch?.universityName} className="w-fit h-40 object-contain rounded-xl" />
                    <h2 className="text-xl font-semibold">{sch?.universityName}</h2>
                </div>

                <p><strong>Category:</strong> {sch?.scholarshipCategory}</p>
                <p><strong>Location:</strong> {sch?.universityCity}, {sch?.universityCountry}</p>
                <p><strong>Deadline:</strong> {new Date(sch?.applicationDeadline).toLocaleDateString()}</p>
                <p><strong>Subject:</strong> {sch?.subjectCategory}</p>
                <p><strong>Application Fees:</strong> {sch?.applicationFees}</p>
                <p><strong>Rating:</strong> ⭐ {sch?.rating}</p>

                <Link to={`/scholarshipDetails/${sch?._id}`}
                    className="btn btn-block mt-4 border-none bg-secondary text-base-100"
                >
                    Scholarship Details
                </Link>
                </div>
            ))
            )}
        </div>

        <div className='flex items-center justify-center gap-2 my-5'>
            {/* <p>currentPage- {currentPage}</p> */}
            <button onClick={handlePrevPage} className='btn'>Prev</button>
            {
                pages.map((page) => <button 
                    className={`${currentPage === page ? `bg-secondary` : undefined} btn`}
                    onClick={() => setCurrentPage(page)} 
                    key={page}>
                        {page + 1}
                </button>)
            }
            <button onClick={handleNextPage} className='btn'>Next</button>
        </div>
    </div>
    );
};

export default AllScholarship;