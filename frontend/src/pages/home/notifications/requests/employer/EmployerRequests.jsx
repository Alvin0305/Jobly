import React, { useEffect, useState } from 'react';
import { getJobsCreatedByEmployer } from '../../../../../services/jobService';
import { useUser } from '../../../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import './employerrequests.css'; 

const EmployerRequests = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await getJobsCreatedByEmployer(user.token);
      setJobs(res);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInterestedClick = (jobId) => {
    navigate(`/home/employer/interested/${jobId}`);
  };

  const handleViewJobClick = (jobId) => {
    navigate(`/home/job/view/${jobId}`);
  };

  return (
    <div className="employer-requests">
      <h2 className="heading">Jobs You Created</h2>
      {loading ? (
        <p className="message">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="message">No jobs found.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info" onClick={() => handleViewJobClick(job.id)}>
                <h3 className="job-title">{job.title}</h3>
                <p className="company">{job.company_name}</p>
                <p className="info">Posted: {new Date(job.time).toLocaleString()}</p>
                <p className="info">Salary: ₹{job.salary}</p>
              </div>
              <button
                className="view-btn"
                onClick={() => handleInterestedClick(job.id)}
              >
                View Interested Candidates
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerRequests;
