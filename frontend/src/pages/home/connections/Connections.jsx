import React, { useEffect, useState } from "react";
import UserTile from "../../../components/UserTile/UserTile";
import axios from "axios";
import { useUser } from "../../../contexts/userContext";
import "./connections.css";

const Connections = () => {
  const [active, setActive] = useState("Followers");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const tabs = ["Followers", "Following", "Suggestions"];

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = user.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let res;
        if (active === "Followers") {
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/followers`,
            config
          );
          console.log("followers: ", res.data);
        } else if (active === "Following") {
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/following`,
            config
          );
          console.log("following: ", res.data);
        } else if (active === "Suggestions") {
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/suggestions`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("suggestions: ", res.data);
        }
        const data =
          res.data.followers ||
          res.data.following ||
          res.data.suggestions ||
          [];
        setUsers(data);
      } catch (err) {
        console.error(
          "Error fetching users:",
          err.response?.data || err.message
        );
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [active]);

  return (
    <div className="con">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${active === tab ? "active" : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Loading {active.toLowerCase()}...</p>
      ) : users.length === 0 ? (
        <p className="loading-text">No {active.toLowerCase()} found.</p>
      ) : (
        <div className="tiles">
          {users.map((user) => (
            <UserTile user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
