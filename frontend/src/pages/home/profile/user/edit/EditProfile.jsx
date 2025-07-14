import React, { useEffect, useState } from "react";
import "./editprofile.css";
import axios from "axios";
import { useUser } from "../../../../../contexts/userContext";
import {
  updateUser,
  uploadUserAvatar,
} from "../../../../../services/userService";
import AddDescriptionModal from "../view/AddDescriptionModal";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [workexp, setWorkexp] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [interest, setInterest] = useState([]);
  const [skill, setSkill] = useState([]);
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);
  const { user: userData } = useUser();

  useEffect(() => {
    console.log("user in edit profile: ", userData);

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
        // const userData = res.data;
        console.log(userData);
        setUser((prevUser) => ({ ...prevUser, ...userData }));

        const endpoint =
          userData.role === "Employee"
            ? `/workexperience/${userData.id}`
            : `/jobdetails/${userData.id}`;
        const link = `${import.meta.env.VITE_API_URL}/api/metadata${endpoint}`;

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
          setDesc(des.data.exp?.[0]?.description || "");
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
            `${import.meta.env.VITE_API_URL}/api/metadata/skill/${userData.id}`,
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

  const handleImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(userData.token);
    try {
      console.log("uploading  profile image");
      const response = await uploadUserAvatar(formData);
      console.log("profile updated");
      console.log(response.data);
      await updateUser(userData.token, {
        image: response.data.file_url,
      });
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleEditQualification = async (qualId, oldName) => {
    const token = localStorage.getItem("token");
    const newName = prompt("Edit qualification:", oldName)?.trim();
    console.log(qualId);
    if (!user || !user.id) {
      alert("User not loaded yet.");
      return;
    }

    if (!newName || newName === oldName) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/metadata/qualification/${user.id}`,
        { qualification_id: qualId, qualification: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQualification((prev) =>
        prev.map((q) => (q.id === qualId ? { ...q, name: newName } : q))
      );
      console.log("Qualification updated");
    } catch (err) {
      console.log(
        "Failed to update qualification",
        err.response?.data || err.message
      );
      alert(
        "Error: " + (err.response?.data?.error || "Failed to add qualification")
      );
    }
  };

  const handleDeleteQualification = async (qualId, name) => {
    const token = localStorage.getItem("token");

    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/metadata/qualification`,
        {
          data: { quaid: qualId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQualification((prev) => prev.filter((q) => q.id !== qualId));

      alert("Qualification deleted.");
    } catch (err) {
      console.error(
        "Failed to delete qualification :",
        err.response?.data || err.message
      );
      alert("Error deleting qualification");
    }
  };

  const handleEditSkill = async (skillId, oldName) => {
    const token = localStorage.getItem("token");
    const newName = prompt("Edit skill:", oldName)?.trim();
    // console.log(Id);
    if (!user || !user.id) {
      alert("User not loaded yet.");
      return;
    }

    if (!newName || newName === oldName) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/metadata/skill/${user.id}`,
        { skill_id: skillId, skill: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkill((prev) =>
        prev.map((s) => (s.id === skillId ? { ...s, name: newName } : s))
      );
      console.log("Skill updated");
    } catch (err) {
      console.log("Failed to update skill", err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.error || "Failed to add Skill"));
    }
  };

  const handleDeleteSkill = async (skillId, name) => {
    const token = localStorage.getItem("token");

    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/metadata/skill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { user_id: user.id, skillid: skillId },
      });

      setSkill((prev) => prev.filter((q) => q.id !== skillId));

      alert("Skill deleted.");
    } catch (err) {
      console.error(
        "Failed to delete Skill :",
        err.response?.data || err.message
      );
      alert("Error deleting Skill");
    }
  };

  const handleEditInterest = async (interestId, oldName) => {
    const token = localStorage.getItem("token");
    const newName = prompt("Edit interest:", oldName)?.trim();

    if (!newName || newName === oldName) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/metadata/interest/${user.id}`,
        { interest_id: interestId, interest: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterest((prev) =>
        prev.map((s) => (s.id === interestId ? { ...s, name: newName } : s))
      );
      console.log("Interest updated");
    } catch (err) {
      console.log(
        "Failed to update interest",
        err.response?.data || err.message
      );
      alert(
        "Error: " + (err.response?.data?.error || "Failed to add interest")
      );
    }
  };

  const handleDeleteInterest = async (interestId, name) => {
    console.log("USER:", user);

    const token = localStorage.getItem("token");

    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/metadata/interest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user_id: user.id,
            interest_id: interestId,
          },
        }
      );

      setInterest((prev) => prev.filter((q) => q.id !== interestId));

      alert("Interest deleted.");
    } catch (err) {
      console.error(
        "Failed to delete interest :",
        err.response?.data || err.message
      );
      alert("Error deleting interest");
    }
  };

  const handleEditExperience = async (exp) => {
    const token = localStorage.getItem("token");

    const company_name = prompt("Edit company name:", exp.company_name)?.trim();
    const designation = prompt("Edit designation:", exp.designation)?.trim();
    const location = prompt("Edit location:", exp.location)?.trim();
    const start_date = prompt(
      "Edit start date (YYYY-MM-DD)",
      exp.start_date
    )?.trim();
    const end_date = prompt("Edit end date (YYYY-MM-DD)", exp.end_date)?.trim();

    if (!company_name || !designation || !location || !start_date) {
      alert("Fields are required.");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/metadata/workexperience/${exp.id}`,
        {
          company_name,
          designation,
          location,
          start_date: start_date || null,
          end_date: end_date || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedExp = res.data.updated;

      setWorkexp((prev) => prev.map((e) => (e.id === exp.id ? updatedExp : e)));
      alert("Work experience updated");
    } catch (err) {
      console.error(
        "Failed to update work experience",
        err.response?.data || err.message
      );
      alert("Error updating experience");
    }
  };

  return (
    <div className="outerbox">
      <div className="innerbox">
        <h3>HII {user.firstname.toUpperCase()},</h3>
        <div className="detailsBox">
          <label htmlFor="profilePic">Profile Image</label>
          <input
            type="file"
            id="profilePic"
            style={{ display: "none" }}
            onChange={(e) => handleImage(e.target.files[0])}
          />
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
        <AddDescriptionModal user={user} setDesc={setDesc} />

        <div className="infoRow">
          <label>Graduation</label>
          <div>
            {(qualification?.length ?? 0) === 0 ? (
              <div>
                <p>No Records Found</p>
              </div>
            ) : (
              (qualification ?? []).map((item, index) => (
                <div className="experienceCard" key={index}>
                  <h4>{item.name}</h4>
                  <button
                    onClick={() => handleEditQualification(item.id, item.name)}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteQualification(item.id, item.name)
                    }
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
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

                <button
                  onClick={() => handleEditExperience(item.id, item.name)}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteQualification(item.id, item.name)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="infoRow">
          <label>Skills</label>
          <div>
            {skill.map((item, i) => (
              <span key={i} className="skill-pill">
                {item.name}
                <button onClick={() => handleEditSkill(item.id, item.name)}>
                  ✏️
                </button>
                <button onClick={() => handleDeleteSkill(item.id, item.name)}>
                  🗑️
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="infoRow">
          <label>Interests</label>
          <div>
            {interest.map((item, i) => (
              <span key={i} className="skill-pill">
                {item.name}
                <button onClick={() => handleEditInterest(item.id, item.name)}>
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteInterest(item.id, item.name)}
                >
                  🗑️
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
