const HeaderWelcome = ({ userName, userRole }) => {
  return (
    <div>
      <p className="text-sm text-gray-400">Welcome back,</p>
      <p className="text-xl font-bold">{userName || 'Admin'}</p>
      <p className="text-xs text-gray-400">{userRole || 'Administrator'}</p>
    </div>
  );
};

export default HeaderWelcome;