import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, I'm looking for a home cook.",
      sender: "user",
      time: "10:30pm",
    },
    {
      id: 2,
      text: "Hello! 👋\n\nSure, I can help you find a cook.\nPlease tell me your location and preferred timing.",
      sender: "support",
      time: "10:30pm",
    },
    {
      id: 3,
      text: "I’m in Salt Lake, Kolkata. Morning cook needed.",
      sender: "user",
      time: "10:30pm",
    },
    {
      id: 4,
      text: "Got it 👍\n\nWhat type of cooking do you need?\n• Vegetarian\n• Non-Vegetarian\n• Both",
      sender: "support",
      time: "10:30pm",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      time: "10:30pm",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="chat-page">

      {/* HEADER */}
      <div className="chat-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Help and support</h3>
      </div>

      {/* CHAT AREA */}
      <div className="chat-body">

        <div className="chat-date">Today</div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user" ? "user" : "support"
            }`}
          >
            <div className="chat-bubble">
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="chat-input">

        <input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="send-btn" onClick={sendMessage}>
          ➤
        </button>

        <button className="attach-btn">📎</button>

      </div>
    </div>
  );
};

export default HelpSupport;