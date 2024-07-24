import React, { useContext, useState } from "react";
import { BudgetContext } from "../Context/BudgetContext";

const Step2 = ({ setCurrentStep }) => {
  const { budgetData, setBudgetData } = useContext(BudgetContext);
  const [expenses, setExpenses] = useState(budgetData.expenses || []);

  const handleIncomeChange = (e) => {
    setBudgetData((prevData) => ({
      ...prevData,
      income: parseFloat(e.target.value) || 0
    }));
  };

  const handleExpenseChange = (index, e) => {
    const { name, value } = e.target;
    const newExpenses = [...expenses];
    newExpenses[index][name] = value;
    setExpenses(newExpenses);
  };

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const saveExpenses = () => {
    setBudgetData((prevData) => ({
      ...prevData,
      expenses
    }));
    setCurrentStep(3);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 2: Income and Expenses</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Monthly Income</label>
        <input
          type="number"
          value={budgetData.income || ""}
          onChange={handleIncomeChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">List of Expenses</h3>
        {expenses.map((expense, index) => (
          <div key={index} className="flex mb-4 items-center">
            <input
              type="text"
              name="name"
              value={expense.name}
              onChange={(e) => handleExpenseChange(index, e)}
              placeholder="Expense Name"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
            />
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={(e) => handleExpenseChange(index, e)}
              placeholder="Amount"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
            />
            <button
              onClick={() => removeExpense(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addExpense}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Add Expense
        </button>
      </div>
      <div className="flex justify-between">
      <button
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={saveExpenses}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;

