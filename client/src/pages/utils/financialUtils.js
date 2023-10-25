import { AssetsBox, LiabilitiesBox } from "./financialBox";

export const getIncome = (array, type) => {
  try {
    let income;

    if (type === "total") {
      income = array;
    } else {
      income = array?.["0"].filter((item) => item.type === type);
    }

    if (income.length > 0) {
      const totalIncome = income.reduce(
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

export const getExpenses = (array, type) => {
  try {
    let expenses;

    if (type === "total") {
      expenses = array;
    } else {
      expenses = array?.["0"].filter((item) => item.type === type);
    }

    if (expenses.length > 0) {
      const totalExpenses = expenses.reduce(
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

const Assets = ({ assets }) => {
  try {
    if (assets.length > 0) {
      return assets.map((item, index) => (
        <AssetsBox
          key={index}
          description={item.description}
          amount={item.amount}
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
