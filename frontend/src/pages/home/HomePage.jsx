import React, { useState, useEffect, useRef } from "react";
import SideBar from "./sidebar/SideBar";
import { useTab } from "../../contexts/tabContext";
import { Outlet, useLocation } from "react-router-dom";
import "./home.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const HomePage = () => {
  const { setTab } = useTab();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setTab("Home");
  }, []);

  // Close sidebar on route change (on mobile)
  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        e.target.closest(".sidebar-toggle") == null
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="homepage">
      <button
        className="sidebar-toggle"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <Icon icon="lucide:menu" width={32} height={32} color="white" />
      </button>

      <div
        className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}
        ref={sidebarRef}
      >
        <SideBar />
      </div>

      <div className="homepage-content">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
