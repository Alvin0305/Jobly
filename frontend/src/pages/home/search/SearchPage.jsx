import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./search.css";
import Bubble from "../../../components/Bubble/Bubble";
import { getAllDomains } from "../../../services/metadataService";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const iconSize = 32;

  const [selectedUserFilter, setSelectedUserFilter] = useState("All");
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getAllDomains();
        console.log(response);
        setDomains(response.domains);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDomains();
  }, []);

  useEffect(() => {
    const refetchPosts = async () => {
      try {
      } catch (err) {
        console.error(err);
      }
    };
    refetchPosts();
  }, [selectedDomains]);

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
        <Bubble
          name="All"
          selected={selectedUserFilter === "All"}
          onClick={() => {
            setSelectedUserFilter("All");
          }}
        />
        <Bubble
          name="Posts"
          selected={selectedUserFilter === "Posts"}
          onClick={() => {
            setSelectedUserFilter("Posts");
          }}
        />
        <Bubble
          name="Employees"
          selected={selectedUserFilter === "Employees"}
          onClick={() => {
            setSelectedUserFilter("Employees");
          }}
        />
        <Bubble
          name="Employers"
          selected={selectedUserFilter === "Employers"}
          onClick={() => {
            setSelectedUserFilter("Employers");
          }}
        />
      </div>
      <div className="flex gap-10 wrap">
        {domains.map((domain) => (
          <Bubble
            key={domain.id}
            name={domain.name}
            selected={selectedDomains.includes(domain)}
            onClick={() => {
              if (!selectedDomains.includes(domain)) {
                setSelectedDomains((prev) => [...prev, domain]);
              } else {
                setSelectedDomains((prev) =>
                  prev.filter((d) => d.id !== domain.id)
                );
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
