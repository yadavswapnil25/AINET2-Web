import React from "react";

const images = [
  "/ATM.png",
  "/UAG.png",
  "/GSC.png",
  "/SJGS.png",
  "/POET.png",
  "/MNET.png",
  "/GOND.png",
];

const Partners = () => {
  const allImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="w-full p-4 md:p-[34px] pt-[46px] h-auto overflow-hidden">
      <h3 className="font-bold text-[18px] uppercase underline underline-offset-2 tracking-wide">
        Partners
      </h3>

      <div className="partner-slider mt-4">
        <div className="slider-track">
          {allImages.map((image, index) => (
            <img
              src={image}
              alt={`partner-${index}`}
              key={index}
              className="h-[125px] w-auto object-contain mx-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
