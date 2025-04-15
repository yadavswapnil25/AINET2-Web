import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Archives = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const events = [
    {
      category: "Conference",
      title: "7th AINET International Conference 2024",
      description1: "Lorem ipsum is a dummy or placeholder",
      description2: "Lorem ipsum is a dummy or placeholder"
    },
    {
      category: "Webinar",
      title: "6th AINET International Conference 2023",
      description1: "Lorem ipsum is a dummy or placeholder",
      description2: "Lorem ipsum is a dummy or placeholder"
    },
    {
      category: "Other",
      title: "5th AINET International Conference 2022",
      description1: "Lorem ipsum is a dummy or placeholder",
      description2: "Lorem ipsum is a dummy or placeholder"
    },
  ];

  // Calculate number of items to show based on screen width
  const getVisibleItems = () => {
    // For small screens, show only current page
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [events[currentPage]];
    }
    // For medium screens, show 2 items
    else if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      // Ensure we don't go out of bounds
      const startIdx = Math.min(currentPage, events.length - 2);
      return events.slice(startIdx, startIdx + 2);
    }
    // For large screens, show all
    return events;
  };

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < events.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full p-2.5 bg-[#D0E8C5] rounded-3xl flex flex-col md:flex-row gap-4 md:gap-9 mt-[40px] relative">
      <div className="h-[80px] md:h-[180px] bg-[#FFF8DE] w-full md:min-w-[130px] md:w-auto rounded-tl-[20px] rounded-tr-[20px] md:rounded-tr-none md:rounded-bl-[20px] grid place-items-center underline text-lg font-semibold">
        ARCHIVE
      </div>
      
      {/* Mobile Navigation Controls */}
      <div className="md:hidden flex justify-between w-full px-4">
        <button 
          onClick={handlePrev} 
          className="bg-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <button 
          onClick={handleNext} 
          className="bg-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>
      
      <div className="h-auto w-full flex flex-col items-center md:flex-row justify-between px-4 md:px-0 md:pr-12 pb-4 md:pb-0 overflow-x-hidden">
        {getVisibleItems().map((event, index) => (
          <div 
            className="flex flex-col gap-2 text-black text-[16px] underline my-2 md:my-0" 
            key={index}
          >            
            <h3 className="text-lg font-semibold">{event.category}</h3>
            <p className="">{event.title}</p> 
            <p className="">{event.description1}</p> 
            <p className="">{event.description2}</p>
          </div>
        ))}
        
        {/* Pagination indicator for mobile */}
        <div className="flex justify-center space-x-1 mt-2 md:hidden">
          {events.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full ${currentPage === idx ? 'bg-black' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archives;