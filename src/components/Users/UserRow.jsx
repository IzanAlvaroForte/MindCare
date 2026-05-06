import { Eye, Edit, Trash2 } from 'lucide-react';
import UserStatusBadge from './UserStatusBadge';

const UserRow = ({ user, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">{user.phone}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <UserStatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 text-gray-600">{user.appointments}</td>
      <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button onClick={() => onView(user)} className="text-blue-600 hover:text-blue-800" title="View">
            <Eye size={18} />
          </button>
          <button onClick={() => onEdit(user)} className="text-green-600 hover:text-green-800" title="Edit">
            <Edit size={18} />
          </button>
          <button onClick={() => onDelete(user)} className="text-red-600 hover:text-red-800" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;