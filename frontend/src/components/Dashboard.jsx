import { useEffect, useState } from "react";
import axios from "axios";
import CategoryPieChart from "./CategoryPieChart";
import BudgetForm from "./BudgetForm";
import BudgetVsActualChart from "./BudgetVsActualChart";

const Dashboard = () => {
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchCategoryTotals();
    fetchBudgets();
  }, []);

  const fetchCategoryTotals = async () => {
    try {
      const res = await axios.get("/api/transactions/category-totals");
      setCategoryTotals(res.data);
    } catch (err) {
      console.error("Failed to fetch category totals:", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("/api/budgets");
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    }
  };

  const handleSetBudget = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  const budgetData = budgets.map((budget) => {
    const categoryTotal =
      categoryTotals.find((ct) => ct._id === budget.category)?.total || 0;
    return {
      category: budget.category,
      limit: budget.limit,
      total: categoryTotal,
    };
  });

  return (
    <div className="w-[950px] mx-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <CategoryPieChart data={categoryTotals} />
        </div>

        <div>
          <BudgetForm onSetBudget={handleSetBudget} />
        </div>

        <div>
          <BudgetVsActualChart data={budgetData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
