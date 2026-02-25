import React from "react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
    {
        name: "Oliver Aguilerra",
        role: "Product Manager",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
        name: "Marta Clermont",
        role: "Design Team Lead",
        image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        name: "Anthony Geek",
        role: "CTO, Lorem Inc.",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        name: "Alice Melbourne",
        role: "Human Resources",
        image: "https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        name: "Martin Garix",
        role: "Software Architect",
        image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
        name: "Andrew Larkin",
        role: "Backend Developer",
        image: "https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        name: "Sophie Denmo",
        role: "Designer UI/UX",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
        name: "Benedict Caro",
        role: "Frontend Developer",
        image: "https://images.pexels.com/photos/3931553/pexels-photo-3931553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
        name: "Adam Molly",
        role: "Full Stack Developer",
        image: "https://images.pexels.com/photos/3783255/pexels-photo-3783255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
];

export const Team = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
                <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="w-full h-auto text-gray-400"
                >
                    <defs>
                        <pattern
                            id="dots"
                            x="0"
                            y="0"
                            width=".135"
                            height=".30"
                        >
                            <circle cx="1" cy="1" r=".7" />
                        </pattern>
                    </defs>
                    <rect fill="url(#dots)" width="52" height="24" />
                </svg>
            </div>

            <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
                <div className="max-w-3xl mb-16 md:mx-auto sm:text-center">
                    {/* <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                        The Brains
                    </span> */}
                    <h2  className="text-3xl md:text-4xl font-bold text-gray-900">
                        Meet our{" "}
                        <span className="text-primary">talented team</span> of
                        professionals
                    </h2>
                    <p className="text-lg text-gray-600">
                        A diverse group of thinkers and doers committed to
                        providing the best education support and scholarship
                        opportunities worldwide.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            {/* Profile Image with Ring Effect */}
                            <div className="relative mb-5">
                                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <img
                                    className="relative object-cover w-32 h-32 rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                                    src={member.image}
                                    alt={member.name}
                                />
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 mb-4">
                                    {member.role}
                                </p>

                                {/* Social Links */}
                                <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <a
                                        href="#"
                                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <FaTwitter size={18} />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <FaLinkedinIn size={18} />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
