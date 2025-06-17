import React, { useEffect, useState } from "react";
import { getPostById } from "../../services/postService";
import { useTab } from "../../contexts/tabContext";
import { Icon } from "@iconify/react";
import "./posttile.css";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const PostTile = ({ postData }) => {
  const [post, setPost] = useState(null);
  const { user } = useUser();
  const { setTab } = useTab();
  const token = user?.token;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postData.id, token);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postData]);

  const iconSize = 24;

  const handleLike = () => {};
  const handleComment = () => {};
  const handleShare = () => {};

  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate("/home/post/view", { state: { id: postData.id } });
  };

  const shiftContentToRight = Math.random() < 0.5;

  if (!post) return <div></div>;

  return (
    <div className="post-tile" onClick={handleViewPost}>
      <div
        className={`post-left-div ${
          shiftContentToRight && "post-left-div-moved-right"
        }`}
      >
        <h2 className="post-description">{post.description}</h2>
        <div className="post-options">
          <button className="post-action-button" onClick={handleLike}>
            <Icon icon="lucide:heart" width={iconSize} height={iconSize} />
          </button>
          <button className="post-action-button" onClick={handleComment}>
            <Icon
              icon="material-symbols:comment-outline"
              width={iconSize}
              height={iconSize}
            />
          </button>
          <button className="post-action-button" onClick={handleShare}>
            <Icon
              icon="material-symbols:share"
              width={iconSize}
              height={iconSize}
            />
          </button>
        </div>
      </div>
      <div className="post-right-div">
        {post.image_urls.length ? (
          <div className="post-images">
            {post.image_urls.map((image, index) => (
              <img
                src={image}
                alt="Post Image"
                key={index}
                className="post-image"
              />
            ))}
          </div>
        ) : (
          <h4 className="post-blog">{post.blog}</h4>
        )}
      </div>
    </div>
  );
};

export default PostTile;
