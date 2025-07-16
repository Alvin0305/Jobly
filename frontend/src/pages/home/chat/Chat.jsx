import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "./chatlist/ChatList";
import { ChatProvider, useChat } from "../../../contexts/chatContext";
import ChatHeader from "./chatheader/ChatHeader";
import ChatBox from "./chatbox/ChatBox";
import "./chat.css";
import { useUser } from "../../../contexts/userContext";
import { useState } from "react";

const Chat = () => {
  const { chat } = useChat();
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  const [currentTab, setCurrentTab] = useState("chatlist");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  if (isMobile) {
    console.log("phone");
    return (
      <div className="chat-page">
        {currentTab === "chatlist" ? (
          <ChatList setCurrentTab={setCurrentTab} />
        ) : chat ? (
          <div className="chat-page-content">
            <ChatHeader setCurrentTab={setCurrentTab} /> <ChatBox />
          </div>
        ) : (
          <div className="empty-chat">
            <h1 className="m10">SELECT A CHAT TO TALK</h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="chat-page">
      <ChatList />
      {chat ? (
        <div className="chat-page-content">
          <ChatHeader /> <ChatBox />
        </div>
      ) : (
        <div className="empty-chat">
          <h1 className="m10">SELECT A CHAT TO TALK</h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
