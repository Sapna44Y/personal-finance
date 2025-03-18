import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BudgetVsActualChart = ({ data }) => {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        Budget vs Actual Spending
      </h2>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="category"
              tick={{ fill: "#4a5568", fontSize: 12 }} // Dark gray text for X-axis
              axisLine={{ stroke: "#cbd5e0" }} // Light gray axis line
            />
            <YAxis
              tick={{ fill: "#4a5568", fontSize: 12 }} // Dark gray text for Y-axis
              axisLine={{ stroke: "#cbd5e0" }} // Light gray axis line
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
              }}
            />
            <Bar
              dataKey="limit"
              fill="#00cccc" // Blue color for budget limit
              radius={[4, 4, 0, 0]} // Rounded corners for bars
              className="hover:fill-[#009999] transition-colors duration-200" // Hover effect
            />
            <Bar
              dataKey="total"
              fill="#a64dff" // Orange color for actual spending
              radius={[4, 4, 0, 0]} // Rounded corners for bars
              className="hover:fill-[#8c1aff] transition-colors duration-200" // Hover effect
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetVsActualChart;
