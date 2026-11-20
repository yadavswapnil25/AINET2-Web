import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import ContactPanel from "../Components/shared/ContactPanel";
import Highlight from "../Components/shared/Highlight";
import PageHeader, { LogoTile } from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";

const mainPageContent =
  "AINET Teacher Research Initiative (TRI) is a recurrent activity which supports teachers in conducting classroom-based research in order to address their concerns, sort out their puzzles and work out solutions to their specific problems. Through an open call teachers are invited to join this voluntary initiative, who are then supported throughout the cycle (usually a year) in identifying their concerns, designing exploratory studies, carrying out research into the concerns and trying out 'solutions' based on the outcomes. A team of AINET mentors and peer-mentors from previous cycles helps the participants at every stage of the journey.This is an open initiative and those who are not members of AINET can also join. Announcements appear here, as well as on all AINET social media accounts. AINET members receive personal intimation when a TRI cycle is announced. So far TRI has run through four cycles.";

const secondSectionTitle = "You too can join the next cycle of AINET Teacher Research Initiative!";
const secondPageContentSub = "TRI is for you, if you …";
const thirdSectionTitle = "How AINET will help you...";

const secondPageContentSubList = [
  { id: 1, text: "Have a puzzle, an issue or a question related to your classroom, your students, your teaching, etc which you would like to know more and do something about." },
  { id: 2, text: "Are willing to spend a few months in systematically studying and exploring this puzzle/ issue/ question." },
  { id: 3, text: "Are ready to spend time on collecting and analyzing detailed information and drawing useful ideas from such systematic studies." },
  { id: 4, text: "Would like to try out some action in your own classroom based on your study." },
  { id: 5, text: "Would be happy to share your experience and findings with others (perhaps at a conference, a public event or some public forum)." },
  { id: 6, text: "May possibly want to write about and publish your entire experience (for which we will help)!" },
];

const thirdPageContentSubList = [
  { id: 1, text: "You will work in small teams and individually with us and we will support you at every stage of your work" },
  { id: 2, text: "We will offer reading materials, training in research, expert advice, regular support and great teams of fellow-teachers to work with!" },
  { id: 3, text: "We will also offer you chances to present your studies at public events/ forums like conferences and seminars." },
  { id: 4, text: "And, of course, we will give you a certificate of participation in the project and undertaking classroom research." },
];

const cardContent = [
  { id: 1, title: "AINET Teacher Research Initiative 2019-20", img: "/gallery_img_3_2.png", link: "/teacher-research" },
  { id: 2, title: "AINET Teacher Research Initiative 2021-22", img: "/gallery_img_2_1.png", link: "/teacher-research" },
  { id: 3, title: "AINET Teacher Research Initiative 2023-24", img: "/cardthirdteacherResearch.jpg", link: "/teacher-research" },
];

const CheckList = ({ items, tone = "light" }) => (
  <ul className="mt-6 space-y-4">
    {items.map((item) => (
      <li key={item.id} className="flex gap-3">
        <span
          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${tone === "dark" ? "bg-sage text-ink" : "bg-ink text-white"}`}
        >
          <FaCheck className="text-[10px]" aria-hidden="true" />
        </span>
        <span className={`leading-relaxed ${tone === "dark" ? "text-white/85" : "text-ink/80"}`}>{item.text}</span>
      </li>
    ))}
  </ul>
);

const TeacherResearch = () => {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "AINET Projects", to: null },
            { label: "Teacher Research", to: null },
          ]}
          eyebrow="Teacher Research Initiative"
          title="About TRI"
          aside={<LogoTile src="/teacherResearchLogo.png" alt="Teacher Research Initiative logo" />}
        />

        {/* About */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
            <p className="ainet-prose">{mainPageContent}</p>
            <img
              src="/aboutTriimg.png"
              alt="Teachers at an AINET Teacher Research Initiative session"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-ink/10 ring-1 ring-ink/5"
            />
          </div>
        </section>

        {/* Who it is for / how AINET helps */}
        <section className="pb-12 sm:pb-16">
          <div className={`${containerClass} grid gap-6 lg:grid-cols-2`}>
            <div className="rounded-[2rem] bg-sage-soft p-6 sm:p-10">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{secondSectionTitle}</h2>
              <p className="mt-3 text-lg font-semibold text-sage-deep">{secondPageContentSub}</p>
              <CheckList items={secondPageContentSubList} />
            </div>
            <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-10">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{thirdSectionTitle}</h2>
              <CheckList items={thirdPageContentSubList} tone="dark" />
            </div>
          </div>
        </section>

        {/* Past cycles */}
        <section className="pb-12 sm:pb-16">
          <div className={containerClass}>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Read More About TRIs</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cardContent.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img src={item.img} alt="" className="aspect-[4/3] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold leading-snug text-ink">{item.title}</h3>
                    <Link
                      to={item.link}
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/85 group-hover:gap-3"
                    >
                      Read More
                      <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactPanel emails={["theainet@gmail.com"]}>
          Watch out for the announcement of the next TRI cycle. For any queries or more details, write to us at{" "}
          <a href="mailto:theainet@gmail.com">theainet@gmail.com</a>.{" "}
          <span className="text-white/60">[Mention &apos;AINET TRI&apos; in the subject.]</span>
        </ContactPanel>
      </main>
    </>
  );
};

export default TeacherResearch;
