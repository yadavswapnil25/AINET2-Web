import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaYoutube, FaTelegram, FaPinterest } from "react-icons/fa";
import Highlight from '../Components/shared/Highlight';
import Breadcrumbs from '../Components/shared/Breadcrumbs';

const AINETConnect = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        let scrollSpeed = 1;

        const scroll = () => {
            if (!container) return;
            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
                container.scrollLeft = 0;
            }
        };

        const intervalId = setInterval(scroll, 20);
        return () => clearInterval(intervalId);
    }, []);

    const projectData = {
        title: "About AINET Connect Project",
        subtitle: "AINET Connect: Stronger Networking for Stronger Association",
        description: `AINET Connect is an innovative initiative of AINET to promote our social media networks for ELT practitioners!

The AINET Connect project was launched with an aim to support professional development and to build stronger and more sustainably managed channels of communication, especially on social media platforms. AINET Connect is funded by Skills Development and Quality Assurance Authority (SDA) in Sri Lanka through The Hornby Trust, UK, under its TA Projects Grants Scheme.

The project led to building a team of volunteer teacher-trainers from its membership. The project was launched and now manages AINET accounts on Facebook, Twitter, Instagram, WhatsApp, Pinterest, and LinkedIn. The project is focused on professional interaction and development. During the COVID Pandemic times the AINET Connect Associates did a tremendous job in engaging its members and keeping AINET going.

AINET Connect brings you immense opportunities to network with ELT communities, participate in a wide range of activities and learn, grow and enjoy!`,
        contactEmail: "ainetsocial@gmail.com",
        clickHereText: "Click here."
    };

    const socialMediaIcons = [
        { icon: AiFillInstagram, name: "Instagram", url: "https://www.instagram.com/ainetindia/" },
        { icon: FaFacebook, name: "Facebook", url: "https://www.facebook.com/ainetindia/" },
        { icon: FaYoutube, name: "YouTube", url: "https://www.youtube.com/AINETIndia" },
        { icon: FaXTwitter, name: "Twitter", url: "https://x.com/ainetindia" },
        { icon: FaTelegram, name: "Telegram", url: "#" },
        { icon: FaPinterest, name: "Pinterest", url: "https://in.pinterest.com/theainet/" },
        { icon: IoLogoWhatsapp, name: "WhatsApp", url: "https://api.whatsapp.com/send?phone=919322890031&text=Hi,AINET" }
    ];

    const leadTeamTop = [
        { name: "Dr. Vivek Joshi", role: "Coordinator", image: null },
        { name: "Dr. Millind Mane", role: "", image: "/MM.jpg" },
        { name: "Nadeem Khan", role: "", image: "/NK.jpg" }
    ];

    const leadTeamBottom = [
        { name: "Alfiya Alamdar", role: "", image: null },
        { name: "Amit Dhore", role: "", image: null },
        { name: "Avinash Kulkarni", role: "", image: null },
        { name: "Chandreck Shaher", role: "", image: null }
    ];

    return (
        <>
            <Highlight
                heading={"HIGHLIGHTS"}
                subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
            />

            <div className="min-h-screen px-4 sm:px-6">
                <main className="max-w-7xl mx-auto py-8">
                    <div className='pb-0 flex items-center justify-between'>
                        <Breadcrumbs
                            links={[
                                { label: "Home", to: "/" },
                                { label: "AINET Projects", to: null },
                                { label: "AINET Connect", to: null },
                            ]}
                        />
                        <img
                            src="/AINETConn.png"
                            alt="teacherResearchLogo"
                            className="w-18 sm:w-24 md:w-25 lg:w-30"
                        />
                    </div>

                    <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-15">
                        {projectData.title}
                    </h1>

                    {/* Hero Section */}
                    <div className="overflow-hidden mb-8">
                        <div className="flex flex-col-reverse lg:flex-row gap-6">
                            <div className="lg:w-1/2">
                                <h2 className="text-xl lg:text-3xl font-bold mb-6">
                                    {projectData.subtitle}
                                </h2>
                                <div className="text-gray-700 space-y-4">
                                    {projectData.description.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 flex items-center justify-center border border-gray-200">
                                <img
                                    src="/connect.jpg"
                                    alt="AINET Connect"
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="bg-[#A6AEBF] rounded-lg p-6 mb-8 text-center">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            {/* Heading */}
                            <h3 className="text-white text-2xl sm:text-3xl font-semibold text-center lg:text-left">
                                Join our Social Media accounts:
                            </h3>

                            {/* Icons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {socialMediaIcons.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 sm:p-3"
                                            title={social.name}
                                        >
                                            <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white hover:scale-110 transition-transform duration-200" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    {/* Contact Section */}
                    <div className="py-6 mb-6 space-y-4 text-lg">
                        <p>
                            Want to know more about AINET Connect?{' '}
                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
                                {projectData.clickHereText}
                            </span>
                        </p>
                        <p>
                            If you are an active social media user and want to contribute to AINET, we invite you to join the AINET Connect team. Write to us at{' '}
                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${projectData.contactEmail}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                                {projectData.contactEmail}
                            </a>
                            . [Mention 'AINET Connect' in the subject.]
                        </p>
                    </div>

                    {/* Lead Team Section */}
                    <div className="py-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">AINET Connect Associates</h2>

                        {/* Top Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
                            {leadTeamTop.map((member, index) => (
                                <div key={index} className="text-center border border-gray-300 rounded-lg p-6 bg-white">
                                    <div className="w-45 h-45 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                    {member.role && <p className="text-sm text-gray-600">{member.role}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Bottom Auto-scroll Section */}
                        {/* <h2 className="text-3xl font-bold text-gray-900 mb-8">AINET Connect Project Lead</h2>
                        <div className="relative">
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto space-x-6 py-4 px-2 scrollbar-hide"
                            >
                                {[...leadTeamBottom, ...leadTeamBottom].map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-3/4 sm:w-2/5 md:w-1/4 text-center border border-gray-300 rounded-lg py-6 bg-white"
                                    >
                                        <div className="w-32 h-32 mx-auto mb-3 bg-gray-200 rounded-full overflow-hidden">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-gray-900 text-lg">{member.name}</h4>
                                        {member.role && <p className="text-xs text-gray-600">{member.role}</p>}
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </main>
            </div>
        </>
    );
};

export default AINETConnect;
