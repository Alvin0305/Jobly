import React, { useState } from "react";
import { userPrivacy } from "../../../services/userService.js";
import "./settings.css";

const Settings = () => {
  const [isPublic, setPublic] = useState(true);

  const handlePrivacyToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await userPrivacy(token);
      setPublic(res.isPublic);
      console.log("user");
    } catch (err) {
      alert("Error updating privacy settings");
      console.error(err);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-heading">Settings</h1>
      <div className="settings-section">
        <h2>Privacy</h2>
        <button onClick={handlePrivacyToggle} className="privacy-btn">
          {isPublic ? "Make Private" : "Make Public"}
        </button>
        <p className="privacy-status">
          Status: <strong>{isPublic ? "Public" : "Private"}</strong>
        </p>
      </div>
    </div>
  );
};

export default Settings;
