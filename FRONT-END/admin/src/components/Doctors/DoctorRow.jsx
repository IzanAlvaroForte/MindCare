import { Eye, Edit, Trash2 } from 'lucide-react';
import DoctorStatusBadge from './DoctorStatusBadge';

const DoctorRow = ({ doctor, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="font-mono text-sm text-gray-600">#{doctor.id}</p>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">Dr. {doctor.name}</p>
          <p className="text-sm text-gray-500">{doctor.license}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-600">{doctor.specialty}</p>
      </td>
      <td className="px-6 py-4 text-gray-600">{doctor.email}</td>
      <td className="px-6 py-4 text-gray-600">{doctor.phone}</td>
      <td className="px-6 py-4">
        <DoctorStatusBadge status={doctor.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button onClick={() => onView(doctor)} className="text-blue-600 hover:text-blue-800">
            <Eye size={18} />
          </button>
          <button onClick={() => onEdit(doctor)} className="text-green-600 hover:text-green-800">
            <Edit size={18} />
          </button>
          <button onClick={() => onDelete(doctor)} className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DoctorRow;