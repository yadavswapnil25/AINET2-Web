import React from "react";
import Highlight from "../Components/shared/Highlight";
import Section1 from "../Components/specific/Publication/Section1";
import DecentringELTBook from "../Components/specific/Publication/DecentringBook";
import AinetOccasionalPapers from "../Components/specific/Publication/AinetOccasionalPapers";
import AinetConferences from "../Components/specific/Publication/AinetConferences";
import AinetPublications from "../Components/specific/Publication/AinetPublications";

const Publication = () => {
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Section1/>

        <DecentringELTBook/>

        <AinetOccasionalPapers/>

        <AinetConferences/>

        <AinetPublications/>
      </div>
    </>
  );
};

export default Publication;
