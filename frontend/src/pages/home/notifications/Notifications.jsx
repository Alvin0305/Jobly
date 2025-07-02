import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserNotifications } from "../../../services/notificationService";
import { useUser } from "../../../contexts/userContext";
import socket from "../../../socket";
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
  const handleAccept = (senderId) => {
    socket.emit("accept_friend_request", {
      sender_id: senderId,
      receiver_id: user.id,
    });
  };

  const handleReject = (senderId) => {
    socket.emit("reject_friend_request", {
      sender_id: senderId,
      receiver_id: user.id,
    });
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

          {n.type === "Friends-Request" && (
            <div className="notification-actions">
              <button className="accept-btn" onClick={() => handleAccept(n.sender_id)}>Accept</button>
              <button className="reject-btn" onClick={() => handleReject(n.sender_id)}>Reject</button>
            </div>
          )}

          {["like", "comment"].includes(n.type) && (
            <img
              className="post-img"
              src={`https://your-cdn.com/posts/${n.post_id}.jpg`}
              alt="Post"
            />
            )}
          </div>
      
      ))}
    </div>
  );
};

export default Notifications;
