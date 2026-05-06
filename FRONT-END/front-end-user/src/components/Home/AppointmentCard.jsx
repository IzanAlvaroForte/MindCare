import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';

const AppointmentCard = ({ appointment, onCancel, onReschedule }) => {
  const getStatusBadge = () => {
    if (appointment.status === 'CONFIRMED') {
      return <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle size={14} /> Confirmed</span>;
    }
    return <span className="flex items-center gap-1 text-yellow-600 text-sm"><Clock size={14} /> Pending</span>;
  };

  return (
    <div className="border-b border-gray-100 p-4 hover:bg-gray-50 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{appointment.doctorName}</h3>
          <p className="text-sm text-gray-500">{appointment.specialty}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Calendar size={14} /> {appointment.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {appointment.time}</span>
          </div>
        </div>
        <div className="text-right">
          {getStatusBadge()}
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => onReschedule(appointment.id)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Reschedule
            </button>
            <button 
              onClick={() => onCancel(appointment.id)}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;