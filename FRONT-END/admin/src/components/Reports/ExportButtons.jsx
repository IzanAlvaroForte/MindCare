import { Download } from 'lucide-react';

const ExportButtons = ({ onExport }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onExport('CSV')}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        <Download size={18} />
        Export CSV
      </button>
      <button
        onClick={() => onExport('JSON')}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Download size={18} />
        Export JSON
      </button>
    </div>
  );
};

export default ExportButtons;