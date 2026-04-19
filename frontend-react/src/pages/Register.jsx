import { useState } from "react";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username || !gmail || !password) {
      alert("Fill all fields");
      return;
    }

    const user = { username, gmail, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered successfully");

    setPage("login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already registered?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => setPage("login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}