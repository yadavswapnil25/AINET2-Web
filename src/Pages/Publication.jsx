import React from "react";
import Highlight from "../Components/shared/Highlight";
import Section1 from "../Components/specific/Publication/Section1";
import DecentringELTBook from "../Components/specific/Publication/DecentringBook";
import AinetOccasionalPapers from "../Components/specific/Publication/AinetOccasionalPapers";
import AinetConferences from "../Components/specific/Publication/AinetConferences";
import AinetPublications from "../Components/specific/Publication/AinetPublications";
import BookSection from "../Components/specific/Publication/DecentringBook";

const Publication = () => {
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Section1 />
        
        <BookSection
          heading="Decentring ELT book"
          coverImage="/decentringBook.png"
          title="Decentring ELT: Practices and Possibilities"
          editors={[
            { name: "Amol Padwad", img: "/editors.png" },
            { name: "Richard Smith", img: "/editors.png" },
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
            download: "#",
          }}
          downloadText="Download Now"
          bookInfo={[
            { icon: "./translateicon.svg", text: "English" },
            { icon: "./calender.svg", text: "12 March 2023" },
            { icon: "./pagespin.svg", text: "92 pages" },
            { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
          ]}
        />

        <AinetOccasionalPapers />
        <AinetConferences />
        <AinetPublications />
      </div>
    </>
  );
};

export default Publication;
