import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './dashboard.css';
import { useUser } from "../../../contexts/userContext.jsx";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || !user.role) return <div>Loading user...</div>;

  const isRequestsTab = location.pathname.includes('/home/notifications/requests');
  const isNotificationsTab = location.pathname.includes('/home/notifications/alerts');

  return (
    <div className="main-panel">
      <div className="tab-buttons">
        {/* Always show these tabs, label remains same */}
        <button
          className={isRequestsTab ? 'active-tab' : ''}
          onClick={() => navigate('requests')}
        >
          Requests
        </button>
        <button
          className={isNotificationsTab ? 'active-tab' : ''}
          onClick={() => navigate('alerts')}
        >
          Notifications
        </button>
      </div>

      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
