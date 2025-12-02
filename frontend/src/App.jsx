import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [num, setNum] = useState("")

  useEffect(() => {
    fetch("http://localhost:4444/api_example/randomnum")
      .then(res => res.json())
      .then(data => setNum(data.randNum));
  }, []);

  return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        
        <div className="flex-auto p-6">
          <h4>Random Number: {num}</h4>
        </div>

        <Footer />
      </div>
  )
}

export default App
