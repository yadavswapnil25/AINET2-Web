import { FaAward, FaBook } from "react-icons/fa";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";
import BookSection from "../Components/specific/Publication/DecentringBook";

const awards = [
  {
    id: 1,
    title:
      'Goodreads Choice Award (2012)-"Throne of Glass" nominee for Best Debut Goodreads Author',
  },
  {
    id: 2,
    title: 'New York Times Best Seller - "Throne of Glass"',
  },
  {
    id: 3,
    title:
      'Goodreads Choice Award (2015)- "A Court of Thorns and Roses" nominee for Best Fantasy',
  },
  {
    id: 4,
    title: 'New York Times Best Seller - "A Court of Thorns and Roses”',
  },
];

const book = {
  heading: "Decentring ELT book",
  coverImage: "/decentringBook.png",
  title: "Decentring ELT: Practices and Possibilities",
  editors: [
    { name: "Amol Padwad", img: "/editors.png" },
    { name: "Richard Smith", img: "/editors.png" },
  ],
  description: `The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
                  Educational Trust ('Hornby Trust', for short) aims to support the
                  development and dissemination of English Language Teaching (ELT)
                  ideas and actions that are found to be appropriate in particular
                  contexts by the participants concerned, with an initial specific
                  focus on the needs of learners and teachers of English in public
                  education systems in relatively low-income countries.`,
  buyLinks: {
    amazon: "#",
    flipkart: "#",
    pothi: "#",
    download: "#",
  },
  downloadText: "Download Now",
  bookInfo: [
    { icon: "./translateicon.svg", text: "English" },
    { icon: "./calender.svg", text: "12 March 2023" },
    { icon: "./pagespin.svg", text: "92 pages" },
    { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
  ],
};

export default function Author() {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Publication", to: "/publications" },
            { label: "Author", to: null },
          ]}
          eyebrow="Author"
          title="Author: Amol Padwad"
        />

        {/* About the author */}
        <section className="py-12 sm:py-16">
          <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
            <p className="ainet-prose text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
            <img
              src="/padwal.png"
              alt="Amol Padwad"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-ink/10 ring-1 ring-ink/5"
            />
          </div>
        </section>

        {/* Books */}
        <section className="pb-12 sm:pb-16">
          <div className={containerClass}>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              <span className="grid size-11 place-items-center rounded-2xl bg-sage text-lg text-sage-deep">
                <FaBook aria-hidden="true" />
              </span>
              Books by Amol Padwad
            </h2>
            <div className="mt-8 space-y-12">
              {[1, 2, 3].map((copy) => (
                <BookSection key={copy} {...book} />
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              <span className="grid size-11 place-items-center rounded-2xl bg-sage text-lg text-sage-deep">
                <FaAward aria-hidden="true" />
              </span>
              Awards
            </h2>
            <div className="mt-8 grid items-center gap-8 rounded-[2rem] bg-sky-soft p-6 sm:p-10 md:grid-cols-[240px_1fr]">
              <img src="/awards.png" alt="Awards" className="w-full rounded-2xl object-cover" />
              <ul className="space-y-4">
                {awards.map((award) => (
                  <li key={award.id} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-sage-deep" aria-hidden="true" />
                    {award.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
