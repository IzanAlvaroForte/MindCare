import { useState, useEffect } from 'react';
import { getDashboardStats, getRecentAppointments } from '../services/api';
import { 
  Users, Stethoscope, Calendar, Clock, CheckCircle, XCircle, 
  TrendingUp, DollarSign, Activity 
} from 'lucide-react';


const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, appointmentsData, chartData] = await Promise.all([
        getDashboardStats(),
        getRecentAppointments()
      ]);
      
      setStats(statsData);
      setRecentAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value?.toLocaleString() || 0}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>{error}</p>
        <button 
          onClick={fetchDashboardData} 
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (

    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-500" />
        <StatCard title="Total Doctors" value={stats.totalDoctors} icon={Stethoscope} color="bg-green-500" />
        <StatCard title="Total Appointments" value={stats.totalAppointments} icon={Calendar} color="bg-purple-500" />
        <StatCard title="Today's Appointments" value={stats.todayAppointments} icon={Clock} color="bg-orange-500" />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pending" value={stats.pendingAppointments} icon={Clock} color="bg-yellow-500" />
        <StatCard title="Completed" value={stats.completedAppointments} icon={CheckCircle} color="bg-green-500" />
        <StatCard title="Cancelled" value={stats.cancelledAppointments} icon={XCircle} color="bg-red-500" />
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Recent Appointments</h2>
        </div>
        
        {recentAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No recent appointments</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentAppointments.map((apt, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.patientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.doctorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

     {/* Recent Activity / Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <Activity size={20} className="text-gray-400" />
          </div>
          
          {recentAppointments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-gray-500">No recent appointments</p>
              <p className="text-sm text-gray-400 mt-1">New appointments will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppointments.slice(0, 5).map((apt, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{apt.patientName}</p>
                      <p className="text-xs text-gray-500">with Dr. {apt.doctorName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{apt.date}</p>
                    <p className="text-xs text-gray-500">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Cards */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <span className="text-gray-700">Completion Rate</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {stats.totalAppointments > 0 
                  ? Math.round((stats.completedAppointments / stats.totalAppointments) * 100) 
                  : 0}%
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <DollarSign size={16} className="text-white" />
                </div>
                <span className="text-gray-700">Total Revenue</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                ₱{(stats.completedAppointments * 500).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <span className="text-gray-700">Active Patients</span>
              </div>
              <span className="text-xl font-bold text-purple-600">{stats.totalUsers}</span>
            </div>
          </div>
          
          <a 
            href="/admin/appointments" 
            className="block mt-4 text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            View All Appointments →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;