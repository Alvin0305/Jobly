import { useState, useEffect } from "react";
import {
  createJob,
  uploadJobImages, // ✅ correctly imported
} from "../../../../services/jobService.js";
import {
  getAllDomains,
  createDomain,
} from "../../../../services/metadataService.js";
import "../create/createjob.css";
import socket from "../../../../socket/index.js";
import { useUser } from "../../../../contexts/userContext.jsx";

const CreateJob = () => {
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // ✅ added
  const [addingSkill, setAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    getAllDomains()
      .then((res) => setSkills(res.domains || []))
      .catch((err) => console.error("Failed to load skills", err));
  }, []);

  const toggleSkills = (skillName) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleAddSkill = async () => {
    const skill = newSkill.trim().toUpperCase();
    const token = localStorage.getItem("token");
    if (!skill || selectedSkills.includes(skill)) {
      alert("Inavlid or duplicate skill");
      return;
    }
    try {
      const res = await createDomain(skill, token);
      const newDomain = res.domain || { id: res.id, name: skill };

      setSkills((prev) => [...prev, newDomain]);
      setSelectedSkills((prev) => [...prev, newDomain.name]);
    } catch (err) {
      console.error("Failed to add new skill", err);
      alert("Error adding skill");
    }
    setNewSkill("");
    setAddingSkill(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(e.target.files);
    setImageFile(files); // ✅ now an array

    // if (files.length > 0) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => setPreviewImage(reader.result);
    //   reader.readAsDataURL(files[0]); // preview first image
    // }
  };

  const { user } = useUser();

  const handlePostJob = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    let imageUrls = [];

    if (imageFile && imageFile.length > 0) {
      try {
        const formData = new FormData(); // ✅ prepare FormData for upload
        //  formData.append("images", imageFile); // multer expects field name as 'images'
        //append all the images using for loop
        for (let i = 0; i < imageFile.length; i++) {
          formData.append("images", imageFile[i]);
        }
        console.log("upload started");
        const response = await uploadJobImages(formData, token); // ✅ correct function
        console.log("upload completed");
        console.log(response.data);
        imageUrls = response; // extract Cloudinary URLs
      } catch (uploadErr) {
        console.error("Image upload failed", uploadErr);
        alert("Image upload failed.");
        return;
      }
    }
    const skillids = selectedSkills
      .map((skillName) => {
        const match = skills.find((s) => s.name === skillName);
        return match?.id ? parseInt(match.id) : undefined;
      })
      .filter((id) => id !== undefined);

    const payload = {
      title: caption,
      company_name: company,
      description,
      salary: parseInt(salary),
      required_experience: 0,
      skills_required: skillids,
      image_urls: imageUrls,
      employer_id: user.id,
    };

    try {
      //const response = await createJob(payload, token);
      // console.log("Axios response:",response);
      // console.log("Status code:",response?.status);
      // if (response?.status === 201) {
      //   console.log("JOb posted successsfully");
      //   alert("Job posted successfully!");
      //   // Optionally reset fields here
      // }
      socket.emit("create_job", payload);
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="post-container">
      <div className="input-section">
        <div className="image-upload-box">
          <label htmlFor="imageUpload" className="upload-label">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              <span className="plus-icon">+</span>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        <div className="text-inputs">
          <input
            type="text"
            placeholder="Company name.."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Job title.."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <textarea
            placeholder="Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Salary.."
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
      </div>

      <div className="skills-section">
        <p>SKILLS REQUIRED</p>
        <div className="skills-list">
          {skills.map((skill) => (
            <button
              key={skill.id}
              className={`skill-tag ${
                selectedSkills.includes(skill.name) ? "active" : ""
              }`}
              onClick={() => toggleSkills(skill.name)}
            >
              {skill.name}
            </button>
          ))}
          {addingSkill ? (
            <div className="add-skill-container">
              <input
                className="add-skill-input"
                value={newSkill}
                placeholder="New skill.."
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button className="add-button" onClick={handleAddSkill}>
                ✓
              </button>
              <button
                className="cancel-button"
                onClick={() => setAddingSkill(false)}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              className="skill-tag add-skill"
              onClick={() => setAddingSkill(true)}
            >
              ADD SKILL +
            </button>
          )}
        </div>
      </div>

      <div className="preview-section">
        <p>PREVIEW</p>
        <div className="preview-box">
          <div className="preview-left">
            <p>{description || "Post description"}</p>
            <p>{company && `Company: ${company}`}</p>
            <p>{salary && `Salary: ₹${salary}`}</p>
          </div>
          <div className="preview-right">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              "Blog / Image"
            )}
          </div>
        </div>
      </div>

      <button className="post-button" onClick={handlePostJob}>
        POST
      </button>
    </div>
  );
};

export default CreateJob;
