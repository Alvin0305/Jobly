import React from "react";
import { useTab } from "../../../contexts/tabContext";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/userContext";

const SideBarButton = ({ name, iconName }) => {
  const { tab, setTab } = useTab();
  const { setUser } = useUser();
  const iconSize = 32;
  const navigate = useNavigate();

  const handleClick = () => {
    if (name === "Log Out") {
      console.info("here");
      setUser(null);
      navigate("/");
      return;
    }

    const pathMap = {
      Home: "/home",
      Friends: "/home/connections",
      "Add Post": "/home/post/create",
      "Add Job": "/home/job/create",
      Search: "/home/search",
      Notifications: "/home/notifications",
      Chats: "/home/chat",
      Profile: "/home/profile/user/view",
    };

    navigate(pathMap[name] || "/home");
  };

  return (
    <div
      className={`sidebar-button flex ${
        tab === name && "selected-sidebar-button"
      }`}
      onClick={handleClick}
    >
      <Icon icon={iconName} width={iconSize} height={iconSize} color="white" />
      <h3 className="sidebar-button-name m0">{name}</h3>
    </div>
  );
};

export default SideBarButton;
