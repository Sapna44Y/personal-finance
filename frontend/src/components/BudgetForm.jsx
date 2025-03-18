import React, { useState } from "react";
import axios from "axios";

const BudgetForm = ({ onSetBudget }) => {
  const [formData, setFormData] = useState({
    category: "Food",
    limit: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.limit) {
      setError("Please enter a budget limit.");
      return;
    }

    try {
      const response = await axios.post("/api/budgets", {
        category: formData.category,
        limit: parseFloat(formData.limit),
      });
      onSetBudget(response.data);
      setFormData({ category: "Food", limit: "" });
      setError("");
    } catch (err) {
      setError("Failed to set budget. Please try again.");
      console.error("Failed to set budget:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg border border-purple-100"
    >
      <div className="mx-16">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Category
          </h1>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          >
            <option value="Food" className="text-purple-800">
              Food
            </option>
            <option value="Transport" className="text-purple-800">
              Transport
            </option>
            <option value="Entertainment" className="text-purple-800">
              Entertainment
            </option>
            <option value="Utilities" className="text-purple-800">
              Utilities
            </option>
            <option value="Other" className="text-purple-800">
              Other
            </option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="limit"
            className="block text-lg font-semibold text-purple-800 mb-2"
          >
            Budget Limit
          </label>
          <input
            id="limit"
            type="number"
            name="limit"
            placeholder="Enter budget limit"
            value={formData.limit}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Set Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
