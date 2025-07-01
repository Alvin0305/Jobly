import React, { useEffect, useState } from "react";
import "./viewprofile.css";
import axios from "axios";
import AddDescriptionModal from "./AddDescriptionModal.jsx";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [workexp, setWorkexp] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [interest, setInterest] = useState([]);
  const [skill, setSkill] = useState([]);
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);

  const ViewProfile = () => {
    const [user, setUser] = useState(null);
    const [workexp, setWorkexp] = useState(null);

    useEffect(() => {
      const fetchUserAndDetails = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = res.data;
          setUser(userData);

          const endpoint =
            userData.role === "Employee"
              ? `/workexperience/${userData.id}`
              : `/jobdetails/${userData.id}`;
          const link = `${
            import.meta.env.VITE_API_URL
          }/api/metadata${endpoint}`;

          try {
            const exp = await axios.get(link, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setWorkexp(exp.data.exp);
          } catch (err) {
            console.error(
              "Error fetching work experience:",
              err.response?.data || err.message
            );
          }

          try {
            const des = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/metadata/description/${
                userData.id
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(des.data);
            setDesc(des.data.exp?.description || "");
          } catch (err) {
            console.error(
              "Error fetching description:",
              err.response?.data || err.message
            );
          }

          try {
            const quaRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/metadata/qualification/${
                userData.id
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log("quaRes.data:", quaRes.data);

            setQualification(quaRes.data.qualifications);
          } catch (err) {
            console.error(
              "Error fetching qualification:",
              err.response?.data || err.message
            );
          }

          try {
            const intRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/metadata/interest/${
                userData.id
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            setInterest(intRes.data.interests);
          } catch (err) {
            console.error(
              "Error fetching interest:",
              err.response?.data || err.message
            );
          }

          try {
            const skillRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/metadata/skill/${
                userData.id
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log("skillRes.data:", skillRes.data);
            setSkill(skillRes.data.skills);
          } catch (err) {
            console.error(
              "Error fetching skill:",
              err.response?.data || err.message
            );
          }

          try {
            const postRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/post/user/${userData.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log("postRes.data:", postRes.data);
            setPost(postRes.data.posts);
          } catch (err) {
            console.error(
              "Error fetching post:",
              err.response?.data || err.message
            );
          }
        } catch (err) {
          console.error(
            "Error fetching user profile:",
            err.response?.data || err.message
          );
        }
      };

      fetchUserAndDetails();
    }, []);

    if (!user) return <p>Loading user profile...</p>;

    const handleAddQualification = async () => {
      const token = localStorage.getItem("token");
      const qualificationName = prompt("Enter qualification:")?.trim();

      if (!user || !user.id) {
        alert("User not loaded yet.");
        return;
      }

      if (!qualificationName) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/metadata/qualification/${
            user.id
          }`,
          { qualification: qualificationName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newQual = {
          id: res.data.qualification_id,
          name: qualificationName,
        };
        setQualification((prev) => [...(prev || []), newQual]);
        console.log("Qualification added");
      } catch (err) {
        console.log(
          "Failed to add qualification",
          err.response?.data || err.message
        );
        alert(
          "Error: " +
            (err.response?.data?.error || "Failed to add qualification")
        );
      }
    };

    const handleAddInterest = async () => {
      const token = localStorage.getItem("token");
      const interestName = prompt("Enter interest :");

      if (!interestName) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/metadata/interest/${user.id}`,
          { name: interestName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newInt = { name: interestName };
        setInterest((prev) => [...(prev || []), newInt]);
        console.log("Interest added");
      } catch (err) {
        console.log(
          "failed to add interest",
          err.response?.data || err.message
        );
        alert(
          "Error: " + (err.response?.data?.error || "Failed to add interest")
        );
      }
    };

    const handleAddSkill = async () => {
      const token = localStorage.getItem("token");
      const skillName = prompt("Enter skill :");

      if (!skillName) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/metadata/skill/${user.id}`,
          { name: skillName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newSkill = { name: skillName };
        setSkill((prev) => [...(prev || []), newSkill]);
        console.log("Skill added");
      } catch (err) {
        console.log("failed to add skill", err.response?.data || err.message);
        alert("Error: " + (err.response?.data?.error || "Failed to add skill"));
      }
    };

    const handleAddExperience = async () => {
      const token = localStorage.getItem("token");
      const companyName = prompt("Enter company name:");
      const designation = prompt("Enter your designation: ");
      const location = prompt("Enter location: ");
      // if employee enter start and end dates
      const startDate = prompt("Enter start date (YYYY-MM-DD):");
      const endDate = prompt(
        "Enter end date (YYYY-MM-DD) or leave empty if still working:"
      );

      if (!companyName || !designation || !location) {
        alert("Company, designation and location are required");
        return;
      }

      try {
        const endpoint =
          user.role === "Employee"
            ? `/workexperience/${user.id}`
            : `/jobdetails/${user.id}`;
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/metadata${endpoint}`,
          {
            company_name: companyName,
            designation: designation,
            location: location,
            start_date: startDate || null,
            end_date: endDate || null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newExp = {
          id: res.data.experience_id,
          company_name: companyName,
          designation: designation,
          location: location,
          start_date: startDate || null,
          end_date: endDate || null,
        };
        setWorkexp((prev) => [...prev, newExp]);
        console.log("Work experience added");
      } catch (err) {
        console.log(
          "failed to add experience",
          err.response?.data || err.message
        );
        alert(
          "Error: " + (err.response?.data?.error || "Failed to add experience")
        );
      }
    };

    return (
      <div className="outerbox">
        <div className="innerbox">
          <h3>HII {user.firstname.toUpperCase()},</h3>
          <div className="detailsBox">
            <img src="./avatar.png" className="profilePic" />
            <h2 className="name">
              {user.firstname} {user.lastname}
            </h2>
            <p className="email">{user.email}</p>
            <p className="role">{user.role}</p>
          </div>
        </div>

        <div className="info">
          <h3>Description</h3>
          <p>{desc}</p>
          {!desc && <AddDescriptionModal user={user} setDesc={setDesc} />}
          <div className="infoRow">
            <label>Graduation</label>
            <span className="edit-icon">✏️</span>
            <div>
              {(qualification?.length ?? 0) === 0 ? (
                <div>
                  <p>No Records Found</p>
                </div>
              ) : (
                (qualification ?? []).map((item, index) => (
                  <div className="experienceCard" key={index}>
                    <h4>{item.name}</h4>
                  </div>
                ))
              )}
            </div>
            <button onClick={handleAddQualification}>Add +</button>
          </div>

          <div className="infoRow">
            <label>Posts</label>
            <span className="edit-icon">✏️</span>
            <div>
              {(post?.length ?? 0) === 0 ? (
                <div>
                  <p>No Records Found</p>
                </div>
              ) : (
                (post ?? []).map((item, index) => (
                  <div className="experienceCard" key={index}>
                    <h4>{item.name}</h4>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="infoRow">
            <label>Experience</label>
            <span className="edit-icon">✏️</span>
            <h3>
              {user?.role === "Employee" ? "Work Experience" : "Job Details"}
            </h3>
            {(workexp?.length ?? 0) === 0 ? (
              <div>
                <p>No records available.</p>
              </div>
            ) : (
              (workexp || [])?.map((item, index) => (
                <div key={index}>
                  <h3>{item.designation || "designation not specified"}</h3>
                  <h4>{item.company_name || "company name not specified"}</h4>
                  <h4>{item.location || "location not specified"}</h4>
                  {item.start_date && (
                    <>
                      <h4>{item.start_date}</h4>
                      <h4>{item.end_date || "Currently Working"}</h4>
                    </>
                  )}
                </div>
              ))
            )}
            <button onClick={handleAddExperience}>Add +</button>
          </div>

          <div className="infoRow">
            <label>Skills</label>
            <div>
              {skill.map((item, i) => (
                <span key={i} className="skill-pill">
                  {item.name}
                </span>
              ))}
              <button onClick={handleAddSkill}>Add +</button>
            </div>
          </div>

          <div className="infoRow">
            <label>Interests</label>
            <div>
              {interest.map((item, i) => (
                <span key={i} className="skill-pill">
                  {item.name}
                </span>
              ))}
              <button onClick={handleAddInterest}>Add +</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default ViewProfile;
