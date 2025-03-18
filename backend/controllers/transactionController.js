const Transaction = require("../models/Transaction");

// Add a transaction
exports.addTransaction = async (req, res) => {
  const { amount, description, category } = req.body;

  // Validate required fields
  if (!amount || !description || !category) {
    return res.status(400).json({
      error: "Amount, description, and category are required",
    });
  }

  try {
    const newTransaction = new Transaction({ amount, description, category });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Error adding transaction:", err); // Log the error for debugging
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

// Get category-wise totals
exports.getCategoryTotals = async (req, res) => {
  try {
    const totals = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(totals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category totals" });
  }
};

// Get monthly expenses by category
exports.getMonthlyExpensesByCategory = async (req, res) => {
  try {
    const monthlyExpenses = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" }, // Extract month from date
            category: "$category", // Group by category
          },
          total: { $sum: "$amount" }, // Sum amounts for each category
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          month: "$_id.month", // Rename _id.month to month
          category: "$_id.category", // Rename _id.category to category
          total: 1, // Include the total field
        },
      },
      {
        $sort: { month: 1 }, // Sort by month
      },
    ]);

    // Transform data into the required format
    const transformedData = monthlyExpenses.reduce((acc, curr) => {
      const monthName = new Date(2023, curr.month - 1).toLocaleString(
        "default",
        {
          month: "short",
        }
      ); // Convert month number to name (e.g., 1 -> Jan)
      if (!acc[monthName]) {
        acc[monthName] = { month: monthName };
      }
      acc[monthName][curr.category] = curr.total;
      return acc;
    }, {});

    res.status(200).json(Object.values(transformedData));
  } catch (err) {
    console.error("Failed to fetch monthly expenses:", err);
    res.status(500).json({ error: "Failed to fetch monthly expenses" });
  }
};
