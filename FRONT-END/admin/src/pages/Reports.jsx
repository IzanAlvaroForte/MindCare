import { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Calendar, Activity, Download, Filter } from 'lucide-react';
import { 
  getReportsStats, 
  getAppointmentsByStatus, 
  getTopDoctors, 
  getMonthlyTrend, 
  getRecentActivities 
} from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import StatCard from '../components/Reports/StatCard';
import AppointmentsByStatusChart from '../components/Reports/AppointmentsByStatusChart';
import TopDoctorsTable from '../components/Reports/TopDoctorsTable';
import MonthlyTrendChart from '../components/Reports/MonthlyTrendChart';
import RecentActivityTable from '../components/Reports/RecentActivityTable';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalUsers: 0,
    totalDoctors: 0,
    totalRevenue: 0,
    completionRate: 0,
    cancellationRate: 0,
    averageRating: 0
  });
  const [statusData, setStatusData] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, statusData, doctorsData, monthlyData, activitiesData] = await Promise.all([
        getReportsStats(),
        getAppointmentsByStatus(),
        getTopDoctors(),
        getMonthlyTrend(),
        getRecentActivities()
      ]);
      
      setStats(statsData);
      setStatusData(statusData);
      setTopDoctors(doctorsData);
      setMonthlyData(monthlyData);
      setActivities(activitiesData);
    } catch (err) {
      console.error('Error loading reports:', err);
      setError('Failed to load reports data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Metric', 'Value'],
      ['Total Appointments', stats.totalAppointments],
      ['Total Users', stats.totalUsers],
      ['Total Doctors', stats.totalDoctors],
      ['Total Revenue', `₱${stats.totalRevenue.toLocaleString()}`],
      ['Completion Rate', `${stats.completionRate}%`],
      ['Cancellation Rate', `${stats.cancellationRate}%`]
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const StatItem = ({ title, value, icon: Icon, color, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button onClick={loadReportsData} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">View insights and export data</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatItem title="Total Appointments" value={stats.totalAppointments} icon={Calendar} color="#3b82f6" />
        <StatItem title="Total Users" value={stats.totalUsers} icon={Users} color="#10b981" />
        <StatItem title="Total Revenue" value={stats.totalRevenue} icon={DollarSign} color="#8b5cf6" prefix="₱" />
        <StatItem title="Avg. Rating" value={stats.averageRating} icon={TrendingUp} color="#f59e0b" suffix="★" />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatItem title="Completion Rate" value={stats.completionRate} icon={Activity} color="#10b981" suffix="%" />
        <StatItem title="Cancellation Rate" value={stats.cancellationRate} icon={Activity} color="#ef4444" suffix="%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AppointmentsByStatusChart data={statusData} />
        <MonthlyTrendChart data={monthlyData} />
      </div>

      {/* Top Doctors Table */}
      <div className="mb-8">
        <TopDoctorsTable doctors={topDoctors} />
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <RecentActivityTable activities={activities} />
      </div>

      {/* Note about data */}
      <div className="text-center text-sm text-gray-400 mt-4">
        Reports are generated from actual appointment data
      </div>
    </div>
  );
};

export default Reports;