import { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constant";
import SectionHeading from "../../shared/SectionHeading";
import { containerClass } from "../../shared/sectionStyles";

// Fallback images if API fails
const fallbackImages = [
  { src: "./logos/ActiveTeachers.png", title: "Active Teachers Maharashtra" },
  { src: "./logos/BhandaraEnglish.png", title: "Bhandara English Teachers Club" },
  { src: "./logos/BritishCouncil.png", title: "British Council, India" },
  { src: "./logos/DeptofELT.png", title: "Dept. of ELT University of Gauhati" },
  { src: "./logos/DeptofEnglish.png", title: "Dept. of English Gondwana University" },
  { src: "./logos/MumbaiNetwork.png", title: "Mumbai Network of English Teachers" },
  { src: "./logos/ProfessionalOutreach.png", title: "Professional Outreach for English Teachers, WB" },
  { src: "./logos/ProWiggleData.png", title: "ProWiggle Data Solutions Pvt. Ltd." },
  { src: "./logos/RELOUSEmbassy.png", title: "RELO, U. S. Embassy, India" },
  { src: "./logos/SJGSMahavidyalaya.png", title: "SJGS Mahavidyalaya Pipri, Wardha" },
];

// Every partner gets the same tile, so the scrolling row keeps an even rhythm.
const itemClass = "mx-2.5 flex w-[160px] shrink-0 flex-col items-center gap-3 sm:mx-3 sm:w-[200px]";
const tileClass = "flex h-24 w-full items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-ink/10 sm:h-28";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/partners`);
        const data = await response.json();

        if (data.status && data.data && data.data.partners) {
          // Map API partners to match component structure
          const mappedPartners = data.data.partners.map(partner => ({
            id: partner.id,
            src: partner.logo_url || "",
            title: partner.name || "",
            link_url: partner.link_url || null,
          }));

          setPartners(mappedPartners);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Use API partners if available, otherwise fallback to hardcoded images
  const images = partners.length > 0 ? partners : fallbackImages;
  const allImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <section aria-labelledby="partners-title" className="py-16 sm:py-20">
      <div className={containerClass}>
        <SectionHeading id="partners-title" eyebrow="Partners" title="Our Partners" align="center" />
      </div>

      <div className="partner-slider fade-edges mt-10">
        {loading ? (
          <div className="slider-track">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className={itemClass}>
                <div className={`${tileClass} animate-pulse bg-sky-soft`} />
                <div className="h-4 w-3/4 animate-pulse rounded bg-sky-soft" />
              </div>
            ))}
          </div>
        ) : (
          <div className="slider-track">
            {allImages.map((image, index) => {
              // The second copy only exists to make the loop seamless.
              const isCopy = index >= images.length;
              const logo = (
                <img
                  src={image.src}
                  alt={image.title || "Partner logo"}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              );

              return (
                <div key={`${image.id ?? image.src}-${index}`} className={itemClass} aria-hidden={isCopy || undefined}>
                  {image.link_url ? (
                    <a
                      href={image.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isCopy ? -1 : undefined}
                      className={`${tileClass} transition hover:-translate-y-0.5 hover:shadow-lg`}
                    >
                      {logo}
                    </a>
                  ) : (
                    <div className={tileClass}>{logo}</div>
                  )}
                  <span className="text-center text-sm font-semibold leading-snug text-ink/60">
                    {image.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
