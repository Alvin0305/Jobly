import { useState, useEffect } from "react";
import {
  createJob,
  uploadJobImages, // ✅ correctly imported
} from "../../../../services/jobService.js";
import { getAllDomains } from "../../../../services/metadataService.js";
import "../create/createjob.css";

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

  const toggleSkills = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim().toUpperCase();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSelectedSkills([...selectedSkills, skill]);
    }
    setNewSkill("");
    setAddingSkill(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // ✅ store actual image file
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
      for(let i=0;i<imageFile.length;i++){
        formData.append("images",imageFile[i]);
      }

        const response = await uploadJobImages(formData, token); // ✅ correct function
        imageUrls = response.uploaded.map((img) => img.file_url); // extract Cloudinary URLs
      } catch (uploadErr) {
        console.error("Image upload failed", uploadErr);
        alert("Image upload failed.");
        return;
      }
    }

    const payload = {
      title: caption,
      company_name: company,
      description,
      salary: parseInt(salary),
      required_experience: 0,
      skills_required: selectedSkills,
      image_urls: imageUrls,
    };

    try {
      const response = await createJob(payload, token);
      if (response?.status === 201) {
        alert("Job posted successfully!");
        // Optionally reset fields here
      }
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
              key={skill}
              className={`skill-tag ${
                selectedSkills.includes(skill) ? "active" : ""
              }`}
              onClick={() => toggleSkills(skill)}
            >
              {skill}
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
