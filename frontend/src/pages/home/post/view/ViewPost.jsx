import React, { useEffect, useState } from "react";
import { getPostById } from "../../../../services/postService";
import { useUser } from "../../../../contexts/userContext";
import { useLocation } from "react-router-dom";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { user } = useUser();
  const location = useLocation();
  const id = location.state.id;

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

  if (!post) return <div>Loading...</div>;
  return <div>{post?.description}</div>;
};

export default ViewPost;
