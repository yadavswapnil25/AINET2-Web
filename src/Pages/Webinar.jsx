import React, { useEffect, useRef, useState } from "react";
import Highlight from "../Components/shared/Highlight";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import LiveStream from "../Components/specific/LiveStream";
import { PiClockDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { baseUrl } from "../utils/constant";

const Webinar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);
  const [webinar, setWebinar] = useState(null);
  const [previousWebinars, setPreviousWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousLoading, setPreviousLoading] = useState(true);

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

  // Fetch upcoming webinar
  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/webinar`);
        const data = await response.json();
        
        console.log('Webinar API Response:', data); // Debug log
        
        if (data.status && data.data && data.data.webinar) {
          setWebinar(data.data.webinar);
          console.log('Webinar data set:', data.data.webinar); // Debug log
        } else {
          console.log('No webinar found in response:', data); // Debug log
        }
      } catch (error) {
        console.error("Error fetching webinar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, []);

  // Fetch previous webinars
  useEffect(() => {
    const fetchPreviousWebinars = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/events?event_type=webinar&exclude_conference=false`);
        const data = await response.json();
        
        if (data.status && data.data && data.data.events) {
          const now = new Date();
          // Filter out the current webinar and get past webinars
          const pastWebinars = data.data.events.filter(event => {
            if (!webinar || event.id !== webinar.id) {
              const eventDate = event.event_date ? new Date(event.event_date) : null;
              return eventDate && eventDate < now;
            }
            return false;
          });
          setPreviousWebinars(pastWebinars);
        }
      } catch (error) {
        console.error("Error fetching previous webinars:", error);
      } finally {
        setPreviousLoading(false);
      }
    };

    fetchPreviousWebinars();
  }, [webinar]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <Highlight />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Webinar", to: null },
          ]}
        />
        <h1 className=" text-4xl font-semibold mt-12">Webinar</h1>
        <div className="flex items-center justify-center md:justify-between mb-8 flex-col md:flex-row">
          <h2 className="text-3xl font-bold mt-8">Upcoming Webinar</h2>
          <div className="flex items-center justify-end space-x-4">
            <div
              ref={searchRef}
              className={`relative flex items-center transition-all duration-300 ${searchExpanded ? "flex-row" : "flex-row-reverse"
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
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading webinar information...</p>
          </div>
        ) : webinar ? (
          <>
            {/* Banner Image */}
            {webinar.banner_image && (
              <img
                src={webinar.banner_image}
                alt={webinar.title}
                className="w-full rounded-lg shadow-lg mt-2.5"
              />
            )}
            {!webinar.banner_image && (
              <img
                src="/webinarbanner.png"
                alt="AINET International ELT Webinar"
                className="w-full rounded-lg shadow-lg mt-2.5"
              />
            )}

            <h1 className="text-center font-bold text-xl md:text-4xl mt-8">
              {webinar.title}
            </h1>

            {/* Live Stream Section */}
            {webinar.is_live && (
              <div className="my-8">
                <LiveStream
                  streamType={webinar.stream_type}
                  streamUrl={webinar.stream_url}
                  embedCode={webinar.embed_code}
                  streamId={webinar.stream_id}
                  isLive={webinar.is_live}
                  className="mt-4"
                />
              </div>
            )}

            {/* Date and Time Details */}
            {(webinar.starts_at || webinar.event_date) && (
              <div className="flex flex-col md:flex-row w-full items-center justify-center my-6 gap-20">
                {webinar.starts_at && (
                  <div className="flex gap-5 items-center justify-center">
                    <div className="flex rounded-md gap-4 items-center justify-center">
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
                      <span className="text-sm md:text-lg font-medium">
                        {formatDate(webinar.starts_at)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 md:gap-5">
                      <PiClockDuotone className="text-[#A6AEBF] size-9" />
                      <span className="text-sm md:text-lg font-medium">
                        {formatTime(webinar.starts_at)}
                      </span>
                    </div>
                  </div>
                )}

                {webinar.ends_at && (
                  <div className="flex gap-5 items-center justify-center">
                    <div className="flex rounded-md gap-4 items-center justify-center">
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
                      <span className="text-sm md:text-lg font-medium">
                        {formatDate(webinar.ends_at)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 md:gap-5">
                      <PiClockDuotone className="text-[#A6AEBF] size-9" />
                      <span className="text-sm md:text-lg font-medium">
                        {formatTime(webinar.ends_at)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Location Info */}
            {webinar.location && (
              <div className="mb-4">
                <div className="flex items-start">
                  <span className="font-medium min-w-[110px]">Location : </span>
                  <span className="text-gray-800">{webinar.location}</span>
                </div>
              </div>
            )}

            {/* Registration Link */}
            {webinar.link_url && (
              <div className="mb-4">
                <div className="flex items-start">
                  <span className="font-medium min-w-[110px]">
                    Registration Link :{" "}
                  </span>
                  <a
                    href={webinar.link_url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {webinar.link_url}
                  </a>
                </div>
              </div>
            )}

            {/* Topic Description */}
            {webinar.topic_description && (
              <div className="mb-4">
                <div className="flex items-start">
                  <span className="font-medium min-w-[110px]">Topic : </span>
                  <span className="text-gray-800">{webinar.topic_description}</span>
                </div>
              </div>
            )}

            {/* Guest Speaker */}
            {webinar.guest_speaker && (
              <div className="mb-4">
                <div className="flex items-start">
                  <span className="font-medium min-w-[110px]">Guest : </span>
                  <span className="text-gray-800">{webinar.guest_speaker}</span>
                </div>
              </div>
            )}

            {/* Description */}
            {webinar.description && (
              <div className="mb-4">
                <div className="flex items-start">
                  <span className="font-medium min-w-[110px]">Description : </span>
                  <span className="text-gray-800">{webinar.description}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No upcoming webinar scheduled at this time.</p>
          </div>
        )}

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[25px] font-bold">Previous Webinar</h2>
            <Link
              to="/archives-conference"
              className="text-gray-400 hover:text-blue-500 flex items-center text-lg"
            >
              View All <FaChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {previousLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading previous webinars...</p>
            </div>
          ) : previousWebinars.length > 0 ? (
            <div className="flex flex-wrap justify-start items-start gap-6 mb-5">
              {previousWebinars.map((prevWebinar) => (
                <div
                  key={prevWebinar.id}
                  className="cursor-pointer w-[300px] md:w-[320px] xl:w-[350px]"
                >
                  <div className="mb-2">
                    {prevWebinar.banner_image ? (
                      <img
                        src={prevWebinar.banner_image}
                        alt={prevWebinar.title}
                        className="w-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-[20px] font-medium">{prevWebinar.title}</h3>
                  {prevWebinar.date_display && (
                    <p className="text-gray-600 text-sm mt-1">{prevWebinar.date_display}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No previous webinars available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Webinar;
