import React from "react";
import { useChat } from "../../../../contexts/chatContext";
import "./chatheader.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChatHeader = () => {
  const { chat, setChat } = useChat();
  const iconSize = 32;
  const handleBack = () => {
    setChat(null);
  };
  return (
    <div className="chat-header">
      <Icon
        icon="lucide:arrow-left"
        onClick={handleBack}
        width={iconSize}
        height={iconSize}
        className="pointer"
      />
      <img
        src={chat.other_user_image || "/avatar.webp"}
        alt="Avatar"
        className="chat-avatar"
      />

      <h3>{chat.other_user_firstname + " " + chat.other_user_lastname}</h3>
    </div>
  );
};

export default ChatHeader;
