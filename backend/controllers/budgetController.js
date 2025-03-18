const Budget = require("../models/Budget");

// Set budget for a category
exports.setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;
    let budget = await Budget.findOne({ category });

    if (budget) {
      budget.limit = limit;
    } else {
      budget = new Budget({ category, limit });
    }

    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: "Failed to set budget" });
  }
};

// Get all budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};
