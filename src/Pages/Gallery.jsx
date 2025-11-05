// import { useState } from 'react';
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu when clicking outside
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const galleryRows = [
    // First row - 3 images
    [
      { id: 1, src: "/galleryBan3.png", alt: "Conference speaker at podium" },
      { id: 2, src: "/home_banner_1.png", alt: "Audience in conference hall" },
      {
        id: 3,
        src: "/gallery_img_3.png",
        alt: "Panel discussion with speakers",
      },
    ],
    // Second row - 2 images
    [
      {
        id: 4,
        src: "/gallery_img_2_1.png",
        alt: "Attendees in conference room",
      },
      {
        id: 5,
        src: "/gallery_img_2_2.png",
        alt: "Speaker at conference podium",
      },
    ],
    // Third row - 3 images
    [
      { id: 6, src: "/gallery_img_3_1.png", alt: "Two speakers on stage" },
      {
        id: 7,
        src: "/gallery_img_3_2.png",
        alt: "Large audience in auditorium",
      },
      { id: 8, src: "/gallery_img_3_3.png", alt: "Speaker presenting" },
    ],
    // Fourth row - 2 images
    [
      {
        id: 9,
        src: "/gallery_img_4_1.png",
        alt: "Group photo of participants",
      },
      { id: 10, src: "/gallery_img_4_2.png", alt: "Award ceremony" },
    ],
    // Fifth row - 2 images
    [
      // { id: 11, src: "/gallery_img_5_1.png", alt: "Networking session" },
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

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
        </div>
      </div>
      {/* Gallery with alternating rows */}
      <div className="space-y-4">
        {galleryRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid gap-4 ${
              row.length === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {row.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300"
              >
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
     
    </div>
  );
}
