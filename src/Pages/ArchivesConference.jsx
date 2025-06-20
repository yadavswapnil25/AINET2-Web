import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import Highlight from "../Components/shared/Highlight";
import ScrollToTop from "../Components/ScrollToTop";

export default function ArchivesConference() {
  // Mock data for conferences
  const conferences = [
    {
      id: 1,
      image: "/archives1.png",
      title:
        "7th AINET INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 3-4, 2024",
        link: "https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/ "
    },
    {
      id: 2,
      image: "/archives2.png",
      title:
        "6th AINET INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 5-6, 2022",
        link: "https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/ "
    },
    {
      id: 3,
      image: "/archivesConf3.png",
      title:
        "5th AINET INTERNATIONAL ELT CONFERENCE HYDERABAD, JANUARY 3-4, 2020",
        link: "https://store.pothi.com/book/krishna-dixit-teaching-english-multilingual-contexts/ "
    },
    {
      id: 4,
      image: "/archivesConf4.png",
      title:
        "4th AINET INTERNATIONAL ELT CONFERENCE MUMBAI, FEBRUARY 2-3, 2018",
        link: "/archives-conference"
    },
    {
      id: 5,
      image: "/archivesConf5.png",
      title: "2th AINET INTERNATIONAL ELT CONFERENCE MUMBAI, JANUARY 10, 2015",
      link: "https://store.pothi.com/book/krishna-dixit-vivek-joshi-milind-mane-english-language-education-understanding-change/ "
    },
  ];

  return (
    <>
    <ScrollToTop/>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Archives", to: "/archives" },
          ]}
        />

        {/* Archives header with filter */}
        <div className="flex justify-between items-center my-6 ">
          <h1 className="text-3xl font-bold">Archives</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-300 rounded px-3 py-1">
              <span className="text-gray-500 mr-2">event</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <button className="border border-gray-300 rounded p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Conferences section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 ">Conference</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conferences.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => window.location.href = item.link}>
              {/* Image */}
              <div className="relative  w-full overflow-hidden rounded-md mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  width={490}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
               
              </div>
              {/* Title */}
              <h4 className="p-4 text-[20px] capitalize  font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-200">
                {item.title}
              </h4>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
