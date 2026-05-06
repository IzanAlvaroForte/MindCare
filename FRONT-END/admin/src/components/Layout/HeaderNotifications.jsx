import { useState } from 'react';
import { Bell } from 'lucide-react';

const HeaderNotifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New appointment booked', time: '5 min ago', read: false },
    { id: 2, message: 'Dr. Smith updated schedule', time: '1 hour ago', read: false },
    { id: 3, message: '3 pending approvals', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-800 rounded-lg transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="p-3 border-b">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
                <p className="text-sm text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t">
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNotifications;