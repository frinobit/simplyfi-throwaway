import SnapshotCSS from "../styles/pages/SnapshotPremium.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import SnapshotPremiumContainer from "../components/snapshot/SnapshotPremiumContainer";
import Chatbot from "../components/Chatbot";

const SnapshotPremium = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <div className={SnapshotCSS.snapshot}>
      <div className={SnapshotCSS.snapshot_container}>
        <SnapshotPremiumContainer />
      </div>

      <div className={SnapshotCSS.chatbot_container}>
        <Chatbot />
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default SnapshotPremium;
