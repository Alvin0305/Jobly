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
import ViewPost from "./post/view/ViewPost";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { tab, setTab } = useTab();

  useEffect(() => {
    setTab("Home");
  }, []);

  return (
    <div className="homepage">
      <SideBar />
      <div className="homepage-content">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
