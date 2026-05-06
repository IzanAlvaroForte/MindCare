import { Eye, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import AppointmentStatusBadge from './AppointmentStatusBadge';

const AppointmentRow = ({ appointment, onView, onConfirm, onCancel, onReschedule }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="font-mono text-sm text-gray-600">#{appointment.id}</p>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{appointment.patientName}</p>
          <p className="text-sm text-gray-500">{appointment.patientEmail}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{appointment.doctorName}</p>
          <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-600">{appointment.date}</p>
        <p className="text-sm text-gray-500">{appointment.time}</p>
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
          {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
            <>
              <button onClick={() => onReschedule(appointment)} className="text-purple-600 hover:text-purple-800" title="Reschedule">
                <CalendarIcon size={18} />
              </button>
              <button onClick={() => onCancel(appointment)} className="text-red-600 hover:text-red-800" title="Cancel">
                <XCircle size={18} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AppointmentRow;