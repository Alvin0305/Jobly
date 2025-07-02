import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../../../services/jobService'
import { useUser } from '../../../../contexts/userContext';
const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const {user} = useUser();
  useEffect(() => {
    getJobById(id,user.token)
      .then(data => setJob(data))
      .catch(err => console.error('Error fetching job:', err));
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</p>
      {/* more job details */}
    </div>
  );
};

export default ViewJob;
