import { useState, useEffect } from "react";
import ProgressBarCSS from "../styles/components/ProgressBar.module.css";

const ProgressBar = ({ progressBar }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const circles = Array.from({ length: 10 }, (_, index) => (
    <span
      key={index}
      className={`${ProgressBarCSS.circle} ${
        index < currentStep ? ProgressBarCSS.active : ""
      }`}
    >
      {index}
    </span>
  ));

  const stepMessages = [
    "Let's warm up!",
    "Step 1: Property",
    "Step 2: Vehicle",
    "Step 3: Other Assets",
    "Step 4: Income",
    "Step 5: Expenses",
    "Step 6: Savings",
    "Step 7: Investment",
    "Step 8: Protection",
    "All done!",
  ];

  useEffect(() => {
    try {
      const steps = progressBar?.["0"];
      let totalSteps = 0;
      for (let i = 1; i <= 9; i++) {
        totalSteps += steps[`step${i}`];
      }
      setCurrentStep(totalSteps + 1);
      setCurrentPercentage((totalSteps / 9) * 100 + "%");
    } catch (error) {
      console.log(error.message);
    }
  }, [progressBar]);

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
