import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";

const Highlight = () => {
  const [highlightData, setHighlightData] = useState({
    heading: "HIGHLIGHTS",
    subheading: "9th AINET International Conference 2026 - To Be Announced SOON",
    link_url: null
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
          subheading: data.data.highlight.subheading || "9th AINET International Conference 2026 - To Be Announced SOON",
          link_url: data.data.highlight.link_url || null
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

  const handleClick = () => {
    if (highlightData.link_url) {
      // Check if it's an absolute URL or relative path
      if (highlightData.link_url.startsWith('http://') || highlightData.link_url.startsWith('https://')) {
        window.open(highlightData.link_url, '_blank');
      } else {
        // Relative path - use React Router or window.location
        window.location.href = highlightData.link_url;
      }
    }
  };

  const highlightContent = (
    <div className="flex-1 overflow-hidden relative min-w-0">
      {/* Desktop: Marquee animation */}
      <span className="hidden md:block marquee-animation text-[#FF3D00] items-center text-center whitespace-nowrap px-12 py-2">
        {highlightData.subheading}
      </span>
      {/* Mobile: Full text, no truncation */}
      <span className="md:hidden text-[#FF3D00] items-center text-center px-4 py-2 text-sm leading-tight block">
        {highlightData.subheading}
      </span>
    </div>
  );

  return (
    <>
      <div className={`w-full min-h-[50px] bg-[#D0E8C5] flex items-center font-bold text-lg overflow-hidden relative ${highlightData.link_url ? 'cursor-pointer hover:bg-[#C0D8B5] transition-colors' : ''}`}>
        <span className="pr-4 w-[185px] flex-shrink-0 clippath bg-[#A6AEBF] h-full text-white capitalize grid place-items-center z-10 px-4 text-[15px] md:text-xl">
          {highlightData.heading}
        </span>
        {highlightData.link_url ? (
          <div onClick={handleClick} className="flex-1">
            {highlightContent}
          </div>
        ) : (
          highlightContent
        )}
      </div>
    </>
  );
};

export default Highlight;
