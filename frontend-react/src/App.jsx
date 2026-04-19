import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

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
            setUser(null);
            setPage("login");
          }}
        />
      )}
    </>
  );
}