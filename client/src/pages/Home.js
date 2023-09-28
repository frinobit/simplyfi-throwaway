import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { usePersonalsContext } from "../hooks/usePersonalsContext";

// components
import FinancialDetails from "../components/FinancialDetails";
import PersonalDetails from "../components/PersonalDetails";

// socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { user } = useAuthContext();
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  // socket
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
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

    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });

    socket.on("post_request_done", (data) => {
      setMessageReceived(data.message);
      fetchPersonals();
    });

    if (user) {
      fetchFinancials();
      fetchPersonals();
    }
  }, [financialsDispatch, personalsDispatch, user]);

  return (
    <div className="home">
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

      <div className="chatbot-container">
        <iframe
          title="chatbot;"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/4111016e-e8c8-4065-a6e5-45828871440c"
        ></iframe>
      </div>
      <div className="test">
        <input
          placeholder="message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>send message</button>
        <h1>Message: </h1>
        {messageReceived}
      </div>
    </div>
  );
};

export default Home;
