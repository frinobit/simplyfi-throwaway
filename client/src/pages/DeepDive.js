import DeepDiveCSS from "../styles/pages/DeepDive.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import ChatbotDeepDive from "../components/ChatbotDeepDive";

const DeepDive = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const [queryDescription, setQueryDescription] = useState("");
  const [query, setQuery] = useState("");
  //   const [pdf, setPdf] = useState(null);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  //   const handleFileChange = (event) => {
  //     setPdf(event.target.files[0]);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedQuery = await generateQuery();
    setQuery(generatedQuery);
  };

  const generateQuery = async () => {
    const response = await fetch("/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await response.json();
    return data.response;
  };

  return (
    <div className={DeepDiveCSS.deepdive}>
      {/* <input type="file" onChange={handleFileChange} /> */}
      {user ? (
        <div className={DeepDiveCSS.deepdive_container}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="query-description"
              placeholder="Describe your query"
              onChange={(e) => setQueryDescription(e.target.value)}
            />
            <input type="submit" value="Generate query" />
          </form>
          <div>
            {query ? (
              query.map((queryLine, index) => <p key={index}>{queryLine}</p>)
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
      ) : (
        <div className={DeepDiveCSS.deepdive_container}>
          <p>Loading</p>
        </div>
      )}

      <div className={DeepDiveCSS.home_container}>
        <ChatbotDeepDive />
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default DeepDive;
