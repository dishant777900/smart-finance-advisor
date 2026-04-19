import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="input"/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="input"/>

        <button onClick={login} className="btn-blue">Login</button>

        <p className="text-sm mt-2 text-center">
          Not registered?{" "}
          <span className="link" onClick={()=>navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
}