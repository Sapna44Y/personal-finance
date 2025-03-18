const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", transactionRoutes);
app.use("/api", budgetRoutes);

console.log("Starting server...");
const PORT = process.env.PORT || 5000; // Change to 5001 if needed
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
