import React, { useState } from "react";

export default function Profile() {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(){
    if(!input.trim()) return;

    const userMessage = {role: "user", content: input};
    setMessages([...messages, userMessage]);

    //Needs correct location
    const res = await fetch("",{ 
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({messages: [...messages, userMessage]}),
    });
    const data = await res.json();
    const botMessage = data.reply;

    setMessages(prev => [...prev, botMessage]);
    setInput("");

  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Simulation</h2>
      <p>Please type your responses below!</p>
      <div>
        {messages.map((msg, idx) =>(
          <div key={idx} style={{ margineBottom: 10, border: "2px solid #000000ff", borderRadius: 4 }}>
            <b>{msg.role === "user" ? "You:" : "Bot:"}</b> {msg.content}
          </div>
        ))}
      </div>
      <input
      value = {input}
      onChange = {e => setInput(e.target.value)}
      style = {{ width: "80%", padding: 8, border: "2px solid #000000ff", borderRadius: 4 }}/>
      <button class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer" onClick = {sendMessage} style = {{ padding: 8 }}>Send</button>
    </div>

    

  );
}