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

export const fetchSavings = async (user, savingsDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/saving", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      savingsDispatch({ type: "SET_SAVINGS", payload: json });
    }
  }
};

export const fetchInvestments = async (user, investmentsDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/investment", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      investmentsDispatch({ type: "SET_INVESTMENTS", payload: json });
    }
  }
};

export const fetchInsurance = async (user, insuranceDispatch) => {
  if (user) {
    const response = await fetch("/api/financial/insurance", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      insuranceDispatch({ type: "SET_INSURANCES", payload: json });
    }
  }
};
