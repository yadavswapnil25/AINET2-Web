import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/shared/Navbar";
import Footer from "./Components/shared/Footer";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Publication from "./Pages/Publication";
import AinetOccasionalPaperDetailed from "./Pages/AinetOccasionalPaperDetailed";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/publications" element={<Publication/>} />
        <Route path="/publications/occasional-papers" element={<AinetOccasionalPaperDetailed/>} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
