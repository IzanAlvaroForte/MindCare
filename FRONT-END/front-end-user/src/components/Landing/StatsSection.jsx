import { Users, Star, CheckCircle, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: '2,000+', label: 'Happy Patients', icon: Users },
    { number: '50+', label: 'Expert Doctors', icon: Star },
    { number: '98%', label: 'Satisfaction Rate', icon: CheckCircle },
    { number: '24/7', label: 'Patient Support', icon: Clock },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;