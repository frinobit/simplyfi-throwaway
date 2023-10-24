export const fetchFinancials = async (user, financialsDispatch) => {
  if (user) {
    const response = await fetch("/api/financials", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      financialsDispatch({ type: "SET_FINANCIALS", payload: json });
    }
  }
};

export const fetchPersonals = async (user, personalsDispatch) => {
  if (user) {
    const response = await fetch("/api/personals", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      personalsDispatch({ type: "SET_PERSONALS", payload: json });
    }
  }
};

export const fetchIncome = async (user, incomeDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/income", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      incomeDispatch({ type: "SET_INCOMES", payload: json });
    }
  }
};

export const fetchExpenses = async (user, expensesDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/expense", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      expensesDispatch({ type: "SET_EXPENSES", payload: json });
    }
  }
};

export const fetchAssets = async (user, assetsDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/asset", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      assetsDispatch({ type: "SET_ASSETS", payload: json });
    }
  }
};

export const fetchLiabilities = async (user, liabilitiesDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/liability", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      liabilitiesDispatch({ type: "SET_LIABILITIES", payload: json });
    }
  }
};
