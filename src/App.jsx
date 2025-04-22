import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/shared/Navbar";
import Footer from "./Components/shared/Footer";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MembershipArea from "./Pages/MembershipArea";
import BlogsSection1 from "./Components/specific/Blogs/BlogsSection1";
import BlogsSection2 from "./Components/specific/Blogs/BlogsSection2";
import ContactUs from "./Pages/ContactUs";
import MembershipFormforIndividualAnnual from "./Components/specific/Forms/MembershipFormforIndividualAnnual";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MembershipArea" element={<MembershipArea/>} />
        <Route path="/BlogsSection1" element={<BlogsSection1/>} />
        <Route path="/BlogsSection2" element={<BlogsSection2/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/MembershipFormforIndividualAnnual" element={<MembershipFormforIndividualAnnual/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
