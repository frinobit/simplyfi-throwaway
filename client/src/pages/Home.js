import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { usePersonalsContext } from "../hooks/usePersonalsContext";

// components
import FinancialDetails from "../components/FinancialDetails";
import PersonalDetails from "../components/PersonalDetails";

// kommunicate
import KommunicateChat from "../kommunicate";

// socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { user } = useAuthContext();
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  // socket - send user info to backend
  socket.emit("user_info", { user });

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
      fetchPersonals();
    });

    if (user) {
      fetchFinancials();
      fetchPersonals();
    }
  }, [financialsDispatch, personalsDispatch, user]);

  return (
    <div className="home">
      <div>
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

      <div className="chatbot-container">
        <iframe
          title="chatbot;"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/4111016e-e8c8-4065-a6e5-45828871440c"
        ></iframe>
      </div>
      <div className="chatbot-container">
        <iframe
          title="chatbot;"
          allow="microphone; geolocation;"
          width="400px"
          height="600px"
          src="https://widget.kommunicate.io/chat?appId=3ade211f1be68b8fa842cd394984144f"
        ></iframe>
      </div>
      <div>
        <KommunicateChat />
      </div>
    </div>
  );
};

export default Home;
