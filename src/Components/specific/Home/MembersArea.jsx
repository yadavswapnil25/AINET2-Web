import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { containerClass } from "../../shared/sectionStyles";

const types = [
  "Membership Privileges",
  "Member Rights",
  "Member Responsibilities",
  "Membership Terms",
  "Membership Types",
];

const MembersArea = () => {
  return (
    <section aria-labelledby="members-title" className="py-16 sm:py-20">
      <div className={containerClass}>
        <div className="relative overflow-hidden rounded-[2rem] bg-sage px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/35" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-1/3 size-60 rounded-full bg-cream/60" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-deep">
                <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
                AINET Members&apos; Area
              </p>
              <h2 id="members-title" className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                Get Involved!
                <br />
                Become an AINETian!
              </h2>

              <ul className="mt-7 flex flex-wrap gap-2">
                {types.map((type) => (
                  <li
                    key={type}
                    className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-ink"
                  >
                    <FaCheckCircle className="shrink-0 text-sage-deep" aria-hidden="true" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:ml-auto lg:w-full lg:max-w-sm lg:flex-col">
              <Link
                to="/#membershipplan"
                className="rounded-full bg-ink px-6 py-4 text-center font-bold text-white shadow-lg shadow-ink/15 transition-colors hover:bg-ink/85 sm:flex-1 lg:flex-none"
              >
                Not a member? Join in!
              </Link>
              <Link
                to="/login"
                className="rounded-full bg-white px-6 py-4 text-center font-bold text-ink transition-colors hover:bg-cream sm:flex-1 lg:flex-none"
              >
                Already a member? Log in
              </Link>
               <Link
                to="/login"
                className="rounded-full bg-white px-6 py-4 text-center font-bold text-ink transition-colors hover:bg-cream sm:flex-1 lg:flex-none"
              >
                Renew membership!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersArea;
