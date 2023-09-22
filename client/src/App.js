// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/simplyfi_mvp" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    //   <div>
    //     {typeof backendData.users === "undefined" ? (
    //       <p>Loading...</p>
    //     ) : (
    //       backendData.users.map((user, i) => <p key={i}>{user}</p>)
    //     )}
    //   </div>
  );
}

export default App;
