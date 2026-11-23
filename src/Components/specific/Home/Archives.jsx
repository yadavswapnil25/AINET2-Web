import { FaBookOpen, FaExternalLinkAlt, FaLayerGroup } from "react-icons/fa";
import SectionHeading from "../../shared/SectionHeading";
import { containerClass } from "../../shared/sectionStyles";

const archiveGroups = [
  {
    category: "Conference",
    Icon: FaBookOpen,
    links: [
      {
        text: "7th AINET Conference, 2024",
        link: "/",
      },
      {
        text: "6th AINET Conference, 2022",
        link: "/",
      },
      {
        text: "5th AINET Conference, 2020",
        link: "/",
      },
      {
        text: "3rd AINET Conference, 2016",
        link: "/",
      },
    ],
  },
  {
    category: "Other Events",
    Icon: FaLayerGroup,
    links: [
      {
        text: "Teachers' Muse, Vol. 3, 2024",
        link: "https://store.pothi.com/book/amol-padwad-teachers-muse-vol-3/",
      },
      {
        text: "Decentring ELT, 2023",
        link: "https://www.hornby-trust.org.uk/wp-content/uploads/2024/11/Padwad-Smith-2023-compressed_1.pdf",
      },
      {
        text: "Connecting Eight Effective Classrooms, 2021",
        link: "https://store.pothi.com/book/dipika-gode-connecting-eight-effective-elt-classrooms-contexts-challenges-and-solutions/",
      },
      {
        text: "Research in ELE Directory, 2014",
        link: "https://store.pothi.com/book/amol-padwad-research-english-language-education-indian-universities-directory/",
      },
    ],
  },
];

const Archives = () => {
  return (
    <section aria-labelledby="archive-title" className="pb-20 sm:pb-24">
      <div className={containerClass}>
        <div className="rounded-[2rem] bg-sage-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <SectionHeading id="archive-title" eyebrow="Archive" title="From the Archive" />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {archiveGroups.map((group) => {
              const { Icon } = group;
              return (
                <div key={group.category} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
                  <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage text-sage-deep">
                      <Icon aria-hidden="true" />
                    </span>
                    {group.category}
                  </h3>

                  <ul className="mt-5 divide-y divide-ink/5">
                    {group.links.map((item) => (
                      <li key={item.text}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 py-3.5 text-[15px] font-medium text-ink/80 transition-colors hover:text-ink"
                        >
                          <span className="underline-offset-4 group-hover:underline">{item.text}</span>
                          <FaExternalLinkAlt
                            className="shrink-0 text-xs text-ink/30 transition-colors group-hover:text-sage-deep"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Archives;
