import { useState, useEffect } from 'react';
import { X, Filter, SlidersHorizontal } from 'lucide-react';

const AppointmentFilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  // Initialize with default values if currentFilters is undefined
  const [filters, setFilters] = useState({
    status: [],
    dateRange: 'all',
    startDate: '',
    endDate: '',
    doctor: '',
    paymentStatus: 'all',
    sortBy: 'date_desc'
  });

  // Update filters when currentFilters changes
  useEffect(() => {
    if (currentFilters && Object.keys(currentFilters).length > 0) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const statusOptions = [
    { value: 'PENDING', label: 'Pending', color: 'bg-yellow-100' },
    { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-green-100' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-blue-100' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-100' },
    { value: 'RESCHEDULED', label: 'Rescheduled', color: 'bg-purple-100' }
  ];

  const doctors = [
    'Dr. Samantha Sanchez',
    'Dr. John Reyes', 
    'Dr. Maria Santos',
    'Dr. Michael Chen',
    'Dr. Sarah Williams'
  ];

  const handleStatusToggle = (statusValue) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(statusValue)
        ? prev.status.filter(s => s !== statusValue)
        : [...prev.status, statusValue]
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      status: [],
      dateRange: 'all',
      startDate: '',
      endDate: '',
      doctor: '',
      paymentStatus: 'all',
      sortBy: 'date_desc'
    };
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-2">
            <Filter size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold">Advanced Filters</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Status Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Appointment Status</h3>
            <div className="flex flex-wrap gap-3">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleStatusToggle(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    filters.status.includes(option.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Doctor Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Doctor</h3>
            <select
              value={filters.doctor}
              onChange={(e) => setFilters({...filters, doctor: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Doctors</option>
              {doctors.map(doc => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Payment Status</h3>
            <div className="flex gap-3">
              {['all', 'paid', 'pending', 'refunded'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilters({...filters, paymentStatus: status})}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                    filters.paymentStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'date_desc', label: 'Newest First' },
                { value: 'date_asc', label: 'Oldest First' },
                { value: 'patient_asc', label: 'Patient Name A-Z' },
                { value: 'doctor_asc', label: 'Doctor Name A-Z' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilters({...filters, sortBy: option.value})}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    filters.sortBy === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white flex gap-3 p-6 border-t">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilterModal;