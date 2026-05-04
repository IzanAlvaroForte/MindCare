const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex gap-2">
        <button
          onClick={() => onToggle(true)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            isLogin 
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'text-white hover:bg-white/20'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            !isLogin 
              ? 'bg-white text-blue-600 shadow-lg' 
              : 'text-white hover:bg-white/20'
          }`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;