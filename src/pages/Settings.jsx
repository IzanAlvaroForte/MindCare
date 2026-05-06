import { useState, useEffect } from 'react';
import { Save, CheckCircle, User, Bell, Database, Download, RefreshCw } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@mindcare.com',
    phone: '+63 912 345 6789'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  });
  
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    const savedNotifications = localStorage.getItem('adminNotifications');
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  }, []);

  const handleSaveAll = () => {
    localStorage.setItem('adminProfile', JSON.stringify(profile));
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure? This will reset all settings to default.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {
      profile,
      notifications,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500">Manage your account and system preferences</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Save size={18} />
          Save All Changes
        </button>
      </div>

      {showSaveMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={18} />
          Settings saved successfully!
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Admin Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value="Super Admin"
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          Notification Preferences
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email for new appointments</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
              className={`w-12 h-6 rounded-full transition ${
                notifications.email ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                notifications.email ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive SMS for urgent updates</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
              className={`w-12 h-6 rounded-full transition ${
                notifications.sms ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                notifications.sms ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* System Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database size={20} className="text-blue-600" />
          System
        </h2>
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <Download size={18} className="text-green-600" />
              <span>Export Data (JSON)</span>
            </div>
            <span className="text-sm text-gray-400">Export all settings</span>
          </button>
          
          <button
            onClick={handleResetData}
            className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-3">
              <RefreshCw size={18} className="text-yellow-600" />
              <span>Reset All Data</span>
            </div>
            <span className="text-sm text-gray-400">Clear all saved settings</span>
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        <p>Settings are saved locally in your browser. Data will persist until cleared.</p>
      </div>
    </div>
  );
};

export default Settings;