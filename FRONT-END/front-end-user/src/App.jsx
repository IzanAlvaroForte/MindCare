import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedLayout from './components/Layout/ProtectedLayout';
import LandingPage from './pages/LandingPage';
import SignUpIn from './pages/SignUpIn';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import MyAppointments from './pages/MyAppointments';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - no sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signupin" element={<SignUpIn />} />
        
        {/* Protected Routes - WITH sidebar and header */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:doctorId" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;