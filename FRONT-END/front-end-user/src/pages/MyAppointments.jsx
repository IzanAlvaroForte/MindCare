import { useState, useEffect } from 'react';
import AppointmentFilters from '../components/Appointments/AppointmentFilters';
import AppointmentsList from '../components/Appointments/AppointmentsList';
import CancelModal from '../components/Appointments/CancelModal';
import AppointmentDetailsModal from '../components/Appointments/AppointmentDetailsModal';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Load appointments from localStorage (mock)
  useEffect(() => {
    const loadAppointments = () => {
      const savedBookings = localStorage.getItem('userBookings');
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        // Add IDs to mock bookings
        const withIds = bookings.map((booking, idx) => ({ ...booking, id: idx + 1 }));
        setAppointments(withIds);
        setFilteredAppointments(withIds);
      } else {
        // Mock data if no bookings exist
        const mockAppointments = [
          { id: 1, doctorName: 'Samantha Sanchez', doctorSpecialty: 'Counselor', date: '2024-05-10', time: '10:00 AM', status: 'CONFIRMED', location: 'Online Clinic', patientName: 'John Doe', patientEmail: 'john@example.com', patientPhone: '09123456789', reason: 'Anxiety and stress', fee: 500 },
          { id: 2, doctorName: 'John Reyes', doctorSpecialty: 'Psychiatrist', date: '2024-05-15', time: '02:00 PM', status: 'PENDING', location: 'Quezon City', patientName: 'John Doe', patientEmail: 'john@example.com', patientPhone: '09123456789', reason: 'Medication review', fee: 1000 },
        ];
        setAppointments(mockAppointments);
        setFilteredAppointments(mockAppointments);
      }
      setLoading(false);
    };

    loadAppointments();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...appointments];
    
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(apt => apt.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAppointments(filtered);
  }, [filterStatus, searchTerm, appointments]);

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = () => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, status: 'CANCELLED' } : apt
    );
    setAppointments(updatedAppointments);
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleReschedule = (appointment) => {
    // Navigate to booking page with reschedule mode
    window.location.href = `/booking?doctor=${appointment.doctorId}&reschedule=${appointment.id}`;
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 mt-1">View and manage your scheduled consultations</p>
      </div>

      {/* Filters */}
      <AppointmentFilters
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Appointments List */}
      <AppointmentsList
        appointments={filteredAppointments}
        onViewDetails={handleViewDetails}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />

      {/* Modals */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancel}
        appointment={selectedAppointment}
      />

      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default MyAppointments;