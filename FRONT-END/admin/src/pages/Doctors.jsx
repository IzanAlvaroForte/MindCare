import { useState, useEffect } from 'react';
import { Filter, ChevronDown, Plus } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import DoctorTable from '../components/Doctors/DoctorTable';
import DoctorModal from '../components/Doctors/DoctorModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import { getDoctors, updateDoctor, deleteDoctor, createDoctor } from '../services/api';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    // Name search
    const matchesName = searchName === '' || 
      doctor.name.toLowerCase().includes(searchName.toLowerCase());
    
    // ID search
    const matchesId = searchId === '' || 
      doctor.id.toString().includes(searchId);
    
    // Specialty filter
    const matchesSpecialty = selectedSpecialty === 'ALL' || doctor.specialty === selectedSpecialty;
    
    // Status filter
    const matchesStatus = selectedStatus === 'ALL' || doctor.status === selectedStatus;
    
    return matchesName && matchesId && matchesSpecialty && matchesStatus;
  });

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === 'ACTIVE').length,
    onLeave: doctors.filter(d => d.status === 'ON_LEAVE').length,
    busy: doctors.filter(d => d.status === 'BUSY').length,
  };

  const hasActiveFilters = selectedSpecialty !== 'ALL' || selectedStatus !== 'ALL' || searchName !== '' || searchId !== '';

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleSaveDoctor = async (doctorData) => {
    try {
      if (selectedDoctor) {
        await updateDoctor(selectedDoctor.id, doctorData);
      } else {
        await createDoctor(doctorData);
      }
      await loadDoctors();
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save doctor');
    }
  };

  const handleDeleteDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoctor(selectedDoctor.id);
      await loadDoctors();
      setShowDeleteConfirm(false);
      setSelectedDoctor(null);
    } catch (err) {
      setError('Failed to delete doctor');
    }
  };

  const resetFilters = () => {
    setSearchName('');
    setSearchId('');
    setSelectedSpecialty('ALL');
    setSelectedStatus('ALL');
  };

  const StatCard = ({ title, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Management</h1>
        <p className="text-gray-500">Manage all doctors, their schedules, and availability</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Doctors" value={stats.total} color="#3b82f6" />
        <StatCard title="Active" value={stats.active} color="#10b981" />
        <StatCard title="On Leave" value={stats.onLeave} color="#f59e0b" />
        <StatCard title="Busy" value={stats.busy} color="#ef4444" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search by Name */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Search by ID */}
          <div className="w-40">
            <input
              type="text"
              placeholder="🔢 Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {(selectedSpecialty !== 'ALL' ? 1 : 0) + (selectedStatus !== 'ALL' ? 1 : 0)}
              </span>
            )}
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Add Doctor Button */}
          <button
            onClick={handleAddDoctor}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={18} />
            Add Doctor
          </button>
        </div>

        {/* Expandable Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-6">
              {/* Specialty Filter */}
              <div className="min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Specialties</option>
                  <option value="Counselor">Counselor</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="Psychologist">Psychologist</option>
                  <option value="Psychometrician">Psychometrician</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="BUSY">Busy</option>
                </select>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear filters
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
        Showing {filteredDoctors.length} of {doctors.length} doctors
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DoctorTable 
          doctors={filteredDoctors}
          onView={() => {}}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />
      </div>

      <DoctorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
        onSave={handleSaveDoctor}
      />

      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        message={`Are you sure you want to delete Dr. ${selectedDoctor?.name}?`}
      />
    </div>
  );
};

export default Doctors;