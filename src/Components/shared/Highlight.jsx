import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";

const Highlight = () => {
  const [highlightData, setHighlightData] = useState({
    heading: "HIGHLIGHTS",
    subheading: "9th AINET International Conference 2026 - To Be Announced SOON"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always fetch from API to get the latest highlight
    fetchHighlight();
  }, []);

  const fetchHighlight = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/client/highlights`);
      const data = await response.json();
      if (data.status && data.data?.highlight) {
        setHighlightData({
          heading: data.data.highlight.heading || "HIGHLIGHTS",
          subheading: data.data.highlight.subheading || "9th AINET International Conference 2026 - To Be Announced SOON"
        });
      }
    } catch (error) {
      console.error("Error fetching highlight:", error);
      // Keep default values on error
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or return a loading placeholder
  }

  return (
    <>
      <div className="w-full h-[50px] bg-[#D0E8C5] flex items-center font-bold text-lg overflow-clip">
        <span className="pr-4 w-[185px] clippath bg-[#A6AEBF] h-full text-white capitalize grid place-items-center z-10 px-4 text-[15px] md:text-xl">
          {highlightData.heading}
        </span>
        <div className="flex w-full justify-between">
          <span className="marquee-animation text-[#FF3D00] items-center text-center w-full z-0 px-12 py-2">{highlightData.subheading}</span>
        </div>
      </div>
    </>
  );
};

export default Highlight;
