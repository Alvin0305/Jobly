import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
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
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/chat" element={<Chat />} />
            <Route path="/home/connections" element={<Connections />} />
            <Route path="/home/job/create" element={<CreateJob />} />
            <Route path="/home/job/selected" element={<SelectedCandidates />} />
            <Route path="/home/job/view" element={<ViewJob />} />
            <Route path="/home/notifications" element={<Notifications />} />
            <Route path="/home/post/create" element={<CreatePost />} />
            <Route path="/home/post/view" element={<ViewPost />} />
            <Route path="/home/profile/other" element={<OtherProfile />} />
            <Route path="/home/profile/user/edit" element={<EditProfile />} />
            <Route path="/home/profile/user/view" element={<ViewProfile />} />
            <Route path="/home/search" element={<SearchPage />} />
            <Route path="/home/settings" element={<Settings />} />
          </Routes>
        </Router>
      </TabProvider>
    </UserProvider>
  );
};

export default App;
