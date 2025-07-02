import React, { useState } from "react";
import axios from "axios";
//import "./AddDescriptionModal.css"; // Import the CSS

const AddDescriptionModal = ({ user, setDesc }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const handleAddDescription = async () => {
    const token = localStorage.getItem("token");
    console.log("token",token);

    if (!description.trim()) {
      alert("Description is required");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/metadata/description/${user.id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDesc(description);
      setShowModal(false);
      console.log("Description added");
    } catch (err) {
      console.log("Failed to add description", err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.error || "Failed to add description"));
    }
  };

  return (
    <>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        Add Description
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">Enter Description</h2>
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your paragraph here..."
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleAddDescription}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDescriptionModal;
