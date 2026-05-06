import StatsCard from './StatsCard';
import { Users, UserPlus, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  const statsConfig = [
    { title: 'Total Users', value: stats?.totalUsers, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Doctors', value: stats?.totalDoctors, icon: UserPlus, color: 'bg-green-500' },
    { title: 'Total Appointments', value: stats?.totalAppointments, icon: Calendar, color: 'bg-purple-500' },
    { title: "Today's Appointments", value: stats?.todayAppointments, icon: Clock, color: 'bg-orange-500' },
    { title: 'Pending', value: stats?.pendingAppointments, icon: Clock, color: 'bg-yellow-500' },
    { title: 'Completed', value: stats?.completedAppointments, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Cancelled', value: stats?.cancelledAppointments, icon: XCircle, color: 'bg-red-500' },
  ];

  return (
    <>
      {/* First Row - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsConfig.slice(0, 4).map((config, idx) => (
          <StatsCard key={idx} {...config} />
        ))}
      </div>
      
      {/* Second Row - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsConfig.slice(4, 7).map((config, idx) => (
          <StatsCard key={idx} {...config} />
        ))}
      </div>
    </>
  );
};

export default StatsGrid;