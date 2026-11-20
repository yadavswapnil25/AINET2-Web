import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../utils/constant';
import SectionHeading from '../../shared/SectionHeading';
import { containerClass } from '../../shared/sectionStyles';

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

const placeholder = (width, height) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E%3Crect fill="%23ddd" width="${width}" height="${height}"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E`;

const showPlaceholder = (width, height) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = placeholder(width, height);
};

const SLIDE_INTERVAL_MS = 4500;
const MAX_SLIDES = 12;
const SWIPE_THRESHOLD_PX = 40;

// Large slides keep their shape at every width; thumbnails grow in steps.
const slideShapeClass = "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]";
const thumbClass = "aspect-[3/2] w-[160px] shrink-0 sm:w-[220px] lg:w-[280px]";
const arrowClass =
  "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white sm:size-12";

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

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
              // Prefixed so uploaded ids never clash with the built-in photo ids.
              id: `uploaded-${gallery.id}`,
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

  // Photos uploaded in the portal come first. The built-in photos follow, so
  // the slider and the strip stay full even when only a few have been uploaded.
  const bannerImages = [...galleries, ...fallbackBannerImages].slice(0, MAX_SLIDES);
  const smallImages = [...galleries.slice(MAX_SLIDES), ...fallbackSmallImages];
  const slideCount = bannerImages.length;
  const activeSlide = slideCount ? slide % slideCount : 0;

  useEffect(() => {
    if (paused || slideCount < 2) return undefined;
    const timer = setInterval(() => setSlide((current) => (current + 1) % slideCount), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, slideCount]);

  const goTo = (index) => setSlide((index + slideCount) % slideCount);
  const showPrevious = () => goTo(activeSlide - 1);
  const showNext = () => goTo(activeSlide + 1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    if (Math.abs(distance) > SWIPE_THRESHOLD_PX) {
      if (distance < 0) showNext();
      else showPrevious();
    }
  };

  return (
    <section aria-labelledby="gallery-title" className="pb-16 sm:pb-20">
      <div className={containerClass}>
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Our Gallery"
          action={
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-soft px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              View all
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-10 space-y-4 sm:space-y-5">
          {/* Large photos: one at a time, auto-advancing, swipeable */}
          {loading ? (
            <div className={`${slideShapeClass} w-full animate-pulse rounded-3xl bg-sky-soft`} />
          ) : slideCount > 0 && (
            <div
              className="relative overflow-hidden rounded-3xl shadow-lg"
              aria-roledescription="carousel"
              aria-label="Event photos"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {bannerImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`${slideShapeClass} w-full shrink-0`}
                    aria-hidden={index !== activeSlide}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      onError={showPlaceholder(400, 300)}
                    />
                  </div>
                ))}
              </div>

              {slideCount > 1 && (
                <>
                  <button type="button" onClick={showPrevious} aria-label="Previous photo" className={`${arrowClass} left-3 sm:left-5`}>
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" onClick={showNext} aria-label="Next photo" className={`${arrowClass} right-3 sm:right-5`}>
                    <FaChevronRight aria-hidden="true" />
                  </button>

                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                    {bannerImages.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Show photo ${index + 1}`}
                        aria-current={index === activeSlide ? "true" : undefined}
                        className={`h-2.5 rounded-full shadow transition-all ${index === activeSlide ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Small photos: a continuous strip */}
          {loading ? (
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={`${thumbClass} animate-pulse rounded-2xl bg-sky-soft`} />
              ))}
            </div>
          ) : smallImages.length > 0 && (
            <div className="fade-edges overflow-hidden">
              <div
                className="gallery-marquee"
                style={{ animationDuration: `${Math.max(30, smallImages.length * 3)}s` }}
              >
                {[...smallImages, ...smallImages].map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className={`${thumbClass} mr-3 overflow-hidden rounded-2xl`}
                    aria-hidden={index >= smallImages.length || undefined}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={showPlaceholder(300, 200)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
