import Breadcrumbs from "./Breadcrumbs";
import { containerClass, eyebrowClass } from "./sectionStyles";

// Top band of every inner page: breadcrumbs, a small label, the page title,
// an optional intro, and an optional logo or actions on the right.
const PageHeader = ({ breadcrumbs, eyebrow, title, intro, aside, children }) => (
  <div className="relative overflow-hidden bg-sky-soft">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-sage/50 blur-3xl" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-1/4 size-80 rounded-full bg-sky/60 blur-3xl" />

    <div className={`${containerClass} relative py-10 sm:py-14`}>
      {breadcrumbs && <Breadcrumbs links={breadcrumbs} />}

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={eyebrowClass}>
              <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && <p className="mt-4 text-lg leading-relaxed text-ink/70">{intro}</p>}
          {children}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </div>
  </div>
);

// White tile for a project logo shown on the right of the page header.
export const LogoTile = ({ src, alt }) => (
  <div className="inline-flex rounded-3xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
    <img src={src} alt={alt} className="h-16 w-auto sm:h-20" />
  </div>
);

export default PageHeader;
