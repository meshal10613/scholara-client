import React from "react";
import CountUp from "react-countup";
import { GraduationCap, Users, DollarSign, School } from "lucide-react";

const Impact = () => {
    const impactData = [
        {
            id: 1,
            title: "Listed Scholarships",
            number: 500,
            suffix: "+",
            icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
            color: "bg-blue-50",
        },
        {
            id: 2,
            title: "Students Helped",
            number: 2000,
            suffix: "+",
            icon: <Users className="w-6 h-6 text-green-600" />,
            color: "bg-green-50",
        },
        {
            id: 3,
            title: "Total Funding",
            number: 1.2,
            suffix: "M+",
            prefix: "$",
            decimals: 1,
            icon: <DollarSign className="w-6 h-6 text-amber-600" />,
            color: "bg-amber-50",
        },
        {
            id: 4,
            title: "Partner Universities",
            number: 500,
            suffix: "+",
            icon: <School className="w-6 h-6 text-purple-600" />,
            color: "bg-purple-50",
        },
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Text */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Making a Real Difference
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We are committed to breaking financial barriers and
                        connecting students with global opportunities.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {impactData.map((item) => (
                        <div
                            key={item.id}
                            className="relative group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2"
                        >
                            {/* Icon Container */}
                            <div
                                className={`mb-6 p-4 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}
                            >
                                {item.icon}
                            </div>

                            {/* Number */}
                            <div className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
                                {item.prefix}
                                <CountUp
                                    end={item.number}
                                    duration={2.5}
                                    decimals={item.decimals || 0}
                                    enableScrollSpy={true}
                                    scrollSpyOnce={true}
                                />
                                {item.suffix}
                            </div>

                            {/* Title */}
                            <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">
                                {item.title}
                            </p>

                            {/* Subtle Decorative Background Element */}
                            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-transparent to-gray-50 rounded-br-2xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;
// import CountUp from 'react-countup';

// const Impact = () => {
//     const impact = [
//         {
//             id: 1,
//             "title": "Listed Scholarships",
//             "number": 500,
//         },
//         {
//             id: 2,
//             "title": "Students helped",
//             "number": 2000,
//         },
//         {
//             id: 3,
//             "title": "Total funding",
//             "number": 1200000,
//         },
//         {
//             id: 4,
//             "title": "Affiliated Universities",
//             "number": 500,
//         }
//     ]
//     return (
//         <div>
//             <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 my-10'>
//                 {
//                     impact.map((i) => (
//                         <div key={i.id} className='w-52 h-36 mx-auto bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-2'>
//                             <h2 className='text-3xl font-bold'>
//                                 <CountUp
//                                     end={i.number}
//                                     duration={5}
//                                 />+
//                             </h2>
//                             <h3 className='text-base font-semibold'>{i.title}</h3>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     );
// };

// export default Impact;
