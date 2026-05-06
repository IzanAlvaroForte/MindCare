import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUser } from '../services/api';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileInfoForm from '../components/Profile/ProfileInfoForm';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';
import AccountStats from '../components/Profile/AccountStats';
import DeleteAccountModal from '../components/Profile/DeleteAccountModal';
import { deleteAccount } from '../services/api';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    joinDate: '',
    totalAppointments: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    hoursTherapy: 0,
    memberSince: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userData = getCurrentUser();
    if (userData) {
      setUser({
        name: userData.username || 'User',
        username: userData.username,
        email: userData.email,
        phone: userData.phone || '',
        location: userData.location || '',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalAppointments: 0
      });
      
      setStats({
        totalAppointments: 0,
        completedAppointments: 0,
        hoursTherapy: 0,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
    }
    setLoading(false);
  };

  const handleProfileUpdate = () => {
    // Update user in localStorage
    const currentUser = getCurrentUser();
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleChangePassword = (passwordData) => {
    console.log('Password change requested:', passwordData);
    setSuccessMessage('Password changed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      localStorage.clear();
      logout(); // Your logout function
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete account');
      setIsDeleteModalOpen(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <ProfileHeader user={user} />
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileInfoForm 
              formData={user}
              onChange={handleFieldChange}
              onSave={handleProfileUpdate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <ChangePasswordForm />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AccountStats stats={stats} />
            
            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
              <p className="text-sm text-gray-500 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default Profile;