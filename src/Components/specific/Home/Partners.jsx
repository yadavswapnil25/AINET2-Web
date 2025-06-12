import React from "react";

const images = [
  { src: "./logos/ActiveTeachers.png", title: "Active Teachers Maharashtra" },
  { src: "./logos/BhandaraEnglish.png", title: "Bhandara English Teachers Club" },
  { src: "./logos/BritishCouncil.png", title: "British Council, India" },
  { src: "./logos/DeptofELT.png", title: "Dept. of ELT University of Gauhati" },
  { src: "./logos/DeptofEnglish.png", title: "Dept. of English Gondwana Universit" },
  { src: "./logos/MumbaiNetwork.png", title: "Mumbai Network of English Teachers" },
  { src: "./logos/ProfessionalOutreach.png", title: "Professional Outreach for English Teachers, WB" },
  { src: "./logos/ProWiggleData.png", title: "ProWiggle Data Solutions Pvt. Ltd." },
  { src: "./logos/RELOUSEmbassy.png", title: "RELO, U. S. Embassy, India" },
  { src: "./logos/SJGSMahavidyalaya.png", title: "SJGS Mahavidyalaya Pipri, Wardha" },
];

// Helper function to insert <br /> at word boundaries
const wrapTitle = (title, maxLineLength = 20) => {
  const words = title.split(" ");
  let lines = [];
  let currentLine = "";

  words.forEach(word => {
    if ((currentLine + word).length <= maxLineLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);

  return lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const Partners = () => {
  const allImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="w-full p-4  md:p-14  pt-[46px] h-auto overflow-hidden">
      <h3 className="font-bold text-[18px] uppercase underline underline-offset-2 tracking-wide">
        Partners
      </h3>

      <div className="partner-slider mt-4">
        <div className="slider-track flex">
          {allImages.map((image, index) => (
            <div key={index} className="flex flex-col items-center mx-4">
              <img
                src={image.src}
                alt={`partner-${index}`}
                className="h-[125px] w-auto object-contain"
              />
              <span className="text-lg font-semibold text-center text-[#A6AEBF] ">
                {wrapTitle(image.title)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
