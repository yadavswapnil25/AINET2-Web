import { FaArrowRight } from "react-icons/fa";
import { IoCalendarOutline, IoLocationOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import ImageCard from "../Components/shared/ImageCard";
import InfoTile from "../Components/shared/InfoTile";
import PageHeader from "../Components/shared/PageHeader";
import { buttonPrimary, containerClass } from "../Components/shared/sectionStyles";

const previousLectures = [
  {
    id: 1,
    image: "/archives5.png",
    title: "PERSONAL FINANCE CONSULTANTS BY KARINA BUYS & SARAH HUDSON ON 16TH MARCH 2023",
  },
];

const FDLecture = () => {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "FDLecture", to: null },
          ]}
          eyebrow="Events"
          title="FDLecture"
        />

        {/* Upcoming lecture */}
        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Upcoming FDLecture</h2>

            <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/10">
              <img src="/fdletures.png" alt="AINET International ELT Webinar" className="w-full" />

              <div className="p-6 sm:p-10">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                  AINET INTERNATIONAL ELT WEBINAR (ONLINE),
                  <br />
                  APRIL 10-12, 2025
                </h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoTile icon={IoCalendarOutline} label="Date">13TH December, 2025</InfoTile>
                  <InfoTile icon={IoTimeOutline} label="Time">9:00 AM</InfoTile>
                  <InfoTile icon={IoLocationOutline} label="Location">GOOGLE MEET</InfoTile>
                  <InfoTile icon={IoPersonOutline} label="Guest">Laura Smith</InfoTile>
                </div>

                <div className="mt-8">
                  <a href="https://conf.theainet.net/" target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                    Register now
                    <FaArrowRight className="text-sm" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Previous lectures */}
        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Previous FDLecture</h2>
              <Link
                to="/archives-conference"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                View All
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {previousLectures.map((lecture) => (
                <ImageCard key={lecture.id} image={lecture.image} title={lecture.title} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FDLecture;
