import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "./chatlist/ChatList";
import { ChatProvider, useChat } from "../../../contexts/chatContext";
import ChatHeader from "./chatheader/ChatHeader";
import ChatBox from "./chatbox/ChatBox";
import "./chat.css";
import { useUser } from "../../../contexts/userContext";

const Chat = () => {
  const { chat } = useChat();
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="chat-page">
      <ChatList />
      {chat ? (
        <div className="chat-page-content">
          <ChatHeader /> <ChatBox />
        </div>
      ) : (
        <div className="empty-chat">
          <h1>SELECT A CHAT TO TALK</h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
