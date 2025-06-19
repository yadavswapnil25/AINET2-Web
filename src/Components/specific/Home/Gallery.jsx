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

// small images (vertical) - replace with your actual imports
import gallery1 from "../../../assets/gallery/smallgal/homesmgal-1.png";
import gallery2 from "../../../assets/gallery/smallgal/homesmgal-2.png";
import gallery3 from "../../../assets/gallery/smallgal/homesmgal-3.png";
import gallery4 from "../../../assets/gallery/smallgal/homesmgal-4.png";
import gallery5 from "../../../assets/gallery/smallgal/homesmgal-5.png";
import gallery6 from "../../../assets/gallery/smallgal/homesmgal-6.png";
import gallery7 from "../../../assets/gallery/smallgal/homesmgal-7.png";
import gallery8 from "../../../assets/gallery/smallgal/homesmgal-8.png";
import gallery9 from "../../../assets/gallery/smallgal/homesmgal-9.png";
import gallery10 from "../../../assets/gallery/smallgal/homesmgal-10.png";
import gallery11 from "../../../assets/gallery/smallgal/homesmgal-11.png";
import gallery12 from "../../../assets/gallery/smallgal/homesmgal-12.png";
import gallery13 from "../../../assets/gallery/smallgal/homesmgal-13.png";
import gallery14 from "../../../assets/gallery/smallgal/homesmgal-14.png";
import gallery15 from "../../../assets/gallery/smallgal/homesmgal-15.png";
import gallery16 from "../../../assets/gallery/smallgal/homesmgal-16.png";
import gallery17 from "../../../assets/gallery/smallgal/homesmgal-17.png";
import gallery18 from "../../../assets/gallery/smallgal/homesmgal-18.png";
import gallery19 from "../../../assets/gallery/smallgal/homesmgal-19.png";
import gallery20 from "../../../assets/gallery/smallgal/homesmgal-20.png";
import { Link } from 'react-router-dom';

export default function Gallery() {
  

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
    { id: 9, src: gallery1, alt: "Event moment 1" },
    { id: 10, src: gallery2, alt: "Event moment 2" },
    { id: 11, src: gallery3, alt: "Event moment 3" },
    { id: 12, src: gallery4, alt: "Event moment 4" },
    { id: 13, src: gallery5, alt: "Event moment 5" },
    { id: 14, src: gallery6, alt: "Event moment 6" },
    { id: 15, src: gallery7, alt: "Event moment 7" },
    { id: 16, src: gallery8, alt: "Event moment 8" },
    { id: 17, src: gallery9, alt: "Event moment 9" },
    { id: 18, src: gallery10, alt: "Event moment 10" },
    { id: 19, src: gallery11, alt: "Event moment 10" },
    { id: 20, src: gallery12, alt: "Event moment 10" },
    { id: 21, src: gallery13, alt: "Event moment 10" },
    { id: 22, src: gallery14, alt: "Event moment 10" },
    { id: 23, src: gallery15, alt: "Event moment 10" },
    { id: 24, src: gallery16, alt: "Event moment 10" },
    { id: 25, src: gallery17, alt: "Event moment 10" },
    { id: 26, src: gallery18, alt: "Event moment 10" },
    { id: 27, src: gallery19, alt: "Event moment 10" },
    { id: 28, src: gallery20, alt: "Event moment 10" },
  ];



  return (
    <div className="relative w-full rounded-[25px] overflow-hidden z-1 flex flex-col p-4 md:p-14">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold tracking-wide">OUR GALLERY</h2>
        <Link to="/gallery" className="text-gray-400 hover:text-blue-500 flex items-center text-sm">
          View All <FaChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-2 md:space-y-8">
        {/* Top Banner Section - Infinite Scroll (Slow) */}
        <div className="relative overflow-hidden rounded-lg h-[250px] md:h-auto">
          <div className="flex animate-scroll-slow">
            {/* First set of images */}
            {bannerImages.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-[100vw] h-[200px] md:h-[450px] object-cover mr-0 cursor-pointer transition-transform rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {bannerImages.map((image) => (
              <div
                key={`duplicate-${image.id}`}
                className="flex-shrink-0 w-[100vw] h-[200px] md:h-[450px] object-cover mr-0 cursor-pointer transition-transform rounded-lg"
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
        <div className="relative overflow-hidden rounded-lg ">
          <div className="flex animate-scroll-fast">
            {/* First set of small images */}
            {smallImages.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-[150px] md:w-[300px] h-[100px] md:h-[200px] mr-3 cursor-pointer transition-transform hover:scale-105"
              
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
                className="flex-shrink-0 w-[150px] md:w-[300px] h-[100px] md:h-[200px] mr-3 cursor-pointer transition-transform hover:scale-105"
                
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

     

      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100vw * ${bannerImages.length}));
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
          animation: scroll-slow 32s steps(${bannerImages.length}, end) infinite;
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