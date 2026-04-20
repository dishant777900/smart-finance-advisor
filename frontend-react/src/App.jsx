import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  // ✅ Load user on app start
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
      setUser(savedUser);
      setPage("dashboard");
    }
  }, []);

  return (
    <>
      {page === "login" && (
        <Login
          setPage={setPage}
          setUser={setUser}
        />
      )}

      {page === "register" && (
        <Register setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard
          user={user}
          onLogout={() => {
            localStorage.removeItem("currentUser"); // ✅ remove session
            setUser(null);
            setPage("login");
          }}
        />
      )}
    </>
  );
}