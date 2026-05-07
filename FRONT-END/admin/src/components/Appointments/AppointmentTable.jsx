import { Calendar } from 'lucide-react';
import AppointmentRow from './AppointmentRow';

const AppointmentTable = ({ appointments, onView, onConfirm, onCancel, onComplete }) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((apt) => (
            <AppointmentRow 
              key={apt.id} 
              appointment={apt} 
              onView={onView}
              onConfirm={onConfirm}
              onCancel={onCancel}
              onComplete={onComplete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;