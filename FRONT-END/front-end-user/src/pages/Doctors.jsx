import { useState } from 'react';
import DoctorSearchBar from '../components/Doctors/DoctorSearchBar';
import DoctorFilter from '../components/Doctors/DoctorFilter';
import DoctorsList from '../components/Doctors/DoctorsList';
import DoctorProfileModal from '../components/Doctors/DoctorProfileModal';

// Mock data
const MOCK_DOCTORS = [
  { id: 1, name: 'Samantha Sanchez', specialty: 'Counselor', rating: 4.9, experience: 5, fee: 500, location: 'Online Clinic', availability: 'Today 8AM - 8PM', specializations: ['Anxiety', 'Stress', 'Relationships'] },
  { id: 2, name: 'John Reyes', specialty: 'Psychiatrist', rating: 4.8, experience: 10, fee: 1000, location: 'Quezon City', availability: 'Mon-Fri 9AM - 5PM', specializations: ['Depression', 'Bipolar', 'Anxiety'] },
  { id: 3, name: 'Maria Santos', specialty: 'Psychologist', rating: 4.9, experience: 7, fee: 800, location: 'Online Clinic', availability: 'Today 10AM - 6PM', specializations: ['Trauma', 'PTSD', 'Therapy'] },
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDoctors = MOCK_DOCTORS.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleBook = (doctor) => {
    console.log('Book appointment with:', doctor);
    // Navigate to booking page with doctor ID
    window.location.href = `/booking?doctor=${doctor.id}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Find a Doctor</h1>
        <p className="text-gray-500 mt-1">Browse our experienced mental health professionals</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <DoctorSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Filter */}
      <div className="mb-8">
        <DoctorFilter selectedSpecialty={selectedSpecialty} onSpecialtyChange={setSelectedSpecialty} />
      </div>

      {/* Doctors List */}
      <DoctorsList 
        doctors={filteredDoctors}
        onViewProfile={handleViewProfile}
        onBook={handleBook}
      />

      {/* Profile Modal */}
      <DoctorProfileModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBook}
      />
    </div>
  );
};

export default Doctors;