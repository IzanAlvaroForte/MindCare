import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import AdminLogin from './loginform/AdminLogin';
import ProtectedAdminRoute from './loginform/ProtectedAdminRoute';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Schedule from './pages/Schedule';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        {/* Public admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected admin routes - IMPORTANT: add /* to the path */}
        <Route path="/admin/*" element={  // ← CHANGE HERE: add /* 
          <ProtectedAdminRoute>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedAdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;