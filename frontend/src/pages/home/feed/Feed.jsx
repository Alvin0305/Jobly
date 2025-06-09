import React from "react";
import { getPostsInFeed } from "../../../services/postService";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/userContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsInFeed(
          user?.id || 8,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ5MzA3ODYzLCJleHAiOjE3NDk5MTI2NjN9.4UYn2QK2ojcNaG678lKFrU2Y9dwEwVOly3bnPvO4IEY"
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
    <div>
      feed
      {posts.map((post) => (
        <h1>{post.description}</h1>
      ))}
    </div>
  );
};

export default Feed;
