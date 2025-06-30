import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/shared/Footer";
import Loader from "./Components/shared/Loader";
import Login from "./Components/shared/Login";
import Navbar from "./Components/shared/Navbar";
import PrivateRoute from "./Components/shared/PrivateRoute";
import AboutNews from "./Pages/AboutNews";

// Layouts

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const MembershipArea = lazy(() => import("./Pages/MembershipArea"));
const BlogsSection1 = lazy(() => import("./Components/specific/Blogs/BlogsSection1"));
const BlogsSection2 = lazy(() => import("./Components/specific/Blogs/BlogsSection2"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const MembershipFormforIndividualAnnual = lazy(() => import("./Components/specific/Forms/MembershipFormforIndividualAnnual"));
const GalleryPage = lazy(() => import("./Pages/Gallery"));
const Publication = lazy(() => import("./Pages/Publication"));
const AinetOccasionalPaperDetailed = lazy(() => import("./Pages/AinetOccasionalPaperDetailed"));
const TeacherResearch = lazy(() => import("./Pages/TeacherResearch"));
const Archives = lazy(() => import("./Pages/Archives"));
const ArchivesConference = lazy(() => import("./Pages/ArchivesConference"));
const MembershipFormForIndividualOverseas = lazy(() => import("./Components/specific/Forms/MembershipFormForIndividualOverseas"));
const MembershipFormforInstitutionalAnnual = lazy(() => import("./Components/specific/Forms/MembershipFormforInstitutionalAnnual"));
const Conference = lazy(() => import("./Pages/Conference"));
const Webinar = lazy(() => import("./Pages/Webinar"));
const Author = lazy(() => import("./Pages/Author"));
const News = lazy(() => import("./Pages/News"));
const NewsDetails = lazy(() => import("./Pages/NewsDetails"));
const FDLecture = lazy(() => import("./Pages/FDLecture"));
const AboutAINETAffiliates = lazy(() => import("./Pages/AboutAINETAffiliates"));
const AboutWomenInAINET = lazy(() => import("./Pages/AboutWomenInAINET"));
const AboutRuralELT = lazy(() => import("./Pages/AboutRuralELT"));
const HELE = lazy(() => import("./Pages/HELE"));
const Prelims = lazy(() => import("./Pages/Prelims"));
const Decentring = lazy(() => import("./Pages/Decentring"));
const Resources = lazy(() => import("./Pages/Resources"));
const AINETConnect = lazy(() => import("./Pages/AINETConnect"));
const Profile = lazy(() => import("./Pages/Profile"));
const PageUnderConstruct = lazy(() => import("./Pages/PageUnderConstruct"));
const AinetOccasionalPapersList = lazy(() => import("./Components/specific/Publication/AinetOccasionalPapersList"));

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
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
          <Route path="/about/news" element={<AboutNews />} />
          <Route path="/FDLecture" element={<FDLecture />} />
          <Route path="/AboutAINETAffiliates" element={<AboutAINETAffiliates />} />
          <Route path="/AboutWomenInAINET" element={<AboutWomenInAINET />} />
          <Route path="/AboutRuralELT" element={<AboutRuralELT />} />
          <Route path="/HELE" element={<HELE />} />
          <Route path="/Prelims" element={<Prelims />} />
          <Route path="/Decentring" element={<Decentring />} />
          <Route path="/AINETConnect" element={<AINETConnect />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/news/newsDetail" element={<NewsDetails />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/pageunderconstruct" element={<PageUnderConstruct />} />
          <Route path="/ainet-occasional-papers-list" element={<AinetOccasionalPapersList />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
