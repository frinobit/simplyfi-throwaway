import React, { useState } from "react";
import ProgressBarCSS from "../styles/components/ProgressBar.module.css";

const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const updateSteps = (nextStep) => {
    const newStep = currentStep + nextStep;
    setCurrentStep(newStep);
  };

  const circles = Array.from({ length: 6 }, (_, index) => (
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
    "Step 1: First Message",
    "Step 2: Second Message",
    "Step 3: Third Message",
    "Step 4: Fourth Message",
    "Step 5: Fifth Message",
    "Step 6: Sixth Message",
  ];

  return (
    <div className={ProgressBarCSS.container}>
      <div className={ProgressBarCSS.steps}>
        {circles}
        <div className={ProgressBarCSS.progress_bar}>
          <span
            className={ProgressBarCSS.indicator}
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
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
          disabled={currentStep === 6}
          onClick={() => updateSteps(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
