import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/shared/Footer";
import Navbar from "./Components/shared/Navbar";
import BlogsSection1 from "./Components/specific/Blogs/BlogsSection1";
import BlogsSection2 from "./Components/specific/Blogs/BlogsSection2";
import MembershipFormforIndividualAnnual from "./Components/specific/Forms/MembershipFormforIndividualAnnual";
import About from "./Pages/About";
import AinetOccasionalPaperDetailed from "./Pages/AinetOccasionalPaperDetailed";
import Archives from "./Pages/Archives";
import ContactUs from "./Pages/ContactUs";
import GalleryPage from "./Pages/Gallery";
import Home from "./Pages/Home";
import MembershipArea from "./Pages/MembershipArea";
import Publication from "./Pages/Publication";
import TeacherResearch from "./Pages/TeacherResearch";
import ArchivesConference from "./Pages/ArchivesConference";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MembershipArea" element={<MembershipArea />} />
        <Route path="/BlogsSection1" element={<BlogsSection1 />} />
        <Route path="/BlogsSection2" element={<BlogsSection2 />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/MembershipFormforIndividualAnnual" element={<MembershipFormforIndividualAnnual />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/publications" element={<Publication/>} />
        <Route path="/publications/occasional-papers" element={<AinetOccasionalPaperDetailed/>} />
        <Route path="/teacherResearch" element={<TeacherResearch/>} />
        <Route  path="/archives" element={<Archives/>} />
        <Route  path="/archives-conference" element={<ArchivesConference/>} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
