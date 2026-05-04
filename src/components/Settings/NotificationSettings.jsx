import { Bell, Mail, MessageCircle, Calendar } from 'lucide-react';

const NotificationSettings = ({ preferences, onToggle }) => {
  const notificationOptions = [
    { key: 'email', label: 'Email Notifications', icon: Mail, description: 'Receive appointment reminders and updates via email' },
    { key: 'sms', label: 'SMS Notifications', icon: MessageCircle, description: 'Get text message reminders for upcoming appointments' },
    { key: 'appointmentReminders', label: 'Appointment Reminders', icon: Calendar, description: 'Receive reminders 24 hours before your appointment' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
      </div>
      
      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <option.icon size={18} className="text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{option.label}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
            <button
              onClick={() => onToggle(option.key)}
              className={`w-12 h-6 rounded-full transition ${
                preferences[option.key] ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                preferences[option.key] ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;