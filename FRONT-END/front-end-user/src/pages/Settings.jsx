import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import NotificationSettings from '../components/Settings/NotificationSettings';
import LanguageSettings from '../components/Settings/LanguageSettings';
import PrivacySettings from '../components/Settings/PrivacySettings';
import PreferencesSettings from '../components/Settings/PreferencesSettings';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointmentReminders: true
  });
  
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showEmail: false,
    twoFactor: false
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    timeFormat: '12h'
  });
  
  const [saveMessage, setSaveMessage] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('userNotifications');
    const savedLanguage = localStorage.getItem('userLanguage');
    const savedPrivacy = localStorage.getItem('userPrivacy');
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));
    if (savedPreferences) setPreferences(JSON.parse(savedPreferences));
  }, []);

  const handleSaveAll = () => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    localStorage.setItem('userLanguage', language);
    localStorage.setItem('userPrivacy', JSON.stringify(privacy));
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
  };

  const handleThemeChange = (theme) => {
    setPreferences({ ...preferences, theme });
  };

  const handleTimeFormatChange = (format) => {
    setPreferences({ ...preferences, timeFormat: format });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your app preferences and notifications</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
        >
          <Save size={18} />
          Save All Settings
        </button>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle size={18} />
          {saveMessage}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <NotificationSettings 
          preferences={notifications} 
          onToggle={handleNotificationToggle} 
        />
        
        <LanguageSettings 
          language={language} 
          onLanguageChange={setLanguage} 
        />
        
        <PrivacySettings 
          privacy={privacy} 
          onToggle={handlePrivacyToggle} 
        />
        
        <PreferencesSettings 
          preferences={preferences}
          onThemeChange={handleThemeChange}
          onTimeFormatChange={handleTimeFormatChange}
        />
      </div>
    </div>
  );
};

export default Settings;