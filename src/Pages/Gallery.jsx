
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

export default function Gallery() {
  const [view, setView] = useState('grid');
  
  // Sample gallery images - grouped to match the layout in the image
  const galleryRows = [
    // First row - 3 images
    [
      { id: 1, src: "/galleryBan3.png", alt: "Conference speaker at podium" },
      { id: 2, src: "/home_banner_1.png", alt: "Audience in conference hall" },
      { id: 3, src: "/gallery_img_3.png", alt: "Panel discussion with speakers" },
    ],
    // Second row - 2 images
    [
      { id: 4, src: "/gallery_img_2_1.png", alt: "Attendees in conference room" },
      { id: 5, src: "/gallery_img_2_2.png", alt: "Speaker at conference podium" },
    ],
    // Third row - 3 images
    [
      { id: 6, src: "/gallery_img_3_1.png", alt: "Two speakers on stage" },
      { id: 7, src: "/gallery_img_3_2.png", alt: "Large audience in auditorium" },
      { id: 8, src: "/gallery_img_3_3.png", alt: "Speaker presenting" },
    ],
    // Fourth row - 2 images
    [
      { id: 9, src: "/gallery_img_4_1.png", alt: "Group photo of participants" },
      { id: 10, src: "/gallery_img_4_2.png", alt: "Award ceremony" },
    ],
    // Fifth row - 2 images
    [
      { id: 11, src: "/gallery_img_5_1.png", alt: "Networking session" },
      { id: 12, src: "/gallery_img_5_2.png", alt: "Group photo outside" },
      { id: 12, src: "/gallery_img_5_3.png", alt: "Group photo outside" },
    ],
    [
      { id: 11, src: "/gallery_img_5_1.png", alt: "Networking session" },
      { id: 12, src: "/gallery_img_5_2.png", alt: "Group photo outside" },
    ],
  ];

  return (
    <div className="w-full mx-auto px-8 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb and Header */}
      <div className="mb-6 w-full md:w-[80%] mx-auto">
        <div className="text-sm mb-2">
          <span className="text-gray-500 font-bold text-[20px]">Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold text-[20px]">Gallery</span>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          
          <div className="flex items-center space-x-4">
          <IoSearchSharp />
            
            <button className="p-2 rounded-md text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Gallery with alternating rows */}
      {view === 'grid' ? (
        <div className="space-y-4">
          {galleryRows.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-4 ${row.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {row.map((image, imageIndex) => (
                <div key={imageIndex} className="overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-[350px] object-cover"

                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // List view
        <div className="space-y-4">
          {galleryRows.flat().map((image) => (
            <div key={image.id} className="overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}