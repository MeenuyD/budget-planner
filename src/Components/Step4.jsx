import React, { useContext } from "react";
import { BudgetContext } from "../Context/BudgetContext";

const Step4 = ({ setCurrentStep }) => {
  const { budgetData } = useContext(BudgetContext);

  const income = Number(budgetData.income);
  const totalExpenses = budgetData.expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
  const remainingBudget = income - totalExpenses;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 4: Review and Save</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">User Information</h3>
        <p>Name: {budgetData.name}</p>
        <p>Email: {budgetData.email}</p>
        <p>Preferred Currency: {budgetData.currency}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Income and Expenses</h3>
        <p>Monthly Income: ${income.toFixed(2)}</p>
        <ul>
          {budgetData.expenses.map((expense, index) => (
            <li key={index}>
              {expense.name}: ${Number(expense.amount).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Summary</h3>
        <p>Total Income: ${income.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(3)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => {
            localStorage.setItem("budgetData", JSON.stringify(budgetData));
            alert("Budget data saved!");
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Step4;
