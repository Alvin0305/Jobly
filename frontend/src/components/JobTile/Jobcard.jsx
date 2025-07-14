import React from "react";
import "./jobcard.css";
import { useNavigate } from "react-router-dom";
//import FeedBubble from '../FeedBubble/FeedBubble';
const Jobcard = ({
  jobId,
  employer_name,
  employer_image,
  title,
  desc,
  salary,
  status,
  onMarkInterested,
  job_skills = [],
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/home/job/view/${jobId}`);
  };
  return (
    <div
      className="job-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="job-header">
        <img
          src={employer_image || "girl.png"}
          alt="Employer"
          className="profile-image"
        />
        <h4 className="employer-name">{employer_name}</h4>
      </div>

      <h3 className="job-title">{title}</h3>
      <p className="job-desc">{desc}</p>
      <div className="job-skills">
        {job_skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>

      <div className="footer">
        {status === "Interested" ? (
          <p className="interested">✔ Interested</p>
        ) : (
          <button
            className="interest-btn"
            onClick={(e) => {
              e.stopPropagation();
              onMarkInterested(jobId);
            }}
          >
            Mark as Interested
          </button>
        )}

        {salary && <div className="salary">₹{salary.toLocaleString()}</div>}
      </div>
    </div>
  );
};

export default Jobcard;
