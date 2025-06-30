import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Archives = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const events = [
    {
      category: "Conference",
      description: {
        text: "7th AINET Conference, 2024",
        link: "https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/"
      },
      description1: {
        text: "6th AINET Conference, 2022",
        link: "https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/"
      },
      description2: {
        text: "5th AINET Conference, 2020",
        link: "https://store.pothi.com/book/krishna-dixit-teaching-english-multilingual-contexts/"
      },
      description3: {
        text: "3rd AINET Conference, 2016",
        link: "https://store.pothi.com/book/krishna-dixit-exploring-learners-and-learning-english/ "
      }
    },
    
    {
      category: "Other Events",
      description: {
        text: "Teachers' Muse, Vol. 3, 2024",
        link: "https://store.pothi.com/book/amol-padwad-teachers-muse-vol-3/"
      },
      description1: {
        text: "Decentring ELT, 2023",
        link: "https://www.hornby-trust.org.uk/wp-content/uploads/2024/11/Padwad-Smith-2023-compressed_1.pdf"
      },
      description2: {
        text: "Connecting Eight Effective Classrooms, 2021",
        link: "https://store.pothi.com/book/dipika-gode-connecting-eight-effective-elt-classrooms-contexts-challenges-and-solutions/"
      },
      description3: {
        text: "Research in ELE Directory, 2014",
        link: "https://store.pothi.com/book/amol-padwad-research-english-language-education-indian-universities-directory/"
      },
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

  const handleLinkClick = (link) => {
    // For demo purposes, just log the link. In real app, use router navigation
    console.log('Navigating to:', link);
    window.location.href = link; // For direct navigation
    // or use your router: navigate(link);
  };

  return (
    <div className="w-full p-2.5 bg-[#D0E8C5] rounded-3xl flex flex-col md:flex-row gap-4 md:gap-9 mt-[40px] relative">
      <div className="h-[80px] md:h-[180px] bg-[#FFF8DE] w-full md:min-w-[130px] md:w-auto rounded-tl-[20px] rounded-tr-[20px] md:rounded-tr-none md:rounded-bl-[20px] flex items-center md:justify-center justify-start pl-4 md:pl-0 underline text-lg font-semibold">
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
            <p 
              className="cursor-pointer"
              onClick={() => handleLinkClick(event.description.link)}
            >
              {event.description.text}
            </p> 
            <p 
              className="cursor-pointer"
              onClick={() => handleLinkClick(event.description1.link)}
            >
              {event.description1.text}
            </p> 
            <p 
              className="cursor-pointer"
              onClick={() => handleLinkClick(event.description2.link)}
            >
              {event.description2.text}
            </p>
            {event.description3 && (
              <p 
                className="cursor-pointer"
                onClick={() => handleLinkClick(event.description3.link)}
              >
                {event.description3.text}
              </p>
            )}
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