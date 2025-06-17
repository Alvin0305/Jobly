import React from "react";
import SideBarButton from "./SideBarButton";
import "./sidebar.css";
import { useUser } from "../../../contexts/userContext";

const SideBar = () => {
  const { user } = useUser();

  return (
    <div className="sidebar">
      <div>
        <SideBarButton name="Home" iconName="lucide:home" />
        <SideBarButton name="Friends" iconName="lucide:users" />
        {user.role === "Employee" ? (
          <SideBarButton name="Add Post" iconName="lucide:instagram" />
        ) : (
          <SideBarButton
            name="Add Job"
            iconName="material-symbols:work-outline"
          />
        )}

        <SideBarButton name="Search" iconName="lucide:search" />
        <SideBarButton name="Notifications" iconName="lucide:bell" />
        <SideBarButton name="Chats" iconName="lucide:mail" />
        <SideBarButton name="Profile" iconName="lucide:user" />
        <SideBarButton name="Settings" iconName="lucide:settings" />
      </div>
      <div>
        <SideBarButton name="Log Out" iconName="tabler:logout" />
      </div>
    </div>
  );
};

export default SideBar;
