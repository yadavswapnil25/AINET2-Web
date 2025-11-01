import { useState } from 'react';
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoLocationOutline,
    IoChevronDown,
    IoFilter,
    IoNotificationsOutline,
    IoChevronForward,
    IoArrowForward
} from 'react-icons/io5';

export default function ConferencePage() {
    const [expanded, setExpanded] = useState(false);

    // Main conference data
    const conferenceData = {
        bannerImage: "/9thconference.png",
        details: {
            startDate: "16TH JANUARY 2026",
            startTime: "9:00 AM",
            endDate: "17TH JANUARY 2026",
            endTime: "6:00 PM",
            location: "SONIPAT (Delhi-NCR)",
            registrationLink: "https://conf.theainet.net/",
            theme: "English Language Education Today: Educate, Empower, Employ, Innovate",
            fullTitle: "9th AINET INTERNATIONAL CONFERENCE , 16-17 JANUARY 2026"
        },
        subThemes: [
            "ELE for an Inclusive World",
            "National and State Education Policies and ELE",
            "Emerging Trends in the Teaching/Learning of English",
            "English for Technical, Vocational and Professional Purposes",
            "ELE in Multilingual Contexts",
            "Technological Frontiers in ELE",
            "English for Employability and Entrepreneurship",
            "Trends and Innovations in ELE – Materials, Methods, Assessment",
            "Teacher Education and Professional Development",
            "Alternative and non-formal ELE",
            "History of ELE in the Global South",
            "Teaching English Literature in the Global South",
            "Researching ELE in the Global South"
        ]
    };

    // Previous conferences data
    const previousConferences = [
        {
            id: 1,
            title: "8th AINET INTERNATIONAL CONFERENCE",
            location: "ONLINE",
            dates: "April 10-12, 2025",
            image: "/8thconfrence.png"
        },
        {
            id: 1,
            title: "7th AINET INTERNATIONAL CONFERENCE",
            location: "GUWAHATI",
            dates: "FEBRUARY 3-4, 2024",
            image: "/archives1.png"
        },
        {
            id: 2,
            title: "6th AINET INTERNATIONAL  CONFERENCE",
            location: "ONLINE",
            dates: "JANUARY 7-9, 2022",
            image: "/archives2.png"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto min-h-screen">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <h1 className="text-4xl font-bold">Conference</h1>
                {/* <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-black">
                        <span className="text-sm">event</span>
                        <IoChevronDown />
                    </div>
                    <IoNotificationsOutline className="text-gray-400 text-xl" />
                    <IoFilter className="text-gray-400 text-xl" />
                </div> */}

            </div>

            {/* Current Conference Banner - Using full image */}
            <div className="p-4 border-b-2 border-[#A6AEBF]">
                <h2 className="text-3xl font-bold mb-8">Upcoming Conference</h2>

                <div className="rounded-lg overflow-hidden ">
                    {/* Full conference banner as a single image */}
                    <div className="w-full">
                        <img
                            src={conferenceData.bannerImage}
                            alt="8th AINET International Conference Banner"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Conference Details */}
                    <div className="bg-white p-4">
                        <h2 className="text-center font-bold text-3xl my-5">
                            {conferenceData.details.fullTitle}
                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                {/* Calendar Icon */}


                                {/* FROM Date and Time */}
                                <div className="flex items-center gap-2">
                                    <div className=" p-2 flex items-center justify-center">
                                        <IoCalendarOutline className="text-black" />
                                    </div>
                                    <span className="text-black text-base">FROM :</span>
                                    <span className="font-medium">{conferenceData.details.startDate}</span>
                                    <div className="flex items-center p-1 text-base">
                                        <IoTimeOutline className="text-black mr-1" />
                                        <span className="text-base">{conferenceData.details.startTime}</span>
                                    </div>
                                </div>

                                {/* Spacer (flex-grow) */}
                                <div className="flex-grow"></div>

                                {/* TO Date and Time */}
                                <div className="flex items-center gap-2">
                                    <div className=" p-2 flex items-center justify-center">
                                        <IoCalendarOutline className="text-black" />
                                    </div>
                                    <span className="text-black text-base">TO :</span>
                                    <span className="font-medium">{conferenceData.details.endDate}</span>
                                    <div className="flex items-center p-1 text-base">
                                        <IoTimeOutline className="text-black mr-1" />
                                        <span className="text-base">{conferenceData.details.endTime}</span>
                                    </div>
                                </div>
                            </div>


                            {/* Location */}
                            <div className="flex items-center gap-3">
                                <div className=" p-2">
                                    <IoLocationOutline className="text-black" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <span className="text-black text-base">Location : </span>
                                            <span className="font-medium">{conferenceData.details.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Link */}
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <span className="text-black font-semibold mr-2">Registration Link :</span>
                                    <a href={conferenceData.details.registrationLink} className="text-blue-500 underline">
                                        {conferenceData.details.registrationLink}
                                    </a>
                                </div>
                            </div>

                            {/* Theme */}
                            <div className="mt-3">
                                <div className="flex items-start">
                                    <span className="text-black font-semibold mr-2 whitespace-nowrap">Theme :</span>
                                    <span className="font-medium">{conferenceData.details.theme}</span>
                                </div>
                            </div>

                            {/* Sub Theme */}
                            <div className="mt-2">
                                <div className="flex items-start">
                                    <span className="text-black font-semibold mr-2">Sub Theme :</span>
                                    <div>
                                        <ul className="list-disc pl-4 space-y-1 text-base">
                                            {conferenceData.subThemes.map((theme, index) => (
                                                <li key={index}>{theme}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous Conferences */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-3xl">Previous Conferences</h2>
                    {/* <button className="text-xs text-black flex items-center" onClick={() => setExpanded(!expanded)}>
                        View All <IoChevronForward className="ml-1" />
                    </button> */}
                </div>

                <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
                    {previousConferences.map((conference) => (
                        <div key={conference.id} className="rounded-lg w-[300px] flex-shrink-0">
                            <div className="h-60 ">
                                <img
                                    src={conference.image}
                                    alt={conference.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold">{conference.title}</h3>
                                <p className="text-base">{conference.location}, {conference.dates}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}