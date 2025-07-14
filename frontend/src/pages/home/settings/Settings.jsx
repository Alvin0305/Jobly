import React, { useState, useEffect } from "react";
import "./settings.css";
import { useUser } from "../../../contexts/userContext";
import { updateUser } from "../../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const [isPublic, setIsPublic] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && user.is_private !== undefined) {
      setIsPublic(!user.is_private);
    }
  }, [user]);

  const handlePrivacyToggle = async () => {
    const newIsPublic = !isPublic;
    setIsPublic(!isPublic);
    try {
      await updateUser(user.token, {
        is_private: !newIsPublic, // store as false if public
      });
      toast.success("Privacy updated successfully!");
      setUser({ ...user, is_private: !newIsPublic });
    } catch (err) {
      console.error("Failed to update privacy:", err);
      toast.error("Failed to update privacy.");
      setIsPublic(!newIsPublic); // revert on failure
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="setting-item">
        <label>Privacy:</label>
        <button onClick={handlePrivacyToggle}>
          {isPublic ? "Public" : "Private"}
        </button>
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
    </div>
  );
};

export default Settings;
