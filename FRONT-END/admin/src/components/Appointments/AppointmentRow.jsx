import { Eye, CheckCircle, XCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import AppointmentStatusBadge from './AppointmentStatusBadge';

const AppointmentRow = ({ appointment, onView, onConfirm, onCancel, onComplete }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="font-mono text-sm text-gray-600">#{appointment.id}</p>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{appointment.user?.username || 'N/A'}</p>
          <p className="text-sm text-gray-500">{appointment.user?.email || 'No email'}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{appointment.doctor?.name || 'N/A'}</p>
          <p className="text-sm text-gray-500">{appointment.doctor?.specialty || 'General'}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-600">{appointment.appointmentDate}</p>
        <p className="text-sm text-gray-500">{appointment.appointmentTime}</p>
      </td>
      <td className="px-6 py-4">
        <AppointmentStatusBadge status={appointment.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button onClick={() => onView(appointment)} className="text-blue-600 hover:text-blue-800" title="View Details">
            <Eye size={18} />
          </button>
          {appointment.status === 'PENDING' && (
            <button onClick={() => onConfirm(appointment)} className="text-green-600 hover:text-green-800" title="Confirm">
              <CheckCircle size={18} />
            </button>
          )}
          {appointment.status === 'CONFIRMED' && (
            <button onClick={() => onComplete(appointment)} className="text-purple-600 hover:text-purple-800" title="Mark Complete">
              <Clock size={18} />
            </button>
          )}
          {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
            <button onClick={() => onCancel(appointment)} className="text-red-600 hover:text-red-800" title="Cancel">
              <XCircle size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AppointmentRow;