import { useEffect } from "react";
import { useFinancialsContext } from "../hooks/useFinancialsContext";

// components
import FinancialDetails from "../components/FinancialDetails";

const Home = () => {
  const { financials, dispatch } = useFinancialsContext();

  useEffect(() => {
    const fetchFinancials = async () => {
      const response = await fetch("/api/financials");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FINANCIALS", payload: json });
      }
    };

    fetchFinancials();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="financial-details">
        {financials &&
          financials.map((financial) => (
            <FinancialDetails key={financial._id} financial={financial} />
          ))}
      </div>

      <div className="chatbot-container">
        <iframe
          title="chatbot;"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/7636b225-76e2-44f0-a6ff-56ebd306537c"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
