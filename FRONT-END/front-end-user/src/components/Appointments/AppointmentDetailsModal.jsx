import { X, Calendar, Clock, Stethoscope, MapPin, FileText, User, Mail, Phone } from 'lucide-react';

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = () => {
    const colors = {
      CONFIRMED: 'text-green-600 bg-green-50',
      PENDING: 'text-yellow-600 bg-yellow-50',
      COMPLETED: 'text-blue-600 bg-blue-50',
      CANCELLED: 'text-red-600 bg-red-50'
    };
    return colors[appointment.status] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Status */}
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {appointment.status}
          </div>

          {/* Doctor Info */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Stethoscope size={18} /> Doctor Information
            </h3>
            <p className="font-medium text-gray-800">Dr. {appointment.doctorName}</p>
            <p className="text-sm text-gray-500">{appointment.doctorSpecialty || 'Mental Health Professional'}</p>
          </div>

          {/* Schedule */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Calendar size={18} /> Schedule
            </h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600"><Calendar size={16} /> {formatDate(appointment.date)}</p>
              <p className="flex items-center gap-2 text-gray-600"><Clock size={16} /> {appointment.time}</p>
              <p className="flex items-center gap-2 text-gray-600"><MapPin size={16} /> {appointment.location || 'Online Clinic'}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User size={18} /> Patient Information
            </h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600"><User size={16} /> {appointment.patientName}</p>
              <p className="flex items-center gap-2 text-gray-600"><Mail size={16} /> {appointment.patientEmail}</p>
              <p className="flex items-center gap-2 text-gray-600"><Phone size={16} /> {appointment.patientPhone}</p>
            </div>
          </div>

          {/* Reason */}
          {appointment.reason && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={18} /> Reason for Visit
              </h3>
              <p className="text-gray-600 text-sm">{appointment.reason}</p>
            </div>
          )}

          {/* Fee */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consultation Fee</span>
              <span className="text-xl font-bold text-primary">₱{appointment.fee || '500'}</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-5 border-t">
          <button onClick={onClose} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;