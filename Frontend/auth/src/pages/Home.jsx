// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 flex flex-col">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
