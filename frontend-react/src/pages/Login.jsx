import { useState } from "react";

export default function Login({ setPage, setUser }) {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.gmail !== gmail) {
      alert("Mail not registered");
      return;
    }

    if (storedUser.password !== password) {
      alert("Invalid password");
      return;
    }

    setUser(storedUser);
    setPage("dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Gmail"
          className="w-full p-2 border mb-3"
          onChange={(e) => setGmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Not registered?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setPage("register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}