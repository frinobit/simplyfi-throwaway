import SnapshotCSS from "../styles/pages/SnapshotBasic.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";

// components
import Chatbot from "../components/Chatbot";
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

// utils
import { getIncome, getExpenses, getSavings } from "./utils/financialUtils";
import { Assets, Liabilities } from "./utils/financialUtils";

const SnapshotBasic = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const { financials, dispatch: financialsDispatch } = useFinancialsContext();

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    const fetchFinancials = async () => {
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

    if (user) {
      fetchFinancials();
    }
  }, [financialsDispatch, user, financials]);

  return (
    <div className={SnapshotCSS.snapshot}>
      {financials ? (
        <div className={SnapshotCSS.snapshot_container}>
          <div className={SnapshotCSS.top_details}>
            <h5>Savings</h5>
            <div className={SnapshotCSS.savings_details}>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_vert}`}
              >
                <p>Long-Term</p>
                <p>{getSavings(financials, "savings", "Long-Term")}</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_hori}`}
              >
                <p>Emergency Fund</p>
                <p>{getSavings(financials, "savings", "Emergency Fund")}</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.top_vert2}`}
              >
                <p>Short-Term</p>
                <p>{getSavings(financials, "savings", "Short-Term")}</p>
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
                  <h5>Income</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
                  >
                    <p>Salary</p>
                    <p>{getIncome(financials, "income", "Salary")}</p>
                  </div>
                </div>
                <div className={SnapshotCSS.expenses_details}>
                  <h5>Expenses</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}
                  >
                    <p>Fixed</p>
                    <p>{getExpenses(financials, "expenses", "Fixed")}</p>
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
                <h5>---</h5>
                <h5>---</h5>
              </div>
            </div>
            <div className={SnapshotCSS.right_details}>
              <div className={SnapshotCSS.right_container}>
                <div className={SnapshotCSS.per_year_details}>
                  <p>$---/yr</p>
                </div>
                <div className={SnapshotCSS.income_details}>
                  <h5>Income</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Salary</p>
                    <p>$---</p>
                  </div>
                </div>
                <div className={SnapshotCSS.expenses_details}>
                  <h5>Expenses</h5>
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
              <h5>Assets</h5>
              <div>
                <Assets financials={financials} />
              </div>
            </div>
            <div className={SnapshotCSS.liabilities_details}>
              <h5>Liabilities</h5>
              <div>
                <Liabilities financials={financials} />
              </div>
            </div>
            <div className={SnapshotCSS.investment_details}>
              <h5>Investment</h5>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>---</p>
                <p>$---</p>
              </div>
            </div>
            <div className={SnapshotCSS.protection_details}>
              <h5>Protection</h5>
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
