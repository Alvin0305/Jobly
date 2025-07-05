import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../../../services/jobService';
import { useUser } from '../../../../contexts/userContext';
import './viewjob.css';

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (id && user?.token) {
      getJobById(id, user.token)
        .then((data) => setJob(data))
        .catch((err) => console.error('Error fetching job:', err));
    }
  }, [id, user]);

  if (!job) return <div className="job-loading">Loading job details...</div>;

  return (
    <div className="job-container">
      <h2 className="job-title">{job.title}</h2>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Posted on:</strong> {new Date(job.time).toLocaleString()}</p>
      
      <div className="job-images">
        {job.image_urls?.length > 0 ? (
          job.image_urls.map((url, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            <img  src={url} alt={`Job Image ${index + 1}`} className="job-image" /></a>
          ))
        ) : (
          <p className="no-images">No images provided for this job.</p>
        )}
      </div>

      <p className="job-section"><strong>Description:</strong></p>
      <p>{job.description}</p>
      <p><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</p>
      <p><strong>Status:</strong> {job.is_filled ? 'Filled' : 'Open'}</p>
    </div>
  );
};

export default ViewJob;
