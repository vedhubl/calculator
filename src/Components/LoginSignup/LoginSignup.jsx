import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    const apiUrl = "http://localhost:5000/api";
    try {
      if (action === "Sign Up") {
        const response = await axios.post(`${apiUrl}/signup`, {
          name: name,
          email: email,
          password: password,
        });
        setMessage(response.data.message || "Sign-Up Successful!");
      } else if (action === "Login") {
        const response = await axios.post(`${apiUrl}/login`, {
          email: email,
          password: password,
        });

        const { token } = response.data;
        localStorage.setItem("authToken", token); // Save token to local storage
        setMessage(response.data.message || "Login Successful!");

        // Redirect to GstCalculator on successful login
        navigate("/gst-calculator");
      }
    } catch (err) {
      setError(err.response?.data?.error || "unknown exception");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="tab-bar">
            <div
              className={`text tab ${action === "Login" ? "active" : ""} `}
              onClick={() => setAction("Login")}
            >
              Login
            </div>
            <div
              className={`text tab ${action === "Sign Up" ? "active" : ""} `}
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>
          </div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {action === "Sign Up" ? null : (
          <div className="forgot-password">
            Lost Password?<span>Click Here!</span>
          </div>
        )}

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        {/* Tab bar for "Sign Up" and "Login" */}

        <div className="action-button submit-container">
          <button className="submit " onClick={handleSubmit}>
            {action === "Login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
