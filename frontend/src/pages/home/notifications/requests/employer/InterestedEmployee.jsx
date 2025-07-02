import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterestedEmployees } from "../../../../../services/jobService";
import './interestedemployees.css';
import { useUser } from "../../../../../contexts/userContext";

const InterestedEmployee = () => {
  const { id } = useParams();
  const [interestedEmployees, setInterestedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchInterestedEmployees = async () => {
      try {
        const res = await getInterestedEmployees(id, user.token);
        setInterestedEmployees(res || []);
      } catch (err) {
        console.error("Error fetching interested employees:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.token) fetchInterestedEmployees();
  }, [id, user]);

  const handleAccept = (employeeId) => {
    // TODO: Add backend call to accept the employee
    console.log("Accepted employee:", employeeId, "for job:", id);
  };

  const handleReject = (employeeId) => {
    // TODO: Add backend call to reject the employee
    console.log("Rejected employee:", employeeId, "for job:", id);
  };

  return (
    <div className="interested-employee-page">
      <h2>Interested Employees for Job #{id}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : interestedEmployees.length === 0 ? (
        <p>No interested employees found.</p>
      ) : (
        <div className="employee-list">
          {interestedEmployees.map((emp) => (
            <div key={emp.id} className="employee-card">
              <img
                src={emp.image || "/boy.png"}
                alt="Employee"
                className="employee-avatar"
              />
              <div className="employee-info">
                <h3>{emp.firstname} {emp.lastname}</h3>
                <p>Email: {emp.email}</p>
                <div className="action-buttons">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(emp.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(emp.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestedEmployee;
