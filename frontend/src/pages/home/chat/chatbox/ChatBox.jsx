import React, { useEffect, useState } from "react";
import "./chatbox.css";
import { Icon } from "@iconify/react";
import { useChat } from "../../../../contexts/chatContext";
import {
  getMessagesInChat,
  getPinnedMessage,
  uploadChatImages,
} from "../../../../services/chatService";
import { useUser } from "../../../../contexts/userContext";
import Message from "./Message/Message";
import socket from "../../../../socket";

const ChatBox = () => {
  const [newMessageContent, setNewMessageContent] = useState("");
  const iconSize = 32;
  const { chat } = useChat();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    message_id: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [pinnedMessage, setPinnedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const [messageResponse, pinnedResponse] = await Promise.all([
          getMessagesInChat(chat?.id, user?.token),
          getPinnedMessage(chat?.id, user?.token),
        ]);
        console.log(messageResponse.data);
        console.log(pinnedResponse.data);
        setMessages(messageResponse.data);
        setPinnedMessage(pinnedResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [chat]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log("a new message received", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("receive_message", handleReceiveMessage);

    const handleMessageDeletion = (deletedMessage) => {
      if (!deletedMessage || !deletedMessage.id) {
        console.warn("message or id is null", deletedMessage);
        return;
      }
      console.log("message deleted", deletedMessage);
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m.id === deletedMessage.id ? { ...m, is_deleted: true } : m
        )
      );
    };
    socket.on("message_deleted", handleMessageDeletion);

    const handleMessagePin = (pinnedMessage) => {
      if (!pinnedMessage || !pinnedMessage.id) {
        console.warn("message or id is null to pin", pinnedMessage);
        return;
      }
      setPinnedMessage(pinnedMessage);
    };
    socket.on("message_pinned", handleMessagePin);

    const handleMessageUnPin = (unpinnedMessage) => {
      if (!unpinnedMessage || !unpinnedMessage.id) {
        console.warn("message or id is null to unpin", unpinnedMessage);
        return;
      }
      setPinnedMessage(null);
    };
    socket.on("message_unpinned", handleMessageUnPin);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_deleted", handleMessageDeletion);
      socket.off("message_pinned", handleMessagePin);
      socket.off("message_unpinned", handleMessageUnPin);
    };
  }, [chat]);

  const handleSend = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("images", selectedFile);
      try {
        console.log("trying to upload image");
        const response = await uploadChatImages(formData);
        console.log(response.data?.uploaded?.[0]?.file_url);
        console.log("image uploaded successfully");

        const newMessage = {
          sender_id: user.id,
          chat_id: chat.id,
          content: newMessageContent,
          other_user_id: chat.other_user_id,
          reply_to: replyMessage?.id || null,
          file_url: response.data?.uploaded?.[0]?.file_url,
          created_at: new Date(),
        };

        socket.emit("send_message", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      } catch (err) {
        console.error(err);
      }
    } else {
      const newMessage = {
        sender_id: user.id,
        chat_id: chat.id,
        content: newMessageContent,
        other_user_id: chat.other_user_id,
        reply_to: replyMessage?.id || null,
        created_at: new Date(),
      };
      socket.emit("send_message", newMessage);

      setMessages((prev) => [...prev, newMessage]);
      setReplyMessage(null);
      setNewMessageContent("");
    }
  };

  const handleUnPinMessage = () => {
    console.log("unpinning message");
    socket.emit("unpin_message", pinnedMessage.id, chat);
  };

  useEffect(() => {
    const handleClick = () =>
      setContextMenu({ visible: false, x: 0, y: 0, message_id: null });
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  return (
    <div className="chat-box">
      <div className="chat-box-content">
        {pinnedMessage && (
          <div className="pinned-message">
            <h4 className="pinned-message-content">
              {pinnedMessage.content.length > 30
                ? pinnedMessage.content.substring(0, 30) + "..."
                : pinnedMessage.content}
            </h4>
            <Icon
              icon="lucide:pin"
              width={20}
              height={20}
              onClick={handleUnPinMessage}
            />
          </div>
        )}
        {messages.map((message) => (
          <Message
            message={message}
            key={message.id}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            onReply={() => setReplyMessage(message)}
          />
        ))}
      </div>
      {replyMessage && (
        <div className="reply-banner">
          <h4 className="reply-banner-content">
            {replyMessage?.content?.length > 30
              ? replyMessage.content.substring(0, 30) + "..."
              : replyMessage.content}
          </h4>
          <Icon
            icon="lucide:x-circle"
            width={24}
            height={24}
            onClick={() => setReplyMessage(null)}
          />
        </div>
      )}
      <div className="chat-box-message-bar">
        <label htmlFor="chat-file-upload-input" className="pointer">
          <Icon icon="lucide:plus-circle" width={iconSize} height={iconSize} />
        </label>
        <input
          id="chat-file-upload-input"
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <input
          type="text"
          placeholder="Message..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="chat-box-message-input"
        />
        <Icon
          icon="lucide:send"
          width={iconSize}
          height={iconSize}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatBox;
