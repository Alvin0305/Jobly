import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDomains } from "../../services/metadataService";
import FeedBubble from "../../components/FeedBubble/FeedBubble";
import "./about.css";

const AboutYouPage = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getAllDomains();
        setDomains(response.domains);
      } catch (err) {
        console.error("Failed to fetch domains:", err);
      }
    };
    fetchDomains();
  }, []);

  const handleDomainClick = (domain) => {
    if (selectedDomains.some((d) => d.id === domain.id)) return;
    setSelectedDomains((prev) => [...prev, domain]);
  };

  const handleContinue = () => {
    console.log("Selected domains:", selectedDomains);
    navigate("/home");
  };

  return (
    <div className="about-you-container">
      <h2 className="header">About You</h2>
      <p className="subtext">
        Tell us about yourself to improve your recommendations...
      </p>

      <div className="bubbles-wrapper">
        {domains.map((domain) => (
          <FeedBubble
            key={domain.id}
            name={domain.name}
            selected={selectedDomains.some((d) => d.id === domain.id)}
            onClick={() => handleDomainClick(domain)}
          />
        ))}
      </div>

      <button
        className={`continue-button ${
          selectedDomains.length === 0 ? "disabled" : ""
        }`}
        onClick={handleContinue}
        disabled={selectedDomains.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

export default AboutYouPage;
