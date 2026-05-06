import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const userToken = localStorage.getItem('token');
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (userToken) {
      setToken(userToken);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ADMIN';

  return { 
    user, 
    loading, 
    token, 
    logout, 
    isAuthenticated,
    isAdmin,
    userName: user?.username || 'User',
    userEmail: user?.email || '',
    userRole: user?.role || 'USER'
  };
};