import React, { useEffect } from "react";
import Highlight from "../Components/shared/Highlight";
import bg1 from "/bg1.png";
import bg2 from "/bg2.png";
import newh1 from "/newh11.jpg";
import newh2 from "/newh22.jpg";

import { FaCalendar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import MembershipPlans from "../Components/shared/MembershipPlans";
import Archives from "../Components/specific/Home/Archives";
import Gallery from "../Components/specific/Home/Gallery";
import MembersArea from "../Components/specific/Home/MembersArea";
import NewsletterSignup from "../Components/specific/Home/NewsletterSignup";
import Partners from "../Components/specific/Home/Partners";
import upcoming from "/upcoming.png";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#membershipplan") {
      const el = document.getElementById("membershipplan");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const eventsData = [
    {
      title: "AINET Foundation Week Programmes.",
      location: "Online",
      date: "5 - 12 September 2025",
      link: "/conference"
    },
    {
      title: "Rural ELT Conference.",
      location: "Maharashtra",
      date: "October 2025",
      link: "/webinar"
    },
    {
      title: "Webinar on HELE.",
      location: "Online",
      date: "TBA",
      link: "/fdlecture"
    },
  ];
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
      />
      <div className="w-full h-auto p-4 md:p-[34px] pt-[46px]">
        {/* Section 1 */}
        <div
          className="relative w-full h-full rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          {/* First Half */}
          <div className="w-full flex h-full justify-around md:h-[auto]  relative p-4 md:p-14 md:pb-0 flex-col md:flex-row">
            <div className="w-full md:[55%]">
              <h3 className="font-bold text-white tracking-wider text-xl text-center md:text-left  md:text-[2.5vw]  leading-8 md:leading-[3.5rem] lg:leading-[4.5rem] ">
                A vibrant community of English Language Education professionals
                & stakeholders which aims to <br /> Develop. Together.
              </h3>
            </div>
            <div className="w-full md:w-[75%] flex justify-end pt-4">
              <img
                src={newh1}
                alt="HomeImage"
                className="w-full   h-auto md:h-[350px] rounded-2xl"
              />
            </div>
          </div>

          {/* Second Start */}
          <div className="w-full flex h-full  md:h-1/2 z-1 relative p-4 md:px-14 flex-col md:flex-row">
            <div className="w-full md:w-[55%] flex flex-col  px-4 gap-4">
              <p className="text-[20px] text-white tracking-normal md:tracking-wider">
                "A national English teachers' association, registered in India. An IATEFL, UK affiliate."
              </p>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <Link to="/login" className="uppercase bg-[#FFF8DE] text-center rounded-4xl p-4 w-full md:w-[305px] font-xl font-bold btnshadow cursor-pointer">
                  Join The Community
                </Link>
                <button className="uppercase bg-[#D0E8C5] rounded-4xl p-4 w-full md:w-[175px] font-xl font-bold btnshadow cursor-pointer"
                onClick={() => window.location.href = '/about'}
                >
                  READ MORE
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center mt-4 text-center md:text-left  gap-6 md:gap-10 lg:gap-14">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#D0E8C5] font-bold text-4xl">1 M +</h3>
                  <p className="text-white text-[18px]">
                    Our online reach <br /> across all online platform.
                  </p>
                </div>

                <div className=" h-[3px] w-full md:w-[3px] bg-white md:h-full" />
                <div className="flex flex-col items-center  gap-4">
                  <h3 className="text-[#D0E8C5] font-bold text-4xl">3400 +</h3>
                  <p className="text-white text-[18px]">
                    Our thriving community of <br /> educators.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[55%] flex flex-col  px-4 gap-4">
              <img
                src={newh2}
                alt="homepagebanner2"
                className="w-full  md:w-[75%] h-auto my-2 md:h-[350px] rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div
          className="mt-12 relative w-full h-full rounded-3xl overflow-hidden  flex flex-col bg-no-repeat p-6 md:p-8 lg:p-14 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          {/* top */}
          <h2 className="text-3xl w-full font-medium">UPCOMING CONFERENCE</h2>
          <div className="w-full h-1/2 flex flex-col md:flex-row p-0 md:p-6 gap-8">
            <div className="w-full md:w-1/2 h-full flex justify-center items-center">
              <img src={upcoming} alt="upcoming conference" />
            </div>

            <div className=" w-full md:w-1/2 h-full flex items-center  md:items-start justify-center flex-col gap-8">
              <h3 className="font-bold text-3xl md:text-4xl">
                <strong>9th AINET International Conference </strong>
 <br /> January 2026
              </h3>
              <p className="text-xl text-center md:text-left">
                
               January 2026 Lucknow, India
              </p>
              <button className="uppercase bg-[#D0E8C5] border border-[#47b81361] md:border-none rounded-4xl p-4 w-[305px] font-xl font-bold  btnshadow cursor-pointer" onClick={()=>window.location.href="/Conference"}>
               Coming soon
              </button>
            </div>
          </div>

          {/* bottom */}
          <h2 className="text-3xl w-full font-medium mt-10">UPCOMING EVENTS</h2>

          <div className="w-full h-1/2  flex flex-col md:flex-row sm:flex-row mt-6 gap-8">
            {eventsData?.map((event, index) => (
              <div
                key={index}
                className={`relative min-h-[232px] flex-1 bg-[#FFF8DE] rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow`}
              >
                <h2 className="text-2xl font-semibold mb-6">{event.title}</h2>
                <p className="flex items-center text-black mb-6 text-xl font-medium">
                  <MdLocationOn className="mr-2 text-xl" />
                  {event.location}
                </p>
                <p className="flex items-center text-black text-xl font-medium">
                  <FaCalendar className="mr-2 text-xl" />
                  {event.date}
                </p>

                <button className="absolute right-[5%] bottom-[5%] h-[40px] w-[40px] bg-black grid place-items-center rounded-full cursor-pointer" onClick={()=>window.location.href=event.link}>
                  <img src="./arrowright.svg" alt="arrowright" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3  Members Area */}
        <MembersArea />

        {/* Section 4 - Membership Plans */}
        <div className="mt-12">
          <MembershipPlans />
        </div>

        {/* Section 5 */}
        {/* <CommunityVoicesSlider /> */}

        {/* Section 6 */}
        <Partners />

        {/* Section 7 */}
        <Gallery />

        {/* Section 8 */}
        <NewsletterSignup />

        {/* Section 9 */}
        <Archives />
      </div>
    </>
  );
};

export default Home;