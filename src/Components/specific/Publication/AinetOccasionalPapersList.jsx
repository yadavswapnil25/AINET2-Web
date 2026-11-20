import { FaDownload, FaRegCalendarAlt } from "react-icons/fa";
import occasionalPaper1 from "../../../assets/pdf/OP1.pdf";
import occasionalPaper2 from "../../../assets/pdf/OP2.pdf";
import { buttonPrimary } from "../../shared/sectionStyles";

const papers = [
  {
    id: 1,
    title: "AINET Occasional Papers No. 2",
    date: "November 2016",
    author: {
      name: "Dr. Krishna Dixit",
      institution: "Yeshwant Mahavidyalaya, Seloo, Wardha, India",
    },
    description:
      "Teacher Motivation: A Conceptual Overview Dr. Krishna Dixit, Ambedkar University Delhi, India AINET Association of English Teachers",
    image: "/ainetPaper.png",
    alt: "AINET Occasional Papers No. 2",
    pdf: occasionalPaper2,
  },
  {
    id: 2,
    title: "AINET Occasional Papers No. 1",
    date: "April 2014",
    author: {
      name: "Dr. Martin Wedell",
      institution: "School of Education, University of Leeds, UK",
    },
    description:
      "Initial English Teacher Education and English Curriculum Goals: Bridging the Gap Dr. Martin Wedell, School of Education, University of Leeds, UK AINET Association of English Teachers",
    image: "/ainetPaper.png",
    alt: "AINET Occasional Papers No. 1",
    pdf: occasionalPaper1,
  },
];

// "Dr. Krishna Dixit" -> "KD"
const initials = (name) =>
  name
    .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const handleDownload = (pdf) => {
  const link = document.createElement('a');
  link.href = pdf;
  // Set the download attribute to force download instead of navigation
  link.setAttribute('download', pdf.split('/').pop());
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AinetOccasionalPapersList() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {papers.map((paper) => (
        <article
          key={paper.id}
          className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:flex-row sm:p-8"
        >
          <img
            src={paper.image}
            alt={paper.alt}
            className="mx-auto w-40 shrink-0 self-start rounded-xl shadow-lg shadow-ink/15 ring-1 ring-ink/10 sm:mx-0"
          />

          <div className="flex flex-1 flex-col">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-ink/70">
              <FaRegCalendarAlt aria-hidden="true" />
              {paper.date}
            </p>
            <h2 className="mt-3 text-xl font-bold leading-snug text-ink">{paper.title}</h2>

            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold text-sage-deep">
                {initials(paper.author.name)}
              </span>
              <div>
                <p className="font-semibold text-ink">{paper.author.name}</p>
                <p className="text-sm text-ink/60">{paper.author.institution}</p>
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{paper.description}</p>

            <div className="mt-auto pt-6">
              <button type="button" className={buttonPrimary} onClick={() => handleDownload(paper.pdf)}>
                <FaDownload aria-hidden="true" />
                Download PDF
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
