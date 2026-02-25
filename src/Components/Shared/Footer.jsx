import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaGithub,
    FaPaperPlane,
} from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "./Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="pt-16 pb-8 mt-5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand & Mission */}
                    <div className="space-y-6">
                        <Logo />
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Empowering the next generation of scholars by
                            bridging the gap between talent and opportunity.
                            Your future starts here.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                {
                                    icon: <FaFacebookF />,
                                    link: "https://facebook.com/meshal.67",
                                },
                                {
                                    icon: <FaTwitter />,
                                    link: "https://x.com/syed_meshal",
                                },
                                {
                                    icon: <FaLinkedinIn />,
                                    link: "https://linkedin.com/in/10613-meshal",
                                },
                                {
                                    icon: <FaGithub />,
                                    link: "https://github.com/meshal10613",
                                },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Home",
                                "All Scholarship",
                                "Dashboard",
                                "About Us",
                            ].map((item) => (
                                <li key={item}>
                                    <NavLink
                                        to={
                                            item === "Home"
                                                ? "/"
                                                : `/${item.toLowerCase().replace(" ", "-")}`
                                        }
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">
                            Contact Us
                        </h4>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p className="flex items-start">
                                <span className="font-medium text-gray-900 mr-2">
                                    Email:
                                </span>
                                <a
                                    href="mailto:syedmohiuddinmeshal24@gmail.com"
                                    className="hover:text-primary transition-colors"
                                >
                                    syedmohiuddinmeshal24@gmail.com
                                </a>
                            </p>
                            <p className="flex items-center">
                                <span className="font-medium text-gray-900 mr-2">
                                    Phone:
                                </span>
                                <a
                                    href="tel:+8801764447574"
                                    className="hover:text-primary transition-colors"
                                >
                                    +880 1764447574
                                </a>
                            </p>
                            <p className="flex items-start">
                                <span className="font-medium text-gray-900 mr-2">
                                    Address:
                                </span>
                                <span>Dhaka, Bangladesh</span>
                            </p>
                        </div>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">
                            Newsletter
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Subscribe to get the latest scholarship updates.
                        </p>
                        <form
                            className="relative group"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white p-2 rounded-lg transition-colors cursor-pointer">
                                <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear}{" "}
                        <span className="font-semibold text-primary">
                            Scholara
                        </span>
                        . All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <a
                            href="#"
                            className="hover:text-primary transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-primary transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="hover:text-primary transition-colors"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
