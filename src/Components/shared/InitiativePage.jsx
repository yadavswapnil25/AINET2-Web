import ContactPanel from "./ContactPanel";
import Highlight from "./Highlight";
import PageHeader, { LogoTile } from "./PageHeader";
import { containerClass } from "./sectionStyles";

// Shared layout for the AINET project / initiative pages (Affiliates, Women in
// AINET, Rural ELT, HELE, Decentring, PRELIMS). Each page passes its own text.
const InitiativePage = ({
  breadcrumbs,
  eyebrow = "AINET Projects",
  title,
  subtitle,
  logo,
  image,
  description,
  listTitle,
  listItems = [],
  sections = [],
  contact,
}) => {
  const cleanListTitle = listTitle ? listTitle.replace(/\s*:\s*$/, "") : "";

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={eyebrow}
          title={title}
          intro={subtitle}
          aside={logo ? <LogoTile src={logo.src} alt={logo.alt} /> : null}
        />

        {/* Introduction + photo */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className={`${containerClass} grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14`}>
            <div className="ainet-prose whitespace-pre-line">{description}</div>
            {image && (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-3xl object-cover shadow-xl shadow-ink/10 ring-1 ring-ink/5 lg:sticky lg:top-28"
              />
            )}
          </div>
        </section>

        {/* Activities / benefits */}
        {listItems.length > 0 && (
          <section className="pb-12 sm:pb-16">
            <div className={containerClass}>
              <div className="rounded-[2rem] bg-sage-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
                {cleanListTitle && (
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{cleanListTitle}</h2>
                )}
                <ol className="mt-8 grid gap-4 md:grid-cols-2">
                  {listItems.map((item, index) => (
                    <li key={index} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold text-sage-deep">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-[15px] leading-relaxed text-ink/80">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Further text */}
        {sections.map((section, index) => (
          <section key={section.title || index} className="pb-12 sm:pb-16">
            <div className={containerClass}>
              <div className="max-w-4xl">
                {section.title && (
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{section.title}</h2>
                )}
                {section.html ? (
                  <div
                    className={`ainet-prose whitespace-pre-line ${section.title ? "mt-4" : ""}`}
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                ) : (
                  <div className={`ainet-prose whitespace-pre-line ${section.title ? "mt-4" : ""}`}>{section.text}</div>
                )}
              </div>
            </div>
          </section>
        ))}

        {contact ? (
          <ContactPanel emails={contact.emails}>{contact.message}</ContactPanel>
        ) : (
          <div className="pb-8" />
        )}
      </main>
    </>
  );
};

export default InitiativePage;
