import { useState, useEffect } from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderDateTime from './HeaderDateTime';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserMenu from './HeaderUserMenu';

const Header = () => {
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@mindcare.com',
    role: 'Super Admin'
  });

  useEffect(() => {
    // Load from localStorage after login
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <HeaderWelcome userName={user.name} userRole={user.role} />
      
      <div className="flex items-center gap-4">
        <HeaderDateTime />
        <HeaderNotifications />
        <HeaderUserMenu 
          userName={user.name} 
          userEmail={user.email} 
          onLogout={handleLogout} 
        />
      </div>
    </header>
  );
};

export default Header;