// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupGuest from "./pages/SignupGuest";

function App() {
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
            <Route
              path="/simplyfi-throwaway/signupGuest"
              element={
                user && !user.email ? (
                  <SignupGuest />
                ) : (
                  <Navigate to="/simplyfi-throwaway" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
