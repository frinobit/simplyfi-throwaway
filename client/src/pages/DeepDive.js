import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const DeepDive = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const [queryDescription, setQueryDescription] = useState("");
  //   const [pdf, setPdf] = useState(null);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  //   const handleFileChange = (event) => {
  //     setPdf(event.target.files[0]);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted:", queryDescription);
  };

  return (
    <div className={DeepDiveCSS.deepdive}>
      {/* <input type="file" onChange={handleFileChange} /> */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your query"
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate query" />
      </form>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default DeepDive;
