import { FaArrowRight, FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import Highlight from "../Components/shared/Highlight";
import { containerClass, eyebrowClass } from "../Components/shared/sectionStyles";

const importantDates = [
  { label: "Presentation Proposals Due:", value: "30 November 2026" },
  {
    label: "Early Bird Delegate & Presenter Registration:",
    value: "31 December 2026 (Fees double from 1 January 2027)",
  },
  { label: "Final Registration Closes:", value: "9 January 2027" },
];

const actionLinks = [
  { label: "Visit Conference Website for Full Details:", text: "https://conf.theainet.net", href: "https://conf.theainet.net" },
  { label: "Delegate Registration:", text: "www.theainet.net/ainet2027drf", to: "/ainet2027drf" },
  { label: "Proposal Submission:", text: "www.theainet.net/ainet2027ppf", to: "/ainet2027ppf" },
];

const linkClass = "font-semibold text-[#1BA9D6] underline underline-offset-4 hover:text-[#0f7fa3]";

export default function AINET2027Conference() {
  return (
    <>
      <Highlight />

      <main>
        {/* Poster + key facts */}
        <section className="relative overflow-hidden bg-cream-soft">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-sky/50 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-sage/50 blur-3xl" />

          <div className={`${containerClass} relative py-10 sm:py-14`}>
            <Breadcrumbs
              links={[
                { label: "Home", to: "/" },
                { label: "Conferences", to: "/Conference" },
                { label: "AINET 2027", to: null },
              ]}
            />

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
              <img
                src="/ainet2027-poster.jpg"
                alt="10th AINET International Conference 2027 poster"
                className="mx-auto w-full max-w-[320px] rounded-3xl shadow-2xl shadow-ink/20 ring-1 ring-ink/10 lg:max-w-none"
              />

              <div className="text-center lg:text-left">
                <p className={eyebrowClass}>
                  <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
                  AINET Conference 2027
                </p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  10th AINET International Conference 2027 (Online)
                </h1>
                <p className="mt-5 text-xl text-ink sm:text-2xl">
                  <span className="font-bold">Theme:</span> English Language Education for Gen Z, Alpha &amp; Beyond
                </p>
                <p className="mt-4 text-base text-ink/70 sm:text-lg">
                  Supported By: British Council, India | Regional English Language Office (RELO), U.S. Mission, India
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-ink shadow-sm ring-1 ring-ink/10">
                    <FaRegCalendarAlt className="text-sage-deep" aria-hidden="true" />
                    <span className="font-bold">Dates:</span> 9–10 January 2027
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-ink shadow-sm ring-1 ring-ink/10">
                    <MdComputer className="text-sage-deep" aria-hidden="true" />
                    <span className="font-bold">Mode:</span> Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">About the Conference</h2>
              <p className="ainet-prose mt-4 text-lg">
                AINET invites educators, researchers, and practitioners to submit proposals for papers (15 mins),
                pre-recorded videos (max. 4 mins), and digital posters. Selected academic presentations will be
                published in the conference proceedings with an ISBN.
              </p>
            </div>
          </div>
        </section>

        {/* Important dates & offer */}
        <section className="pb-12 sm:pb-16">
          <div className={containerClass}>
            <div className="rounded-[2rem] bg-sage-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Important Dates &amp; Offer:</h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {importantDates.map((item) => (
                  <li key={item.label} className="rounded-2xl bg-white p-5 text-lg shadow-sm ring-1 ring-ink/5">
                    <span className="font-semibold text-[#F05A5A]">{item.label}</span> {item.value}
                  </li>
                ))}
                <li className="rounded-2xl bg-white p-5 text-lg shadow-sm ring-1 ring-ink/5">
                  <span className="font-semibold text-[#F05A5A]">Membership Offer:</span> Be an AINETian to get a 10%
                  discount on registration fees!{" "}
                  <Link to="/#membershipplan" className={linkClass}>Become a Member</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Action links */}
        <section className="pb-12 sm:pb-16">
          <div className={containerClass}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Action Links:</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {actionLinks.map((item) => {
                const body = (
                  <>
                    <span className="block text-sm font-semibold text-ink/60">{item.label}</span>
                    <span className="mt-2 flex items-center justify-between gap-3 break-all text-lg font-bold text-[#1BA9D6]">
                      {item.text}
                      {item.href ? (
                        <FaExternalLinkAlt className="shrink-0 text-sm text-ink/30 group-hover:text-sage-deep" aria-hidden="true" />
                      ) : (
                        <FaArrowRight className="shrink-0 text-sm text-ink/30 group-hover:text-sage-deep" aria-hidden="true" />
                      )}
                    </span>
                  </>
                );
                const cardClass =
                  "group block h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-lg";
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>{body}</a>
                    ) : (
                      <Link to={item.to} className={cardClass}>{body}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <p className="rounded-[2rem] bg-ink px-6 py-8 text-center text-lg text-white/85 sm:px-10 sm:text-xl">
              For queries or support, contact{" "}
              <a href="mailto:theainet@gmail.com" className="font-semibold italic text-sage underline-offset-4 hover:underline">
                theainet@gmail.com
              </a>{" "}
              or WhatsApp/call{" "}
              <a href="https://wa.me/919322890031" target="_blank" rel="noopener noreferrer" className="font-semibold italic text-sage underline-offset-4 hover:underline">
                9322890031
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
