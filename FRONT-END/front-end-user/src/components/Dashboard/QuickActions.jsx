import { Calendar, Stethoscope, Clock, User } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { title: 'Book Appointment', icon: Calendar, color: 'bg-blue-500', link: '/doctors', description: 'Schedule a consultation' },
    { title: 'View Doctors', icon: Stethoscope, color: 'bg-green-500', link: '/doctors', description: 'Browse our experts' },
    { title: 'My Appointments', icon: Clock, color: 'bg-purple-500', link: '/my-appointments', description: 'View your bookings' },
    { title: 'My Profile', icon: User, color: 'bg-orange-500', link: '/profile', description: 'Manage your account' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action, idx) => (
        <a
          key={idx}
          href={action.link}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all hover:-translate-y-1 group"
        >
          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
            <action.icon className="text-white" size={24} />
          </div>
          <p className="font-semibold text-gray-800 mb-1">{action.title}</p>
          <p className="text-sm text-gray-500">{action.description}</p>
        </a>
      ))}
    </div>
  );
};

export default QuickActions;