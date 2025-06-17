import React, { useEffect, useState } from "react";
import "./viewprofile.css";
import axios from "axios";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [workexp, setWorkexp] = useState(null);

  useEffect(() => {
    const fetchUserAndDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data;
        setUser(userData);

        const endpoint =
          userData.role === "Employee"
            ? `/workexperience/${userData.id}`
            : `/jobdetails/${userData.id}`;
        const link = `http://localhost:5000/api/metadata${endpoint}`;
        console.log("link:", link);
        const exp = await axios.get(link, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("here", exp.data);

        setWorkexp(exp.data.exp);
      } catch (err) {
        console.error("error in fetching user or experience ", err);
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Data:", err.response.data);
        } else {
          console.error("Error:", err.message);
        }
      }
    };

    fetchUserAndDetails();
  }, []);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="outerbox">
      <div className="innerbox">
        <h3 className="heading">Hii {user.firstname}!!</h3>
      </div>
      <div className="detailsBox">
        <div className="user">
          <h1 className="name">
            {user.firstname} {user.lastname}
          </h1>
          <p className="email">{user.email}</p>
          <h2 className="role">{user.role}</h2>
        </div>
        <img src="./picture.jpg" className="profilePic" />
      </div>

      <div className="info">
        <div className="leftcol">
          <p>hfbuhjrgh viuhgy hygikjnbm,nbkfjnkfjk</p>
          <p>fdkjghjkghkdgjerhgkjrdhkdnhjdkrhgkjf</p>
        </div>

        <div className="rightcol">
          <div className="infoRow">
            <label>EDUCATION</label>
            <div className="editable">
              <span>MAR IVANIOS COLLEGE</span>
              <button className="editBtn">✏️</button>
            </div>
          </div>
        </div>

        <div className="expSection">
          <h3>
            {user?.role === "Employee" ? "Work Experience" : "Job Details"}
          </h3>
          {workexp?.length === 0 ? (
            <div>
              <p>No records available.</p>
              <button>Add + </button>
            </div>
          ) : (
            (workexp || [])?.map((item, index) => (
              <div className="experienceCard" key={index}>
                <h4>{item.designation || "designation not specified"}</h4>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
