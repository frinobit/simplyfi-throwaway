import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";

import { FinancialsContextProvider } from "./context/FinancialsContext";
import { PersonalsContextProvider } from "./context/PersonalsContext";
import { ProgressBarContextProvider } from "./context/ProgressBarContext";
import { FilesContextProvider } from "./context/FilesContext";

import { AssetsContextProvider } from "./context/financial/AssetsContext";
import { LiabilitiesContextProvider } from "./context/financial/LiabilitiesContext";
import { IncomeContextProvider } from "./context/financial/IncomeContext";
import { ExpensesContextProvider } from "./context/financial/ExpensesContext";
import { SavingsContextProvider } from "./context/financial/SavingsContext";
import { InvestmentsContextProvider } from "./context/financial/InvestmentsContext";
import { InsuranceContextProvider } from "./context/financial/InsuranceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* react strict mode render twice */}
    {/* <React.StrictMode> */}
    <FinancialsContextProvider>
      <PersonalsContextProvider>
        <ProgressBarContextProvider>
          <FilesContextProvider>
            <AssetsContextProvider>
              <LiabilitiesContextProvider>
                <IncomeContextProvider>
                  <ExpensesContextProvider>
                    <SavingsContextProvider>
                      <InvestmentsContextProvider>
                        <InsuranceContextProvider>
                          <AuthContextProvider>
                            <App />
                          </AuthContextProvider>
                        </InsuranceContextProvider>
                      </InvestmentsContextProvider>
                    </SavingsContextProvider>
                  </ExpensesContextProvider>
                </IncomeContextProvider>
              </LiabilitiesContextProvider>
            </AssetsContextProvider>
          </FilesContextProvider>
        </ProgressBarContextProvider>
      </PersonalsContextProvider>
    </FinancialsContextProvider>
    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
