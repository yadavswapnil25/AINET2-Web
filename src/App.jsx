import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/shared/Navbar";
import Footer from "./Components/shared/Footer";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MembershipArea from "./Pages/MembershipArea";
import BlogsSection1 from "./Components/specific/Blogs/BlogsSection1";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/MembershipArea" element={<MembershipArea/>} />
        <Route path="/BlogsSection1" element={<BlogsSection1/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
