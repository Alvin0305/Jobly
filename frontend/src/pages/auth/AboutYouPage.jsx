import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addInterest,
  addSkill,
  getAllDomains,
  removeInterest,
  removeSkill,
} from "../../services/metadataService";
import FeedBubble from "../../components/FeedBubble/FeedBubble";
import "./about.css";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/userContext";

const AboutYouPage = () => {
  const [domains, setDomains] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { user } = useUser();
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

  const handleSkillClick = async (skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills((prev) => prev.filter((s) => s.id !== skill.id));
      try {
        const response = await removeSkill(skill.id, user.token);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await addSkill(user.id, skill.name, user.token);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  const handleInterestClick = async (interest) => {
    if (selectedInterests.some((i) => i.id === interest.id)) {
      setSelectedInterests((prev) => prev.filter((i) => i.id !== interest.id));
      try {
        const response = await removeInterest(interest.id, user.token);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await addInterest(user.id, interest.name, user.token);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  const handleContinue = () => {
    console.log("Selected skills:", selectedSkills);
    console.log("Selected interests: ", selectedInterests);

    navigate("/home");
  };

  return (
    <div className="about-you-container">
      <h2 className="header">About You</h2>
      <p className="subtext">
        Tell us about yourself to improve your recommendations...
      </p>
      <h4>Skills</h4>
      <div className="bubbles-wrapper">
        {domains.map((skill) => (
          <FeedBubble
            key={skill.id}
            name={skill.name}
            selected={selectedSkills.some((s) => s.id === skill.id)}
            onClick={() => handleSkillClick(skill)}
          />
        ))}
      </div>
      <h4>Interests</h4>
      <div className="bubbles-wrapper">
        {domains.map((interest) => (
          <FeedBubble
            key={interest.id}
            name={interest.name}
            selected={selectedInterests.some((i) => i.id === interest.id)}
            onClick={() => handleInterestClick(interest)}
          />
        ))}
      </div>

      <button
        className={`continue-button ${
          selectedSkills.length === 0 ? "disabled" : ""
        }`}
        onClick={handleContinue}
        disabled={selectedSkills.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

export default AboutYouPage;
