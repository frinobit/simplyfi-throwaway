// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Welcome from "./pages/Welcome";
import Snapshot from "./pages/Snapshot";
import Navbar from "./components/navbar/Navbar";
import NavbarVertical from "./components/navbar/NavbarVertical";
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
            <Route path="/simplyfi-throwaway" element={<Welcome />} />
            <Route path="/simplyfi-throwaway/snapshot" element={<Snapshot />} />
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
