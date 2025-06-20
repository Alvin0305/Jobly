import React from "react";
import { getPostsInFeed } from "../../../services/postService";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/userContext";
import PostTile from "../../../components/PostTile/PostTile";
import "./feed.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllDomains } from "../../../services/metadataService";
import Bubble from "../../../components/Bubble/Bubble";
import FeedBubble from "../../../components/FeedBubble/FeedBubble";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [domains, setDomains] = useState([]);
  const [showDomains, setShowDomains] = useState(true);
  const [selectedDomains, setSelectedDomains] = useState([]);

  useEffect(() => {
    console.log(user);
    const fetchInitials = async () => {
      try {
        const [feedResponse, domainResponse] = await Promise.all([
          getPostsInFeed(user?.id, user?.token),
          getAllDomains(),
        ]);
        console.log(feedResponse.data);
        console.log(domainResponse);
        setPosts(feedResponse.data || []);
        setDomains(domainResponse.domains);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitials();
  }, []);

  const iconSize = 32;

  return (
    <div className="feed-page">
      <div className="feed-filter-div">
        <div className="feed-search-bar">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="feed-search-input"
          />
          <Icon
            icon="lucide:search"
            width={iconSize}
            height={iconSize}
            className="feed-search-icon"
          />
        </div>
        {showDomains && (
          <div className="feed-domains">
            {domains.map((domain) => (
              <FeedBubble
                key={domain.id}
                name={domain.name}
                selected={selectedDomains.some((d) => d.id === domain.id)}
                onClick={() =>
                  setSelectedDomains((prev) =>
                    selectedDomains.some((d) => d.id === domain.id)
                      ? prev.filter((d) => d.id !== domain.id)
                      : [...prev, domain]
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
      <div className="feed">
        {posts.map((post, index) => (
          <PostTile postData={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
