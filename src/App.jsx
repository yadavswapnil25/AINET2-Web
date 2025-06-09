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
import MembershipFormForIndividualOverseas from "./Components/specific/Forms/MembershipFormforIndividualOverseas";
import MembershipFormforInstitutionalAnnual from "./Components/specific/Forms/MembershipFormforInstitutionalAnnual";
import Conference from "./Pages/Conference";
import Webinar from "./Pages/Webinar";
import Author from "./Pages/Author";
import News from "./Pages/News";
import NewsDetails from "./Pages/NewsDetails";
import "./App.css"
import FDLecture from "./Pages/FDLecture";
import AboutAINETAffiliates from "./Pages/AboutAINETAffiliates";
import AboutWomenInAINET from "./Pages/AboutWomenInAINET";
import AboutRuralELT from "./Pages/AboutRuralELT";
import HELE from "./Pages/HELE";
import Prelims from "./Pages/Prelims";
import Decentring from "./Pages/Decentring";

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
        <Route path="/publications" element={<Publication />} />
        <Route path="/publications/occasional-papers" element={<AinetOccasionalPaperDetailed />} />
        <Route path="/teacherResearch" element={<TeacherResearch />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/archives-conference" element={<ArchivesConference />} />
        <Route path="/MembershipFormForIndividualOverseas" element={<MembershipFormForIndividualOverseas />} />
        <Route path="/MembershipFormforInstitutionalAnnual" element={<MembershipFormforInstitutionalAnnual />} />
        <Route path="/Conference" element={<Conference />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/author" element={<Author />} />
        <Route path="/news" element={<News />} />
        <Route path="/FDLecture" element={<FDLecture />} />
        <Route path="/AboutAINETAffiliates" element={<AboutAINETAffiliates />} />
        <Route path="/AboutWomenInAINET" element={<AboutWomenInAINET />} />
        <Route path="/AboutRuralELT" element={<AboutRuralELT />} />
        <Route path="/HELE" element={<HELE />} />
        <Route path="/Prelims" element={<Prelims />} />
        <Route path="/Decentring" element={<Decentring />} />
      
        <Route path="/news/:title" element={<NewsDetails />} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
