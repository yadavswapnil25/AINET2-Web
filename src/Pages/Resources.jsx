import React from "react";
import Highlight from "../Components/shared/Highlight";
import Breadcrumbs from "../Components/shared/Breadcrumbs";

const Resources = () => {
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Resources", to: null },
          ]}
        />
        <h1 className=" text-[45px] font-semibold mt-12">Resources</h1>

        <ul className=" list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5 mb-14">
          <li>
            The links provided below were functional and valid as of April 2025.
          </li>
          <li>
            AINET takes no responsibility as regards the quality, policies and
            procedures of the listed journals.
          </li>
        </ul>

        <div className="">
          <h2 className=" text-2xl font-semibold">
            ELE Journals published in India
          </h2>
          <ul className=" list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5 mb-14">
            <li>
              <a href="https://www.riesi.ac.in/english-classroom-journal/">
                The English Classroom (RIESI, Bangalore) -
                https://www.riesi.ac.in/english-classroom-journal/
              </a>
            </li>
            <li>
              <a href="https://www.fortell.org/">
                FORTELL Journal (FORTELL) - https://www.fortell.org
              </a>
            </li>
            <li>
              <a href="https://journals.eltai.in/jelt/about">
                Journal of English Language Teaching (ELTAI) -
                https://journals.eltai.in/jelt/about
              </a>
            </li>
            <li>
              <a href="https://www.riesi.ac.in/english-classroom-journal/">
                The English Classroom (RIESI, Bangalore)
              </a>
            </li>
            <li>
              <a href="https://journals.eltai.in/jelt/about">
                FORTELL Journal (FORTELL)
              </a>
            </li>
            <li>
              <a href="http://www.hmpenglish.com/Publications.php">
                ELT Quarterly (HMPIETR)
              </a>
            </li>
            <li>
              <a href="http://www.languageinindia.com/">Language in India</a>
            </li>
          </ul>
        </div>


            <div className="">
          <h2 className=" text-2xl font-semibold">
          ELE Journals published in International
          </h2>
          <ul className=" list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5 mb-14">
            <li>
              <a href="http://www.tesl-ej.org">
                Teaching English as a Second Language - http://www.tesl-ej.org
              </a>
            </li>
            <li>
              <a href="https://focusonelt.com/index.php/foe">
              Focus on ELT Journal - https://focusonelt.com/index.php/foe
              </a>
            </li>
            <li>
              <a href="https://journals.eltai.in/jelt/about">
                Journal of English Language Teaching (ELTAI) -
                https://journals.eltai.in/jelt/about
              </a>
            </li>
            <li>
              <a href="https://www.riesi.ac.in/english-classroom-journal/">
                The English Classroom (RIESI, Bangalore)
              </a>
            </li>
            <li>
              <a href="https://journals.eltai.in/jelt/about">
                FORTELL Journal (FORTELL)
              </a>
            </li>
            <li>
              <a href="http://www.hmpenglish.com/Publications.php">
                ELT Quarterly (HMPIETR)
              </a>
            </li>
            <li>
              <a href="http://www.languageinindia.com/">Language in India</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Resources;


