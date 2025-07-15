import React, { useEffect, useState } from "react";
import "./chatlist.css";
import { Icon } from "@iconify/react";
import { searchUsers } from "../../../../services/userService";
import { useUser } from "../../../../contexts/userContext";
import SearchTile from "./SearchTile/SearchTile";
import {
  getPublicAccounts,
  getUserChats,
} from "../../../../services/chatService";
import { useChatList } from "../../../../contexts/chatlistContext";
import ChatTile from "./ChatTile/ChatTile";
import { useChat } from "../../../../contexts/chatContext";

const ChatList = () => {
  const iconSize = 24;
  const { user } = useUser();
  const { chatlist, setChatList } = useChatList();
  const [searchValue, setSearchValue] = useState("");
  const [publicUsers, setPublicUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const { chat } = useChat();

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        console.log("user", user);
        const [knownChatResponse, publicUsersResponse] = await Promise.all([
          getUserChats(user?.token),
          getPublicAccounts(user.id),
        ]);
        console.log(knownChatResponse.data);
        console.log(publicUsersResponse.data);
        setPublicUsers(publicUsersResponse.data);
        const formattedChats = knownChatResponse.data.map((chat) => {
          const isUser1 = chat.user1_id === user.id;
          console.log(isUser1);
          return {
            ...chat,
            other_user_id: isUser1 ? chat.user2_id : chat.user1_id,
            other_user_firstname: isUser1
              ? chat.user2_firstname
              : chat.user1_firstname,
            other_user_lastname: isUser1
              ? chat.user2_lastname
              : chat.user1_lastname,
            other_user_image: isUser1 ? chat.user2_image : chat.user1_image,
            other_user_last_seen: chat.user2_last_seen,
            other_user_unread: isUser1 ? chat.user2_unread : chat.user1_unread,
            last_message: chat.last_message,
          };
        });
        console.log(formattedChats);
        setChatList(formattedChats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitials();
  }, []);

  const [newChatAdded, setNewChatAdded] = useState(false);

  useEffect(() => {
    console.log("refetching users");
    const fetchInitials = async () => {
      try {
        console.log("user", user);
        const [knownChatResponse] = await Promise.all([
          getUserChats(user?.token),
        ]);
        console.log(knownChatResponse.data);
        const formattedChats = knownChatResponse.data.map((chat) => {
          const isUser1 = chat.user1_id === user.id;
          console.log(isUser1);
          return {
            ...chat,
            other_user_id: isUser1 ? chat.user2_id : chat.user1_id,
            other_user_firstname: isUser1
              ? chat.user2_firstname
              : chat.user1_firstname,
            other_user_lastname: isUser1
              ? chat.user2_lastname
              : chat.user1_lastname,
            other_user_image: isUser1 ? chat.user2_image : chat.user1_image,
            other_user_last_seen: chat.user2_last_seen,
            other_user_unread: isUser1 ? chat.user2_unread : chat.user1_unread,
            last_message: chat.last_message,
          };
        });
        console.log(formattedChats);
        setChatList(formattedChats);
      } catch (err) {
        console.error(err);
      }
      setNewChatAdded(false);
    };
    fetchInitials();
  }, [newChatAdded]);

  useEffect(() => {
    if (!searchValue.trim()) return;
    const fetchUsers = async () => {
      try {
        const response = await searchUsers(
          user.token,
          [],
          null,
          searchValue.trim()
        );
        const output = response.data.users.filter((u) => u.id !== user.id);
        setSearchResult(output);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [searchValue]);

  useEffect(() => {
    console.log(chatlist);
  }, [chatlist]);

  if (!chatlist) return <div>Loading...</div>;

  return (
    <div className="chat-list">
      <div className="chat-list-search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="chat-search-input"
        />
        {searchValue.trim() ? (
          <Icon
            icon="lucide:x-circle"
            width={iconSize}
            height={iconSize}
            className="chat-search-icon"
          />
        ) : (
          <Icon
            icon="lucide:search"
            width={iconSize}
            height={iconSize}
            className="chat-search-icon"
          />
        )}
      </div>
      {searchValue.trim() ? (
        <div className="chat-search-result">
          {searchResult.length
            ? searchResult.map((u) => (
                <SearchTile
                  key={u.id}
                  user={u}
                  known={chatlist.some(
                    (c) =>
                      (c.user1_id === user.id && c.user2_id === u.id) ||
                      (c.user1_id === u.id && c.user2_id === user.id)
                  )}
                  setSearchValue={setSearchValue}
                  setNewChatAdded={setNewChatAdded}
                />
              ))
            : "No users"}
        </div>
      ) : (
        <div className="chat-list-content width-100">
          <div className="chat-list-known width-100">
            {(chatlist || []).map((chat, index) => (
              <ChatTile chat={chat} key={index} />
            ))}
            {chatlist.length === 0 && (
              <p className="chat-list-log">No users in Chatlist</p>
            )}
          </div>
          <h4 className="m0 chat-list-subheading">Public</h4>
          <div className="chat-list-public">
            {publicUsers.map((u) => (
              <SearchTile
                key={u.id}
                user={u}
                known={chatlist.some(
                  (c) =>
                    (c.user1_id === user.id && c.user2_id === u.id) ||
                    (c.user1_id === u.id && c.user2_id === user.id)
                )}
                setSearchValue={setSearchResult}
                setNewChatAdded={setNewChatAdded}
              />
            ))}
            {publicUsers.length === 0 && (
              <p className="chat-list-log">No public Users</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
