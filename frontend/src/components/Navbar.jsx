import React from "react";
import Button from "./Button";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">LLM Legal Simulator</h1>

      <div className="flex space-x-4">
        <Button>Home</Button>
        <Button>Cases</Button>
      </div>
    </header>
  );
}