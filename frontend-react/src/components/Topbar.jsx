export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <button className="bg-blue-600 text-white px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
}