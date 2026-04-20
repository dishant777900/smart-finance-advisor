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

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = storedUsers.find((u) => u.gmail === gmail);

    if (alreadyExists) {
      alert("Gmail already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      gmail,
      password,
    };

    const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registered successfully");

    setUsername("");
    setGmail("");
    setPassword("");

    setPage("login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
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