import Highlight from "../Components/shared/Highlight";
import ImageCard from "../Components/shared/ImageCard";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";
import ScrollToTop from "../Components/ScrollToTop";

const conferences = [
  {
    id: 1,
    image: "/archives1.png",
    title: "7th AINET INTERNATIONAL ELT CONFERENCE GUWAHATI, FEBRUARY 3-4, 2024",
    link: "https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/",
  },
  {
    id: 2,
    image: "/archives2.png",
    title: "6th AINET INTERNATIONAL ELT CONFERENCE NEW DELHI, DECEMBER 5-6, 2022",
    link: "https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/",
  },
  {
    id: 3,
    image: "/archivesConf3.png",
    title: "5th AINET INTERNATIONAL ELT CONFERENCE HYDERABAD, JANUARY 3-4, 2020",
    link: "https://store.pothi.com/book/krishna-dixit-teaching-english-multilingual-contexts/",
  },
  {
    id: 4,
    image: "/archivesConf4.png",
    title: "4th AINET INTERNATIONAL ELT CONFERENCE MUMBAI, FEBRUARY 2-3, 2018",
    link: "/archives-conference",
  },
  {
    id: 5,
    image: "/archivesConf5.png",
    title: "2th AINET INTERNATIONAL ELT CONFERENCE MUMBAI, JANUARY 10, 2015",
    link: "https://store.pothi.com/book/krishna-dixit-vivek-joshi-milind-mane-english-language-education-understanding-change/",
  },
];

export default function ArchivesConference() {
  return (
    <>
      <ScrollToTop />
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Archives", to: "/archives" },
            { label: "Conference", to: null },
          ]}
          eyebrow="Archives"
          title="Conference"
        />

        <section className="py-12 pb-20 sm:py-16 sm:pb-24">
          <div className={`${containerClass} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
            {conferences.map((item) => (
              <ImageCard
                key={item.id}
                image={item.image}
                title={item.title}
                // External store links open in a new tab; the entry that only
                // points back at this page is shown without a link.
                href={item.link.startsWith("http") ? item.link : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
