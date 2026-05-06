import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import DoctorSearchBar from '../components/Doctors/DoctorSearchBar';
import DoctorTable from '../components/Doctors/DoctorTable';
import DoctorModal from '../components/Doctors/DoctorModal';
import ConfirmDialog from '../components/Common/ConfirmDialog';

// Mock data
const MOCK_DOCTORS = [
  { 
    id: 1001,  // ← Doctor ID
    name: 'Samantha Sanchez', 
    specialty: 'Counselor', 
    email: 'samantha@mindcare.com', 
    phone: '09123456789', 
    license: 'PRC-001', 
    experience: '5', 
    fee: 500, 
    status: 'ACTIVE' 
  },
  { 
    id: 1002, 
    name: 'John Reyes', 
    specialty: 'Psychiatrist', 
    email: 'john@mindcare.com', 
    phone: '09123456788', 
    license: 'PRC-002', 
    experience: '10', 
    fee: 1000, 
    status: 'ACTIVE' 
  },
  { 
    id: 1003, 
    name: 'Maria Santos', 
    specialty: 'Psychologist', 
    email: 'maria@mindcare.com', 
    phone: '09123456787', 
    license: 'PRC-003', 
    experience: '7', 
    fee: 800, 
    status: 'ON_LEAVE' 
  },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDoctors(MOCK_DOCTORS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'ALL' || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleSaveDoctor = (doctorData) => {
    if (selectedDoctor) {
      setDoctors(doctors.map(d => d.id === selectedDoctor.id ? { ...d, ...doctorData } : d));
    } else {
      const newDoctor = { id: doctors.length + 1, ...doctorData };
      setDoctors([...doctors, newDoctor]);
    }
  };

  const handleDelete = () => {
    setDoctors(doctors.filter(d => d.id !== selectedDoctor.id));
    setShowDeleteConfirm(false);
    setSelectedDoctor(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
        <p className="text-gray-500">Manage all doctors, their schedules, and availability</p>
      </div>

      <DoctorSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDoctor={() => { setSelectedDoctor(null); setIsModalOpen(true); }}
        onFilter={setSpecialtyFilter}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DoctorTable 
          doctors={filteredDoctors}
          onView={(doctor) => { setSelectedDoctor(doctor); setIsModalOpen(true); }}
          onEdit={(doctor) => { setSelectedDoctor(doctor); setIsModalOpen(true); }}
          onDelete={(doctor) => { setSelectedDoctor(doctor); setShowDeleteConfirm(true); }}
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
        onConfirm={handleDelete}
        title="Delete Doctor"
        message={`Are you sure you want to delete Dr. ${selectedDoctor?.name}?`}
      />
    </div>
  );
};

export default Doctors;