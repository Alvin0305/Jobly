import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingpage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h2 className="logo">Jobly</h2>
        <div className="header-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="login-btn" onClick={() => navigate("/register")}>
            SignUp
          </button>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-image">
          <img src="./man.jpg" alt="landing" />
        </div>
        <div className="hero-text">
          <h2>Secure Your Career Path. You're worth it.</h2>
          <p>
            Empowering ambitious job seekers with resources to discover, apply,
            and secure their dream.
          </p>
        </div>
      </div>
      <div className="about-section">
        <h3>About Jobly</h3>
        <p>
          Welcome to <strong>Jobly</strong>, a modern platform designed to
          bridge opportunities between employers and job seekers. Whether you're
          looking to hire top talent or explore exciting job roles, our platform
          offers an intuitive and secure space tailored just for you.
        </p>

        <h4>What We Offer</h4>
        <ul>
          <li>
            <strong>Smart Job Matching:</strong> Employers can post jobs with
            ease, while employees can explore listings and express interest with
            just a click.
          </li>
          <li>
            <strong>Personalized Dashboard:</strong> Manage your preferences,
            applications, and interactions all in one place.
          </li>
          <li>
            <strong>Privacy First:</strong> Your data is yours. With simple
            privacy settings, control who can see your activity or profile.
          </li>
        </ul>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <h3>Meet the Developers</h3>
          <div className="developers">
            <div className="dev-card">
              <h4>Alvin A S</h4>
              <p>NIT Calicut</p>
              <p>B.Tech CSE, 3rd Year</p>
            </div>
            <div className="dev-card">
              <h4>Durga Suresh</h4>
              <p>NIT Calicut</p>
              <p>B.Tech CSE, 3rd Year</p>
            </div>
            <div className="dev-card">
              <h4>Athira Antony</h4>
              <p>NIT Calicut</p>
              <p>B.Tech CSE, 3rd Year</p>
            </div>
          </div>
          <p className="footer-note">© 2025 Jobly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
