import { Calendar } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

const AppointmentsList = ({ appointments, onViewDetails, onCancel, onReschedule }) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No appointments found</p>
        <p className="text-gray-400 text-sm mt-1">You haven't booked any appointments yet</p>
        <a href="/doctors" className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
          Book an Appointment
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onViewDetails={onViewDetails}
          onCancel={onCancel}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
};

export default AppointmentsList;