import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constant";

// Fallback images if API fails
const fallbackImages = [
  { src: "./logos/ActiveTeachers.png", title: "Active Teachers Maharashtra" },
  { src: "./logos/BhandaraEnglish.png", title: "Bhandara English Teachers Club" },
  { src: "./logos/BritishCouncil.png", title: "British Council, India" },
  { src: "./logos/DeptofELT.png", title: "Dept. of ELT University of Gauhati" },
  { src: "./logos/DeptofEnglish.png", title: "Dept. of English Gondwana University" },
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
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/partners`);
        const data = await response.json();
        
        if (data.status && data.data && data.data.partners) {
          // Map API partners to match component structure
          const mappedPartners = data.data.partners.map(partner => ({
            id: partner.id,
            src: partner.logo_url || "",
            title: partner.name || "",
            link_url: partner.link_url || null,
          }));
          
          setPartners(mappedPartners);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Use API partners if available, otherwise fallback to hardcoded images
  const images = partners.length > 0 ? partners : fallbackImages;
  const allImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="w-full p-4  md:p-14  pt-[46px] h-auto overflow-hidden">
      <h3 className="font-bold text-[18px] uppercase underline underline-offset-2 tracking-wide">
        Partners
      </h3>

      <div className="partner-slider mt-4">
        {loading ? (
          <div className="slider-track flex">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center mx-4">
                <div className="h-[125px] w-[150px] bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="slider-track flex">
            {allImages.map((image, index) => (
              <div key={image.id || index} className="flex flex-col items-center mx-4">
                {image.link_url ? (
                  <a 
                    href={image.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={image.src}
                      alt={image.title || `partner-${index}`}
                      className="h-[125px] w-auto object-contain"
                    />
                  </a>
                ) : (
                  <img
                    src={image.src}
                    alt={image.title || `partner-${index}`}
                    className="h-[125px] w-auto object-contain"
                  />
                )}
                <span className="text-lg font-semibold text-center text-[#A6AEBF] ">
                  {wrapTitle(image.title)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Partners;
