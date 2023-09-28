import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  // socket
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });

    socket.on("post_request_done", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  // normal
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/simplyfi-throwaway"
              element={
                user ? <Home /> : <Navigate to="/simplyfi-throwaway/login" />
              }
            />
            <Route
              path="/simplyfi-throwaway/profile"
              element={
                user ? <Profile /> : <Navigate to="/simplyfi-throwaway/login" />
              }
            />
            <Route
              path="/simplyfi-throwaway/login"
              element={
                !user ? <Login /> : <Navigate to="/simplyfi-throwaway" />
              }
            />
            <Route
              path="/simplyfi-throwaway/signup"
              element={
                !user ? <Signup /> : <Navigate to="/simplyfi-throwaway" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <div className="test">
        <input
          placeholder="message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>send message</button>
        <h1>Message: </h1>
        {messageReceived}
      </div>
    </div>
  );
}

export default App;
