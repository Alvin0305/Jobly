import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useUser } from "../../contexts/userContext";
import "./register.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.endsWith("@gmail.com")) {
      toast.error("Email must end with @gmail.com");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        form
      );
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
      });

      toast.success("Signed Up successfully");

      const token = localStorage.setItem("token", res.data.token);
      console.log("Token: ", token);

      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);
      setTimeout(() => navigate("/about"), 1500);
    } catch (err) {
      console.log("SignUp error:", err);

      if (err.response?.status === 400)
        toast.error("Failed to create new user");
      else if (err.response?.status === 500)
        toast.error("Registering user failed");
      else toast.error("SignUp failed.Please try again");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-card">
        <h1>SignUp</h1>
        <p>Welcome to Explore new Career Options</p>

        <div>
          <label>Name</label>
          <div className="name-fields">
            <input
              type="text"
              placeholder="Enter your firstname"
              value={form.firstname}
              name="firstname"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter your lastname"
              value={form.lastname}
              name="lastname"
              onChange={handleChange}
              required
            />
          </div>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            name="email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            name="password"
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="Employee"
                checked={form.role === "Employee"}
                onChange={handleChange}
                required
              />
              Employee
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Employer"
                checked={form.role === "Employer"}
                onChange={handleChange}
                required
              />
              Employer
            </label>
          </div>

          <button onClick={handleSubmit}>SIGNUP</button>

          <div className="login-link">
            Already have an Account? <Link onClick={handleRegister}>LogIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
