import React, { useEffect, useRef, useState } from "react";
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
  const [editingMessage, setEditingMessage] = useState(null);

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
    console.log("user joining chat", chat);
    socket.emit("user_opened_chat", user.id, chat);
  }, [chat]);

  useEffect(() => {
    endOfChatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log("a new message received", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      if (chat.id === newMessage.chat_id) {
        console.log("user already in chat, reading the messages");
        socket.emit("read_messages", user.id, chat);
      }
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

    const handleMessageUpdate = (updatedMessage) => {
      if (!updatedMessage || !updatedMessage.id) {
        console.warn("message or id is null to update", updatedMessage);
        return;
      }
      console.log("Updating message", updatedMessage);
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m.id === updatedMessage.id
            ? { ...m, content: updatedMessage.content, is_edited: true }
            : m
        )
      );
    };
    socket.on("message_updated", handleMessageUpdate);

    const handleReadMessages = ({ chat_id, reader_id, messages_id }) => {
      if (!messages_id || !messages_id.length || messages_id.length < 1) {
        console.log("no messages to read");
        return;
      }
      console.log("new message read are: ");
      console.log(messages_id);
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          messages_id.includes(m.id)
            ? { ...m, seen: true, seen_at: new Date() }
            : m
        )
      );
    };
    socket.on("messages_read", handleReadMessages);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_deleted", handleMessageDeletion);
      socket.off("message_pinned", handleMessagePin);
      socket.off("message_unpinned", handleMessageUnPin);
      socket.off("message_updated", handleMessageUpdate);
      socket.off("messages_read", handleReadMessages);
    };
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedFile && !newMessageContent.trim()) {
      console.log("empty");
      return;
    }
    if (editingMessage) {
      socket.emit(
        "update_message",
        {
          ...editingMessage,
          content: newMessageContent,
        },
        chat
      );
      setEditingMessage(null);
      setNewMessageContent("");
      return;
    }

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

        socket.emit("send_message", newMessage, chat);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
        setNewMessageContent("");
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
      socket.emit("send_message", newMessage, chat);

      setReplyMessage(null);
      setNewMessageContent("");
    }
  };

  const handleUnPinMessage = () => {
    console.log("unpinning message");
    socket.emit("unpin_message", pinnedMessage.id, chat);
  };

  const scrollToBottom = () => {
    endOfChatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClick = () =>
      setContextMenu({ visible: false, x: 0, y: 0, message_id: null });
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  const fileInputRef = useRef(null);
  const endOfChatRef = useRef(null);
  const [mouseEnteredAttach, setMouseEnteredAttach] = useState(false);
  const [mouseEnteredSend, setMouseEnteredSend] = useState(false);

  return (
    <div className="chat-box">
      {pinnedMessage && (
        <div className="pinned-message">
          <h4 className="pinned-message-content">
            {pinnedMessage.content.length > 30
              ? pinnedMessage.content.substring(0, 30) + "..."
              : pinnedMessage.content}
          </h4>
          <Icon
            icon="lucide:pin-off"
            width={20}
            height={20}
            onClick={handleUnPinMessage}
          />
        </div>
      )}
      <div
        className={`chat-box-content ${
          pinnedMessage ? "with-pinned-message" : ""
        }`}
      >
        {messages.map((message, index) => (
          <Message
            message={message}
            key={message.id || `msg-${index}`}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            onReply={() => setReplyMessage(message)}
            setEditingMessage={setEditingMessage}
          />
        ))}
        <div ref={endOfChatRef} />
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
      {editingMessage && (
        <div className="edit-banner">
          <h4 className="edit-banner-content">
            {editingMessage?.content?.length > 30
              ? editingMessage.content.substring(0, 30) + "..."
              : editingMessage.content}
          </h4>
          <Icon
            icon="lucide:x-circle"
            width={24}
            height={24}
            onClick={() => setEditingMessage(null)}
          />
        </div>
      )}
      {selectedFile && (
        <div className="file-banner">
          {selectedFile.type.startsWith("image") && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="image"
              className="chat-image-preview"
            />
          )}
          {selectedFile.type.startsWith("video") && (
            <video
              src={URL.createObjectURL(selectedFile)}
              alt="image"
              className="chat-video-preview"
              height={50}
            />
          )}
          {!selectedFile.type.startsWith("image") &&
            !selectedFile.type.startsWith("video") && (
              <h4 className="m0">Document</h4>
            )}
          <Icon
            icon="lucide:x-circle"
            width={24}
            height={24}
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = null;
            }}
          />
        </div>
      )}
      <button className="chat-floating-button" onClick={scrollToBottom}>
        <Icon
          icon="lucide:chevron-down"
          width={24}
          height={24}
          className="chat-floating-icon"
        />
      </button>
      <form className="chat-box-message-bar">
        <label htmlFor="chat-file-upload-input" className="pointer flex center">
          <Icon
            icon="lucide:plus-circle"
            width={iconSize}
            height={iconSize}
            onMouseEnter={() => setMouseEnteredAttach(true)}
            onMouseLeave={() => setMouseEnteredAttach(false)}
            className={`${
              mouseEnteredAttach ? "chat-attach-icon-highlighted" : ""
            }`}
          />
        </label>
        <input
          ref={fileInputRef}
          id="chat-file-upload-input"
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />

        <input
          type="text"
          placeholder="Message..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="chat-box-message-input"
        />
        <button
          onClick={(e) => handleSend(e)}
          onMouseEnter={() => setMouseEnteredSend(true)}
          onMouseLeave={() => setMouseEnteredSend(false)}
          className={`chat-sent-button ${
            mouseEnteredSend ? "chat-send-icon-highlighted" : ""
          }`}
        >
          <Icon icon="lucide:send" width={iconSize} height={iconSize} />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
