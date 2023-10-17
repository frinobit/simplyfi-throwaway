import HomeCSS from "../styles/pages/Home.module.css";

const FinancialDetails = ({ financial }) => {
  return (
    <div className={HomeCSS.financial_details}>
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
      <p>
        <strong>savings: </strong>
        {financial.savings}
      </p>
    </div>
  );
};

export default FinancialDetails;
