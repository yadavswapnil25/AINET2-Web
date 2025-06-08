import { useState } from 'react';

import { FaChevronRight } from 'react-icons/fa';

// Banner images (horizontal) - replace with your actual imports
import galleryBan1 from "../../../assets/gallery/homegal-1.png";
import galleryBan2 from "../../../assets/gallery/homegal-2.png";
import galleryBan3 from "../../../assets/gallery/homegal-3.png";
import galleryBan4 from "../../../assets/gallery/homegal-4.png";
import galleryBan5 from "../../../assets/gallery/homegal-5.png";
import galleryBan6 from "../../../assets/gallery/homegal-6.png";
import galleryBan7 from "../../../assets/gallery/homegal-7.png";
import galleryBan8 from "../../../assets/gallery/homegal-8.png";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Banner images for top section
  const bannerImages = [
    { id: 1, src: galleryBan1, alt: "Audience sitting in conference hall" },
    { id: 2, src: galleryBan2, alt: "Wide shot of conference audience" },
    { id: 3, src: galleryBan3, alt: "Speaker presenting at podium" },
    { id: 4, src: galleryBan4, alt: "Conference panel with banner" },
    { id: 5, src: galleryBan5, alt: "Close-up of audience members" },
    { id: 6, src: galleryBan6, alt: "Speaker interacting with audience" },
    { id: 7, src: galleryBan7, alt: "Audience taking notes" },
    { id: 8, src: galleryBan8, alt: "Panel discussion with multiple speakers" },
  ];

  // Small images for bottom section
  const smallImages = [
    { id: 9, src: "https://picsum.photos/300/200?random=1", alt: "Event moment 1" },
    { id: 10, src: "https://picsum.photos/300/200?random=2", alt: "Event moment 2" },
    { id: 11, src: "https://picsum.photos/300/200?random=3", alt: "Event moment 3" },
    { id: 12, src: "https://picsum.photos/300/200?random=4", alt: "Event moment 4" },
    { id: 13, src: "https://picsum.photos/300/200?random=5", alt: "Event moment 5" },
    { id: 14, src: "https://picsum.photos/300/200?random=6", alt: "Event moment 6" },
    { id: 15, src: "https://picsum.photos/300/200?random=7", alt: "Event moment 7" },
    { id: 16, src: "https://picsum.photos/300/200?random=8", alt: "Event moment 8" },
    { id: 17, src: "https://picsum.photos/300/200?random=9", alt: "Event moment 9" },
    { id: 18, src: "https://picsum.photos/300/200?random=10", alt: "Event moment 10" },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="relative w-full rounded-[25px] overflow-hidden z-1 flex flex-col p-4 md:p-14">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold tracking-wide">OUR GALLERY</h2>
        <a href="/gallery" className="text-gray-400 hover:text-blue-500 flex items-center text-sm">
          View All  <FaChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="space-y-8">
        {/* Top Banner Section - Infinite Scroll (Slow) */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="flex animate-scroll-slow">
            {/* First set of images */}
            {bannerImages.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-full h-[400px] object-cover mr-4 cursor-pointer transition-transform  rounded-lg"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-2xl "
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {bannerImages.map((image) => (
              <div
                key={`duplicate-${image.id}`}
                className="flex-shrink-0 w-full h-[400px] object-cover mr-4 cursor-pointer transition-transform  rounded-lg"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Small Images Section - Infinite Scroll (Fast) */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="flex animate-scroll-fast">
            {/* First set of small images */}
            {smallImages.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-[150px] md:w-[200px] h-[100px] md:h-[130px] mr-3 cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {smallImages.map((image) => (
              <div
                key={`duplicate-${image.id}`}
                className="flex-shrink-0 w-[150px] md:w-[200px] h-[100px] md:h-[130px] mr-3 cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl max-h-screen relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-slow {
          animation: scroll-slow 40s linear infinite;
        }

        .animate-scroll-fast {
          animation: scroll-fast 20s linear infinite;
        }

        .animate-scroll-slow:hover,
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}