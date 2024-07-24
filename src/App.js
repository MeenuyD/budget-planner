import React, { useState, useEffect } from "react";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Step4 from "./Components/Step4";
import { BudgetContext } from "./Context/BudgetContext";
import "./index.css";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [budgetData, setBudgetData] = useState(() => {
    const savedData = localStorage.getItem("budgetData");
    return savedData
      ? JSON.parse(savedData)
      : { name: "", email: "", currency: "USD", income: 0, expenses: [] };
  });

  useEffect(() => {
    localStorage.setItem("budgetData", JSON.stringify(budgetData));
  }, [budgetData]);

  return (
    <BudgetContext.Provider value={{ budgetData, setBudgetData }}>
      <div className="container mx-auto p-4">
        <div className="steps">
          {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Step3 setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <Step4 setCurrentStep={setCurrentStep} />}
        </div>
        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button
              className="btn"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              className="btn"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </BudgetContext.Provider>
  );
};

export default App;
