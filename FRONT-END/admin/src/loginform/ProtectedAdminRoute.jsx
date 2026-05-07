import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;
  
  // Check if user is logged in AND has ADMIN role
  if (!token || role !== 'ADMIN') {
    // Redirect to admin login page
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedAdminRoute;