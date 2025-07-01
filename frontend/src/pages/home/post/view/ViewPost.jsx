import React, { useEffect, useState } from "react";
import { getPostById } from "../../../../services/postService";
import { useUser } from "../../../../contexts/userContext";
import { useParams } from "react-router-dom";
import "./viewpost.css";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await getPostById(id, user?.token);
        console.log(response.data);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPostDetails();
  }, []);
  const iconSize = 32;

  if (!post) return <div>Loading...</div>;

  return (
    <div className="view-post-page">
      <div className="view-post-wrapper">
        {post.image_urls?.length ? (
          <a href={post?.image_urls?.[0]}>
            <img src={post?.image_urls?.[0]} className="view-post-page-image" />
          </a>
        ) : (
          <div className="view-post-page-content">
            <h5 className="m0">{post?.blog}</h5>
          </div>
        )}
        <h4 className="m0">{post.description}</h4>
        <div className="view-post-page-comment-session">
          <h3 className="m0">Comments</h3>
          <div className="view-post-page-comments">
            {!post?.comments?.length && (
              <h5 className="m0 no-comment-label">No comments yet</h5>
            )}
            {post?.comments?.map((comment, index) => (
              <div className="view-post-page-comment" key={index}>
                <img
                  src={comment.image}
                  alt="Avatar"
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <h5 className="comment-sent-by">{comment.firstname}</h5>
                  <h6 className="view-post-comment-text">{comment.content}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
