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
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto" id="resources"> 
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Resources", to: null },
          ]}
        />
        <h1 className="text-[45px] font-semibold mt-12">Resources</h1>

        <ul className=" list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5 mb-14">
          <li>
            The links provided below were functional and valid as of April 2025.
          </li>
          <li>
            AINET takes no responsibility as regards the quality, policies and
            procedures of the listed journals.
          </li>
        </ul>

        <div className="mb-14">
          <h2 className="text-2xl font-semibold">International ELE Journals</h2>
          <ul className="list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5">
            <li>
              <a href="http://www.tesl-ej.org" className="text-blue-600 hover:underline">
                Teaching English as a Second Language
              </a>
            </li>
            <li>
              <a href="https://focusonelt.com/index.php/foe" className="text-blue-600 hover:underline">
                Focus on ELT Journal
              </a>
            </li>
            <li>
              <a href="https://assumptionjournal.au.edu/index.php/newEnglishTeacher" className="text-blue-600 hover:underline">
                The New English Teacher
              </a>
            </li>
            <li>
              <a href="http://www.tjtesol.org" className="text-blue-600 hover:underline">
                Taiwan Journal of TESOL
              </a>
            </li>
            <li>
              <a href="https://esw.byuh.edu/tesol/tesl" className="text-blue-600 hover:underline">
                TESL Reporter
              </a>
            </li>
            <li>
              <a href="https://www.jltl.com.tr/index.php/jltl" className="text-blue-600 hover:underline">
                Journal of Language Teaching and Learning
              </a>
            </li>
            <li>
              <a href="https://cjlt.ca/index.php/cjlt/index" className="text-blue-600 hover:underline">
                Canadian Journal of Learning & Technology
              </a>
            </li>
            <li>
              <a href="https://citejournal.org" className="text-blue-600 hover:underline">
                Contemporary Issues in Technology & Teacher Education
              </a>
            </li>
            <li>
              <a href="http://journals.sfu.ca/ijepl/index.php/ijepl" className="text-blue-600 hover:underline">
                International Journal of Education Policy and Leadership
              </a>
            </li>
            <li>
              <a href="http://www.internationaljournalofspecialeducation.com/" className="text-blue-600 hover:underline">
                The International Journal of Special Education
              </a>
            </li>
            <li>
              <a href="http://www.isetl.org/ijtlhe/" className="text-blue-600 hover:underline">
                International Journal of Teaching and Learning in Higher Education
              </a>
            </li>
            <li>
              <a href="http://www.iier.org.au/iier.html" className="text-blue-600 hover:underline">
                Issues in educational Research
              </a>
            </li>
            <li>
              <a href="https://tpre.ecu.edu/index.php/tpre" className="text-blue-600 hover:underline">
                Theory and Practice in Rural Education
              </a>
            </li>
            <li>
              <a href="http://www.joci.ecu.edu/index.php/JoCI" className="text-blue-600 hover:underline">
                Journal of Curriculum and Instruction (up to 2019)
              </a>
            </li>
            <li>
              <a href="http://www.ncolr.org/jiol/" className="text-blue-600 hover:underline">
                Journal of Interactive Online Learning
              </a>
            </li>
            <li>
              <a href="http://www.jrre.psu.edu/" className="text-blue-600 hover:underline">
                Journal of Research in Rural Education
              </a>
            </li>
            <li>
              <a href="http://ojs.uwindsor.ca/ojs/leddy/index.php/JTL" className="text-blue-600 hover:underline">
                Journal of Teaching and Learning
              </a>
            </li>
            <li>
              <a href="https://revistas.unal.edu.co/index.php/profile" className="text-blue-600 hover:underline">
                PROFILE: Issues in Teachers' Professional Development
              </a>
            </li>
            <li>
              <a href="http://www.ascd.org/el/" className="text-blue-600 hover:underline">
                Educational Leadership Magazine
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-semibold">ELE Journals published in India</h2>
          <ul className="list-disc ml-5 text-2xl font-medium text-black leading-[40px] mt-5">
            <li>
              <a href="https://www.riesi.ac.in/english-classroom-journal/" className="text-blue-600 hover:underline">
                The English Classroom (RIESI, Bangalore)
              </a>
            </li>
            <li>
              <a href="https://www.fortell.org" className="text-blue-600 hover:underline">
                FORTELL Journal (FORTELL)
              </a>
            </li>
            <li>
              <a href="https://journals.eltai.in/jelt/about" className="text-blue-600 hover:underline">
                Journal of English Language Teaching (ELTAI)
              </a>
            </li>
            <li>
              <a href="http://www.hmpenglish.com/Publications.php" className="text-blue-600 hover:underline">
                ELT Quarterly (HMPIETR)
              </a>
            </li>
            <li>
              <a href="http://www.languageinindia.com" className="text-blue-600 hover:underline">
                Language in India
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Resources;


