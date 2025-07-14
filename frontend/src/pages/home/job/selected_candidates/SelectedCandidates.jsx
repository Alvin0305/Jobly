import React, { useState, useEffect } from "react";
import { getSelectedEmployeesForJob } from "../../../../services/jobService";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "./selectedcandidates.css";

const SelectedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const jobId = localStorage.getItem("selectedJobId");
        const res = await getSelectedEmployeesForJob(jobId);
        setCandidates(res.candidates || []);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="selected-wrapper">
      <h2 className="title">
        Selected Candidates as <span>Web Developers</span>
      </h2>

      <div className="toggle-options">
        <label>
          <input type="radio" name="filter" defaultChecked /> All
        </label>
        <label>
          <input type="radio" name="filter" /> Already sent
        </label>
        <label>
          <input type="radio" name="filter" /> Send Email
        </label>
      </div>

      {loading ? (
        <p>Loading candidates...</p>
      ) : candidates.length === 0 ? (
        <p>No candidates selected yet.</p>
      ) : (
        <div className="candidates-list">
          {candidates.map((candidate, idx) => (
            <div className="candidate-card" key={idx}>
              <div className="candidate-info">
                <img
                  src={candidate.profileImage || "/profile_default.png"}
                  alt="profile"
                  className="avatar"
                />
                <div>
                  <h3>
                    {candidate.name} <FaCheckCircle className="verified" />
                  </h3>
                  <p>{candidate.role}</p>
                  <div className="skills">
                    {candidate.skills.map((skill, i) => (
                      <span key={i}>{skill}</span>
                    ))}
                  </div>
                  <p className="exp">Experience: {candidate.experience}</p>
                </div>
              </div>
              <div className="right-section">
                <p>{candidate.company}</p>
                <button className={candidate.sent ? "btn sent" : "btn already"}>
                  <FaEnvelope />{" "}
                  {candidate.sent ? "Sent Email" : "Already sent"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedCandidates;
