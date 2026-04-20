import { useState } from "react";

export default function Login({ setPage, setUser }) {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!gmail || !password) {
      alert("Please fill all fields");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = storedUsers.find((u) => u.gmail === gmail);

    if (!foundUser) {
      alert("Mail not registered");
      return;
    }

    if (foundUser.password !== password) {
      alert("Invalid password");
      return;
    }

    // ✅ save currently logged in user
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    // ✅ update app state
    setUser(foundUser);
    setPage("dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Gmail"
          value={gmail}
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setGmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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