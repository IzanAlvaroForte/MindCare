import { Calendar } from 'lucide-react';

const DateRangeFilter = ({ dateRange, onDateChange, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Calendar size={20} className="text-gray-400" />
        <div className="flex gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => onDateChange('startDate', e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => onDateChange('endDate', e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={onApply}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;