import { useState } from 'react';
import AuthToggle from '../components/Auth/AuthToggle';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import SuccessMessage from '../components/Auth/SuccessMessage';

const SignUpIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Sign In:', data);
      setSuccessMessage('Login successful! Redirecting...');
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Sign Up:', data);
      setSuccessMessage('Account created! Redirecting...');
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/PICS/pictures/1ST_PAGE_BG.png')" }}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
      
      <header className="relative z-10 flex justify-center w-full p-4">
        <img src="/PICS/pictures/LOGO_1.png" alt="Logo" 
          className="h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg"
        />
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[85vh] p-4">
        <div className="w-full max-w-5xl mx-auto">
          
          <SuccessMessage message={successMessage} />

          <AuthToggle isLogin={isLogin} onToggle={setIsLogin} />

          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
            
            {isLogin ? (
              <SignInForm onSubmit={handleSignIn} loading={loading} />
            ) : (
              <SignUpForm onSubmit={handleSignUp} loading={loading} />
            )}

            <div className="text-center mt-8">
              <p className="text-white/50 text-sm">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpIn;