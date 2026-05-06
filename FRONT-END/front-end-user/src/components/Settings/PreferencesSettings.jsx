import { Clock } from 'lucide-react';

const PreferencesSettings = ({ preferences, onTimeFormatChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-gray-800">Preferences</h2>
      </div>
      
      <div className="space-y-4">
        {/* Time Format */}
        <div className="p-3 border rounded-lg">
          <p className="font-medium mb-2">Time Format</p>
          <div className="flex gap-3">
            <button
              onClick={() => onTimeFormatChange('12h')}
              className={`flex-1 px-4 py-2 rounded-lg transition ${
                preferences.timeFormat === '12h' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              12-hour (10:30 AM)
            </button>
            <button
              onClick={() => onTimeFormatChange('24h')}
              className={`flex-1 px-4 py-2 rounded-lg transition ${
                preferences.timeFormat === '24h' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              24-hour (14:30)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;