export const getIncome = (financials, category, description) => {
  const filteredIncome = financials?.["0"]?.[category].filter(
    (item) => item.description !== "Salary" && item.description !== "Bonuses"
  );

  if (description === "Salary" || description === "Bonuses") {
    const incomeItem = financials?.["0"]?.[category].find(
      (item) => item.description === description
    );
    if (incomeItem) {
      return `$${incomeItem.amount.toLocaleString()}`;
    }
  } else {
    const totalOtherIncome = filteredIncome.reduce(
      (total, item) => total + item.amount,
      0
    );
    if (totalOtherIncome) {
      return `$${totalOtherIncome.toLocaleString()}`;
    }
  }

  return "---";
};

export const getExpenses = (financials, category, type) => {
  const expenses = financials?.["0"]?.[category].filter(
    (item) => item.type === type
  );

  if (expenses.length > 0) {
    const totalExpenses = expenses.reduce(
      (total, item) => total + item.amount,
      0
    );
    return `$${totalExpenses.toLocaleString()}`;
  } else {
    return "---";
  }
};
