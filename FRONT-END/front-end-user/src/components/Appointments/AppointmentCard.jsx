import { Calendar, Clock, Stethoscope, MapPin, MoreVertical } from 'lucide-react';

const AppointmentCard = ({ appointment, onViewDetails, onCancel, onReschedule }) => {
  const getStatusBadge = () => {
    const statusConfig = {
      CONFIRMED: { color: 'bg-green-100 text-green-700', label: 'Confirmed' },
      PENDING: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
      COMPLETED: { color: 'bg-blue-100 text-blue-700', label: 'Completed' },
      CANCELLED: { color: 'bg-red-100 text-red-700', label: 'Cancelled' }
    };
    const config = statusConfig[appointment.status] || statusConfig.PENDING;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const canCancel = appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';
  const canReschedule = appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left - Doctor Info */}
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-lg font-bold">{appointment.doctorName?.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Dr. {appointment.doctorName}</h3>
              <p className="text-sm text-gray-500">{appointment.doctorSpecialty || 'Mental Health Professional'}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(appointment.date)}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {appointment.time}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {appointment.location || 'Online Clinic'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Status & Actions */}
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge()}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onViewDetails(appointment)}
              className="text-sm text-primary hover:underline"
            >
              View Details
            </button>
            {canReschedule && (
              <button
                onClick={() => onReschedule(appointment)}
                className="text-sm text-blue-600 hover:underline"
              >
                Reschedule
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => onCancel(appointment)}
                className="text-sm text-red-600 hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;