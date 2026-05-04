import { NavLink } from 'react-router-dom';
import { Home, Stethoscope, Calendar, CalendarPlus, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/home', label: 'Dashboard', icon: Home },
    { path: '/doctors', label: 'Doctors', icon: Stethoscope },
    { path: '/booking', label: 'Book Appointment', icon: CalendarPlus },
    { path: '/my-appointments', label: 'My Appointments', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b">
        <img src="/PICS/pictures/LOGO_1.png" alt="Logo" className="h-10 w-auto" />
        <p className="text-sm text-gray-500 mt-2">Patient Portal</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t">
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;