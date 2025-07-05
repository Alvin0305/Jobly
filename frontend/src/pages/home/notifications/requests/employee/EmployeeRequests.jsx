import React, { useEffect, useState } from 'react';
import Jobcard from "../../../../../components/JobTile/Jobcard.jsx";
import { getJobsForEmployee, addEmployeeToInterested } from '../../../../../services/jobService';
import { useUser } from "../../../../../contexts/userContext.jsx";
import socket from "../../../../../socket";
import './employeerequests.css';

const EmployeeRequests = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchJobs = async () => {
    try {
      const res = await getJobsForEmployee(user.token);
      console.log("API RESPONSE:", res);

      const enrichedJobs = res.map(job => ({
        ...job,
        status: job.is_interested ? 'Interested' : 'Not interested',
      }));

      setJobs(enrichedJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkInterested = async (jobId) => {
    try {
      await addEmployeeToInterested(jobId, user.token);

      // Update job status locally
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, status: 'Interested' } : job
        )
      );

      // Emit socket event correctly
      if (socket.connected) {
        socket.emit("reply_to_job", {
          jobId,
          employeeId: user.id
        });
      } else {
        console.warn("⚠️ Socket not connected");
      }
    } catch (err) {
      console.error('Failed to mark interest:', err);
    }
  };

  useEffect(() => {
    console.log("User from context", user);
    fetchJobs();
  }, []);

  if (loading) return <div style={{ color: 'white' }}>Loading jobs...</div>;

  return (
    <div className="requests-container">
      {jobs.length === 0 ? (
        <p style={{ color: 'white' }}>No job requests found.</p>
      ) : (
        jobs.map((job) => (
          <Jobcard
            key={job.id}
            jobId={job.id}
            employer_name={`${job.firstname} ${job.lastname}`}
            employer_image={job.image || '/girl.png'}
            title={job.title}
            desc={job.description}
            experience={job.required_experience}
            salary={job.salary}
            status={job.status}
            onMarkInterested={handleMarkInterested}
            job_skills={job.job_skills}
          />
        ))
      )}
    </div>
  );
};

export default EmployeeRequests;
