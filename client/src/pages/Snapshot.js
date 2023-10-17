import SnapshotCSS from "../styles/pages/Snapshot.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Chatbot from "../components/Chatbot";
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const Home = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <div className={SnapshotCSS.snapshot}>
      <div className={SnapshotCSS.snapshot_container}>
        <div className={SnapshotCSS.top_details}></div>
        <div className={SnapshotCSS.bottom_details}></div>
      </div>

      <div className={SnapshotCSS.home_container}>
        <Chatbot />
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default Home;
