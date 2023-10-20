import AssetsBox from "./assetsBox";
import LiabilitiesBox from "./liabilitiesBox";

export const getIncome = (financials, category, type) => {
  try {
    let income;

    if (type === "total") {
      income = financials?.["0"]?.[category];
    } else {
      income = financials?.["0"]?.[category].filter(
        (item) => item.type === type
      );
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
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getExpenses = (financials, category, type) => {
  try {
    let expenses;

    if (type === "total") {
      expenses = financials?.["0"]?.[category];
    } else {
      expenses = financials?.["0"]?.[category].filter(
        (item) => item.type === type
      );
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
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getSavings = (financials, category, type) => {
  try {
    const savings = financials?.["0"]?.[category].filter(
      (item) => item.type === type
    );

    if (savings.length > 0) {
      const totalSavings = savings.reduce(
        (total, item) => total + item.amount,
        0
      );
      return `$${totalSavings.toLocaleString()}`;
    } else {
      return "$---";
    }
  } catch (error) {
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

const Assets = ({ financials }) => {
  try {
    if (financials["0"].assets.length > 0) {
      return financials["0"].assets.map((item, index) => (
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
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return <AssetsBox description="---" amount="---" />;
  }
};

const Liabilities = ({ financials }) => {
  try {
    if (financials["0"].liabilities.length > 0) {
      return financials["0"].liabilities.map((item, index) => (
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
    // Handle the error here, you can log it or return an error message
    console.log("An error occurred:", error.message);
    return <LiabilitiesBox description="---" amount="---" />;
  }
};

export { Assets, Liabilities };
