// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react"; // added ShieldCheck icon

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/60 backdrop-blur-md shadow-md">
      {/* Left section with Lucide icon + title */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-blue-700" /> {/* Lucide icon */}
        <h1 className="text-2xl font-bold text-blue-700">MERN Auth</h1>
      </div>

      {/* Right section with links */}
      <div className="space-x-4">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium bg-gray-100 px-4 py-2 rounded-lg border border-blue-700 hover:bg-gray-200 transition-all active:text-white active:bg-blue-600"
        >
          <span>Login</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:border active:border-blue-600 active:bg-white active:text-blue-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Header;
