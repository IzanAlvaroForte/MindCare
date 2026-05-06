import { Calendar, Clock } from 'lucide-react';

const RecentActivity = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-700">No Appointments Yet</h3>
        <p className="text-gray-400 text-sm mt-1">You haven't booked any appointments</p>
        <a 
          href="/doctors" 
          className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Book Your First Appointment →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent Appointments</h2>
        <a href="/my-appointments" className="text-sm text-primary hover:underline">View All</a>
      </div>
      
      <div className="space-y-3">
        {appointments.slice(0, 3).map((apt, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Dr. {apt.doctor?.name || apt.doctorName}</p>
                <p className="text-sm text-gray-500">{apt.doctor?.specialty || apt.specialty}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{apt.appointmentDate || apt.date}</p>
              <p className="text-xs text-gray-500">{apt.appointmentTime || apt.time}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
                apt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                apt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                apt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                'bg-red-100 text-red-700'
              }`}>
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;