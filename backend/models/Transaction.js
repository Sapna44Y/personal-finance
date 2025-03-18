const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Entertainment", "Utilities", "Other"],
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
