import { Calendar } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

const UpcomingAppointments = ({ appointments, onCancel, onReschedule }) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
        </div>
        <div className="p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No upcoming appointments</p>
          <a href="/doctors" className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg">
            Book an Appointment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
        <a href="/my-appointments" className="text-primary text-sm hover:underline">View All</a>
      </div>
      <div>
        {appointments.map((apt) => (
          <AppointmentCard 
            key={apt.id} 
            appointment={apt} 
            onCancel={onCancel}
            onReschedule={onReschedule}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;