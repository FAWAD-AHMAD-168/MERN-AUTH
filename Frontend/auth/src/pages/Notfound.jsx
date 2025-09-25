import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-purple-100 flex flex-col">
      <nav className="flex justify-between items-center px-8 py-4 bg-white/60 backdrop-blur-md shadow-md">
        <h1 className="text-2xl font-bold text-purple-700">MERN Auth</h1>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-purple-800 mb-4">
          404
        </h2>
        <p className="max-w-xl text-lg text-purple-700/80 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md"
        >
          Go Back
        </button>
      </main>

      <footer className="text-center py-6 text-purple-700/70 text-sm">
        &copy; {new Date().getFullYear()} MERN Auth System. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
