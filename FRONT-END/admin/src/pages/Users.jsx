import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import UserSearchBar from '../components/Users/UserSearchBar';
import UserTable from '../components/Users/UserTable';
import UserModal from '../components/Users/UserModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';

const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '09123456789', role: 'USER', status: 'ACTIVE', joinDate: '2024-01-15', appointments: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '09123456788', role: 'USER', status: 'ACTIVE', joinDate: '2024-02-20', appointments: 8 },
  { id: 3, name: 'Mike Brown', email: 'mike@example.com', phone: '09123456787', role: 'USER', status: 'INACTIVE', joinDate: '2024-01-10', appointments: 2 },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, ...userData } : u
      ));
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        appointments: 0
      };
      setUsers([...users, newUser]);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500">Manage all registered users</p>
      </div>

      <UserSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddUser={handleAddUser}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <UserTable 
          users={filteredUsers}
          onView={(user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* Add/Edit User Modal */}
      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
      />
    </div>
  );
};

export default Users;