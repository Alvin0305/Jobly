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
import { UserProvider } from "./contexts/userContext";
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

const App = () => {
  useEffect(() => {
    socket.connect();
    console.log("connecting to socket");
  });
  return (
    <UserProvider>
      <TabProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutYouPage />} />
            <Route path="/home" element={<HomePage />}>
              <Route index element={<Navigate to="feed" />} />
              <Route path="feed" element={<Feed />} />
              <Route path="connections" element={<Connections />} />
              <Route path="job/create" element={<CreateJob />} />
              <Route path="job/selected" element={<SelectedCandidates />} />
              <Route path="job/view" element={<ViewJob />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="post/create" element={<CreatePost />} />
              <Route path="post/view" element={<ViewPost />} />
              <Route path="profile/other" element={<OtherProfile />} />
              <Route path="profile/user/edit" element={<EditProfile />} />
              <Route path="profile/user/view" element={<ViewProfile />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route
              path="/chat"
              element={
                <ChatProvider>
                  <ChatListProvider>
                    <Chat />
                  </ChatListProvider>
                </ChatProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TabProvider>
    </UserProvider>
  );
};

export default App;
