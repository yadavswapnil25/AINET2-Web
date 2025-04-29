import React from "react";
import { FaAmazon } from "react-icons/fa6";
import { SiFlipkart } from "react-icons/si";

export default function BookSection({
  heading,
  coverImage,
  title,
  editors,
  description,
  buyLinks,
  downloadText,
  bookInfo,
}) {
  return (
    <div className="w-full mx-auto mt-18">
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Book Cover Image */}
        <div className="md:w-[350px] h-[477px]">
          <img
            src={coverImage}
            alt={`${title} book cover`}
            className="w-full h-[477px] rounded-md shadow-md"
          />
        </div>

        {/* Book Information */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>

          <div className="mb-4">
            <p className="text-gray-700 mb-4 text-[20px] font-bold">Editors :</p>
            <div className="flex items-center gap-4 mb-4">
              {editors.map((editor, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[20px] font-bold">&</span>}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                      <img src={editor.img} alt={editor.name} />
                    </div>
                    <span className="text-[20px] font-bold">{editor.name}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="text-[18px] mb-6 pr-8">{description}</p>

          <div className="mb-6">
            <h3 className="font-bold text-[20px] mb-6">Buy Now</h3>
            <div className="flex flex-wrap gap-6">
              {buyLinks.amazon && (
                <a href={buyLinks.amazon} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] h-[52px]">
                    <FaAmazon className="font-bold text-white text-2xl text-center mx-auto" />
                  </button>
                </a>
              )}
              {buyLinks.flipkart && (
                <a href={buyLinks.flipkart} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] h-[52px]">
                    <SiFlipkart className="font-bold text-white text-2xl text-center mx-auto" />
                  </button>
                </a>
              )}
              {buyLinks.pothi && (
                <a href={buyLinks.pothi} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#98CF7F] px-4 py-2 rounded-md flex items-center w-[80px] h-[52px]">
                    <img src="/pothi.svg" alt="Pothi" />
                  </button>
                </a>
              )}
              {buyLinks.download && (
                <a href={buyLinks.download} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#FFF8DE] px-6 py-2 btnshadow rounded-full text-[18px] w-[250px] font-bold">
                    {downloadText}
                  </button>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Book Info</h3>
            <div className="flex flex-wrap gap-4 text-gray-500">
              {bookInfo.map((info, idx) => (
                <div className="flex items-center gap-1" key={idx}>
                  <img src={info.icon} alt="" />
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
