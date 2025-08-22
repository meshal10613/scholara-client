import React from 'react';
import { Link } from 'react-router';

const TopScholarship = ({topS}) => {
    return (
        <section className="px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Top Scholarships</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topS.map((scholarship) => (
                <div key={scholarship._id} className="card bg-white shadow-xl w-80 mx-auto">
                    <figure className="px-4 pt-4">
                    <img
                        src={scholarship?.universityImage}
                        alt={scholarship?.universityName}
                        className="h-24 object-contain"
                    />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">{scholarship?.scholarshipName}</h3>
                        <p className="text-sm text-primary">{scholarship?.universityName} ({scholarship?.universityCountry})</p>
                        <p className="text-sm text-primary">Deadline: {scholarship?.applicationDeadline}</p>
                        <p className="text-sm text-primary">Application Fee: ${scholarship.applicationFees}</p>
                        <Link to={`/scholarshipDetails/${scholarship._id}`} className='btn btn-block border-none bg-secondary text-base-100'>See More</Link>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
};

export default TopScholarship;