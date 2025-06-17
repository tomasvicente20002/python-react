import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", credentials);
      // Pass both tokens so the parent component can persist them
      onLogin({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        className="border p-2"
        placeholder="Username"
        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
