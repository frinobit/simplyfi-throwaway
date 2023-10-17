import SnapshotCSS from "../styles/pages/Snapshot.module.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Chatbot from "../components/Chatbot";
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const Home = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <div className={SnapshotCSS.snapshot}>
      <div className={SnapshotCSS.snapshot_container}>
        <div className={SnapshotCSS.top_details}>
          <h5>Savings</h5>
          <div className={SnapshotCSS.savings_details}>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Long-Term</p>
              <p>$236,781</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Emergency Fund</p>
              <p>$50,000</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Short-Term</p>
              <p>$12,458</p>
            </div>
          </div>
        </div>
        <div className={SnapshotCSS.mid_container}>
          <div className={SnapshotCSS.left_details}>
            <div className={SnapshotCSS.income_details}>
              <h5>Income</h5>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Salary</p>
                <p>$5,580</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Bonuses</p>
                <p>$15,697</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Others</p>
                <p>$3,547</p>
              </div>
            </div>
            <div className={SnapshotCSS.expenses_details}>
              <h5>Expenses</h5>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Fixed</p>
                <p>$6,800</p>
              </div>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Variables</p>
                <p>$1,500</p>
              </div>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Annual</p>
                <p>$3,500</p>
              </div>
            </div>
          </div>
          <div className={SnapshotCSS.mid_details}>
            <div className={SnapshotCSS.couple_image}>
              <img src="/simplyfi-throwaway/assets/couple.svg" alt="couple" />
            </div>
            <div className={SnapshotCSS.name_details}>
              <h5>John</h5>
              <h5>Mary</h5>
            </div>
          </div>
          <div className={SnapshotCSS.right_details}>
            <div className={SnapshotCSS.income_details}>
              <h5>Income</h5>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Salary</p>
                <p>$5,580</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Bonuses</p>
                <p>$15,697</p>
              </div>
              <div
                className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}
              >
                <p>Others</p>
                <p>$3,547</p>
              </div>
            </div>
            <div className={SnapshotCSS.expenses_details}>
              <h5>Expenses</h5>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Fixed</p>
                <p>$6,800</p>
              </div>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Variables</p>
                <p>$1,500</p>
              </div>
              <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
                <p>Annual</p>
                <p>$3,500</p>
              </div>
            </div>
          </div>
        </div>
        <div className={SnapshotCSS.bot_details}>
          <div className={SnapshotCSS.credit_details}>
            <h5>Credit Rating</h5>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>John</p>
              <p>10</p>
            </div>
          </div>
          <div className={SnapshotCSS.assets_details}>
            <h5>Assets</h5>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>HDB (My Home)</p>
              <p>$457,650</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Commercial (Puchong Office)</p>
              <p>$236,564</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Car (Tesla Model 3)</p>
              <p>$155,256</p>
            </div>
          </div>
          <div className={SnapshotCSS.liabilities_details}>
            <h5>Liabilities</h5>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
              <p>Loan (My Home)</p>
              <p>$322,154</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
              <p>Loan (Puchong Office)</p>
              <p>$231,567</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.redbox}`}>
              <p>Loan (Tesla Model 3)</p>
              <p>$86,597</p>
            </div>
          </div>
          <div className={SnapshotCSS.investment_details}>
            <h5>Investment</h5>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>CPF (Retirement)</p>
              <p>$457,650</p>
            </div>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>Stocks (Capital A Berhad)</p>
              <p>$2,657</p>
            </div>
          </div>
          <div className={SnapshotCSS.protection_details}>
            <h5>Protection</h5>
            <div className={`${SnapshotCSS.smallbox} ${SnapshotCSS.greenbox}`}>
              <p>CPF (Medisave)</p>
              <p>$74,650</p>
            </div>
          </div>
        </div>
      </div>

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
