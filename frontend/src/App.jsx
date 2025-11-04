// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostJobPage from "./pages/PostJobPage";
import GetJobPage from "./pages/GetJobPage";
import MyJobPage from "./pages/MyJobPage";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import ApplyJob from "./pages/ApplyJob";
import GetApplicantsDetails from "./pages/GetApplicantsDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/post-jobs"
            element={
              <PrivateRoute>
                <PostJobPage />
              </PrivateRoute>
            }
          />
          <Route path="/get-jobs" element={<GetJobPage />} />
          <Route path="/ApplyPage/:jobid" element={ <PrivateRoute><ApplyJob /></PrivateRoute>} />
          <Route path="/my-jobs" element={<PrivateRoute><MyJobPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/applicants/:jobid" element={<PrivateRoute><GetApplicantsDetails /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
