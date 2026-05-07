import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthToggle from '../components/Auth/AuthToggle';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import SuccessMessage from '../components/Auth/SuccessMessage';
import { login, register } from '../Services/api';

const SignUpIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await login({
        username: data.username,
        password: data.password
      });
      
      // Check if role is USER (not ADMIN)
      if (response.role !== 'USER') {
        setErrorMessage('Invalid user credentials');
        localStorage.clear();
        setLoading(false);
        return;
      }
      
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
      
    } catch (err) {
      setErrorMessage(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await register({
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone || ''
      });
      
      console.log('Register response:', response);
      setSuccessMessage('Account created! Please login.');
      
      // Switch to login form after successful registration
      setTimeout(() => {
        setIsLogin(true);
        setSuccessMessage('');
      }, 2000);
      
    } catch (err) {
      console.error('Register error:', err);
      setErrorMessage(err.message || 'Registration failed. Username or email may already exist.');
    } finally {
      setLoading(false);
    }
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
          
          {errorMessage && (
            <div className="bg-red-500/80 text-white px-6 py-3 rounded-lg shadow-lg mb-4 text-center">
              {errorMessage}
            </div>
          )}

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