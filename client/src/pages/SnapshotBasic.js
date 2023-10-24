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

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";
import Chatbot from "../components/Chatbot";
import ProgressBar from "../components/ProgressBar";

// utils
import { getIncome, getExpenses } from "./utils/financialUtils";
import { Assets, Liabilities } from "./utils/financialUtils";
import { getName } from "./utils/personalUtils";

// api
import {
  fetchFinancials,
  fetchPersonals,
  fetchIncome,
  fetchExpenses,
  fetchAssets,
  fetchLiabilities,
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

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    let socket;

    if (user) {
      fetchFinancials(user, financialsDispatch);
      fetchPersonals(user, personalsDispatch);
      fetchIncome(user, incomeDispatch);
      fetchExpenses(user, expensesDispatch);
      fetchAssets(user, assetsDispatch);
      fetchLiabilities(user, liabilitiesDispatch);
      console.log("socket on");
      socket = io.connect("http://localhost:3001");
      socket.on("post_request_done", (data) => {
        console.log(data.message);
        fetchFinancials(user, financialsDispatch);
        fetchPersonals(user, personalsDispatch);
        fetchIncome(user, incomeDispatch);
        fetchExpenses(user, expensesDispatch);
        fetchAssets(user, assetsDispatch);
        fetchLiabilities(user, liabilitiesDispatch);
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
    incomeDispatch,
    expensesDispatch,
    assetsDispatch,
    liabilitiesDispatch,
    user,
  ]);

  return (
    <div className={SnapshotCSS.snapshot}>
      {personals ? (
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
                <p>$---</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_hori}`}
              >
                <p>Emergency Fund</p>
                <p>$---</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_vert2}`}
              >
                <p>Short-Term</p>
                <p>$---</p>
              </div>
            </div>
          </div>

          <div className={SnapshotCSS.mid_container}>
            <div className={SnapshotCSS.left_details}>
              <div className={SnapshotCSS.left_container}>
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
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
                  >
                    <p>Total</p>
                    <p>{getIncome(income, "total")}</p>
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
                    <p>{getExpenses(expenses, "total")}</p>
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
                    <p>Salary</p>
                    <p>$---</p>
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
                    <p>Fixed</p>
                    <p>$---</p>
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
                <Assets assets={assets} />
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
            <div className={SnapshotCSS.investment_details}>
              <div className={SnapshotCSS.button_div}>
                <h5>Investment</h5>
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
                <p>---</p>
                <p>$---</p>
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
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>---</p>
                <p>$---</p>
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
