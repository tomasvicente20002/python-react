import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Patients from "./pages/Patients";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");

  const handleLogin = ({ access_token, refresh_token }) => {
    setToken(access_token);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/patients" /> : <Login onLogin={handleLogin} />} />
        <Route path="/patients" element={token ? <Patients token={token} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;