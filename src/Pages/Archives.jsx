import React from "react";
import Highlight from "../Components/shared/Highlight";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function Archives() {
  // Data structure to represent the archives content
  const categories = [
    {
      title: "Conference",
      viewAll: "View All",
      navigate: "/archives-conference",
      items: [
        {
          id: 1,
          image: "/archives1.png",
          title:
            "7th AIMT INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 24, 2022",
          date: "Feb 24",
        },
        {
          id: 2,
          image: "/archives2.png",
          title:
            "6th AIMT INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 1-8, 2022",
          date: "Dec 1-8",
        },
      ],
    },
    {
      title: "Webinar",
      viewAll: "View All",
      navigate: "/archives-conference",
      items: [
        {
          id: 1,
          image: "/archives3.png",
          title:
            "PERSONAL FINANCE CONSULTANTS BY KARINA BUYS & SARAH HUDSON ON 16TH MARCH 2023",
          date: "Mar 16",
        },
        // {
        //   id: 2,
        //   image: "/archives4.png",
        //   title:
        //     "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY",
        //   date: "Mar 24",
        // },
      ],
    },
    {
      title: "FD Lectures",
      viewAll: "View All",
      navigate: "/archives-conference",
      items: [
        {
          id: 1,
          image: "/archives5.png",
          title: "FREE ENGLISH LECTURE BY LORIEM IPSUM ON 22ND MAY, 2024",
          date: "May 22",
        },
        // {
        //   id: 2,
        //   image: "/archives6.png",
        //   title:
        //     "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY",
        //   date: "May 24",
        // },
      ],
    },
    {
      title: "Other",
      viewAll: "View All",
      navigate: "/archives-conference",
      items: [
        {
          id: 1,
          image: "/archives7.png",
          title:
            "7th AIMT INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 24, 2022",
          date: "Feb 24",
        },
        {
          id: 2,
          image: "/archives8.png",
          title:
            "6th AIMT INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 1-8, 2022",
          date: "Dec 1-8",
        },
      ],
    },
  ];

  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Archives", to: null },
          ]}
        />

        {/* Archives container */}
        <div className=" rounded-md ">
          {/* Header */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-4xl font-bold text-gray-800">Archives</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-normal">Filter</span>
              <button className=" rounded p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
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

          {/* Content */}
          <div className="mt-6">
            {categories.map((category, index) => (
              <div key={index} className="mb-8">
                {/* Category header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[25px] font-semibold text-gray-800">
                    {category.title}
                  </h3>
                  <Link
                    to={category.navigate}
                    className="text-grey text-normal hover:underline flex jutify-center items-center"
                  >
                    {category.viewAll}
                    <FaChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                {/* Category items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
