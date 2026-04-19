import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !email || !password) {
      alert("All fields required");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    alert("Registered Successfully ✅");
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="input"/>
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="input"/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="input"/>

        <button onClick={register} className="btn-green">Register</button>

        <p className="text-sm mt-2 text-center">
          Already registered?{" "}
          <span className="link" onClick={()=>navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}