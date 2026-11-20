import { Link } from "react-router-dom";

const importantDates = [
  { label: "Presentation Proposals Due:", value: "30 November 2026" },
  {
    label: "Early Bird Delegate & Presenter Registration:",
    value: "31 December 2026 (Fees double from 1 January 2027)",
  },
  { label: "Final Registration Closes:", value: "9 January 2027" },
];

const linkClass = "text-[#1BA9D6] font-semibold underline hover:text-[#0f7fa3]";

export default function AINET2027Conference() {
  return (
    <div className="bg-[#FFF8DE] min-h-screen px-4 py-10 md:py-14">
      <div className="max-w-5xl mx-auto text-gray-900">
        <div className="flex justify-center">
          <img
            src="/ainet2027-poster.jpg"
            alt="10th AINET International Conference 2027 poster"
            className="w-full max-w-[320px] md:max-w-[340px] rounded-3xl shadow-lg"
          />
        </div>

        <h1 className="text-2xl md:text-4xl text-center mt-8">
          10th AINET International Conference 2027 (Online)
        </h1>
        <p className="text-xl md:text-3xl text-center mt-5">
          <span className="font-bold">Theme:</span> English Language Education for Gen Z, Alpha &amp; Beyond
        </p>
        <p className="text-base md:text-lg text-center mt-6 max-w-3xl mx-auto">
          Supported By: British Council, India | Regional English Language Office (RELO), U.S. Mission, India
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 text-xl md:text-2xl px-2 md:px-6">
          <p><span className="font-bold">Dates:</span>&nbsp; 9–10 January 2027</p>
          <p><span className="font-bold">Mode:</span>&nbsp; Online</p>
        </div>

        <p className="text-lg md:text-xl text-center leading-relaxed mt-10">
          <span className="font-semibold">About the Conference:</span> AINET invites educators, researchers, and
          practitioners to submit proposals for papers (15 mins), pre-recorded videos (max. 4 mins), and digital
          posters. Selected academic presentations will be published in the conference proceedings with an ISBN.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-12">Important Dates &amp; Offer:</h2>
        <ul className="list-disc pl-8 md:pl-12 mt-4 space-y-4 text-lg md:text-xl">
          {importantDates.map((item) => (
            <li key={item.label}>
              <span className="text-[#F05A5A] font-semibold">{item.label}</span> {item.value}
            </li>
          ))}
          <li>
            <span className="text-[#F05A5A] font-semibold">Membership Offer:</span> Be an AINETian to get a 10%
            discount on registration fees!
            <div className="mt-3">
              <Link to="/#membershipplan" className={linkClass}>Become a Member</Link>
            </div>
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold mt-10">Action Links:</h2>
        <ul className="list-disc pl-8 md:pl-12 mt-4 space-y-4 text-lg md:text-xl break-words">
          <li>
            Visit Conference Website for Full Details:{" "}
            <a href="https://conf.theainet.net" target="_blank" rel="noopener noreferrer" className={linkClass}>
              https://conf.theainet.net
            </a>
          </li>
          <li>
            Delegate Registration:{" "}
            <Link to="/ainet2027drf" className={linkClass}>www.theainet.net/ainet2027drf</Link>
          </li>
          <li>
            Proposal Submission:{" "}
            <Link to="/ainet2027ppf" className={linkClass}>www.theainet.net/ainet2027ppf</Link>
          </li>
        </ul>

        <p className="text-lg md:text-xl mt-12 px-2">
          For queries or support, contact{" "}
          <a href="mailto:theainet@gmail.com" className="text-[#1BA9D6] font-semibold italic hover:underline">
            theainet@gmail.com
          </a>{" "}
          or WhatsApp/call{" "}
          <a href="https://wa.me/919322890031" target="_blank" rel="noopener noreferrer" className="text-[#1BA9D6] font-semibold italic hover:underline">
            9322890031
          </a>
          .
        </p>
      </div>
    </div>
  );
}
