import { useState, useEffect } from 'react';
import { Filter, ChevronDown, Calendar, Users, Stethoscope, Activity } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AppointmentTable from '../components/Appointments/AppointmentTable';
import AppointmentDetailsModal from '../components/Appointments/AppointmentDetailsModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('');
  
  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...appointments];
    
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        (apt.user?.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (apt.doctor?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(apt => apt.status === selectedStatus);
    }
    
    if (selectedDate) {
      filtered = filtered.filter(apt => apt.appointmentDate === selectedDate);
    }
    
    setFilteredAppointments(filtered);
  }, [searchTerm, selectedStatus, selectedDate, appointments]);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
  };

  const hasActiveFilters = searchTerm !== '' || selectedStatus !== 'ALL' || selectedDate !== '';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setSelectedDate('');
  };

  const handleConfirm = (appointment) => {
    setConfirmAction(() => async () => {
      await updateAppointmentStatus(appointment.id, 'CONFIRMED');
      await loadAppointments();
    });
    setShowConfirmDialog(true);
  };

  const handleCancel = (appointment) => {
    setConfirmAction(() => async () => {
      await updateAppointmentStatus(appointment.id, 'CANCELLED');
      await loadAppointments();
    });
    setShowConfirmDialog(true);
  };

  const handleComplete = (appointment) => {
    setConfirmAction(() => async () => {
      await updateAppointmentStatus(appointment.id, 'COMPLETED');
      await loadAppointments();
    });
    setShowConfirmDialog(true);
  };

  const confirmActionHandler = async () => {
    if (confirmAction) {
      await confirmAction();
    }
    setShowConfirmDialog(false);
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointment Management</h1>
        <p className="text-gray-500">View and manage all patient appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard title="Total" value={stats.total} icon={Calendar} color="#3b82f6" />
        <StatCard title="Pending" value={stats.pending} icon={Activity} color="#f59e0b" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={Users} color="#10b981" />
        <StatCard title="Completed" value={stats.completed} icon={Stethoscope} color="#8b5cf6" />
        <StatCard title="Cancelled" value={stats.cancelled} icon={Activity} color="#ef4444" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <div className="w-40">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          {/* Date Filter */}
          <div className="w-40">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by date"
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter size={18} />
            <span>More Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {(selectedStatus !== 'ALL' ? 1 : 0) + (searchTerm !== '' ? 1 : 0) + (selectedDate !== '' ? 1 : 0)}
              </span>
            )}
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-6">
              {/* Date Range (optional) */}
              <div className="min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    placeholder="From"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="date"
                    placeholder="To"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Results count */}
      <div className="mb-3 text-sm text-gray-500">
        Showing {filteredAppointments.length} of {appointments.length} appointments
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <AppointmentTable 
          appointments={filteredAppointments}
          onView={(apt) => {
            setSelectedAppointment(apt);
            setIsDetailsModalOpen(true);
          }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      </div>

      <AppointmentDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      />

      <ConfirmDialog 
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmActionHandler}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
      />
    </div>
  );
};

export default Appointments;