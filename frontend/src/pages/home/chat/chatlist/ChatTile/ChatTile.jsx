import React from "react";
import "./chattile.css";
import { useChat } from "../../../../../contexts/chatContext";

const ChatTile = ({ chat }) => {
  const { setChat } = useChat();
  const handleClick = () => {
    setChat(chat);
  };

  return (
    <div className="chat-tile" onClick={handleClick}>
      <div className="flex gap-20 align-center">
        <img
          src={chat?.other_user_image || "/avatar.webp"}
          alt="Avatar"
          className="chat-avatar"
        />
        <div className="chat-tile-name-message-div">
          <h4 className="m0">
            {chat?.other_user_firstname + " " + chat?.other_user_lastname}
          </h4>
          <h5 className="m0">
            {chat?.last_message !== null
              ? chat?.last_message?.substring(0, 14) +
                (chat?.last_message?.length > 14 ? "..." : "")
              : ""}
          </h5>
        </div>
      </div>

      <div className="chat-tile-details-div">
        <h5 className="m0">
          {new Date(chat?.other_user_last_seen).toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h5>
      </div>
    </div>
  );
};

export default ChatTile;
