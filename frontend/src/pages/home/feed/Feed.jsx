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
    console.log(user);
    const fetchPosts = async () => {
      try {
        const response = await getPostsInFeed(
          user?.id,
          user?.token
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
