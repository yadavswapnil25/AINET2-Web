import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import ImageCard from "../Components/shared/ImageCard";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";

// Data structure to represent the archives content
const categories = [
  {
    title: "Conference",
    viewAll: "View All",
    navigate: "/archives-conference",
    items: [
      {
        id: 1,
        image: "/archives1.png",
        title: "7th AINET INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 24, 2022",
        date: "Feb 24",
      },
      {
        id: 2,
        image: "/archives2.png",
        title: "6th AINET INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 1-8, 2022",
        date: "Dec 1-8",
      },
    ],
  },
  {
    title: "Webinar",
    viewAll: "View All",
    navigate: "/archives-conference",
    items: [
      {
        id: 1,
        image: "/archives3.png",
        title: "PERSONAL FINANCE CONSULTANTS BY KARINA BUYS & SARAH HUDSON ON 16TH MARCH 2023",
        date: "Mar 16",
      },
    ],
  },
  {
    title: "FD Lectures",
    viewAll: "View All",
    navigate: "/archives-conference",
    items: [
      {
        id: 1,
        image: "/archives5.png",
        title: "FREE ENGLISH LECTURE BY LORIEM IPSUM ON 22ND MAY, 2024",
        date: "May 22",
      },
    ],
  },
  {
    title: "Other",
    viewAll: "View All",
    navigate: "/archives-conference",
    items: [
      {
        id: 1,
        image: "/archives7.png",
        title: "7th AINET INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 24, 2022",
        date: "Feb 24",
      },
      {
        id: 2,
        image: "/archives8.png",
        title: "6th AINET INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 1-8, 2022",
        date: "Dec 1-8",
      },
    ],
  },
];

export default function Archives() {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Archives", to: null },
          ]}
          eyebrow="Archives"
          title="Archives"
        />

        <div className={`${containerClass} space-y-14 py-12 pb-20 sm:space-y-16 sm:py-16 sm:pb-24`}>
          {categories.map((category) => (
            <section key={category.title} aria-label={category.title}>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{category.title}</h2>
                <Link
                  to={category.navigate}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {category.viewAll}
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <ImageCard key={item.id} image={item.image} title={item.title} meta={item.date} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
