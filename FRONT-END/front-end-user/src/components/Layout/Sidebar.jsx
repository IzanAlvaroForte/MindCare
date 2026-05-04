import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/services', label: 'Services' },
    { path: '/files', label: 'Files' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="h-full w-1/4 flex flex-col items-center p-6">
      <div className="mb-12">
        <img src="/PICS/pictures/LOGO_1.png" alt="Logo" className="h-36 w-auto" />
      </div>
      
      <nav className="flex flex-col w-full gap-2 px-4 text-2xl">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `block w-full text-center py-3 px-4 rounded-lg duration-200 cursor-pointer ${
                isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;