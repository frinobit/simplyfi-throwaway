import ChatbotCSS from "../styles/components/Chatbot.module.css";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const loadOldMessages = async (user, setMessages) => {
  try {
    const response = await fetch("/api/deepdive", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await response.json();
    const updatedMessages = data.map((message) => ({
      text: message.content,
      isUser: message.is_user_message,
    }));
    setMessages(updatedMessages);
  } catch (error) {
    console.error("Error loading old messages (frontend):", error);
  }
};

const startConversation = async (user, setMessages) => {
  try {
    const response = await fetch("/openai/start_conversation", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to start the conversation");
    }

    const data = await response.json();
    const chatbotResponse = { text: data.message, isUser: false };
    setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
  } catch (error) {
    console.error("Error starting conversation (frontend):", error.message);
  }
};

const resetChat = (setMessages, setInputMessage) => {
  setMessages([]);
  setInputMessage("");
};

const ChatbotDeepDive = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([""]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);

  // always scroll to bottom
  useEffect(() => {
    try {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    } catch (error) {
      console.log(error.message);
    }
  }, [messages]);

  // always scroll to bottom
  useEffect(() => {
    try {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [inputMessage]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await loadOldMessages(user, setMessages);
        setLoading(true);
        await startConversation(user, setMessages);
        setLoading(false);
      } else {
        resetChat(setMessages, setInputMessage);
      }
    };

    fetchData();
  }, [user]);

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
      const response = await fetch("/openai", {
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
    <div className={ChatbotCSS.chatbot}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className={ChatbotCSS.chatbot_container}>
            <header>
              <img
                src="/simplyfi-throwaway/assets/berry_smooth.svg"
                alt="berry_smooth"
              />
              <h2>Berry Smooth</h2>
            </header>
            <ul className={ChatbotCSS.chatbox} ref={chatboxRef}>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`${ChatbotCSS.chat} ${
                    message.isUser ? ChatbotCSS.user : ChatbotCSS.bot
                  }`}
                >
                  {message.isUser ? null : (
                    <img
                      src="/simplyfi-throwaway/assets/strawberry.svg"
                      alt="strawberry"
                    />
                  )}
                  <p
                    className={`message ${
                      message.isUser ? ChatbotCSS.user : ChatbotCSS.bot
                    }`}
                  >
                    {message.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={ChatbotCSS.chat_input}>
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
              className="material-symbols-outlined"
              onClick={handleSendMessage}
            >
              send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotDeepDive;
