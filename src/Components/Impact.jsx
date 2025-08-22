import React from 'react';
import CountUp from 'react-countup';

const Impact = () => {
    const impact = [
        {
            id: 1,
            "title": "Listed Scholarships",
            "number": 500,
        },
        {
            id: 2,
            "title": "Students helped",
            "number": 2000,
        },
        {
            id: 3,
            "title": "Total funding",
            "number": 1200000,
        },
        {
            id: 4,
            "title": "Affiliated Universities",
            "number": 500,
        }
    ]
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 my-10'>
                {
                    impact.map((i) => (
                        <div key={i.id} className='w-52 h-36 mx-auto bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-2'>
                            <h2 className='text-3xl font-bold'>
                                <CountUp
                                    end={i.number}
                                    duration={5}
                                />+
                            </h2>
                            <h3 className='text-base font-semibold'>{i.title}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Impact;