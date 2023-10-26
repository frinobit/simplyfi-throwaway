import SnapshotCSS from "../../styles/pages/SnapshotBasic.module.css";

export const AssetsBox = ({ description, amount, income, expenses }) => {
  const foundIncome = income?.find((item) => item.description === description);
  const incomeAmount = foundIncome ? foundIncome.amount : 0;
  const foundExpenses = expenses?.find(
    (item) => item.description === description
  );
  const expensesAmount = foundExpenses ? foundExpenses.amount : 0;
  const direction = incomeAmount >= expensesAmount ? "up" : "down";

  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
      <p>{description}</p>
      <div className={SnapshotCSS.arrow}>
        <p>${amount.toLocaleString()}</p>
        {direction === "up" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#1faf38"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 20V4m0 0l6 6m-6-6l-6 6"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#de2242"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 4v16m0 0l6-6m-6 6l-6-6"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export const LiabilitiesBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
      <p>{description}</p>
      <div className={SnapshotCSS.arrow}>
        <p>${amount.toLocaleString()}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#de2242"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 4v16m0 0l6-6m-6 6l-6-6"
          />
        </svg>
      </div>
    </div>
  );
};

export const InvestmentsBox = ({ description, amount }) => {
  return (
    <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
      <p>{description}</p>
      <div className={SnapshotCSS.arrow}>
        <p>${amount.toLocaleString()}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#1faf38"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 20V4m0 0l6 6m-6-6l-6 6"
          />
        </svg>
      </div>
    </div>
  );
};
