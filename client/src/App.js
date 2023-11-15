import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Welcome from "./pages/Welcome";
import SnapshotPremium from "./pages/SnapshotPremium";
import SnapshotBasic from "./pages/SnapshotBasic";
import DeepDive from "./pages/DeepDive";
import Myinfo from "./pages/Myinfo";
import MyinfoCallback from "./pages/MyinfoCallback";
// import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import NavbarVertical from "./components/navbar/NavbarVertical";
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
            <Route
              path="/simplyfi-throwaway/snapshotBasic"
              element={<SnapshotBasic />}
            />
            <Route
              path="/simplyfi-throwaway/snapshotpremium"
              element={<SnapshotPremium />}
            />
            <Route path="/simplyfi-throwaway/deepdive" element={<DeepDive />} />
            <Route path="/simplyfi-throwaway/myinfo" element={<Myinfo />} />
            <Route path="/callback" element={<MyinfoCallback />} />
            {/* <Route path="/simplyfi-throwaway/snapshot" element={<Home />} /> */}
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
