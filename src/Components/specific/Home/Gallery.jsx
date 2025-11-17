import { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../utils/constant';

// Fallback banner images
import galleryBan1 from "../../../assets/gallery/homegal-1.png";
import galleryBan2 from "../../../assets/gallery/homegal-2.png";
import galleryBan3 from "../../../assets/gallery/homegal-3.png";
import galleryBan4 from "../../../assets/gallery/homegal-4.png";
import galleryBan5 from "../../../assets/gallery/homegal-5.png";
import galleryBan6 from "../../../assets/gallery/homegal-6.png";
import galleryBan7 from "../../../assets/gallery/homegal-7.png";
import galleryBan8 from "../../../assets/gallery/homegal-8.png";

// Fallback small images
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

const fallbackBannerImages = [
  { id: 1, src: galleryBan1, alt: "Audience sitting in conference hall" },
  { id: 2, src: galleryBan2, alt: "Wide shot of conference audience" },
  { id: 3, src: galleryBan3, alt: "Speaker presenting at podium" },
  { id: 4, src: galleryBan4, alt: "Conference panel with banner" },
  { id: 5, src: galleryBan5, alt: "Close-up of audience members" },
  { id: 6, src: galleryBan6, alt: "Speaker interacting with audience" },
  { id: 7, src: galleryBan7, alt: "Audience taking notes" },
  { id: 8, src: galleryBan8, alt: "Panel discussion with multiple speakers" },
];

const fallbackSmallImages = [
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
  { id: 19, src: gallery11, alt: "Event moment 11" },
  { id: 20, src: gallery12, alt: "Event moment 12" },
  { id: 21, src: gallery13, alt: "Event moment 13" },
  { id: 22, src: gallery14, alt: "Event moment 14" },
  { id: 23, src: gallery15, alt: "Event moment 15" },
  { id: 24, src: gallery16, alt: "Event moment 16" },
  { id: 25, src: gallery17, alt: "Event moment 17" },
  { id: 26, src: gallery18, alt: "Event moment 18" },
  { id: 27, src: gallery19, alt: "Event moment 19" },
  { id: 28, src: gallery20, alt: "Event moment 20" },
];

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/galleries`);
        const data = await response.json();
        
        if (data.status && data.data && data.data.galleries) {
          // Map API galleries to match component structure
          const mappedGalleries = data.data.galleries
            .filter(gallery => gallery.image_url) // Only include galleries with images
            .map(gallery => ({
              id: gallery.id,
              src: gallery.image_url,
              alt: gallery.title || `Gallery image ${gallery.id}`,
            }));
          
          setGalleries(mappedGalleries);
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  // Split galleries: first 8 for banners, rest for small images
  // Use API galleries if available, otherwise fallback
  const allImages = galleries.length > 0 ? galleries : [...fallbackBannerImages, ...fallbackSmallImages];
  const bannerImages = allImages.slice(0, 8);
  const smallImages = allImages.slice(8);



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
          {loading ? (
            <div className="flex">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[100vw] h-[200px] md:h-[450px] bg-gray-200 animate-pulse rounded-lg mr-0"
                ></div>
              ))}
            </div>
          ) : (
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
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                    }}
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
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Small Images Section - Infinite Scroll (Fast) */}
        <div className="relative overflow-hidden rounded-lg ">
          {loading ? (
            <div className="flex">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[150px] md:w-[300px] h-[100px] md:h-[200px] bg-gray-200 animate-pulse rounded-lg mr-3"
                ></div>
              ))}
            </div>
          ) : (
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
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                    }}
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
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
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