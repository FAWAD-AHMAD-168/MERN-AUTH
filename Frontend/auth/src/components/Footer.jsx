// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-6 text-blue-700/70 text-sm">
      &copy; {new Date().getFullYear()} MERN Auth System. All rights reserved.
    </footer>
  );
};

export default Footer;
