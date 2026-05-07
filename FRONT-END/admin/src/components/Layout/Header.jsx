import { useState, useEffect } from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderDateTime from './HeaderDateTime';
import HeaderUserMenu from './HeaderUserMenu';
import { getAdminProfile } from '../../services/api';

const Header = () => {
  const [user, setUser] = useState({
    name: 'Admin',
    email: 'admin@mindcare.com',
    role: 'ADMIN'
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await getAdminProfile();
      setUser({
        name: profile.name,
        email: profile.email,
        role: profile.role
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // Try to get from localStorage as fallback
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser({
          name: parsed.username || parsed.name,
          email: parsed.email,
          role: parsed.role
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <HeaderWelcome userName={user.name} userRole={user.role} />
      
      <div className="flex items-center gap-4">
        <HeaderDateTime />
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