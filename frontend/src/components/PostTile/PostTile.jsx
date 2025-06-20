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

  if (!post)
    return (
      <div className="loading-post-tile">
        <div className="loading-post-tile-image-div">
          <Icon icon="lucide:image" width={100} height={100} />
        </div>
        <div className="loading-post-tile-subdiv"></div>
      </div>
    );

  return (
    <div className="post-tile" onClick={handleViewPost}>
      {post?.image_urls?.length ? (
        <img src={post.image_urls?.[0]} className="post-tile-image" />
      ) : (
        <div className="post-tile-blog-div">
          <h6 className="post-tile-blog">
            {post?.blog.substring(0, 300) + "..."}
          </h6>
        </div>
      )}
      <div className="post-tile-actions">
        <Icon
          icon="lucide:heart"
          height={iconSize}
          width={iconSize}
          className="post-tile-icon"
        />
        <Icon
          icon="material-symbols:comment-outline"
          height={iconSize}
          width={iconSize}
          className="post-tile-icon"
        />
        <Icon
          icon="material-symbols:share"
          height={iconSize}
          width={iconSize}
          className="post-tile-icon"
        />
      </div>
      <h6 className="post-tile-description">
        {post?.description?.substring(0, 50) + "..."}
      </h6>
    </div>
  );
};

export default PostTile;
