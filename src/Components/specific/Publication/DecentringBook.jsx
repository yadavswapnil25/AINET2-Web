import React from "react";
import { FaAmazon } from "react-icons/fa6";
import { SiFlipkart } from "react-icons/si";


export default function DecentringELTBook() {
  return (
    <div className="w-full mx-auto  mt-18">
      <h1 className="text-3xl font-bold mb-6">Decentring ELT book</h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Book Cover Image */}
        <div className="md:w-[350px] h-[477px] ">
          <img
            src="/decentringBook.png"
            alt="Decentring ELT: Practices and Possibilities book cover"
            className="w-full h-[477px] rounded-md shadow-md"
          />
        </div>

        {/* Book Information */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">
            Decentring ELT: Practices and Possibilities
          </h2>

          <div className="mb-4">
            <p className="text-gray-700 mb-4 text-[20px] font-bold">Editors :</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <img src="/editors.png" alt="Amol Padwad" />
                </div>
                <span className="text-[20px] font-bold">Amol Padwad</span>
              </div>
              <span className="text-[20px] font-bold">&</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <img src="/editors.png" alt="Richard Smith" />
                </div>
                <span className="text-[20px] font-bold">Richard Smith</span>
              </div>
            </div>
          </div>

          <p className="text-[18px] mb-6 pr-8">
            The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
            Educational Trust ('Hornby Trust', for short) aims to support the
            development and dissemination of English Language Teaching (ELT)
            ideas and actions that are found to be appropriate in particular
            contexts by the participants concerned, with an initial specific
            focus on the needs of learners and teachers of English in public
            education systems in relatively low-income countries.
          </p>

          <div className="mb-6">
            <h3 className="font-bold text-[20px] mb-6">Buy Now</h3>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] ">
              <FaAmazon className="font-bold text-white text-2xl text-center mx-auto"/>
              </button>
              <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] ">
                <SiFlipkart className="font-bold text-white text-2xl text-center mx-auto"/>
              </button>
              <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] ">
                <img src="/pothi.svg" alt="" />
              </button>
              <button className="bg-[#FFF8DE] px-6 py-2 btnshadow rounded-full text-[18px]  w-[250px] font-bold">
                Download Now
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Book Info</h3>
            <div className="flex flex-wrap gap-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src="./translateicon.svg" alt="" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-1">
              <img src="./calender.svg" alt="" />
                <span>12 March 2023</span>
              </div>
              <div className="flex items-center gap-1">
              <img src="./pagespin.svg" alt="" />
                <span>92 pages</span>
              </div>
              <div className="flex items-center gap-1">
              <img src="./dimentions.svg" alt="" />
                <span>21.6 x 14 x 1 cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
