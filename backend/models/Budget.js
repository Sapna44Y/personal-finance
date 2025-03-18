const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Entertainment", "Utilities", "Other"],
  },
  limit: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);
