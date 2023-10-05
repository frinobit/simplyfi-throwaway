const FinancialDetails = ({ financial }) => {
  return (
    <div className="financial-details">
      <h3>FinancialDetails</h3>
      <p>
        <strong>income: </strong>
        {financial.income}
      </p>
      <p>
        <strong>expenses: </strong>
        {financial.expenses}
      </p>
      <p>
        <strong>assets: </strong>
        {financial.assets}
      </p>
      <p>
        <strong>liabilities: </strong>
        {financial.liabilities}
      </p>
    </div>
  );
};

export default FinancialDetails;
