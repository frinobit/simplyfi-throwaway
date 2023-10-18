import SnapshotCSS from "../styles/pages/Snapshot.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFinancialsContext } from "../hooks/useFinancialsContext";

// components
import Chatbot from "../components/Chatbot";
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

// utils
import {
  getIncome,
  getExpenses,
  getSavings,
  // getAssets,
} from "./utils/financialUtils";
import { Assets, Liabilities } from "./utils/financialUtils";

const Home = () => {
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
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Long-Term</p>
                <p>{getSavings(financials, "savings", "Long-Term")}</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Emergency Fund</p>
                <p>{getSavings(financials, "savings", "Emergency Fund")}</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Short-Term</p>
                <p>{getSavings(financials, "savings", "Short-Term")}</p>
              </div>
            </div>
          </div>

          <div className={SnapshotCSS.mid_container}>
            <div className={SnapshotCSS.left_details}>
              <div className={SnapshotCSS.left_container}>
                <div className={SnapshotCSS.income_details}>
                  <h5>Income</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.left_hori}`}
                  >
                    <p>Salary</p>
                    <p>{getIncome(financials, "income", "Salary")}</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.left_vert}`}
                  >
                    <p>Bonuses</p>
                    <p>{getIncome(financials, "income", "Bonuses")}</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.left_hori}`}
                  >
                    <p>Others</p>
                    <p>{getIncome(financials, "income", "Others")}</p>
                  </div>
                </div>
                <div className={SnapshotCSS.expenses_details}>
                  <h5>Expenses</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.left_hori}`}
                  >
                    <p>Fixed</p>
                    <p>{getExpenses(financials, "expenses", "Fixed")}</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.left_vert}`}
                  >
                    <p>Variables</p>
                    <p>{getExpenses(financials, "expenses", "Variables")}</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.left_hori}`}
                  >
                    <p>Annual</p>
                    <p>{getExpenses(financials, "expenses", "Annual")}</p>
                  </div>
                </div>
              </div>
              <div className={SnapshotCSS.left_mid_container}>
                <div
                  className={`${SnapshotCSS.year_details} ${SnapshotCSS.left_vert2}`}
                >
                  <p>$---/yr</p>
                </div>
                <div className={SnapshotCSS.year_details}>
                  <p>$---/yr</p>
                </div>
              </div>
              <div className={SnapshotCSS.left_right_container}>
                <div
                  className={`${SnapshotCSS.final_year_details} ${SnapshotCSS.left_hori2}`}
                >
                  <p>$---/yr</p>
                </div>
              </div>
            </div>
            <div className={SnapshotCSS.mid_details}>
              <div className={SnapshotCSS.couple_image}>
                <img src="/simplyfi-throwaway/assets/couple.svg" alt="couple" />
              </div>
              <div className={SnapshotCSS.name_details}>
                <h5>---</h5>
                <h5>---</h5>
              </div>
            </div>
            <div className={SnapshotCSS.right_details}>
              <div className={SnapshotCSS.right_left_container}>
                <div
                  className={`${SnapshotCSS.right_final_year_details} ${SnapshotCSS.right_hori2}`}
                >
                  <p>$---</p>
                </div>
              </div>
              <div className={SnapshotCSS.right_mid_container}>
                <div
                  className={`${SnapshotCSS.right_year_details} ${SnapshotCSS.right_vert2}`}
                >
                  <p>$---</p>
                </div>
                <div className={SnapshotCSS.right_year_details}>
                  <p>$---</p>
                </div>
              </div>
              <div className={SnapshotCSS.right_container}>
                <div className={SnapshotCSS.income_details}>
                  <h5>Income</h5>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Salary</p>
                    <p>$---</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.right_vert}`}
                  >
                    <p>Bonuses</p>
                    <p>$---</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Others</p>
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
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.right_vert}`}
                  >
                    <p>Variables</p>
                    <p>$---</p>
                  </div>
                  <div
                    className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox} ${SnapshotCSS.right_hori}`}
                  >
                    <p>Annual</p>
                    <p>$---</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={SnapshotCSS.bot_details}>
            <div className={SnapshotCSS.credit_details}>
              <h5>Credit Rating</h5>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>---</p>
                <p>---</p>
              </div>
            </div>
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

export default Home;
