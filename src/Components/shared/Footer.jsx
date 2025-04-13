import React from 'react';
import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaPinterestP,
    FaTwitter,
    FaWhatsapp,
    FaTelegramPlane,
    FaEnvelope,
    FaPhoneAlt,
    FaUniversity
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#010203D9] text-gray-300 py-10 px-6 md:px-20 rounded-t-4xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Section 1: Logo + Socials */}
                <div>
                    <h2 className="text-white text-xl font-bold mb-4">
                        <Link to="/" className="text-2xl font-bold">
                            <img src="./footlogo.png" alt="logo ainet" />
                        </Link>
                    </h2>
                    <p className="text-sm mb-4">Follow Us</p>
                    <div className="flex flex-wrap gap-3 text-2xl">
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaYoutube /></a>
                        <a href="#" className="hover:text-white"><FaPinterestP /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaWhatsapp /></a>
                        <a href="#" className="hover:text-white"><FaTelegramPlane /></a>
                    </div>
                </div>

                {/* Section 2: About Us */}
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-4">Ainet</h3>
                    <ul className="space-y-2 text-lg">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Publications</a></li>
                        <li><a href="#" className="hover:underline">AINET Adda</a></li>
                        <li><a href="#" className="hover:underline">Resources</a></li>
                    </ul>
                </div>

                {/* Section 3: Contact Us */}
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-4">Help</h3>
                    <ul className="space-y-2 text-lg">
                        <li><a href="#" className="hover:underline">Archives</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Section 4: Mail, Phone, Address with icons */}
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-4">Support & Contact</h3>
                    <ul className="space-y-4 text-lg">
                        <li className="flex items-center gap-2">
                            <FaEnvelope />
                            <a href="mailto:theainet@gmail.com" className="hover:underline">theainet@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt />
                            <a href="tel:+919322890031" className="hover:underline">+91 - 9322890031</a>
                        </li>
                        <li className="flex items-start gap-2">
                        <FaUniversity className="mt-1 text-5xl" />
                            <span>AINET Block 2, 1-Ganga Villa, St. Kabir Ward, Bhandara, M.S., India, PIN 441904</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom line */}
            <div className="text-center text-xl text-gray-500 mt-10">
                © {new Date().getFullYear()} copyright recived by AINET.
            </div>
        </footer>
    );
};

export default Footer;
