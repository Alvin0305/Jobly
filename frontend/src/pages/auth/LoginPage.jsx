import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import picture from "../../assets/office.jpg";
import { useUser } from "../../contexts/userContext";
import socket from "../../socket";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      toast.error("Email must end with @gmail.com");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

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
    <div style={styles.container}>
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
      <div style={styles.imageSection}>
        <img src={picture} />

        <div style={styles.formOverlay}>
          <div style={styles.loginCard}>
            <div style={styles.formContent}>
              <h1 style={styles.title}>Login</h1>
              <p style={styles.welcomeText}>Welcome Back !!!</p>

              <div style={styles.inputGroup}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) =>
                      (e.target.style.background = "rgba(0, 0, 0, 0.08)")
                    }
                    onBlur={(e) =>
                      (e.target.style.background = "rgba(0, 0, 0, 0.05)")
                    }
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) =>
                      (e.target.style.background = "rgba(0, 0, 0, 0.08)")
                    }
                    onBlur={(e) =>
                      (e.target.style.background = "rgba(0, 0, 0, 0.05)")
                    }
                  />
                </div>

                <div style={styles.forgotPassword}>
                  <a href="/register" style={styles.forgotLink}>
                    Forgot password?
                  </a>
                </div>

                <button
                  onClick={handleSubmit}
                  style={styles.loginButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#222";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#333";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  LOGIN
                </button>

                <div style={styles.signupText}>
                  Don't have an Account?{" "}
                  <Link
                    href="#"
                    onClick={handleRegister}
                    style={styles.signupLink}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  imageSection: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  formOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end", // This positions the form to the right
    padding: "40px",
    background: "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
  },
  loginCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    opacity: "0.95",
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 8px 0",
    textAlign: "left",
    letterSpacing: "-0.02em",
  },
  welcomeText: {
    color: "#666",
    fontSize: "0.95rem",
    margin: "0 0 32px 0",
    textAlign: "left",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#333",
    margin: "0",
  },
  input: {
    padding: "14px 16px",
    border: "none",
    borderRadius: "8px",
    background: "rgba(0, 0, 0, 0.05)",
    fontSize: "0.95rem",
    color: "#333",
    transition: "all 0.2s ease",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: "-8px",
  },
  forgotLink: {
    color: "#666",
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  loginButton: {
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "0.95rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "8px",
    width: "100%",
  },
  signupText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "8px",
  },
  signupLink: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "600",
    fontStyle: "italic",
    transition: "color 0.2s ease",
  },
};

export default LoginPage;
