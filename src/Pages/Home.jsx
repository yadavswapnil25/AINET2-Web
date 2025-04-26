import React from "react";
import Highlight from "../Components/shared/Highlight";
import home_banner_1 from "/home_banner_1.png";
import bg1 from "/bg1.png";
import bg2 from "/bg2.png";


import home_banner_2 from "/home_banner_2.png";
import upcoming from "/upcoming.png";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import MembersArea from "../Components/specific/Home/MembersArea";
import CommunityVoicesSlider from "../Components/specific/Home/Slider";
import Partners from "../Components/specific/Home/Partners";
import Gallery from "../Components/specific/Home/Gallery";
import NewsletterSignup from "../Components/specific/Home/NewsletterSignup";
import Archives from "../Components/specific/Home/Archives";
import MembershipPlans from "../Components/shared/MembershipPlans"

const Home = () => {
  const eventsData = [
    {
      title: "International Conference 2025, 21th AINET Internat.",
      location: "North South University, Dhaka, Bangladesh",
      date: "25th MARCH, 2025",
    },
    {
      title: "AINET Seminar",
      location: "Barishal University, Barishal",
      date: "5th APRIL, 2025",
    },
    {
      title: "International Conference 2025, 22th AINET Internat.",
      location: "North South University, Saudi, UAE",
      date: "2nd AUGEST,2025",
    },
  ];
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="w-full h-auto p-4 md:p-[34px] pt-[46px]">
        {/* Section 1 */}
        <div
          className="relative w-full h-full md:h-screen rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          {/* First Half */}
          <div className="w-full flex h-full justify-around md:h-[auto]  relative p-4 md:p-14 md:pb-0 flex-col md:flex-row">
            <div className="w-full md:[55%]">
              <h3 className="font-bold text-white tracking-wider text-3xl text-center md:text-left  md:text-[2.8vw]  leading-8 md:leading-20 ">
                A vibrant community of English Language Education professionals
                & stakeholders which aims to <br /> Develop. Together
              </h3>
            </div>
            <div className="w-full md-w-[45%] flex justify-end pt-4">
              <img
                src={home_banner_1}
                alt="HomeImage"
                className="w-full  md:w-[75%] h-[350px]"
              />
            </div>
          </div>

          {/* Second Start */}
          <div className="w-full flex h-full  md:h-1/2 z-1 relative p-4 md:px-14 flex-col md:flex-row">
            <div className="w-full md:w-[55%] flex flex-col  px-4 gap-4">
              <p className="text-[20px] text-white tracking-wider">
                An English language teacher association registered as charity in
                India. An IATEFL, UK Affiliate and TESOL, US Associate.
              </p>

              <div className="flex gap-4">
                <button className="uppercase bg-[#FFF8DE] rounded-4xl p-4 w-[305px] font-xl font-bold btnshadow cursor-pointer">
                  Join The Community
                </button>
                <button className="uppercase bg-[#D0E8C5] rounded-4xl p-4 w-[175px] font-xl font-bold btnshadow cursor-pointer"
                onClick={() => window.location.href = '/about'}
                >
                  READ MORE
                </button>
              </div>

              <div className="flex mt-4  gap-14">
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#D0E8C5] font-bold text-4xl">1 M +</h3>
                  <p className="text-white text-[18px]">
                    Our online reach <br /> across all online platform.
                  </p>
                </div>

                <div className="w-[3px] bg-white h-full" />
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#D0E8C5] font-bold text-4xl">3400 +</h3>
                  <p className="text-white text-[18px]">
                    Our thriving community of educators.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[55%] flex flex-col  px-4 gap-4">
              <img
                src={home_banner_2}
                alt=""
                className="w-full  md:w-[75%] h-[350px]"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div
          className="mt-12 relative w-full h-full md:h-screen rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat p-14 bg-cover"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          {/* top */}
          <h2 className="text-3xl w-full font-medium">UPCOMING CONFERENCE</h2>
          <div className="w-full h-1/2 flex flex-col md:flex-row p-6 gap-8">
            <div className="w-full md:w-1/2 h-full flex justify-center items-center">
              <img src={upcoming} alt="upcoming conference" />
            </div>

            <div className=" w-full md:w-1/2 h-full flex items-center  md:items-start justify-center flex-col gap-8">
              <h3 className="font-bold text-4xl">
                20th International <br /> Conference & Exhibition
              </h3>
              <p className="text-xl text-center md:text-left">
                "The Future Of Language Education: Adapting To A Changing
                Landscape" <br />
                19 - 21 February 2025 - Canadian University, Dubai
              </p>
              <button className="uppercase bg-[#D0E8C5] rounded-4xl p-4 w-[305px] font-xl font-bold  btnshadow cursor-pointer">
                REGISTER NOW
              </button>
            </div>
          </div>

          {/* bottom */}
          <h2 className="text-3xl w-full font-medium mt-10">UPCOMING EVENTS</h2>

          <div className="w-full h-1/2  flex flex-col md:flex-row sm:flex-row mt-6 gap-8">
            {eventsData.map((event, index) => (
              <div
                key={index}
                className={`relative flex-1 bg-[#FFF8DE] rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow`}
              >
                <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
                <p className="flex items-center text-black mb-1 text-base font-medium">
                  <MdLocationOn className="mr-2 text-xl" />
                  {event.location}
                </p>
                <p className="flex items-center text-black text-base font-medium">
                  <FaCalendar className="mr-2 text-xl" />
                  {event.date}
                </p>

                <button className="absolute right-[5%] bottom-[5%] h-[40px] w-[40px] bg-black grid place-items-center rounded-full cursor-pointer">
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
        <CommunityVoicesSlider />

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