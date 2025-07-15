import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useUser } from "../../contexts/userContext";
import socket from "../../socket";
import "./loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.endsWith(
        "@gmail.com" || "@nitc.ac.in" || "@yahoo.com" || "@hotmail.com"
      )
    ) {
      toast.error("Email is wrong");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      toast.success("Login successful");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      console.log(res.data);

      setUser(res.data);
      socket.emit("user_joined", res.data.id);
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.log("Login error:", err);

      if (err.response?.status === 404) toast.error("User not found");
      else if (err.response?.status === 401) toast.error("Incorrect password");
      else toast.error("Login failed.Please try again");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="login-card">
        <h1>Login</h1>
        <p>Welcome Back !!!</p>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            <a href="/register">Forgot password?</a>
          </div>

          <button className="loginbutton" onClick={handleSubmit}>
            LOGIN
          </button>

          <div className="signup-link">
            Don't have an Account? <Link onClick={handleRegister}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
