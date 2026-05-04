import { useState, useEffect } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileInfoForm from '../components/Profile/ProfileInfoForm';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';
import AccountStats from '../components/Profile/AccountStats';
import DeleteAccountModal from '../components/Profile/DeleteAccountModal';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
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

  // Mock stats
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    hoursTherapy: 0,
    memberSince: ''
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      // Mock data
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+63 912 345 6789',
        location: 'Manila, Philippines',
        joinDate: 'January 2024',
        totalAppointments: 5
      });
    }

    // Load stats
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const completed = bookings.filter(b => b.status === 'COMPLETED').length;
    
    setStats({
      totalAppointments: bookings.length || 5,
      completedAppointments: completed || 3,
      hoursTherapy: (bookings.length * 1) || 5,
      memberSince: 'Jan 2024'
    });

    setLoading(false);
  }, []);

  const handleProfileUpdate = () => {
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleChangePassword = (passwordData) => {
    console.log('Password change requested:', passwordData);
    setSuccessMessage('Password changed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    localStorage.clear();
    window.location.href = '/';
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
      {/* Success Message */}
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
            <ChangePasswordForm onChangePassword={handleChangePassword} />
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