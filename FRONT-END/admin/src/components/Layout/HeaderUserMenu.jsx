import { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderUserMenu = ({ userName, userEmail, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User size={16} />
        </div>
        <ChevronDown size={16} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
          <div className="p-3 border-b">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
          <div className="py-2">
            <button 
              onClick={() => {
                setShowDropdown(false);
                navigate('/admin/profile');
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <User size={14} />
              My Profile
            </button>
            <button 
              onClick={() => {
                setShowDropdown(false);
                navigate('/admin/settings');
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Settings size={14} />
              Settings
            </button>
            <hr className="my-1" />
            <button 
              onClick={onLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUserMenu;