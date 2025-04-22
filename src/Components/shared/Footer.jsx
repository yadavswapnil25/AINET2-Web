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
        <footer className="bg-[#010203D9] text-gray-300 py-10 px-6 sm:px-10 md:px-20 rounded-t-4xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Section 1: Logo + Socials */}
                <div className=' w-full items-center flex flex-col'>
                    <Link to="/" className="inline-block mb-4">
                        <img src="./footlogo.png" alt="AINET Logo"  />
                    </Link>
                    <p className="text-sm mb-2 font-medium">Follow Us</p>
                    <div className="flex flex-wrap gap-3 text-xl sm:text-2xl">
                        <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" aria-label="YouTube" className="hover:text-white"><FaYoutube /></a>
                        <a href="#" aria-label="Pinterest" className="hover:text-white"><FaPinterestP /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" aria-label="WhatsApp" className="hover:text-white"><FaWhatsapp /></a>
                        <a href="#" aria-label="Telegram" className="hover:text-white"><FaTelegramPlane /></a>
                    </div>
                </div>

                {/* Section 2: About AINET */}
                <div className=' w-full items-center flex flex-col'>
                    <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">AINET</h3>
                    <ul className="space-y-2 text-base sm:text-lg">
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/publications" className="hover:underline">Publications</Link></li>
                        <li><Link to="/adda" className="hover:underline">AINET Adda</Link></li>
                        <li><Link to="/resources" className="hover:underline">Resources</Link></li>
                    </ul>
                </div>

                {/* Section 3: Help & Legal */}
                <div className=' w-full items-center flex flex-col'>
                    <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">Help</h3>
                    <ul className="space-y-2 text-base sm:text-lg">
                        <li><Link to="/archives" className="hover:underline">Archives</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Section 4: Contact Details */}
                <div className=' w-full items-center flex flex-col'>
                    <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">Support & Contact</h3>
                    <ul className="space-y-4 text-base sm:text-lg flex items-center flex-col">
                        <li className="flex items-center gap-3 ">
                            <FaEnvelope className="text-xl" />
                            <a href="mailto:theainet@gmail.com" className="hover:underline">theainet@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-3 md:items-start">
                            <FaPhoneAlt className="text-xl" />
                            <a href="tel:+919322890031" className="hover:underline">+91 - 9322890031</a>
                        </li>
                        <li className="flex items-center md:items-start  gap-3 w-[60%] md:w-full">
                            <FaUniversity className="text-5xl mt-1" />
                            <span className="text-sm sm:text-base leading-snug">
                                AINET Block 2, 1-Ganga Villa, St. Kabir Ward, Bhandara, M.S., India, PIN 441904
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom line */}
            <div className="text-center text-sm sm:text-base text-gray-500 mt-10">
                © {new Date().getFullYear()} copyright received by AINET.
            </div>
        </footer>
    );
};

export default Footer;
