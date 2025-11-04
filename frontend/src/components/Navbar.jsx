// components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";
import "./Navbar.css"; // Assuming the CSS file is in the same folder

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo">ShiftSwap</h1>
          <p className="tagline">Your Time, Your Terms</p>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

         
          {isAuthenticated() ? (
            <div className="dropdown">
              <button className="dropbtn">Jobs</button>
              <div className="dropdown-content">
                <Link to="/post-jobs" className="dropdown-item">
                  Post Jobs
                </Link>
                <Link to="/get-jobs" className="dropdown-item">
                  Get Jobs
                </Link>

                <Link to="/my-jobs" className="dropdown-item">
                  My Jobs
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/get-jobs" className="nav-link">
            Jobs
          </Link>
          )
          }
          {isAuthenticated() ? (
            <>
             
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link login">
                Login
              </Link>
              <Link to="/register" className="nav-link register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
