const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getCategoryTotals,
  getMonthlyExpensesByCategory,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/transactions", addTransaction);
router.get("/transactions", getTransactions);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/category-totals", getCategoryTotals);
router.get("/transactions/monthly-expenses", getMonthlyExpensesByCategory);

module.exports = router;
