import { Lock, Eye, UserCheck, Mail } from 'lucide-react';  // ← Add Mail here

const PrivacySettings = ({ privacy, onToggle }) => {
  const privacyOptions = [
    { key: 'profileVisibility', label: 'Profile Visibility', icon: Eye, description: 'Allow others to see your profile' },
    { key: 'showEmail', label: 'Show Email', icon: Mail, description: 'Display your email on your profile' },
    { key: 'twoFactor', label: 'Two-Factor Authentication', icon: Lock, description: 'Add an extra layer of security' },  // ← Fixed: changed UserCheck to Lock
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-gray-800">Privacy & Security</h2>
      </div>
      
      <div className="space-y-4">
        {privacyOptions.map((option) => (
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
                privacy[option.key] ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                privacy[option.key] ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacySettings;