import Highlight from "./Highlight";
import PageHeader from "./PageHeader";
import { readingContainerClass } from "./sectionStyles";

// Shared layout for the legal pages (terms, privacy, refund, shipping).
const PolicyPage = ({ title, effectiveDate, children }) => (
  <>
    <Highlight />

    <main>
      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: title, to: null },
        ]}
        eyebrow="Legal"
        title={title}
        intro={effectiveDate ? `Effective Date: ${effectiveDate}` : undefined}
      />

      <section className="py-12 pb-20 sm:py-16 sm:pb-24">
        <div className={readingContainerClass}>
          <div className="ainet-prose">{children}</div>
        </div>
      </section>
    </main>
  </>
);

export default PolicyPage;
