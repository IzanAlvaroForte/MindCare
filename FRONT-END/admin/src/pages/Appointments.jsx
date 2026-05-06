import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AppointmentFilters from '../components/Appointments/AppointmentFilters';
import AppointmentTable from '../components/Appointments/AppointmentTable';
import AppointmentDetailsModal from '../components/Appointments/AppointmentDetailsModal';
import RescheduleModal from '../components/Appointments/RescheduleModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import AppointmentFilterModal from '../components/Appointments/AppointmentFilterModal';

// Mock data
const MOCK_APPOINTMENTS = [
  { id: 3001, patientName: 'John Doe', patientEmail: 'john@example.com', patientPhone: '09123456789', doctorName: 'Dr. Samantha Sanchez', doctorSpecialty: 'Counselor', date: '2024-05-05', time: '10:00 AM', status: 'CONFIRMED', reason: 'Anxiety and stress' },
  { id: 3002, patientName: 'Jane Smith', patientEmail: 'jane@example.com', patientPhone: '09123456788', doctorName: 'Dr. John Reyes', doctorSpecialty: 'Psychiatrist', date: '2024-05-05', time: '02:00 PM', status: 'PENDING', reason: 'Follow-up check' },
  { id: 3003, patientName: 'Mike Brown', patientEmail: 'mike@example.com', patientPhone: '09123456787', doctorName: 'Dr. Maria Santos', doctorSpecialty: 'Psychologist', date: '2024-05-04', time: '11:00 AM', status: 'COMPLETED', reason: 'Therapy session' },
  { id: 3004, patientName: 'Sarah Lee', patientEmail: 'sarah@example.com', patientPhone: '09123456786', doctorName: 'Dr. Samantha Sanchez', doctorSpecialty: 'Counselor', date: '2024-05-06', time: '09:00 AM', status: 'PENDING', reason: 'Initial consultation' },
  { id: 3005, patientName: 'Chris Wilson', patientEmail: 'chris@example.com', patientPhone: '09123456785', doctorName: 'Dr. John Reyes', doctorSpecialty: 'Psychiatrist', date: '2024-05-03', time: '03:00 PM', status: 'CANCELLED', reason: 'Medication review' },
];

const Appointments = () => {
  // All useState hooks at the top
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'ALL', doctor: 'ALL', startDate: '', endDate: '' });
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // useEffect hook
  useEffect(() => {
    setTimeout(() => {
      setAppointments(MOCK_APPOINTMENTS);
      setFilteredAppointments(MOCK_APPOINTMENTS);
      setLoading(false);
    }, 500);
  }, []);

  // Apply basic filters (search, status, doctor, date range)
  const applyFilters = () => {
    let filtered = [...appointments];
    
    if (filters.search) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.status !== 'ALL') {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }
    
    if (filters.doctor !== 'ALL') {
      filtered = filtered.filter(apt => apt.doctorName === filters.doctor);
    }
    
    if (filters.startDate) {
      filtered = filtered.filter(apt => apt.date >= filters.startDate);
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(apt => apt.date <= filters.endDate);
    }
    
    setFilteredAppointments(filtered);
  };

  // Reset basic filters
  const resetBasicFilters = () => {
    setFilters({ search: '', status: 'ALL', doctor: 'ALL', startDate: '', endDate: '' });
    setFilteredAppointments(appointments);
    setAdvancedFilters({});
  };

  // Handle advanced filter from modal
  const handleAdvancedFilter = (newFilters) => {
    setAdvancedFilters(newFilters);
    
    let filtered = [...appointments];
    
    // Filter by status (if any selected)
    if (newFilters.status && newFilters.status.length > 0) {
      filtered = filtered.filter(apt => newFilters.status.includes(apt.status));
    }
    
    // Filter by date range
    if (newFilters.startDate) {
      filtered = filtered.filter(apt => apt.date >= newFilters.startDate);
    }
    if (newFilters.endDate) {
      filtered = filtered.filter(apt => apt.date <= newFilters.endDate);
    }
    
    // Filter by doctor
    if (newFilters.doctor) {
      filtered = filtered.filter(apt => apt.doctorName === newFilters.doctor);
    }
    
    // Apply sorting
    if (newFilters.sortBy) {
      switch (newFilters.sortBy) {
        case 'date_desc':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'date_asc':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'patient_asc':
          filtered.sort((a, b) => a.patientName.localeCompare(b.patientName));
          break;
        case 'doctor_asc':
          filtered.sort((a, b) => a.doctorName.localeCompare(b.doctorName));
          break;
        default:
          break;
      }
    }
    
    setFilteredAppointments(filtered);
  };

  const handleConfirm = (appointment) => {
    setConfirmAction(() => () => {
      const updatedAppointments = appointments.map(apt => 
        apt.id === appointment.id ? { ...apt, status: 'CONFIRMED' } : apt
      );
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
    });
    setShowConfirmDialog(true);
  };

  const handleCancel = (appointment) => {
    setConfirmAction(() => () => {
      const updatedAppointments = appointments.map(apt => 
        apt.id === appointment.id ? { ...apt, status: 'CANCELLED' } : apt
      );
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
    });
    setShowConfirmDialog(true);
  };

  const handleReschedule = (id, newSchedule) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, ...newSchedule, status: 'RESCHEDULED' } : apt
    );
    setAppointments(updatedAppointments);
    setFilteredAppointments(updatedAppointments);
  };

  const confirmActionHandler = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmDialog(false);
  };

  // Loading state
  if (loading) return <LoadingSpinner />;

  // Return JSX
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointment Management</h1>
        <p className="text-gray-500">View and manage all patient appointments</p>
      </div>

      <AppointmentFilters 
        filters={filters}
        onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
        onSearch={applyFilters}
        onReset={resetBasicFilters}
        onOpenAdvancedFilter={() => setIsFilterModalOpen(true)}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <AppointmentTable 
          appointments={filteredAppointments}
          onView={(apt) => { setSelectedAppointment(apt); setIsDetailsModalOpen(true); }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onReschedule={(apt) => { setSelectedAppointment(apt); setIsRescheduleModalOpen(true); }}
        />
      </div>

      <AppointmentDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      />

      <RescheduleModal 
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        appointment={selectedAppointment}
        onReschedule={handleReschedule}
      />

      <AppointmentFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleAdvancedFilter}
        currentFilters={advancedFilters}
      />

      <ConfirmDialog 
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmActionHandler}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
      />
    </div>
  );
};

export default Appointments;