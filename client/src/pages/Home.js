import { useEffect } from "react";
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import FinancialDetails from "../components/FinancialDetails";

const Home = () => {
  const { financials, dispatch } = useFinancialsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFinancials = async () => {
      const response = await fetch("/api/financials", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FINANCIALS", payload: json });
      }
    };

    if (user) {
      fetchFinancials();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="financial-details">
        {financials &&
          financials.map((financial) => (
            <FinancialDetails key={financial._id} financial={financial} />
          ))}
      </div>

      <div className="chatbot-container">
        {/* <iframe
          title="chatbot;"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/ac0f7a90-c0a2-4ee8-91a8-40f8c571bceb"
        ></iframe> */}
        <iframe
          title="chatbot;"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/4111016e-e8c8-4065-a6e5-45828871440c"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
