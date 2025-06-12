import React, { useEffect, useRef, useState } from "react";
import Highlight from "../Components/shared/Highlight";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import { PiClockDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const FDLecture = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }

      // Close mobile menu when clicking outside
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const previousWebinars = [
    {
      id: 1,
      image: "/archives5.png",
      title:
        "PERSONAL FINANCE CONSULTANTS BY KARINA BUYS & SARAH HUDSON ON 16TH MARCH 2023",
    },
    {
      id: 2,
      image: "/archives6.png",
      title:
        "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY",
    },
  ];

  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "FDLecture", to: null },
          ]}
        />
        <h1 className=" text-4xl font-semibold mt-12">FDLecture</h1>
        <div className="flex items-center justify-end space-x-4">
          <div
            ref={searchRef}
            className={`relative flex items-center transition-all duration-300 ${
              searchExpanded ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {searchExpanded && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-4xl pl-10 pr-2 py-2 outline-none w-36 lg:w-48 text-sm"
                  autoFocus
                />
                <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
                  <img
                    src="/searchIcon.svg"
                    alt="Search"
                    className="w-6 h-6 "
                  />
                </div>
              </div>
            )}

            {!searchExpanded && (
              <button
                onClick={() => setSearchExpanded((prev) => !prev)}
                className="p-1"
                aria-label="Search"
              >
                <img src="/searchIcon.svg" alt="Search" className="w-8 h-8 " />
              </button>
            )}
          </div>

          <button className="p-2 rounded-md text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="#C5D3E8"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <img
          src="/fdletures.png"
          alt="AINET International ELT Webinar"
          className="w-full rounded-lg shadow-lg mt-2.5"
        />
        <h1 className="text-center font-bold text-xl md:text-4xl mt-8">
          AINET INTERNATIONAL ELT WEBINAR (ONLINE),
          <br />
          APRIL 10-12, 2025
        </h1>

        {/* Date and Time Details */}
        <div className="flex flex-col md:flex-row w-full items-center justify-center  my-6 gap-20">
          <div className=" flex gap-5 items-center justify-center">
            <div className=" flex  rounded-md gap-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-[#A6AEBF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className=" text-sm md:text-lg font-medium">13TH December, 2025</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 md:gap-5">
              <PiClockDuotone className=" text-[#A6AEBF] size-9" />
              <span className=" text-sm md:text-lg font-medium">9:00 AM</span>
            </div>
          </div>
          <div className=" flex gap-5 items-center justify-center">
            <div className=" flex  rounded-md gap-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-[#A6AEBF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className=" text-sm md:text-lg font-medium">13TH December, 2025</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 md:gap-5">
              <PiClockDuotone className=" text-[#A6AEBF] size-9" />
              <span className=" text-sm md:text-lg font-medium">9:00 AM</span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="mb-4">
          <div className="flex items-start">
            <span className="font-medium min-w-[110px]">Location : </span>
            <span className="text-gray-800">GOOGLE MEET</span>
          </div>
        </div>

        {/* Registration Link */}
        <div className="mb-4">
          <div className="flex items-start">
            <span className="font-medium min-w-[110px]">
              Registration Link :{" "}
            </span>
            <a
              href="https://conf.theainet.net/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://conf.theainet.net/
            </a>
          </div>
        </div>

        {/* Topic */}
        <div className="mb-4">
          <div className="flex items-start">
            <span className="font-medium min-w-[110px]">Topic : </span>
            <span className="text-gray-800">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </span>
          </div>
        </div>

        {/* Guest */}
        <div className="mb-4">
          <div className="flex items-start">
            <span className="font-medium min-w-[110px]">Guest : </span>
            <span className="text-gray-800">Laura Smith</span>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[25px] font-bold">Previous FDLecture</h2>
            <Link
              to="/gallery"
              className="text-gray-400 hover:text-blue-500 flex items-center text-lg"
            >
              View All <FaChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-5">
            {previousWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="cursor-pointer w-[300px] md:w-[550px] "
              >
                <div className="mb-2 ">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="w-full  object-cover rounded"
                  />
                </div>
                <h3 className="text-[20px] font-medium">{webinar.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FDLecture;
