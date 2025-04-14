import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import bg5 from "/bg5.png";

// Sample JSON data for the cards
const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    image: "/sliderImg1.png",
    date: "10th March 2024",
    testimonial:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design,",
  },
  {
    id: 2,
    name: "Sarah Smith",
    image: "/sliderImg2.png",
    date: "10th March 2024",
    testimonial:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design,",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "/sliderImg3.png",
    date: "10th March 2024",
    testimonial:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design,",
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "/sliderImg2.png",
    date: "10th March 2024",
    testimonial:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design,",
  },
  {
    id: 5,
    name: "David Wilson",
    image: "/sliderImg1.png",
    date: "10th March 2024",
    testimonial:
      "Lorem ipsum is a dummy or placeholder text commonly used in graphic design,",
  },
];

export default function CommunityVoicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const CARD_WIDTH =400;
  const CARD_GAP = 15;

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, testimonialsData.length - visibleCards)
    );
  };

  return (
    <div className="mt-12 relative w-full h-full md:h-screen rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat p-14 bg-cover" 
    style={{ backgroundImage: `url(${bg5})` }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold text-gray-900">
          Voices from the Community 
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= testimonialsData.length - visibleCards}
            className={`bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all ${
              currentIndex >= testimonialsData.length - visibleCards
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next slide"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="mx-auto overflow-hidden h-full"
        style={{
          width: `${visibleCards * (CARD_WIDTH + CARD_GAP)}px`,
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out items-center h-full"
          style={{
            transform: `translateX(-${
              currentIndex * (CARD_WIDTH + CARD_GAP)
            }px)`,
            gap: `${CARD_GAP}px`,
          }}
        >
          {testimonialsData.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0"
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <div
                className="bg-cream-100 p-4 rounded-lg shadow-md h-[450px]"
                style={{ backgroundColor: "rgba(255, 253, 240, 0.9)" }}
              >
                <div className="relative mb-4">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full rounded-md"
                    style={{ height: "270px", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <button className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <FaPlay className="text-blue-600 ml-1" size={16} />
                    </button> */}
                  </div>
                </div>
                <p className="text-black font-medium mb-2 text-end text-[18px]">
                  {card.date}
                </p>
                <p className="text-black font-medium text-start text-semibold text-[20px]">
                  {card.testimonial}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
