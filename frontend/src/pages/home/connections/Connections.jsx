import React, { useEffect, useState } from "react";
import UserTile from "../../../components/UserTile/UserTile";
import axios from "axios";
// import AuthContext from

const Connections = () => {
  const [active, setActive] = useState("Followers");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Followers", "Following", "Suggestions"];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let res;
        if (active === "Followers")
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/followers`
          );
        else if (active === "Following")
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/following`
          );
        // else if (active === "Suggestions")
        //   res = await axios.get(
        //     `${import.meta.env.VITE_API_URL}/api/user/following`
        //   ); // change this by adding suggestons fn

        const data = res.data.followers || res.data.following || [];
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [active]);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-4">
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              active === tab
                ? "bg-[#2e2e2e] text-white"
                : "bg-[#3a3a3a] text-gray-400"
            }`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading {active.toLowerCase()}...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No {active.toLowerCase()} found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserTile key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
