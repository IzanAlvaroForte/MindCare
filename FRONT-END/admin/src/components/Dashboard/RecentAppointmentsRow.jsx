import StatusBadge from '../Common/StatusBadge';

const RecentAppointmentsRow = ({ appointment, onView }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">{appointment.patientName}</td>
      <td className="px-4 py-3">{appointment.doctorName}</td>
      <td className="px-4 py-3">{appointment.date}</td>
      <td className="px-4 py-3">{appointment.time}</td>
      <td className="px-4 py-3">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="px-4 py-3">
        <button 
          onClick={() => onView(appointment)} 
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default RecentAppointmentsRow;