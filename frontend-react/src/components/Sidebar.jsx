export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white p-6 rounded-r-2xl">
      <h2 className="text-xl font-bold mb-8">💰 Finance AI</h2>

      <ul className="space-y-4">
        <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
          Expenses
        </li>
        <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
    </div>
  );
}