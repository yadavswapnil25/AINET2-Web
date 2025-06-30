import React from "react";

const Highlight = ({ heading, subheading }) => {
  return (
    <>
      <div className="w-full h-[50px] bg-[#D0E8C5] flex items-center font-bold text-lg overflow-clip">
        <span className="pr-4 w-[185px] clippath bg-[#A6AEBF] h-full text-white capitalize grid place-items-center z-10 px-4 text-[15px] md:text-xl">
          {heading}
        </span>
        <div className="flex w-full justify-between">
          <span className="marquee-animation text-[#FF3D00] items-center text-center w-full z-0 px-12 py-2">{subheading}</span>
        </div>
      </div>
    </>
  );
};



export default Highlight;
