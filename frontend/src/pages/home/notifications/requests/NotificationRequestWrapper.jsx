import React from 'react';
import { useUser } from '../../../../contexts/userContext.jsx';
import EmployeeRequests from './employee/EmployeeRequests.jsx';
import EmployerRequests from './employer/EmployerRequests.jsx';

const NotificationRequestsWrapper = () => {
  const { user } = useUser();

  if (!user || !user.role) return <div>Loading...</div>;

  return user.role === 'Employee' ? <EmployeeRequests /> : <EmployerRequests />;
};

export default NotificationRequestsWrapper;
