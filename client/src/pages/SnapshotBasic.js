import SnapshotCSS from "../styles/pages/SnapshotBasic.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useFinancialsContext } from "../hooks/useFinancialsContext";
import { usePersonalsContext } from "../hooks/usePersonalsContext";
import { useAssetsContext } from "../hooks/financial/useAssetsContext";
import { useLiabilitiesContext } from "../hooks/financial/useLiabilitiesContext";
import { useIncomeContext } from "../hooks/financial/useIncomeContext";
import { useExpensesContext } from "../hooks/financial/useExpensesContext";
import { useSavingsContext } from "../hooks/financial/useSavingsContext";
import { useInvestmentsContext } from "../hooks/financial/useInvestmentsContext";
import { useInsuranceContext } from "../hooks/financial/useInsuranceContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import Chatbot from "../components/Chatbot";
import ProgressBar from "../components/ProgressBar";

// utils
import {
  Assets,
  Liabilities,
  Investments,
  Insurance,
} from "./utils/financialUtils";
import {
  getIncome,
  getExpenses,
  getSavings,
  getNetAnnual,
} from "./utils/financialUtils";
import { getName } from "./utils/personalUtils";

// api
import {
  fetchFinancials,
  fetchPersonals,
  fetchAssets,
  fetchLiabilities,
  fetchIncome,
  fetchExpenses,
  fetchSavings,
  fetchInvestments,
  fetchInsurance,
} from "./utils/api";

// socket
import io from "socket.io-client";

