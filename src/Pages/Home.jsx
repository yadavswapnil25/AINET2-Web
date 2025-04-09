import React from "react";
import Highlight from "../Components/shared/Highlight";
import home_banner_1 from "/home_banner_1.png";


const Home = () => {
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="w-full h-screen p-[34px] pt-[46px]  ">
        <div className="relative  w-full h-full rounded-[25px] bg-[#D0E8C5] overflow-hidden z-1 flex flex-col">
          {/* First Half */}
          <div className="w-full flex h-full justify-around md:h-[auto] z-1 relative p-4 md:p-14 flex-col md:flex-row">
            <div className="w-full md:[55%]">
              <h3 className="font-bold text-white tracking-wider te xt-3xl text-center md:text-left  md:text-[3vw] pl-8 leading-10 md:leading-20 ">
                A vibrant community of English Language Education professionals
                & stakeholders which aims to Develop. Together
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

          {/* Second Hald */}
          <div className="w-full flex h-full justify-around md:h-1/2 z-1 relative p-4 md:px-14 flex-col md:flex-row">
            <div className="w-full md:w-[55%] flex flex-col justify-start px-4 gap-4">
              <p className="text-[20px] text-white tracking-wider">
                An English language teacher association registered as charity in
                India. An IATEFL, UK Affiliate and TESOL, US Associate.
              </p>

              <div className="flex gap-4">
                <button className="uppercase bg-[#FFF8DE] rounded-4xl p-4 w-[305px] font-xl font-bold">
                  Join The Community
                </button>
                <button className="uppercase bg-[#D0E8C5] rounded-4xl p-4 w-[175px] font-xl font-bold">
                  READ MORE
                </button>
              </div>

              <div className="flex"></div>
            </div>
          </div>

          <div className="w-full h-1/2 z-1  border-b-2 border-red-800"></div>
          <div className="absolute bg-clip-1 w-full h-full bg-[#A6AEBF] top-0 z-0"></div>
        </div>
      </div>
    </>
  );
};



export default Home;
