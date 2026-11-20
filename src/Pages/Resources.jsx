import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";

const notes = [
  "The links provided below were functional and valid as of April 2025.",
  "AINET takes no responsibility as regards the quality, policies and procedures of the listed journals.",
];

const journalGroups = [
  {
    title: "International ELE Journals",
    journals: [
      { name: "Teaching English as a Second Language", href: "http://www.tesl-ej.org" },
      { name: "Focus on ELT Journal", href: "https://focusonelt.com/index.php/foe" },
      { name: "The New English Teacher", href: "https://assumptionjournal.au.edu/index.php/newEnglishTeacher" },
      { name: "Taiwan Journal of TESOL", href: "http://www.tjtesol.org" },
      { name: "TESL Reporter", href: "https://esw.byuh.edu/tesol/tesl" },
      { name: "Journal of Language Teaching and Learning", href: "https://www.jltl.com.tr/index.php/jltl" },
      { name: "Canadian Journal of Learning & Technology", href: "https://cjlt.ca/index.php/cjlt/index" },
      { name: "Contemporary Issues in Technology & Teacher Education", href: "https://citejournal.org" },
      { name: "International Journal of Education Policy and Leadership", href: "http://journals.sfu.ca/ijepl/index.php/ijepl" },
      { name: "The International Journal of Special Education", href: "http://www.internationaljournalofspecialeducation.com/" },
      { name: "International Journal of Teaching and Learning in Higher Education", href: "http://www.isetl.org/ijtlhe/" },
      { name: "Issues in educational Research", href: "http://www.iier.org.au/iier.html" },
      { name: "Theory and Practice in Rural Education", href: "https://tpre.ecu.edu/index.php/tpre" },
      { name: "Journal of Curriculum and Instruction (up to 2019)", href: "http://www.joci.ecu.edu/index.php/JoCI" },
      { name: "Journal of Interactive Online Learning", href: "http://www.ncolr.org/jiol/" },
      { name: "Journal of Research in Rural Education", href: "http://www.jrre.psu.edu/" },
      { name: "Journal of Teaching and Learning", href: "http://ojs.uwindsor.ca/ojs/leddy/index.php/JTL" },
      { name: "PROFILE: Issues in Teachers' Professional Development", href: "https://revistas.unal.edu.co/index.php/profile" },
      { name: "Educational Leadership Magazine", href: "http://www.ascd.org/el/" },
    ],
  },
  {
    title: "ELE Journals published in India",
    journals: [
      { name: "The English Classroom (RIESI, Bangalore)", href: "https://www.riesi.ac.in/english-classroom-journal/" },
      { name: "FORTELL Journal (FORTELL)", href: "https://www.fortell.org" },
      { name: "Journal of English Language Teaching (ELTAI)", href: "https://journals.eltai.in/jelt/about" },
      { name: "ELT Quarterly (HMPIETR)", href: "http://www.hmpenglish.com/Publications.php" },
      { name: "Language in India", href: "http://www.languageinindia.com" },
    ],
  },
];

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const Resources = () => {
  return (
    <>
      <Highlight />

      <main id="resources">
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Resources", to: null },
          ]}
          eyebrow="Resources"
          title="Resources"
        />

        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <div className="flex gap-4 rounded-3xl bg-cream p-6 ring-1 ring-ink/10 sm:p-8">
              <FaInfoCircle className="mt-1 shrink-0 text-xl text-sage-deep" aria-hidden="true" />
              <ul className="space-y-2 text-[15px] leading-relaxed text-ink/80 sm:text-base">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {journalGroups.map((group) => (
          <section key={group.title} className="pb-12 last:pb-20 sm:pb-16 sm:last:pb-24">
            <div className={containerClass}>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{group.title}</h2>
                <span className="rounded-full bg-sage px-3 py-1 text-xs font-bold text-sage-deep">{group.journals.length}</span>
              </div>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.journals.map((journal) => (
                  <li key={journal.href}>
                    <a
                      href={journal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-ink/20"
                    >
                      <span>
                        <span className="block font-semibold leading-snug text-ink">{journal.name}</span>
                        <span className="mt-1 block text-sm text-ink/50">{hostOf(journal.href)}</span>
                      </span>
                      <FaExternalLinkAlt
                        className="mt-1 shrink-0 text-xs text-ink/30 transition-colors group-hover:text-sage-deep"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default Resources;
