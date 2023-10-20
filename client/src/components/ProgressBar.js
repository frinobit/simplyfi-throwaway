import React, { useState } from "react";
import ProgressBarCSS from "../styles/components/ProgressBar.module.css";

const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const updateSteps = (nextStep) => {
    const newStep = currentStep + nextStep;
    setCurrentStep(newStep);
  };

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

  return (
    <div className={ProgressBarCSS.container}>
      <div className={ProgressBarCSS.steps}>
        {circles}
        <div className={ProgressBarCSS.progress_bar}>
          <span
            className={ProgressBarCSS.indicator}
            style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
          ></span>
        </div>
      </div>
      <div className={ProgressBarCSS.messages}>
        <p>{stepMessages[currentStep - 1]}</p>
      </div>
      <div className={ProgressBarCSS.buttons}>
        <button
          id="prev"
          disabled={currentStep === 1}
          onClick={() => updateSteps(-1)}
        >
          Prev
        </button>
        <button
          id="next"
          disabled={currentStep === 7}
          onClick={() => updateSteps(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
