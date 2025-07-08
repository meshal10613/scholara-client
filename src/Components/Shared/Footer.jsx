
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { NavLink } from 'react-router';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="py-10 px-0 2xl:px-[7%]">
            <div className="mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* Logo and Description */}
                <div>
                <Logo/>
                <p className="text-sm text-gray-500 mt-2">
                    Empowering students with access to education through scholarships and support.
                </p>
                </div>

                {/* Navigation Links */}
                <div>
                <h4 className="font-semibold mb-3 menu menu-vertical">Quick Links</h4>
                <ul className="space-y-2 text-sm footlink">
                    <li className=''><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/all-scholarship">All Scholarship</NavLink></li>
                    <li><NavLink to="/dashboard/my-profile">Dashboard</NavLink></li>
                </ul>
                </div>

                {/* Social & Info */}
                <div>
                <h4 className="font-semibold mb-3">Connect with Us</h4>
                <div className="flex space-x-4 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="text-xl hover:text-primary" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-xl hover:text-primary" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className="text-xl hover:text-primary" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-xl hover:text-primary" />
                    </a>
                </div>

                <p className="text-sm text-gray-500">Email: syedmohiuddinmeshal24@gmail.com</p>
                <p className="text-sm text-gray-500">Phone: +880 1764447574</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Scholara. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
