import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const MonthlyExpensesChart = ({ data }) => {
  // Define new colors for each category
  const categoryColors = {
    Food: "#FF6F61", // Coral
    Transport: "#6B5B95", // Ultra Violet
    Entertainment: "#88B04B", // Greenery
    Utilities: "#FFA500", // Orange
    Other: "#92A8D1", // Soft Blue
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        Monthly Expenses
      </h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              stroke="#4A5568"
              fontSize={14}
              tickLine={false}
            />
            <YAxis stroke="#4A5568" fontSize={14} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
              }}
            />
            {Object.keys(categoryColors).map((category) => (
              <Bar
                key={category}
                dataKey={category}
                fill={categoryColors[category]}
                name={category}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;
