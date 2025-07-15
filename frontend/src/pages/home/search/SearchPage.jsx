import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./search.css";
import Bubble from "../../../components/Bubble/Bubble";
import { getAllDomains } from "../../../services/metadataService";
import FeedBubble from "../../../components/FeedBubble/FeedBubble";
import {
  getUserFollowers,
  getUserFollowing,
  searchUsers,
} from "../../../services/userService";
import { useUser } from "../../../contexts/userContext";
import UserTile from "../../../components/UserTile/UserTile";
import socket from "../../../socket";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const iconSize = 32;
  const { user } = useUser();
  const pageSize = 10;

  const [selectedUserFilter, setSelectedUserFilter] = useState("All");
  const [domains, setDomains] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const [domainResponse, friendResponse] = await Promise.all([
          getAllDomains(),
          getUserFollowing(user.token),
        ]);
        console.log(domainResponse);
        console.log(friendResponse.data.following);
        setDomains(domainResponse.domains);
        setFriends(friendResponse.data.following);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDomains();
  }, []);

  useEffect(() => {
    const handleRequestSent = ({ receiver }) => {
      console.log("request sent to", receiver);
      setFriends((prev) => [...prev, receiver]);
    };
    socket.on("friend_connection_sent", handleRequestSent);

    const handleRequestUnSent = ({ receiver }) => {
      console.log("request unsent to", receiver);
      setFriends((prev) => prev.filter((p) => p.id !== receiver.id));
    };
    socket.on("friend_disconnection_sent", handleRequestUnSent);

    return () => {
      socket.off("friend_connection_sent", handleRequestSent);
    };
  }, []);

  useEffect(() => {
    const refetchPosts = async () => {
      const isEmployee =
        selectedUserFilter === "All"
          ? null
          : selectedUserFilter === "Employees"
          ? true
          : false;
      try {
        const response = await searchUsers(
          user.token,
          selectedTags,
          isEmployee,
          searchValue.trim() ? searchValue.trim() : null,
          pageSize,
          0
        );
        console.log(response.data.users);
        setUsers(response.data?.users?.filter((u) => u.id !== user.id));
        setPageNumber(1);
      } catch (err) {
        console.error(err);
      }
    };
    refetchPosts();
  }, [selectedUserFilter, selectedTags, searchValue]);

  const handleViewMore = async () => {
    const isEmployee =
      selectedUserFilter === "All"
        ? null
        : selectedUserFilter === "Employees"
        ? true
        : false;
    try {
      const response = await searchUsers(
        user.token,
        selectedTags,
        isEmployee,
        searchValue.trim() ? searchValue.trim() : null,
        pageSize,
        pageSize * pageNumber
      );
      console.log(response.data.users);
      setUsers((prev) => [
        ...prev,
        ...response.data?.users?.filter((u) => u.id !== user.id),
      ]);
      setPageNumber((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search-page gap-10">
      <div className="search-page-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-page-input"
        />
        {searchValue.trim() ? (
          <Icon
            icon="lucide:x-circle"
            width={iconSize}
            height={iconSize}
            color="red"
            className="custom-icon"
            style={{ color: "red" }}
          />
        ) : (
          <Icon
            icon="lucide:search"
            width={iconSize}
            height={iconSize}
            color="red"
            className="custom-icon"
            style={{ color: "red" }}
          />
        )}
      </div>
      <div className="flex gap-10 self-start">
        <FeedBubble
          name="All"
          selected={selectedUserFilter === "All"}
          onClick={() => {
            setSelectedUserFilter("All");
          }}
        />
        <FeedBubble
          name="Employees"
          selected={selectedUserFilter === "Employees"}
          onClick={() => {
            setSelectedUserFilter("Employees");
          }}
        />
        <FeedBubble
          name="Employers"
          selected={selectedUserFilter === "Employers"}
          onClick={() => {
            setSelectedUserFilter("Employers");
          }}
        />
      </div>
      <div
        className="flex width-100 align-center space-between pointer"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h2 className="m0">Filters</h2>
        <Icon icon="lucide:chevron-down" width={32} height={32} />
      </div>
      {showFilters && (
        <div className="flex gap-10 wrap">
          {domains.map((domain) => (
            <FeedBubble
              key={domain.id}
              name={domain.name}
              selected={selectedTags.includes(domain.name)}
              onClick={() => {
                if (!selectedTags.includes(domain.name)) {
                  setSelectedTags((prev) => [...prev, domain.name]);
                } else {
                  setSelectedTags((prev) =>
                    prev.filter((d) => d !== domain.name)
                  );
                }
              }}
            />
          ))}
        </div>
      )}
      <div className="search-page-users">
        {users?.map((user) => (
          <UserTile
            user={user}
            key={user.id}
            isFriend={friends.some((f) => f.id === user.id)}
          />
        ))}
      </div>
      <button onClick={handleViewMore} className="search-view-more-button">
        View More...
      </button>
    </div>
  );
};

export default SearchPage;
