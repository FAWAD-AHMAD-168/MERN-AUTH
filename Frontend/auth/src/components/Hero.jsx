import React from "react";
import { Link } from "react-router-dom";
import headerImg from "../assets/header_img.webp"; 

const Hero = () => {
  return (
    <section className="flex-grow flex flex-col items-center justify-center text-center px-4">
      
      <img
        src={headerImg}
        alt="Authentication "
        className="w-32 h-32 mb-6  rounded-full"
      />

      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
        Secure & Simple Authentication
      </h2>
      <p className="max-w-2xl text-lg text-blue-700/80 mb-8">
        Welcome to our MERN Authentication System. A clean and secure way to
        register, log in and manage your sessions.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          Create Account
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-700 border border-blue-600 rounded-xl hover:bg-blue-50 transition shadow-md"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Hero;
