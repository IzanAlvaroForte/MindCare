import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import StatsGrid from '../components/Dashboard/StatsGrid';
import AppointmentsChart from '../components/Dashboard/AppointmentsChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import RecentAppointmentsTable from '../components/Dashboard/RecentAppointmentsTable';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, appointmentsData, chartData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentAppointments(),
        dashboardAPI.getChartData()
      ]);
      
      setStats(statsData);
      setAppointments(appointmentsData);
      setChartData(chartData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAppointment = (appointment) => {
    console.log('View appointment:', appointment);
    // TODO: Open appointment details modal
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center">
          <p className="text-xl font-bold">Error loading dashboard</p>
          <p>{error}</p>
          <button 
            onClick={fetchDashboardData} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AppointmentsChart data={chartData} />
        <RevenueChart data={chartData} />
      </div>

      {/* Recent Appointments Table */}
      <RecentAppointmentsTable 
        appointments={appointments} 
        onView={handleViewAppointment} 
      />
    </div>
  );
};

export default Dashboard;