import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CASE_CONCEPTS } from './Cases';

export default function Simulation() {
  
  const [searchParams] = useSearchParams();
  const indexString = searchParams.get('index');
  var doctrine_idx = indexString ? parseInt(indexString, 10) : -1;

  if (doctrine_idx < 0) {
    {/* using legal_doctrines_101.tsv -> indexed 0 to 100 */}
    doctrine_idx = Math.floor(Math.random() * 101)
  }

  {/* get concept name for use on page */}
  let conceptName = 'Unknown Concept';
  const selectedConcept = CASE_CONCEPTS.find(concept => concept.idx === doctrine_idx);
  conceptName = selectedConcept.concept_name;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState("initial");
  const [storySoFar, setStorySoFar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function startSimulation(){
    {/* assure the initial question generation occurs exactly once on page load*/}
    if (phase != "initial" || isLoading) {
        return; 
    }
    
    setIsLoading(true);

    console.log(`phase ${phase}, storySoFar ${storySoFar}, doctrine_idx ${doctrine_idx}`)

    try {
      const res = await fetch("http://localhost:4444/api/generate-question",{ 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          phase: phase,
          story_so_far: storySoFar,
          doctrine_idx: doctrine_idx,
        }),
      });
      const data = await res.json();
      const storyChunk = data.storyChunk || "Error receiving story setup";
      const botMessage = { role: "bot", content: storyChunk };

      setMessages([botMessage]); 
      setStorySoFar(storyChunk);
      setPhase("middle");

    } catch (error) {
      console.error("Error during initial API call:", error);
      setMessages([{ role: "bot", content: "Error setting up simulation." }]);
    } finally {
      setIsLoading(false);
    }
    

  };

  async function sendMessage(){
    console.log(input)

    const processedInput = input.trim()
    if(!processedInput || isLoading) return;

    setIsLoading(true);

    const userMessage = {role: "user", content: processedInput};
    setMessages(prev => [...prev, userMessage]);

    //Needs correct location
    const res = await fetch("http://localhost:4444/api/generate-question",{ 
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        phase: phase,
        story_so_far: storySoFar,
        doctrine_idx: doctrine_idx,
      }),
    });
    const data = await res.json();
    const botMessageContent = data.answerChunk || "No answer/rationale Returned";
    const storyChunk = data.storyChunk || "";
    const botMessage = { role: "bot", content: botMessageContent };

    setMessages(prev => [...prev, botMessage]);
    if (phase == "initial") {
      setStorySoFar(storyChunk);
    } else {
      setStorySoFar(prev => + prev + " " + (storyChunk || ""));
    }
    
    if (phase === "middle") setPhase("end");

    setInput("");

  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Simulation</h2>
      
      {messages.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p>Selected Legal Concept: 
            <span className="px-2">
              {conceptName}
            </span>
          </p>
          <button 
            className="bg-green-800 text-white px-8 py-4 rounded-md hover:bg-green-700 transition cursor-pointer text-xl"
            onClick={startSimulation}
            disabled={isLoading}
          >
            {isLoading ? 'Generating Case...' : 'Start Simulation'}
          </button>
        </div>
      ) : (
        <div>
          <p>Please type your responses below!</p>
          <div>
            {messages.map((msg, idx) =>(
              <div key={idx} style={{ margineBottom: 10, border: "2px solid #000000ff", borderRadius: 4 }}>
                <b>{msg.role === "user" ? "Attorney:" : "Court:"}</b> 
                
                <div className="whitespace-pre-wrap mt-1">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <input
          value = {input}
          onChange = {e => setInput(e.target.value)}
          style = {{ width: "80%", padding: 8, border: "2px solid #000000ff", borderRadius: 4 }}/>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer" onClick = {sendMessage} style = {{ padding: 8 }}>Send</button>
        </div>
      )}
    </div>
  );
}