import React, { useEffect, useState } from "react";
import { getPostById } from "../../services/postService";
import { Icon } from "@iconify/react";
import "./posttile.css";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import { toast } from "react-toastify";

const PostTile = ({ postData, onClick }) => {
  const { user } = useUser();

  const iconSize = 24;

  const handleLike = (e) => {
    e.stopPropagation();
    socket.emit("like_post", user.id, postData.id);
  };

  const handleUnlike = (e) => {
    e.stopPropagation();
    console.log("unliking");
    socket.emit("unlike_post", user.id, postData.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const postLink = `${window.location.origin}/post/${postData.id}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        toast.success("post link copied to clipboard");
      })
      .catch((err) => {
        toast.error("failed to copy link to clipboard");
      });
  };

  if (!postData)
    return (
      <div className="loading-post-tile">
        <div className="loading-post-tile-image-div">
          <Icon icon="lucide:image" width={100} height={100} />
        </div>
        <div className="loading-post-tile-subdiv"></div>
      </div>
    );

  return (
    <div className="post-tile" onClick={onClick}>
      {postData?.image_urls?.length ? (
        <img src={postData?.image_urls?.[0]} className="post-tile-image" />
      ) : (
        <div className="post-tile-blog-div">
          <h6 className="post-tile-blog">
            {postData?.blog?.substring(0, 250) + "..."}
          </h6>
        </div>
      )}
      <div className="post-tile-actions">
        <Icon
          icon="lucide:heart"
          height={iconSize}
          width={iconSize}
          className={`post-tile-icon ${
            postData?.liked_by_user ? "liked-icon" : ""
          }`}
          onClick={
            !postData?.liked_by_user
              ? (e) => handleLike(e)
              : (e) => handleUnlike(e)
          }
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
          onClick={(e) => handleShare(e)}
        />
      </div>
      <h6 className="post-tile-description">
        {postData?.description?.substring(0, 50) + "..."}
      </h6>
    </div>
  );
};

export default PostTile;