const SnapshotBasic = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  const { assets, dispatch: assetsDispatch } = useAssetsContext();
  const { liabilities, dispatch: liabilitiesDispatch } =
    useLiabilitiesContext();
  const { income, dispatch: incomeDispatch } = useIncomeContext();
  const { expenses, dispatch: expensesDispatch } = useExpensesContext();
  const { savings, dispatch: savingsDispatch } = useSavingsContext();
  const { investments, dispatch: investmentsDispatch } =
    useInvestmentsContext();
  const { insurance, dispatch: insuranceDispatch } = useInsuranceContext();

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    let socket;

    if (user) {
      fetchFinancials(user, financialsDispatch);
      fetchPersonals(user, personalsDispatch);
      fetchAssets(user, assetsDispatch);
      fetchLiabilities(user, liabilitiesDispatch);
      fetchIncome(user, incomeDispatch);
      fetchExpenses(user, expensesDispatch);
      fetchSavings(user, savingsDispatch);
      fetchInvestments(user, investmentsDispatch);
      fetchInsurance(user, insuranceDispatch);
      console.log("socket on");
      socket = io.connect("http://localhost:3001");
      socket.on("post_request_done", (data) => {
        const type = data.type;

        switch (type) {
          case "personal_done":
            fetchFinancials(user, financialsDispatch);
            fetchPersonals(user, personalsDispatch);
            break;
          case "asset_done":
            fetchAssets(user, assetsDispatch);
            break;
          case "liability_done":
            fetchLiabilities(user, liabilitiesDispatch);
            break;
          case "income_done":
            fetchIncome(user, incomeDispatch);
            break;
          case "expense_done":
            fetchExpenses(user, expensesDispatch);
            break;
          case "saving_done":
            fetchSavings(user, savingsDispatch);
            break;
          case "investment_done":
            fetchInvestments(user, investmentsDispatch);
            break;
          case "insurance_done":
            fetchInsurance(user, insuranceDispatch);
            break;
          default:
            console.error("Unknown message type: " + type);
        }
      });
    } else {
      console.log("socket off");
      if (socket) {
        socket.disconnect();
      }
    }

    return () => {
      console.log("socket off");
      if (socket) {
        socket.disconnect();
      }
    };
  }, [
    financialsDispatch,
    personalsDispatch,
    assetsDispatch,
    liabilitiesDispatch,
    incomeDispatch,
    expensesDispatch,
    savingsDispatch,
    investmentsDispatch,
    insuranceDispatch,
    user,
  ]);

  return (
    <div className={SnapshotCSS.snapshot}>
      {user ? (
        <div className={SnapshotCSS.snapshot_container}>
          <div className={SnapshotCSS.progress_bar}>
            <ProgressBar financials={financials} />
          </div>
          <div className={SnapshotCSS.top_details}>
            <h5>Savings</h5>
            <div className={SnapshotCSS.savings_details}>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_vert}`}
              >
                <p>Long-Term</p>
                <div className={SnapshotCSS.arrow}>
                  <p>{getSavings(savings, "Long-Term")}</p>
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
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_hori}`}
              >
                <p>Emergency Fund</p>
                <p>{getSavings(savings, "Emergency Fund")}</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_vert2}`}
              >
                <p>Short-Term</p>
                <div className={SnapshotCSS.arrow}>
                  <p>{getSavings(savings, "Short-Term")}</p>
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
            </div>
          </div>

          <div className={SnapshotCSS.mid_container}>
            <div className={SnapshotCSS.left_details}>
              <div className={SnapshotCSS.left_container}>
                <div className={SnapshotCSS.per_year_details}>
                  <p>{getNetAnnual(income, expenses)}</p>
                </div>
                <div className={SnapshotCSS.income_details}>
                  <div className={SnapshotCSS.button_div}>
                    <h5>Income</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FF7E07"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
                  >
                    <p>Total</p>
                    <div className={SnapshotCSS.arrow}>
                      <p>{getIncome(income, "total")}</p>
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
                </div>
                <div className={SnapshotCSS.expenses_details}>
                  <div className={SnapshotCSS.button_div}>
                    <h5>Expenses</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FF7E07"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}
                  >
                    <p>Total</p>
                    <div className={SnapshotCSS.arrow}>
                      <p>{getExpenses(expenses, "total")}</p>
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
                </div>
              </div>
            </div>
            <div className={SnapshotCSS.mid_details}>
              <div className={SnapshotCSS.refresh_details}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF7E07"
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm4.82-4.924A7 7 0 0 0 9.032 5.658l.975 1.755A5 5 0 0 1 17 12h-3l2.82 5.076Zm-1.852 1.266l-.975-1.755A5 5 0 0 1 7 12h3L7.18 6.924a7 7 0 0 0 7.788 11.418Z"
                  />
                </svg>
                <p>Last Refresh: 16/10/23 - 3:14pm</p>
              </div>
              <div className={SnapshotCSS.couple_image}>
                <img
                  src="/simplyfi-throwaway/assets/couple_basic.svg"
                  alt="couple_basic"
                />
              </div>
              <div className={SnapshotCSS.name_details}>
                <h5>{getName(personals, "name")}</h5>
                <h5>---</h5>
              </div>
            </div>
            <div className={SnapshotCSS.right_details}>
              <div className={SnapshotCSS.right_container}>
                <div className={SnapshotCSS.per_year_details}>
                  <p>$---/yr</p>
                </div>
                <div className={SnapshotCSS.income_details}>
                  <div className={SnapshotCSS.button_div}>
                    <h5>Income</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FF7E07"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Total</p>
                    <div className={SnapshotCSS.arrow}>
                      <p>$---</p>
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
                </div>
                <div className={SnapshotCSS.expenses_details}>
                  <div className={SnapshotCSS.button_div}>
                    <h5>Expenses</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FF7E07"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Total</p>
                    <div className={SnapshotCSS.arrow}>
                      <p>$---</p>
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
                </div>
              </div>
            </div>
          </div>

          <div className={SnapshotCSS.bot_details}>
            <div className={SnapshotCSS.assets_details}>
              <div className={SnapshotCSS.button_div}>
                <h5>Assets</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF7E07"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  />
                </svg>
              </div>
              <div>
                <Assets assets={assets} income={income} expenses={expenses} />
              </div>
            </div>
            <div className={SnapshotCSS.liabilities_details}>
              <div className={SnapshotCSS.button_div}>
                <h5>Liabilities</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF7E07"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  />
                </svg>
              </div>
              <div>
                <Liabilities liabilities={liabilities} />
              </div>
            </div>
            <div className={SnapshotCSS.investments_details}>
              <div className={SnapshotCSS.button_div}>
                <h5>Investments</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF7E07"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  />
                </svg>
              </div>
              <div>
                <Investments investments={investments} />
              </div>
            </div>
            <div className={SnapshotCSS.protection_details}>
              <div className={SnapshotCSS.button_div}>
                <h5>Protection</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF7E07"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  />
                </svg>
              </div>
              <div>
                <Insurance insurance={insurance} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={SnapshotCSS.snapshot_container}>
          <p>Loading</p>
        </div>
      )}

      <div className={SnapshotCSS.home_container}>
        <Chatbot />
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default SnapshotBasic;
