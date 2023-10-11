import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { usePersonalsContext } from "../hooks/usePersonalsContext";

// components
import FinancialDetails from "../components/FinancialDetails";
import PersonalDetails from "../components/PersonalDetails";
import Chatbot from "../components/Chatbot";

// socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { user } = useAuthContext();
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  useEffect(() => {
    const fetchFinancials = async () => {
      const response = await fetch("/api/financials", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        financialsDispatch({ type: "SET_FINANCIALS", payload: json });
      }
    };

    const fetchPersonals = async () => {
      const response = await fetch("/api/personals", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        personalsDispatch({ type: "SET_PERSONALS", payload: json });
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
    <div className="home">
      <div className="home-container">
        <div className="financial-details">
          {financials &&
            financials.map((financial) => (
              <FinancialDetails key={financial._id} financial={financial} />
            ))}
        </div>

        <div className="personal-details">
          {personals &&
            personals.map((personal) => (
              <PersonalDetails key={personal._id} personal={personal} />
            ))}
        </div>
      </div>

      <div className="home-container">
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
