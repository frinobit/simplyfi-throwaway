const FinancialDetails = ({ financial }) => {
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
    </div>
  );
};

export default FinancialDetails;
