// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-blue-100 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4">
          404
        </h1>
        <p className="max-w-md mx-auto text-lg text-blue-700/80 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
