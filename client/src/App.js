// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/simplyfi-throwaway" element={<Home />} />
            <Route path="/simplyfi-throwaway/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
