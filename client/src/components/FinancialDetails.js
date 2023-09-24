import { useFinancialsContext } from "../hooks/useFinancialsContext";

const FinancialDetails = ({ financial }) => {
  const { dispatch } = useFinancialsContext();

  const handleClick = async () => {
    const response = await fetch("/api/financials/" + financial._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FINANCIAL", payload: json });
    }
  };

  return (
    <div className="financial-details">
      <h4>{financial.name}</h4>
      <p>
        <strong>Income: </strong>
        {financial.income}
      </p>
      <p>
        <strong>Expenses: </strong>
        {financial.expenses}
      </p>
      <p>
        <strong>Assets: </strong>
        {financial.assets}
      </p>
      <p>
        <strong>Liabilities: </strong>
        {financial.liabilities}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default FinancialDetails;
