import React from "react";
import { getPostsInFeed } from "../../../services/postService";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/userContext";
import PostTile from "../../../components/PostTile/PostTile";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsInFeed(
          3,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQ5NDQ1OTAzLCJleHAiOjE3NTAwNTA3MDN9.HYgCOnxsLXsOkoQQls4Lgx5VnLADchIkxd56KrkCNr8"
        );
        console.log(response.data);
        setPosts(response.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.map((post, index) => (
        <PostTile postData={post} key={index} />
      ))}
    </div>
  );
};

export default Feed;
