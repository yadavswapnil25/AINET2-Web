import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const types = [
  "Membership Privileges",
  "Member Rights",
  "Member Responsibilities",
  "Membership Terms",
  "Membership Types",
];

const MembersArea = () => {
  return (
    <>
      <div className="py-4 px-8  bg-[#A6AEBF] w-full h-auto md:h-[200px] mt-12 flex flex-col md:flex-row rounded-[25px] gap-4 md:gap-0">
        {/* first */}
        <div className="w-full md:w-1/3">
          <h4 className="text-white font-bold underline underline-offset-2 text-[18px]">
            AINET MEMBERS' AREA
          </h4>

          <h3 className="text-2xl text-center  font-bold text-white mt-12">
            Get Involved! <br />
            Become an AINETian!
          </h3>
        </div>

        {/* second */}
        <div className="flex flex-col w-full md:w-1/3 h-full mt-4 md:mt-0 md:pl-14">
          {types?.map((type, index) => (
            <div
              className={`flex items-center gap-4  ${
                index === 0 ? "mt-0" : "mt-2"
              }`}
              key={index}
            >
              <FaCheckCircle className="text-white text-[20px]" />
              <p className="text-white text-[18px]">{type}</p>
            </div>
          ))}
        </div>

        {/* third */}
        <div className="w-full md:w-1/3 flex mt-4 md:mt-0 justify-around flex-col items-center gap-4">
          <button className="w-full md:w-[340px] bg-[#FFF8DE] text-black font-bold py-3 p-2 md:p-4 rounded-[30px] uppercase">
            Not a member? Join in!
          </button>
          <button className="w-full md:w-[340px] bg-[#ffffff] text-[#A6AEBF] font-bold py-3 p-2 md:p-4 rounded-[30px] uppercase">
            ALREADY A MEMBER? LOG IN
          </button>

        </div>
      </div>
    </>
  );
};

export default MembersArea;


