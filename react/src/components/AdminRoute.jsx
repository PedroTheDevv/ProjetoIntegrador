import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ element: Component }) => {
  const { isAdmin } = useAuth();

  if (isAdmin == 'true') {
    return Component;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
