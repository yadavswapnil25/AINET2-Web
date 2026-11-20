import { FaEnvelope } from "react-icons/fa";
import { containerClass } from "./sectionStyles";

// Dark "get in touch" band used at the end of project pages. `children` is the
// page's own sentence (with its inline email links); `emails` become buttons.
const ContactPanel = ({ title = "Get in touch", emails = [], children }) => (
  <section className="pb-20 sm:pb-24">
    <div className={containerClass}>
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
        <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sage/20 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sage">
              <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
              {title}
            </p>
            <div className="mt-4 text-lg leading-relaxed text-white/85 sm:text-xl [&_a]:font-semibold [&_a]:text-sage [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-white">
              {children}
            </div>
          </div>

          {emails.length > 0 && (
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-white"
                >
                  <FaEnvelope aria-hidden="true" />
                  {email}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default ContactPanel;
