// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NavbarVertical from "./components/NavbarVertical";
import Profile from "./pages/Profile";
import SignupGuest from "./pages/SignupGuest";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <NavbarVertical />
        <div className="pages">
          <Routes>
            <Route path="/simplyfi-throwaway" element={<Home />} />
            <Route
              path="/simplyfi-throwaway/profile"
              element={
                user ? <Profile /> : <Navigate to="/simplyfi-throwaway" />
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
