import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserNotifications } from "../../../services/notificationService";
import { useUser } from "../../../contexts/userContext";
import './notifications.css'
const Notifications = ({ }) => {
  const [notifications, setNotifications] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUserNotifications(user.token);
        setNotifications(res.notifications);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    if (user?.token) 
    fetchNotifications();
  }, [user]);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    if(isNaN(then.getTime())) return "Invalid date";
    const diff = Math.floor((now - then) / 1000); // seconds
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}

      {notifications.map((n) => (
        <div key={n.id} className="notification-card">
          <img
            className="profile-img"
            src={n.sender_image || "/boy.png"}
            alt="Sender"
          />
          <div className="notification-content">
            <p>
              <strong>{n.sender_firstname} {n.sender_lastname}</strong> {n.content}
              <span className="time"> • Check for more updates</span>
            </p>
            {n.type === "comment" && (
              <p className="comment-text">"{n.content}"</p>
            )}
          </div>
          <div className="notification-actions">
            {["like", "comment"].includes(n.type) && (
              <img
                className="post-img"
                src={`https://your-cdn.com/posts/${n.post_id}.jpg`}
                alt="Post"
              />
              
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
