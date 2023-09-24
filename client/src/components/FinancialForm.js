import { useState } from "react";
import { useFinancialsContext } from "../hooks/useFinancialsContext";

const FinancialForm = () => {
  const { dispatch } = useFinancialsContext();

  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [assets, setAssets] = useState("");
  const [liabilities, setLiabilities] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const financial = { name, income, expenses, assets, liabilities };

    const response = await fetch("/api/financials", {
      method: "POST",
      body: JSON.stringify(financial),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setIncome("");
      setExpenses("");
      setAssets("");
      setLiabilities("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_FINANCIAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Financial</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />

      <label>Income:</label>
      <input
        type="number"
        onChange={(e) => setIncome(e.target.value)}
        value={income}
        className={emptyFields.includes("income") ? "error" : ""}
      />

      <label>Expenses:</label>
      <input
        type="number"
        onChange={(e) => setExpenses(e.target.value)}
        value={expenses}
        className={emptyFields.includes("expenses") ? "error" : ""}
      />

      <label>Assets:</label>
      <input
        type="number"
        onChange={(e) => setAssets(e.target.value)}
        value={assets}
        className={emptyFields.includes("assets") ? "error" : ""}
      />

      <label>Liabilities:</label>
      <input
        type="number"
        onChange={(e) => setLiabilities(e.target.value)}
        value={liabilities}
        className={emptyFields.includes("liabilities") ? "error" : ""}
      />

      <button>Add Financial</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FinancialForm;
