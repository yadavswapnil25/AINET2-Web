import { useState } from 'react';
import {
    FaEnvelope,
    FaBuilding,
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaTelegram,
    FaPinterest,
    FaYoutube
} from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import Highlight from '../Components/shared/Highlight';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();        
    };

    return (
        <>
            <Highlight />
            <div className="max-w-5xl mx-auto p-4 bg-white">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-[45px] font-bold">Contact Us</h1>
                    <p className="text-sm text-gray-600 mt-1">Any questions or remarks? Just write us a message!</p>
                </div>

                {/* Form Section */}
                <div className="mb-10">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    placeholder='Enter your name'
                                    onChange={handleChange}
                                    className="w-full border-2 border-[#010203] rounded-[10px] px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm mb-1">Mobile No.</label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    placeholder='Enter your mobile number'
                                    onChange={handleChange}
                                    className="w-full border-2 border-[#010203] rounded-[10px] px-3 py-2"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                placeholder='Enter your email'
                                onChange={handleChange}
                                className="w-full border-2 border-[#010203] rounded-[10px] px-3 py-2"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter your message"
                                className="w-full border-2 border-[#010203] rounded-[10px] px-3 py-2"
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-16 py-4 bg-amber-100 btnshadow text-[#010203E5] rounded-full font-semibold hover:bg-amber-200 transition-colors w-80 "
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>

                {/* Office Address Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2">Office Address</h2>
                    <div className="w-full h-[370px]  rounded relative overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2147.3879109661984!2d79.65889746966941!3d21.15976870730028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b3f57f4b70305%3A0xc3d87494bf0d0553!2sSant%20Kabir%20Ward%2C%20Santaji%20Nagar%2C%20Bhandara%2C%20Maharashtra%20441904!5e1!3m2!1sen!2sin!4v1745172345747!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '20px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>


                {/* Contact Info and Socials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Meet Us */}
                    <div className="bg-[#A6AEBF] rounded-3xl text-white p-10">
                        <h3 className="text-2xl font-semibold mb-4">Meet us</h3>

                        <div className="flex items-center mb-3">
                            <FaEnvelope className="text-white mt-1 mr-5 text-2xl" />
                            <a href="mailto:theainet@gmail.com" className="text-xl no-underline">theainet@gmail.com</a>
                        </div>

                        <div className="flex items-start mb-3">
                            <FaPhone className="text-white mt-1 mr-5 text-2xl" />
                            <a href="tel:+919322890031" className="text-xl no-underline">+91-9322890031</a>
                        </div>

                        <div className="flex items-start">
                            <FaBuilding className="text-white mt-1 mr-5 text-4xl" />
                            <a href="https://maps.app.goo.gl/m4qqcJDorjdB9Yss5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl no-underline"
                            >
                                7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904 </a>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="bg-[#A6AEBF] rounded-3xl text-white p-10">
                        <h3 className="text-2xl font-semibold mb-4">Follow us</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <RiInstagramFill className="text-white text-2xl mr-2" />
                                <a href="https://www.instagram.com/ainetindia/" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">ainetindia</a>
                            </div>

                            <div className="flex items-center">
                                <FaLinkedin className="text-white text-2xl mr-2" />
                                <a href="https://www.linkedin.com/in/theainet" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">@theainet</a>
                            </div>

                            <div className="flex items-center">
                                <FaTwitter className="text-white text-2xl mr-2" />
                                <a href="https://x.com/ainetindia" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">AINET India</a>
                            </div>

                            <div className="flex items-center">
                                <FaYoutube className="text-white text-2xl mr-2" />
                                <a href="https://www.youtube.com/AINETIndia" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">@ainetindia</a>
                            </div>

                            <div className="flex items-center">
                                <FaFacebook className="text-white text-2xl mr-2" />
                                <a href="https://www.facebook.com/ainetindia/" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">fb.com/ainetindia</a>
                            </div>

                            <div className="flex items-center">
                                <FaTelegram className="text-white text-2xl mr-2" />
                                <a href="https://t.me/theainet" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">@theainet</a>
                            </div>

                            <div className="flex items-center">
                                <FaPinterest className="text-white text-2xl mr-2" />
                                <a href="https://in.pinterest.com/theainet/" target="_blank" rel="noopener noreferrer" className="text-xl no-underline">AINET</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
