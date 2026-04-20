export default function AITasksCard({ tasks }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">AI Tasks</h3>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          {tasks.map((task, index) => (
            <label key={index} className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>{task}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}