import React from "react";
import Highlight from "../Components/shared/Highlight";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import { Link } from "react-router-dom";

const TeacherResearch = () => {
  const mainPageContent =
    "AINET Teacher Research Initiative (TRI) is a recurrent activity which supports teachers in conducting classroom-based research in order to address their concerns, sort out their puzzles and work out solutions to their specific problems. Through an open call teachers are invited to join this voluntary initiative, who are then supported throughout the cycle (usually a year) in identifying their concerns, designing exploratory studies, carrying out research into the concerns and trying out 'solutions' based on the outcomes. A team of AINET mentors and peer-mentors from previous cycles helps the participants at every stage of the journey.This is an open initiative and those who are not members of AINET can also join. Announcements appear here, as well as on all AINET social media accounts. AINET members receive personal intimation when a TRI cycle is announced. So far TRI has run through four cycles.";
  const secondSectionTitle =
    "You too can join the next cycle of AINET Teacher Research Initiative!";
  const secondPageContentSub = "TRI is for you, if you …";

  const thirdSectionTitle = "How AINET will help you...";

  const secondPageContentSubList = [
    {
      id: 1,
      text: "Have a puzzle, an issue or a question related to your classroom, your students, your teaching, etc which you would like to know more and do something about.",
    },
    {
      id: 2,
      text: "Are willing to spend a few months in systematically studying and exploring this puzzle/ issue/ question.",
    },
    {
      id: 3,
      text: "Are ready to spend time on collecting and analyzing detailed information and drawing useful ideas from such systematic studies.",
    },
    {
      id: 4,
      text: "Would like to try out some action in your own classroom based on your study.",
    },
    {
      id: 5,
      text: "Would be happy to share your experience and findings with others (perhaps at a conference, a public event or some public forum).",
    },
    {
      id: 6,
      text: "May possibly want to write about and publish your entire experience (for which we will help)!",
    },
  ];
  const thirdPageContentSubList = [
    {
      id: 1,
      text: "You will work in small teams and individually with us and we will support you at every stage of your work",
    },
    {
      id: 2,
      text: "We will offer reading materials, training in research, expert advice, regular support and great teams of fellow-teachers to work with!",
    },
    {
      id: 3,
      text: "We will also offer you chances to present your studies at public events/ forums like conferences and seminars.",
    },
    {
      id: 4,
      text: "And, of course, we will give you a certificate of participation in the project and undertaking classroom research.",
    },
  ];

  const cardContent = [
    {
      id: 1,
      title: "AINET Teacher Research Initiative 2019-20",
      img: "/gallery_img_3_2.png",
      link: "/teacher-research",
    },
    {
      id: 2,
      title: "AINET Teacher Research Initiative 2021-22",
      img: "/gallery_img_2_1.png",
      link: "/teacher-research",
    },
    {
      id: 3,
      title: "AINET Teacher Research Initiative 2023-24",
      img: "/cardthirdteacherResearch.jpg",
      link: "/teacher-research",
    },
  ];
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto relative">
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "AINET Projects", to: null },
            { label: "Teacher Research", to: null },
          ]}
        />
        {/* teacherResearchLogo */}
        <img
          src="/teacherResearchLogo.png"
          alt="teacherResearchLogo"
          className=" relative ml-[60%] sm:ml-0 sm:absolute top-0 right-0"
        />
        {/* main content */}
        <div className="w-full mt-8 h-auto flex md:justify-between md:items-start justify-center items-center gap-8 flex-col md:flex-row">
          {/* left */}
          <div className="md:w-1/2 w-full">
            <h1 className="text-5xl font-bold mb-8">About TRI</h1>
            <p className="text-[18px] leading-9 font-medium">
              {mainPageContent}
            </p>
          </div>
          <div className="w-full md:w-1/2 mx-auto flex items-center justify-center">
            <img
              src="/aboutTriimg.png"
              alt=""
              className="w-[100%] h-[470px]"
            />
          </div>
        </div>
        {/* second content */}
        <h4 className=" text-2xl font-semibold mt-10">{secondSectionTitle}</h4>
        <h4 className=" text-2xl font-semibold ">{secondPageContentSub}</h4>
        <ul className=" mt-5 pl-8 w-[90%]">
          {secondPageContentSubList.map((item) => (
            <li
              key={item.id}
              className=" list-disc text-lg tracking-wider mb-4 font-medium"
            >
              {item.text}
            </li>
          ))}
        </ul>

        <h4 className=" text-2xl font-semibold mt-10">{thirdSectionTitle}</h4>

        <ul className=" mt-5 pl-8 w-[90%]">
          {thirdPageContentSubList.map((item) => (
            <li
              key={item.id}
              className=" list-disc text-lg tracking-wider mb-4 font-medium"
            >
              {item.text}
            </li>
          ))}
        </ul>

        <h2 className=" text-5xl font-semibold mt-10">Read More About TRIs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12 mt-10 ">
          {cardContent?.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 flex-col p-3 items-center justify-between w-full min-h-[425px] border border-[#A6AEBF] bg-white rounded-lg shadow-md shadow-[#00000040]"
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-[290px] object-cover rounded-lg"
              />

              <h3 className="text-2xl font-semibold mb-2 text-center">
                {item.title}
              </h3>
              <Link
                to={item.link}
                className="text-black font-semibold  text-xl text-center bg-[#FFF8DE] w-[80%] px-12 py-2.5 rounded-4xl btnshadow"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
        <div className=" grid place-items-center w-full">
          <h2 className=" text-2xl font-semibold mt-10 text-center w-full lg:w-[70%]">
            Watch out for the announcement of the next TRI cycle. For any
            queries or more details, write to us at{" "}
            <a
              href="mailto:theainet@gmail.com"
              className=" text-blue-700 underline"
            >
              theainet@gmail.com.
            </a>{" "}
            [Mention 'AINET TRI' in the subject.]
          </h2>
        </div>
      </div>
    </>
  );
};

export default TeacherResearch;
