import { useState, useEffect } from 'react';
import { User, LogOut, Settings, UserCircle, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userName, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState('12h');

  // Load time format from localStorage
  const loadTimeFormat = () => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setTimeFormat(prefs.timeFormat || '12h');
    }
  };

  // Initial load
  useEffect(() => {
    loadTimeFormat();
    
    // Listen for localStorage changes (when settings are saved)
    const handleStorageChange = (e) => {
      if (e.key === 'userPreferences') {
        loadTimeFormat();
      }
    };
    
    // Custom event for when settings are saved in the same tab
    const handleSettingsSaved = () => {
      loadTimeFormat();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('settingsSaved', handleSettingsSaved);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsSaved', handleSettingsSaved);
    };
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    if (timeFormat === '24h') {
      return currentTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } else {
      return currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800">Welcome back, {userName}!</h2>
          <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{userEmail}</p>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          {/* Time Display */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-medium text-gray-700">{formatTime()}</span>
          </div>

          {/* User Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{userName}</span>
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-3 border-b">
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircle size={16} />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h3>
              <p className="text-gray-500 text-sm">Are you sure you want to logout from your account?</p>
            </div>
            <div className="flex border-t">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 text-gray-600 hover:bg-gray-50 rounded-bl-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-3 text-red-600 hover:bg-red-50 rounded-br-xl border-l"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;