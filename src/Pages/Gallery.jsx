import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";

const galleryImages = [
  { src: "/galleryBan3.png", alt: "Conference speaker at podium" },
  { src: "/home_banner_1.png", alt: "Audience in conference hall" },
  { src: "/gallery_img_3.png", alt: "Panel discussion with speakers" },
  { src: "/gallery_img_2_1.png", alt: "Attendees in conference room" },
  { src: "/gallery_img_2_2.png", alt: "Speaker at conference podium" },
  { src: "/gallery_img_3_1.png", alt: "Two speakers on stage" },
  { src: "/gallery_img_3_2.png", alt: "Large audience in auditorium" },
  { src: "/gallery_img_3_3.png", alt: "Speaker presenting" },
  { src: "/gallery_img_4_1.png", alt: "Group photo of participants" },
  { src: "/gallery_img_4_2.png", alt: "Award ceremony" },
  { src: "/gallery_img_5_2.png", alt: "Group photo outside" },
  { src: "/gallery_img_5_3.png", alt: "Group photo outside" },
  { src: "/gallery_img_5_1.png", alt: "Networking session" },
  { src: "/gallery_img_5_2.png", alt: "Group photo outside" },
];

export default function Gallery() {
  // Index of the photo shown full-size, or null when the viewer is closed.
  const [openIndex, setOpenIndex] = useState(null);
  const count = galleryImages.length;
  const isOpen = openIndex !== null;

  const showPrevious = () => setOpenIndex((index) => (index - 1 + count) % count);
  const showNext = () => setOpenIndex((index) => (index + 1) % count);

  // Keyboard control and a still page while the viewer is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowLeft") setOpenIndex((index) => (index - 1 + count) % count);
      if (event.key === "ArrowRight") setOpenIndex((index) => (index + 1) % count);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, count]);

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Gallery", to: null },
          ]}
          eyebrow="Gallery"
          title="Gallery"
        />

        <section className="py-12 pb-20 sm:py-16 sm:pb-24">
          <div className={`${containerClass} columns-1 gap-4 sm:columns-2 lg:columns-3`}>
            {galleryImages.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-sage"
                aria-label={`Open photo: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </section>
      </main>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <img
            src={galleryImages[openIndex].src}
            alt={galleryImages[openIndex].alt}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrevious(); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:left-6"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:right-6"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
            {openIndex + 1} / {count}
          </p>
        </div>
      )}
    </>
  );
}
