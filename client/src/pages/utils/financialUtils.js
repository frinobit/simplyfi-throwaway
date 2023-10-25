import { AssetsBox, LiabilitiesBox } from "./financialBox";

const Assets = ({ assets, income, expenses }) => {
  try {
    if (assets.length > 0) {
      return assets.map((item, index) => (
        <AssetsBox
          key={index}
          description={item.description}
          amount={item.amount}
          income={income}
          expenses={expenses}
        />
      ));
    } else {
      return <AssetsBox description="---" amount="---" />;
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return <AssetsBox description="---" amount="---" />;
  }
};

const Liabilities = ({ liabilities }) => {
  try {
    if (liabilities.length > 0) {
      return liabilities.map((item, index) => (
        <LiabilitiesBox
          key={index}
          description={item.description}
          amount={item.amount}
        />
      ));
    } else {
      return <LiabilitiesBox description="---" amount="---" />;
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return <LiabilitiesBox description="---" amount="---" />;
  }
};

export { Assets, Liabilities };

export const getIncome = (income, type) => {
  try {
    let filteredIncome;

    if (type === "total") {
      filteredIncome = income;
    } else {
      filteredIncome = income?.["0"].filter((item) => item.type === type);
    }

    if (filteredIncome.length > 0) {
      const totalIncome = filteredIncome.reduce(
        (total, item) => total + item.amount,
        0
      );
      return `$${totalIncome.toLocaleString()}`;
    } else {
      return "$---";
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getExpenses = (expenses, type) => {
  try {
    let filteredExpenses;

    if (type === "total") {
      filteredExpenses = expenses;
    } else {
      filteredExpenses = expenses?.["0"].filter((item) => item.type === type);
    }

    if (filteredExpenses.length > 0) {
      const totalExpenses = filteredExpenses.reduce(
        (total, item) => total + item.amount,
        0
      );
      return `$${totalExpenses.toLocaleString()}`;
    } else {
      return "$---";
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getNet = (income, expenses) => {
  try {
    let totalIncome;
    let totalExpenses;
    let netResult;

    if (income.length > 0) {
      totalIncome = income.reduce((total, item) => total + item.amount, 0);
    }
    if (expenses.length > 0) {
      totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
    }
    netResult = (totalIncome - totalExpenses) * 12;
    return `$${netResult.toLocaleString()}/yr`;
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};
