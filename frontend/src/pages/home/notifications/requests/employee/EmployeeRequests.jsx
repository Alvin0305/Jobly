import React, { useEffect, useState } from "react";
import Jobcard from "../../../../../components/JobTile/Jobcard.jsx";
import {
  getJobsForEmployee,
  addEmployeeToInterested,
  getSelectedEmployeesForJob,
} from "../../../../../services/jobService";
import { useUser } from "../../../../../contexts/userContext.jsx";
import socket from "../../../../../socket";
import "./employeerequests.css";

const EmployeeRequests = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  // const [jobaccepted,setjobaccepted] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await getJobsForEmployee(user.token);
      console.log("API RESPONSE:", res);
      const acceptedJobs = JSON.parse(localStorage.getItem("acceptedJobs"));
      const enrichedJobs = res.map((job) => {
        console.log(job.is_accept);
        return {
          ...job,
          status: job.is_interested ? "Interested" : "Not interested",
          acceptanceStatus: job.is_accept ? "Accepted" : "Pending",
        };
      });

      setJobs(enrichedJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkInterested = async (jobId) => {
    try {
      //await addEmployeeToInterested(jobId, user.token);

      // Update job status locally
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: "Interested" } : job
        )
      );
    } catch (err) {
      console.log(err);
    }
    // Emit socket event correctly
    socket.emit("reply_to_job", { jobId, employeeId: user.id });
  };

  useEffect(() => {
    const acceptjob = ({ job_id, message }) => {
      console.log("job notificaion for", job_id, message);
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          console.log(
            job.id,
            job_id,
            job.id === job_id,
            job.acceptanceStatus,
            typeof job.id,
            typeof job_id
          );
          return job.id === job_id
            ? { ...job, acceptanceStatus: "Accepted" }
            : job;
        })
      );
    };

    const handleNewJob = ({job_id, employer_id, title, job, company_name, message }) => {
      console.log("new job came", job);
      setJobs(prev => ([job, ...prev]));
    }
    socket.on("job_created", handleNewJob);
    socket.on("job-accepted", acceptjob);
    return () => {
      socket.off("job-accepted", acceptjob);
      socket.off("job_created", handleNewJob);
    };
  }, []);

  useEffect(() => {
    const fetchAcceptedEmployees = async () => {
      try {
        const response = await getSelectedEmployeesForJob(job);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div style={{ color: "white" }}>Loading jobs...</div>;

  return (
    <div className="requests-container">
      {jobs.length === 0 ? (
        <p style={{ color: "white" }}>No job requests found.</p>
      ) : (
        jobs.map((job) => (
          <Jobcard
            key={job.id}
            jobId={job.id}
            employer_name={`${job.firstname} ${job.lastname}`}
            employer_image={job.image || "/girl.png"}
            title={job.title}
            desc={job.description}
            experience={job.required_experience}
            salary={job.salary}
            status={job.status}
            acceptedStatus={job.acceptanceStatus}
            onMarkInterested={handleMarkInterested}
            job_skills={job.job_skills}
          />
        ))
      )}
    </div>
  );
};

export default EmployeeRequests;
