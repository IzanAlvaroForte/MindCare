import { useState, useEffect } from 'react';
import { Filter, ChevronDown, Users as UsersIcon, UserCheck, UserX, Shield } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import UserSearchBar from '../components/Users/UserSearchBar';
import UserTable from '../components/Users/UserTable';
import UserModal from '../components/Users/UserModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import { getUsers, updateUser, deleteUser, createUser  } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone || '').includes(searchTerm);
    
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'ALL' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'ACTIVE').length,
    inactive: users.filter(u => u.status === 'INACTIVE').length,
    admins: users.filter(u => u.role === 'ADMIN').length,
  };

  const hasActiveFilters = selectedRole !== 'ALL' || selectedStatus !== 'ALL';

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
  try {
    if (selectedUser) {
      // Update existing user
      await updateUser(selectedUser.id, userData);
    } else {
      // Create NEW user - THIS WAS MISSING!
      await createUser(userData);
    }
    await loadUsers(); // Refresh the list
    setIsModalOpen(false);
  } catch (err) {
    console.error('Failed to save user:', err);
    setError('Failed to save user');
  }
};

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      await loadUsers();
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const resetFilters = () => {
    setSelectedRole('ALL');
    setSelectedStatus('ALL');
    setSearchTerm('');
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500">Manage all registered users and their access</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats.total} icon={UsersIcon} color="bg-blue-500" />
        <StatCard title="Active" value={stats.active} icon={UserCheck} color="bg-green-500" />
        <StatCard title="Inactive" value={stats.inactive} icon={UserX} color="bg-red-500" />
        <StatCard title="Admins" value={stats.admins} icon={Shield} color="bg-purple-500" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <UserSearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddUser={handleAddUser}
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter size={18} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {(selectedRole !== 'ALL' ? 1 : 0) + (selectedStatus !== 'ALL' ? 1 : 0)}
              </span>
            )}
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Add User Button */}
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            + Add User
          </button>
        </div>

        {/* Expandable Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-6">
              {/* Role Filter */}
              <div className="min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Results count */}
      <div className="mb-3 text-sm text-gray-500">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.username}?`}
      />
    </div>
  );
};

export default Users;