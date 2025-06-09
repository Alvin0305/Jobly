import React from "react";
import SideBar from "./sidebar/SideBar";
import { useTab } from "../../contexts/tabContext";
import { useEffect } from "react";
import Feed from "./feed/Feed";
import Connections from "./connections/Connections";
import CreatePost from "./post/create/CreatePost";
import SearchPage from "./search/SearchPage";
import Notifications from "./notifications/Notifications";
import Chat from "./chat/Chat";
import ViewProfile from "./profile/user/view/ViewProfile";
import "./home.css";
import CreateJob from "./job/create/CreateJob";

const HomePage = () => {
  const { tab, setTab } = useTab();

  useEffect(() => {
    setTab("Home");
  }, []);

  return (
    <div className="homepage">
      <SideBar />
      <div className="homepage-content">
        {tab === "Home" && <Feed />}
        {tab === "Friends" && <Connections />}
        {tab === "Add Post" && <CreatePost />}
        {tab === "Search" && <SearchPage />}
        {tab === "Notifications" && <Notifications />}
        {tab === "Chats" && <Chat />}
        {tab === "Profile" && <ViewProfile />}
        {tab === "Add Job" && <CreateJob />}
      </div>
    </div>
  );
};

export default HomePage;
