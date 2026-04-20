export default function InsightsCard({ insights }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Insights</h3>

      {(!insights || insights.length === 0) ? (
        <p className="text-gray-500">
          Add expenses to generate AI insights.
        </p>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-3 rounded-lg border border-blue-100"
            >
              • {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}