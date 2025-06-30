import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "./Components/Admin/Layout";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/shared/Footer";
import Loader from "./Components/shared/Loader";
import Login from "./Components/shared/Login";
import Navbar from "./Components/shared/Navbar";
import PrivateRoute from "./Components/shared/PrivateRoute";
import AboutNews from "./Pages/AboutNews";
import AdminDashboard from "./Pages/Admin/Dashboard";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Normal user routes */}
          {!isAdminRoute && (
            <>
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
            </>
          )}

          {/* Admin Routes with Sidebar Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/admin/users/:id" element={<AdminUserView />} />
            <Route path="/admin/users/:id/edit" element={<AdminUserUpdate />} /> */}
          </Route>
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
