import { useState } from "react";
import axios from "axios";

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    const newTransaction = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
    };

    try {
      const res = await axios.post("/api/transactions", newTransaction);
      onAddTransaction(res.data);
      setFormData({ amount: "", description: "", category: "Food" });
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-2xl space-y-6"
    >
      <div className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-md hover:bg-purple-100 transition-all border border-transparent hover:border-purple-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
