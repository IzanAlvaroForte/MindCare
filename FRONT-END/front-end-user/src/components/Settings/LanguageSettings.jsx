import { Globe } from 'lucide-react';

const LanguageSettings = ({ language, onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-gray-800">Language Preference</h2>
      </div>
      
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-full flex items-center justify-between p-3 border rounded-lg transition ${
              language === lang.code ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </div>
            {language === lang.code && (
              <span className="text-primary text-sm font-semibold">✓ Selected</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSettings;