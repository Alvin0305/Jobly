import React from "react";
import SideBarButton from "./SideBarButton";
import "./sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
        <SideBarButton name="Home" iconName="lucide:home" />
        <SideBarButton name="Friends" iconName="lucide:users" />
        <SideBarButton name="Add Post" iconName="lucide:instagram" />
        <SideBarButton name="Search" iconName="lucide:search" />
        <SideBarButton name="Notifications" iconName="lucide:bell" />
        <SideBarButton name="Chats" iconName="lucide:mail" />
        <SideBarButton name="Profile" iconName="lucide:user" />
      </div>
      <div>
        <SideBarButton name="Log Out" iconName="tabler:logout" />
      </div>
    </div>
  );
};

export default SideBar;
