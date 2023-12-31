import HomeCSS from "../styles/pages/Home.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { usePersonalsContext } from "../hooks/usePersonalsContext";

// components
import Chatbot from "../components/Chatbot";
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import FinancialDetails from "../components/FinancialDetails";
import PersonalDetails from "../components/PersonalDetails";

// socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    const fetchFinancials = async () => {
      if (user) {
        const response = await fetch("/api/financials", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          financialsDispatch({ type: "SET_FINANCIALS", payload: json });
        }
      }
    };

    const fetchPersonals = async () => {
      if (user) {
        const response = await fetch("/api/personals", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          personalsDispatch({ type: "SET_PERSONALS", payload: json });
        }
      }
    };

    // socket - receive message from backend that user info is updated
    socket.on("post_request_done", (data) => {
      console.log(data.message);
      fetchFinancials();
      fetchPersonals();
    });

    if (user) {
      fetchFinancials();
      fetchPersonals();
    }
  }, [financialsDispatch, personalsDispatch, user]);

  return (
    <div className={HomeCSS.home}>
      <div className={HomeCSS.home_container}>
        <div className={HomeCSS.financial_details}>
          {financials &&
            financials.map((financial) => (
              <FinancialDetails key={financial._id} financial={financial} />
            ))}
        </div>

        <div className={HomeCSS.personal_details}>
          {personals &&
            personals.map((personal) => (
              <PersonalDetails key={personal._id} personal={personal} />
            ))}
        </div>
      </div>

      <div className={HomeCSS.home_container}>
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
