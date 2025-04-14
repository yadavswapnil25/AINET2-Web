import React from "react";

const Highlight = ({ heading, subheading }) => {
  return (
    <>
      <div className="w-full h-[50px] bg-[#D0E8C5] flex items-center font-bold text-lg overflow-clip">
        <span className="pr-4 w-[165px] clippath bg-[#A6AEBF] h-full text-white capitalize grid place-items-center z-10">
          {heading}
        </span>
        <span className="marquee-animation text-black items-center text-center w-full z-0">{subheading}</span>
      </div>
    </>
  );
};

export default Highlight;
