import React, { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../Context/BudgetContext";
import axios from "axios";

const Step3 = ({ setCurrentStep }) => {
  const { budgetData } = useContext(BudgetContext);
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${budgetData.currency}`
        );
        setConversionRate(response.data.rates.USD);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, [budgetData.currency]);

  const income = Number(budgetData.income);
  const totalExpenses = budgetData.expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
  const remainingBudget = income - totalExpenses;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 3: Budget Summary</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Income: ${income.toFixed(2)}</p>
        <p className="text-lg font-semibold">Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p className="text-lg font-semibold">Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        <p className="text-lg font-semibold">
          Remaining Budget (USD): ${remainingBudget * conversionRate.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
