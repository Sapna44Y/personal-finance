import { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, expensesRes] = await Promise.all([
        axios.get("/api/transactions"),
        axios.get("/api/transactions/monthly-expenses"),
      ]);
      setTransactions(transactionsRes.data);
      setMonthlyExpenses(expensesRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Personal Finance Tracker
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your finances effortlessly
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-12">
        {/* Transaction Form */}
        <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </section>

        {/* Transaction List */}
        <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Transactions
          </h2>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </section>

        {/* Monthly Expenses Chart */}
        <section className="bg-white p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <MonthlyExpensesChart data={monthlyExpenses} />
        </section>

        {/* Dashboard */}
        <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Dashboard />
        </section>
      </main>
    </div>
  );
};

export default App;
