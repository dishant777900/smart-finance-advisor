export default function ExpenseCard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="card">
      <h3 className="mb-3 font-semibold">💸 Expenses</h3>

      <p className="mb-2 font-bold text-blue-600">
        Total: ₹{total}
      </p>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet</p>
        ) : (
          expenses.map((e, i) => (
            <div
              key={i}
              className="flex justify-between bg-white p-2 rounded shadow"
            >
              <span>{e.category}</span>
              <span>₹{e.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}