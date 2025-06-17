import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import "./createpost.css";
import { getAllDomains } from "../../../../services/metadataService";
import Bubble from "../../../../components/Bubble/Bubble";
import { createPost, uploadPostImages } from "../../../../services/postService";
import { useUser } from "../../../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [blog, setBlog] = useState("");
  const [description, setDescription] = useState("");
  const [showDomains, setShowDomains] = useState(false);
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Images");
  const { user } = useUser();
  const navigate = useNavigate();

  const iconSize = 32;

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getAllDomains();
        console.log(response.data.domains);
        setDomains(response.data.domains);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDomains();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const domain_ids = [];
    for (const domain of selectedDomains) {
      domain_ids.push(domain.id);
    }
    try {
      let image_urls = [];
      if (selectedFiles.length) {
        const formData = new FormData();
        for (const file of selectedFiles) {
          formData.append("images", file);
        }
        console.log("uploading images to cloudinary");
        const uploadFilesResponse = await uploadPostImages(formData);
        console.log(uploadFilesResponse.data);
        const filesUploaded = uploadFilesResponse.data.uploaded;
        for (const file of filesUploaded) {
          image_urls.push(file.file_url);
        }
      }

      console.log("trying to post");
      const response = await createPost(
        {
          blog,
          description,
          image_urls,
          domain_tags: domain_ids,
          user_tags: [],
        },
        user?.token
      );
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="create-post-page">
      <div className="flex width-100 space-between">
        <div className="create-post-toggle-group">
          <div
            className="create-post-toggle-slider"
            style={{ left: selectedOption === "Images" ? 0 : "100px" }}
          ></div>
          <button
            className={`create-page-toggle ${
              selectedOption === "Images" ? "create-page-active-toggle" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedOption("Images");
              setBlog("");
            }}
          >
            Images
          </button>
          <button
            className={`create-page-toggle ${
              selectedOption === "Blog" ? "create-page-active-toggle" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedOption("Blog");
              setSelectedFiles([]);
            }}
          >
            Blog
          </button>
        </div>

        <button className="create-post-button" onClick={(e) => handlePost(e)}>
          POST
        </button>
      </div>

      <div className="create-post-top">
        <label
          htmlFor="create-post-image-input"
          className="create-post-add-image"
        >
          <Icon icon="lucide:plus" className="create-post-add-image-button" />
        </label>
        <input
          id="create-post-image-input"
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          style={{ display: "none" }}
          disabled={selectedOption !== "Images"}
        />
        <textarea
          value={blog}
          name="blog"
          placeholder="Blog..."
          onChange={(e) => setBlog(e.target.value)}
          className="create-post-blog"
          disabled={selectedOption !== "Blog"}
        />
      </div>
      <textarea
        name="blog"
        value={description}
        placeholder="Description..."
        onChange={(e) => setDescription(e.target.value)}
        className="create-post-description"
      />
      <div
        className="create-post-show-domains-div"
        onClick={() => setShowDomains(!showDomains)}
      >
        <h2 className="m0">Domains</h2>
        <Icon icon="lucide:chevron-down" width={iconSize} height={iconSize} />
      </div>
      <div className="create-post-domains">
        {showDomains &&
          domains.map((domain) => (
            <Bubble
              key={domain.id}
              name={domain.name}
              selected={selectedDomains.includes(domain)}
              onClick={() => {
                selectedDomains.includes(domain)
                  ? setSelectedDomains((prev) =>
                      prev.filter((d) => d.id !== domain.id)
                    )
                  : setSelectedDomains((prev) => [...prev, domain]);
              }}
            />
          ))}
      </div>

      <h2 className="m0">Preview</h2>
      <div className="create-post-preview">
        <div className="create-post-preview-left-div">
          <h3 className="create-post-preview-placeholder">
            {description?.length ? description : "Post Description"}
          </h3>
          <div className="create-post-preview-actions">
            <Icon icon="lucide:heart" width={iconSize} height={iconSize} />
            <Icon
              icon="material-symbols:comment-outline"
              width={iconSize}
              height={iconSize}
            />
            <Icon
              icon="material-symbols:share"
              width={iconSize}
              height={iconSize}
            />
          </div>
        </div>
        <div className="create-post-preview-right-div">
          {!selectedFiles.length && !blog.length ? (
            <h1 className="create-post-preview-placeholder">Blog / Image</h1>
          ) : (
            ""
          )}
          {selectedFiles.length ? (
            <div className="create-post-images-preview">
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="Post Image"
                  className="create-post-preview-image"
                />
              ))}
            </div>
          ) : (
            ""
          )}
          {blog.length ? (
            <h6 className="create-post-blog-preview">{blog}</h6>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
