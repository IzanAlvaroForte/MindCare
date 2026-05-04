import { Outlet, Navigate } from 'react-router-dom';  // ← Add Navigate here
import Sidebar from './Sidebar';
import Header from './Header';

const ProtectedLayout = () => {
  const token = localStorage.getItem('token');
  
  // If not logged in, redirect to login page
//   if (!token) {
//     return <Navigate to="/signupin" replace />;
//   }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;