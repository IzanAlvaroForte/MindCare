import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserAppointments } from '../services/api';
import QuickActions from '../components/Dashboard/QuickActions';
import RecentActivity from '../components/Dashboard/RecentActivity';
import StatsCard from '../components/Dashboard/StatsCard';

const Home = () => {
  const { user, userName, userEmail } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    
    try {
      // Fetch real appointments from backend
      const data = await getUserAppointments();
      setAppointments(data || []);
      
      // Calculate stats from real data
      const total = data?.length || 0;
      const upcoming = data?.filter(apt => apt.status === 'PENDING' || apt.status === 'CONFIRMED').length || 0;
      const completed = data?.filter(apt => apt.status === 'COMPLETED').length || 0;
      
      setStats({
        total,
        upcoming,
        completed
      });
    } catch (error) {
      console.error('Error loading appointments:', error);
      setAppointments([]);
      setStats({ total: 0, upcoming: 0, completed: 0 });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Appointments', value: stats.total, icon: Calendar, color: 'bg-blue-500' },
    { title: 'Upcoming', value: stats.upcoming, icon: Clock, color: 'bg-green-500' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-500 mt-1">{userEmail}</p>
      </div>

      {/* Stats Cards - Shows 0 if no appointments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity - Shows "No appointments" if empty */}
      <RecentActivity appointments={appointments} />
    </div>
  );
};

export default Home;