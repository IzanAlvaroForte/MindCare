import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Stethoscope, Calendar, Clock, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
    { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { path: '/admin/schedule', label: 'Schedule', icon: Clock },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;