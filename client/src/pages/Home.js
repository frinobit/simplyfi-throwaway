import { useEffect, useState } from "react";

// components
import FinancialDetails from "../components/FinancialDetails";

const Home = () => {
  const [financials, setFinancials] = useState(null);

  useEffect(() => {
    const fetchFinancial = async () => {
      const response = await fetch("/api/financials");
      const json = await response.json();

      if (response.ok) {
        setFinancials(json);
      }
    };

    fetchFinancial();
  }, []);

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
