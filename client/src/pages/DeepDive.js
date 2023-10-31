import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const DeepDive = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <div className={DeepDiveCSS.deepdive}>
      <h1>hello world</h1>
      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default DeepDive;
