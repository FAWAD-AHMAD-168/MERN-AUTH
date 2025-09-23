// src/App.jsx
import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 text-center">
          MERN Authentication System
        </h1>

        {/* Subheading */}
        <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center">
          Secure, modern authentication made simple
        </h2>

        {/* Paragraphs */}
        <p className="text-slate-600 mb-4 text-center">
          This is a dummy frontend placeholder while the backend is being built.
          It will eventually contain the login, registration, and OTP verification
          screens for our MERN Authentication System.
        </p>

        <p className="text-slate-600 mb-8 text-center">
          The backend handles user registration, email OTP verification, password hashing,
          JWT token generation, and protected routes.
        </p>

        {/* Image placeholder */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="Authentication Illustration"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
