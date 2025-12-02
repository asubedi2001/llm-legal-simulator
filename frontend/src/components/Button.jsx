import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
    >
      {children}
    </button>
  );
}
