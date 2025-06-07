import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      landing page
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </button>
    </div>
  );
};

export default LandingPage;
