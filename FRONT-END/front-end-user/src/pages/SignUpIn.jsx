const SignUpIn = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-no-repeat" 
      style={{ backgroundImage: "url('/PICS/pictures/1ST_PAGE_BG.png')" }}>
      
      <div className="absolute inset-0 bg-blue-500/10"></div>
      
      <header className="relative z-10 flex justify-center w-full p-4">
        <img src="/PICS/pictures/LOGO_1.png" alt="Logo" 
          className="h-8 md:h-10 lg:h-32 w-auto object-contain"
        />
      </header>

      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-8 p-4">
        {/* Sign In */}
        <section className="w-full max-w-md px-4">
          <div className="mb-8">
            <p className="text-2xl font-bold">Welcome Back</p>
            <p className="text-lg">Continue your journey toward better mental health</p>
          </div>
          
          <div className="bg-primary p-8 rounded">
            <form className="flex flex-col gap-4">
              <label className="font-bold">Username</label>
              <input type="text" required
                className="bg-white text-black placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                placeholder="Enter username"
              />
              <label className="font-bold">Password</label>
              <input type="password" required
                className="bg-white text-black placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                placeholder="Enter password"
              />
              <button type="submit" className="bg-white font-bold py-2 px-4 rounded cursor-pointer w-full mt-2">
                Sign In
              </button>
            </form>
            <div className="flex flex-col gap-4 items-center mt-6">
              <a className="text-sky-500 text-sm underline" href="#">Forgot password?</a>
            </div>
          </div>
        </section>

        {/* Sign Up */}
        <section className="w-full max-w-md px-4">
          <div className="mb-8">
            <p className="text-2xl font-bold">Create an Account</p>
            <p className="text-lg">Start your mental wellness journey today</p>
          </div>
          
          <div className="bg-primary p-8 rounded">
            <form className="flex flex-col gap-4">
              <label className="font-bold">Username</label>
              <input type="text" required
                className="bg-white text-black placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                placeholder="Enter username"
              />
              <label className="font-bold">Email</label>
              <input type="email" required
                className="bg-white text-black placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                placeholder="Your@email.com"
              />
              <label className="font-bold">Password</label>
              <input type="password" required
                className="bg-white text-black placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                placeholder="Enter password"
              />
              <button type="submit" className="bg-white font-bold py-2 px-4 rounded cursor-pointer w-full mt-2">
                Create an account
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUpIn;    