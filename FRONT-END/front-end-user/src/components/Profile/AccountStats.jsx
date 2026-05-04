import { Calendar, Clock, CheckCircle, Star } from 'lucide-react';

const AccountStats = ({ stats }) => {
  const statItems = [
    { label: 'Total Appointments', value: stats.totalAppointments, icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { label: 'Completed', value: stats.completedAppointments, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Hours of Therapy', value: stats.hoursTherapy, icon: Clock, color: 'bg-purple-100 text-purple-600' },
    { label: 'Member Since', value: stats.memberSince, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Activity</h2>
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
              <item.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountStats;