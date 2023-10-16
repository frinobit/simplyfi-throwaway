import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Chatbot = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add the user's message to the chat
    const userMessage = { text: inputMessage, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");

    try {
      // Send the user's message to the backend API
      const response = await fetch("/dialogflow", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Parse the response from the backend
      const data = await response.json();

      // Add the chatbot's response to the chat
      const chatbotResponse = { text: data.message, isUser: false };
      const updatedMessagesWithBot = [...updatedMessages, chatbotResponse];
      setMessages(updatedMessagesWithBot);
      setTimeout(() => {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }, 0);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-container">
        <header>
          <img src="./assets/berry_smooth.svg" alt="berry_smooth" />
          <h2>Berry Smooth</h2>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`chat ${message.isUser ? "user" : "bot"}`}
            >
              {message.isUser ? null : (
                <span className="material-symbols-outlined">smart_toy</span>
              )}
              <p className={`message ${message.isUser ? "user" : "bot"}`}>
                {message.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <textarea
          type="text"
          ref={textareaRef}
          value={inputMessage}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder="Type a reply..."
          required
        />
        <button
          id="send-btn"
          className="material-symbols-outlined"
          onClick={handleSendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
