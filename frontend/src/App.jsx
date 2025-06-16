import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider, useUser } from "./contexts/userContext";
import { TabProvider } from "./contexts/tabContext";
import AboutYouPage from "./pages/auth/AboutYouPage";
import Chat from "./pages/home/chat/Chat";
import Connections from "./pages/home/connections/Connections";
import CreateJob from "./pages/home/job/create/CreateJob";
import SelectedCandidates from "./pages/home/job/selected_candidates/SelectedCandidates";
import ViewJob from "./pages/home/job/view/ViewJob";
import Notifications from "./pages/home/notifications/Notifications";
import CreatePost from "./pages/home/post/create/CreatePost";
import ViewPost from "./pages/home/post/view/ViewPost";
import OtherProfile from "./pages/home/profile/other/OtherProfile";
import EditProfile from "./pages/home/profile/user/edit/EditProfile";
import ViewProfile from "./pages/home/profile/user/view/ViewProfile";
import SearchPage from "./pages/home/search/SearchPage";
import Settings from "./pages/home/settings/Settings";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/others/NotFound/NotFound";
import Feed from "./pages/home/feed/Feed";
import { ChatProvider } from "./contexts/chatContext";
import { ChatListProvider } from "./contexts/chatlistContext";
import socket from "./socket";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <UserProvider>
      <TabProvider>
        <AppRoutes />
      </TabProvider>
    </UserProvider>
  );
};

export default App;
