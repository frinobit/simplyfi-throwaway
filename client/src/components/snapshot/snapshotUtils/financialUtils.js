import {
  AssetsBox,
  LiabilitiesBox,
  InvestmentsBox,
  InsuranceBox,
} from "./financialBox";

const Assets = ({ assets, income, expenses }) => {
  try {
    if (assets.length > 0) {
      return assets.map((item) => (
        <AssetsBox
          key={item._id}
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
      return liabilities.map((item) => (
        <LiabilitiesBox
          key={item._id}
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

const Investments = ({ investments }) => {
  try {
    if (investments.length > 0) {
      return investments.map((item) => (
        <InvestmentsBox
          key={item._id}
          description={item.description}
          amount={item.amount}
        />
      ));
    } else {
      return <InvestmentsBox description="---" amount="---" />;
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return <InvestmentsBox description="---" amount="---" />;
  }
};

const Insurance = ({ insurance }) => {
  try {
    if (insurance.length > 0) {
      return insurance.map((item) =>
        item.plan ? (
          item.sumassured ? (
            <InsuranceBox
              key={item._id}
              description={item.plan}
              amount={item.sumassured}
            />
          ) : (
            <InsuranceBox description={item.plan} amount="---" />
          )
        ) : (
          <InsuranceBox description="---" amount="---" />
        )
      );
    } else {
      return <InsuranceBox description="---" amount="---" />;
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return <InsuranceBox description="---" amount="---" />;
  }
};

export { Assets, Liabilities, Investments, Insurance };

export const getIncome = (income, type) => {
  try {
    let filteredIncome;

    if (type === "total") {
      filteredIncome = income;
    } else {
      filteredIncome = income?.filter((item) => item.type === type);
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
      filteredExpenses = expenses?.filter((item) => item.type === type);
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

export const getSavings = (savings, type) => {
  try {
    let filteredSavings;

    if (type === "total") {
      filteredSavings = savings;
    } else {
      filteredSavings = savings?.filter((item) => item.type === type);
    }

    if (filteredSavings.length > 0) {
      const totalSavings = filteredSavings.reduce(
        (total, item) => total + item.amount,
        0
      );
      return `$${totalSavings.toLocaleString()}`;
    } else {
      return "$---";
    }
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getNetAnnual = (income, expenses) => {
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

export const getNetIncomeAnnual = (income) => {
  try {
    let totalIncome;
    let result;

    if (income.length > 0) {
      totalIncome = income.reduce((total, item) => total + item.amount, 0);
    }
    result = totalIncome * 12;
    return `$${result.toLocaleString()}/yr`;
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};

export const getNetExpensesAnnual = (expenses) => {
  try {
    let totalExpenses;
    let result;

    if (expenses.length > 0) {
      totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
    }
    result = totalExpenses * 12;
    return `$${result.toLocaleString()}/yr`;
  } catch (error) {
    console.log("An error occurred:", error.message);
    return "$---";
  }
};
