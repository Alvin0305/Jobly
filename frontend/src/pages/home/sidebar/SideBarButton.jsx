import React from "react";
import { useTab } from "../../../contexts/tabContext";
import { Icon } from "@iconify/react";

const SideBarButton = ({ name, iconName }) => {
  const { tab, setTab } = useTab();
  const iconSize = 32;
  return (
    <div
      className={`sidebar-button flex ${tab === name && "selected-sidebar-button"}`}
      onClick={() => setTab(name)}
    >
      <Icon icon={iconName} width={iconSize} height={iconSize} color="white" />
      <h3 className="sidebar-button-name m0">{name}</h3>
    </div>
  );
};

export default SideBarButton;
