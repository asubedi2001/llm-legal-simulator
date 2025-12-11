import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cases from "./pages/Cases";
import Profile from "./pages/Profile";
import Simulation from "./pages/Simulation"

function App() {
  return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        
        <div className="flex-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/simulation" element={<Simulation />} />
          </Routes>
        </div>

        <Footer />
      </div>
  )
}

export default App
