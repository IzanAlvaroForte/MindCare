const WelcomeBanner = ({ userName }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}! 👋</h1>
      <p className="text-gray-500 mt-1">Here's what's happening with your mental health journey</p>
    </div>
  );
};

export default WelcomeBanner;