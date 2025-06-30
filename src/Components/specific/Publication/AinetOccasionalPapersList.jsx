import React, { useState, useRef, useEffect } from "react";
import Breadcrumbs from "../../shared/Breadcrumbs";
import occasionalPaper1 from "../../../assets/pdf/OP1.pdf";
import occasionalPaper2 from "../../../assets/pdf/OP2.pdf";

export default function AinetOccasionalPapersList() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Handle clicks outside the search box
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleDownload = (pdf) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = pdf;
    // Set the download attribute to force download instead of navigation
    link.setAttribute('download', pdf.split('/').pop());
    // Append to the document
    document.body.appendChild(link);
    // Trigger the download
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  const papers = [
    {
      id: 1,
      title: "AINET Occasional Papers No. 2",
      date: "November 2016",
      author: {
        name: "Dr. Krishna Dixit",
        institution: "Yeshwant Mahavidyalaya, Seloo, Wardha, India",
        avatar: "/api/placeholder/32/32",
      },
      description:
        "Teacher Motivation: A Conceptual Overview Dr. Krishna Dixit, Ambedkar University Delhi, India AINET Association of English Teachers",
      image: "/ainetPaper.png",
      alt: "AINET Occasional Papers No. 2",
      pdf: occasionalPaper2,
    },
    {
      id: 2,
      title: "AINET Occasional Papers No. 1",
      date: "April 2014",
      author: {
        name: "Dr. Martin Wedell",
        institution: "School of Education, University of Leeds, UK",
        avatar: "/api/placeholder/32/32",
      },
      description:
        "Initial English Teacher Education and English Curriculum Goals: Bridging the Gap Dr. Martin Wedell, School of Education, University of Leeds, UK AINET Association of English Teachers",
      image: "/ainetPaper.png",
      alt: "AINET Occasional Papers No. 1",
      pdf: occasionalPaper1,
    },
  ];

  return (
    <div className=" w-full h-auto">
      <Breadcrumbs
        links={[
          { label: "Home", to: "/" },
          { label: "Publications", to: "/publications" },
          { label: "Occasional Papers", to: null },
        ]}
      />
      <div className="flex justify-between items-start mb-6 mt-12 flex-col md:flex-row">
        <h1 className="md:text-[40px] text-2xl text-left font-bold mb-10">AINET Occasional Papers</h1>
        <div className="flex items-center space-x-2">
          <div ref={searchRef} className="relative">
            {searchOpen ? (
              <input
                type="text"
                className="border border-gray-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Search papers..."
                autoFocus
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>
          <button className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

      {papers.map((paper) => (
        <div key={paper.id} className="bg-[#D0E8C5] rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={paper.image}
                alt={paper.alt}
                className="w-48 h-auto border border-gray-300"
              />
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-xl font-semibold mb-1">{paper.title}</h2>
              <p className="text-gray-700 mb-3">{paper.date}</p>

              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-3">
                  <img src={paper.author.avatar} alt={paper.author.name} />
                </div>
                <div>
                  <p className="font-medium">{paper.author.name}</p>
                  <p className="text-sm text-gray-600">
                    {paper.author.institution}
                  </p>
                </div>
              </div>

              <p className="mb-4 text-gray-800">{paper.description}</p>

              <button className="bg-yellow-50 hover:bg-yellow-100 text-gray-800 py-2 px-6 rounded-full border border-yellow-200 transition duration-200" onClick={()=>handleDownload(paper.pdf)}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
