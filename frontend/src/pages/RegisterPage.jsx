// pages/RegisterPage.js
import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Define fullName state
  const [phoneNumber, setPhoneNumber] = useState(""); // Define phoneNumber state
  const [confirmPassword, setConfirmPassword] = useState(""); // Define confirmPassword state
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await registerUser({
        fullname: fullName,
        password,
        email,
        phoneno: phoneNumber,
        confirmpassword: confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      alert(
        "Registration failed: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="register-page">
      <h1>Sign up</h1>
      <div className="register-form">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button onClick={handleRegister}>Sign up</button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
