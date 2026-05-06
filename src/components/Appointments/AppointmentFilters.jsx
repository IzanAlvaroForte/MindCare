import { Search, SlidersHorizontal } from 'lucide-react';

const AppointmentFilters = ({ filters, onFilterChange, onSearch, onReset, onOpenAdvancedFilter }) => {
  const statuses = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const doctors = ['ALL', 'Dr. Samantha Sanchez', 'Dr. John Reyes', 'Dr. Maria Santos'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Status' : s}</option>)}
        </select>

        {/* Doctor Filter */}
        <select
          value={filters.doctor}
          onChange={(e) => onFilterChange('doctor', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {doctors.map(d => <option key={d} value={d}>{d === 'ALL' ? 'All Doctors' : d}</option>)}
        </select>

        {/* Advanced Filter Button */}
        <button
          onClick={onOpenAdvancedFilter}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <SlidersHorizontal size={18} />
          Advanced Filter
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={onSearch} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Apply Filters
        </button>
        <button onClick={onReset} className="text-gray-500 hover:text-gray-700 px-4 py-2">
          Reset All
        </button>
      </div>
    </div>
  );
};

export default AppointmentFilters;