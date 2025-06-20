import React from "react";
import {
  getPostById,
  getPostsInFeed,
  searchPost,
} from "../../../services/postService";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/userContext";
import PostTile from "../../../components/PostTile/PostTile";
import "./feed.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllDomains } from "../../../services/metadataService";
import socket from "../../../socket";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [newCommentValue, setNewCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [domainPageNumber, setDomainPageNumber] = useState(1);

  useEffect(() => {
    console.log(user);
    const fetchInitials = async () => {
      try {
        const [feedResponse, domainResponse] = await Promise.all([
          getPostsInFeed(user?.id, user?.token, 10, pageNumber),
          getAllDomains(),
        ]);
        console.log(feedResponse.data);
        console.log(domainResponse);
        setPosts(feedResponse.data || []);
        setDomains(domainResponse.domains);
        setPageNumber(1);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitials();
  }, []);

  useEffect(() => {
    if (!selectedDomain) return;
    console.log(selectedDomain);
    const fetchPosts = async () => {
      try {
        let response;
        if (selectedDomain === "any") {
          setPageNumber(1);
          response = await getPostsInFeed(user.id, user.token, 10, 1);
        } else {
          setDomainPageNumber(1);
          response = await searchPost(selectedDomain, user.token, 10, 1);
        }
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [selectedDomain]);

  useEffect(() => {
    if (!selectedPost) return;
    const fetchPostData = async () => {
      try {
        console.log(selectedPost.id);
        const response = await getPostById(selectedPost.id, user.token);
        setSelectedPostData(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPostData();
  }, [selectedPost]);

  const sendComment = (e) => {
    e.preventDefault();
    if (!newCommentValue.trim()) return;

    socket.emit("comment_post", user.id, selectedPost.id, newCommentValue);
    setNewCommentValue("");
  };

  useEffect(() => {
    const handleNewComment = ({ comment }) => {
      console.log(comment);
      console.log("new comment came");
      setSelectedPostData((prev) => ({
        ...prev,
        comments: [comment, ...prev.comments],
      }));
    };

    const handleLikeSaved = (post_id, user_id) => {
      console.log("received like saved signal");
      console.log(post_id, user_id);
      setPosts((prev) =>
        prev.map((p) => (p.id === post_id ? { ...p, liked_by_user: true } : p))
      );
    };

    const handleUnLikeSaved = (post_id, user_id) => {
      console.log("received unlike saved signal");
      console.log(post_id, user_id);
      setPosts((prev) =>
        prev.map((p) => (p.id === post_id ? { ...p, liked_by_user: false } : p))
      );
    };

    socket.on("post_commented_common", handleNewComment);
    socket.on("like_saved", handleLikeSaved);
    socket.on("unlike_saved", handleUnLikeSaved);

    return () => {
      socket.off("post_commented_common", handleNewComment);
      socket.off("like_saved", handleLikeSaved);
      socket.off("unlike_saved", handleUnLikeSaved);
    };
  }, []);

  const handlePaging = async () => {
    try {
      if (!selectedDomain || selectedDomain === "any") {
        const response = await getPostsInFeed(
          user.id,
          user.token,
          10,
          10 * pageNumber
        );
        console.log(response.data);
        setPosts((prev) => [...prev, ...response.data]);
        setPageNumber((prev) => prev + 1);
      } else {
        console.log(selectedDomain);
        const response = await searchPost(
          selectedDomain,
          user.token,
          10,
          10 * domainPageNumber
        );
        setPosts((prev) => [...prev, ...response.data]);
        setDomainPageNumber((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const iconSize = 32;

  return (
    <div className="feed-page">
      <div className="feed-filter-div">
        <select
          name="domain"
          id="domain"
          value={selectedDomain ?? "any"}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="feed-drop-down"
        >
          <option value="any" className="feed-drop-down-option">
            Any
          </option>
          {domains.map((domain) => (
            <option
              key={domain.id}
              value={domain.name}
              className="feed-drop-down-option"
            >
              {domain.name}
            </option>
          ))}
        </select>
      </div>
      <div className="feed">
        {!posts.length && <h4 className="m0">No Posts to show</h4>}
        {posts.map((post, index) => (
          <PostTile
            postData={post}
            key={index}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>
      <button onClick={handlePaging} className="feed-see-more-button">
        See more...
      </button>
      {selectedPostData && (
        <div className="view-post">
          <button
            onClick={() => {
              setSelectedPost(null);
              setSelectedPostData(null);
            }}
            className="close-view-post-button"
          >
            <Icon
              icon="lucide:x"
              width={iconSize}
              height={iconSize}
              className="close-view-post-icon"
            />
          </button>

          {selectedPostData.image_urls?.length ? (
            <a href={selectedPostData?.image_urls?.[0]}>
              <img
                src={selectedPostData?.image_urls?.[0]}
                className="view-post-image"
              />
            </a>
          ) : (
            <div className="view-post-content">
              <h5 className="m0">{selectedPostData?.blog}</h5>
            </div>
          )}
          <h4 className="m0">{selectedPostData.description}</h4>
          <div className="view-post-comment-session">
            <h4 className="m0">Comments</h4>
            <form className="view-post-comment-input-div">
              <input
                type="text"
                value={newCommentValue}
                onChange={(e) => setNewCommentValue(e.target.value)}
                className="view-post-comment-input"
              />
              <button
                className="comment-send-button"
                onClick={(e) => sendComment(e)}
              >
                <Icon icon="lucide:send" width={iconSize} height={iconSize} />
              </button>
            </form>
            <div className="view-post-comments">
              {selectedPostData?.comments?.map((comment, index) => (
                <div className="view-post-comment" key={index}>
                  <img
                    src={comment.image}
                    alt="Avatar"
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <h5 className="comment-sent-by">{comment.firstname}</h5>
                    <h6 className="view-post-comment-text">
                      {comment.content}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
