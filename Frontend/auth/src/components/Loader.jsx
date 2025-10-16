
import React from "react";

export default function Loader() {
  return (
    <div className="h-screen w-screen flex  items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}
