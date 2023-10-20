import { useState, useEffect } from "react";
import ProgressBarCSS from "../styles/components/ProgressBar.module.css";

const ProgressBar = (financials) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const circles = Array.from({ length: 7 }, (_, index) => (
    <span
      key={index}
      className={`${ProgressBarCSS.circle} ${
        index < currentStep ? ProgressBarCSS.active : ""
      }`}
    >
      {index + 1}
    </span>
  ));

  const stepMessages = [
    "Step 1: Income",
    "Step 2: Expenses",
    "Step 3: Assets",
    "Step 4: Liabilities",
    "Step 5: Investment",
    "Step 6: Protection",
    "Step 7: Savings",
  ];

  useEffect(() => {
    try {
      const step1 = financials.financials[0].income.length;
      setCurrentStep(1 + Math.floor(step1 / 6));
      setCurrentPercentage(((step1 / 6 / 6) * 100).toFixed(2) + "%");
    } catch (error) {
      console.log(error.message);
    }
  }, [financials]);

  return (
    <div className={ProgressBarCSS.container}>
      <div className={ProgressBarCSS.steps}>
        {circles}
        <div className={ProgressBarCSS.progress_bar}>
          <span
            className={ProgressBarCSS.indicator}
            style={{ width: currentPercentage }}
          ></span>
        </div>
      </div>
      <div className={ProgressBarCSS.messages}>
        <p>{stepMessages[currentStep - 1]}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
