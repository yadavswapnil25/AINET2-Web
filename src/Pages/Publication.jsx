import Highlight from "../Components/shared/Highlight";
import { containerClass } from "../Components/shared/sectionStyles";
import Section1 from "../Components/specific/Publication/Section1";
import AinetOccasionalPapers from "../Components/specific/Publication/AinetOccasionalPapers";
import AinetConferences from "../Components/specific/Publication/AinetConferences";
import AinetPublications from "../Components/specific/Publication/AinetPublications";
import BookSection from "../Components/specific/Publication/DecentringBook";
import TeacherMuse from "../Components/specific/Publication/TeacherMuse";
import ScrollToTop from "../Components/ScrollToTop";

const Publication = () => {
  return (
    <>
      <ScrollToTop />
      <Highlight />

      <main id="publications">
        <Section1 />

        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <BookSection
              heading="Decentring ELT book"
              coverImage="/decentringBook.png"
              title="Decentring ELT: Practices and Possibilities"
              editors={[
                { name: "Amol Padwad", img: "" },
                { name: "Richard Smith", img: "" },
              ]}
              description={`The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
        Educational Trust ('Hornby Trust', for short) aims to support the
        development and dissemination of English Language Teaching (ELT)
        ideas and actions that are found to be appropriate in particular
        contexts by the participants concerned, with an initial specific
        focus on the needs of learners and teachers of English in public
        education systems in relatively low-income countries.`}
              buyLinks={{
                amazon: "#",
                flipkart: "#",
                pothi: "#",
                download: "https://theainet.net/Decentring%20ELT%20Book_compressed.pdf",
              }}
              downloadText="Download Now"
              bookInfo={[
                { icon: "./translateicon.svg", text: "English" },
                { icon: "./calender.svg", text: "12 March 2023" },
                { icon: "./pagespin.svg", text: "92 pages" },
                { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
              ]}
            />
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className={`${containerClass} space-y-14 sm:space-y-16`}>
            <AinetConferences />
            <AinetOccasionalPapers />
            <TeacherMuse />
            <AinetPublications />
          </div>
        </section>
      </main>
    </>
  );
};

export default Publication;
