import { useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import galleryBan1 from "/galleryBan1.png";
import galleryBan2 from "/galleryBan2.png";
import galleryBan3 from "/galleryBan3.png";
import galleryBan4 from "/galleryBan4.png";
import galleryBan5 from "/galleryBan5.png";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: galleryBan1,
      alt: "Audience sitting in conference hall with people in red chairs in front row",
    },
    {
      id: 2,
      src: galleryBan2,
      alt: "Wide shot of conference audience",
    },
    {
      id: 3,
      src: galleryBan3,
      alt: "Speaker presenting at podium",
    },
    {
      id: 4,
      src: galleryBan4,
      alt: "Conference panel with banner",
    },
    {
      id: 5,
      src: galleryBan5,
      alt: "Close-up of audience members",
    },
  ];

  const handleImageClick = (id) => {
    setSelectedImage(id === selectedImage ? null : id);
  };

  return (
    <div className="mt-12 relative w-full  rounded-[25px] overflow-hidden z-1 flex flex-col p-4  md:p-14 ">
      <div className="flex justify-between items-center mb-4 border-b  pb-2">
        <h2 className="text-xl font-bold tracking-wide">OUR GALLERY</h2>
        <Link to="/gallery" className="text-gray-400 hover:text-blue-500 flex items-center text-sm">
          View All <FaChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4 ">
        {/* Featured image */}
        <div className="w-full rounded-lg overflow-hidden shadow-md">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-auto">
          {images.slice(1).map((image) => (
            <div
              key={image.id}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleImageClick(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[250px]  object-cover"

              />
            </div>
          ))}
        </div>

        {/* Modal for enlarged view */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="max-w-4xl max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images.find(img => img.id === selectedImage).src}
                alt={images.find(img => img.id === selectedImage).alt}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                className="mt-4 bg-white text-black px-4 py-2 rounded-md"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}