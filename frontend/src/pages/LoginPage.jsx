import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { isAuthenticated, setAuthToken } from "../services/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      // Store JWT token and redirect user to HomePage or ProfilePage
      setAuthToken(response.accessToken);
      localStorage.setItem("userid", response.userid);

      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-box">
      <h1>Login</h1>
      <div className="login-form">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <a href="/register">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
