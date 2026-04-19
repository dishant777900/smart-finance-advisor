import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function ExpenseChart({ expenses }) {
  // 🎯 Colors for pie chart
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // 📅 Weekly Data (Mon–Sun)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weeklyData = weekDays.map((day) => ({
    name: day,
    amount: 0,
  }));

  expenses.forEach((e) => {
    const date = new Date();
    const dayIndex = (date.getDay() + 6) % 7; // convert Sunday=0 → last
    weeklyData[dayIndex].amount += Number(e.amount);
  });

  // 🥧 Category Data
  const categoryMap = {};

  expenses.forEach((e) => {
    if (!categoryMap[e.category]) {
      categoryMap[e.category] = 0;
    }
    categoryMap[e.category] += Number(e.amount);
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      
      {/* 📊 Weekly Line Chart */}
      <div className="bg-white p-4 rounded shadow h-[300px]">
        <h3 className="font-semibold mb-2">Weekly Expenses</h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Category Pie Chart */}
      <div className="bg-white p-4 rounded shadow h-[300px]">
        <h3 className="font-semibold mb-2">Category Breakdown</h3>

        {categoryData.length === 0 ? (
          <p>No data</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}