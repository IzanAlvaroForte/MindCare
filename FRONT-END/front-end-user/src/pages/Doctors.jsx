import { useState, useEffect } from 'react';
import { Search, Star, MapPin, Clock, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { getDoctors, bookAppointment, getCurrentUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6); // 6 doctors per page
  
  const navigate = useNavigate();

  const specialties = [
    'ALL',
    'Counselor',
    'Psychiatrist', 
    'Psychologist',
    'Psychometrician'
  ];

  const getSpecialtyIcon = (specialty) => {
    const icons = {
      Counselor: '💬',
      Psychiatrist: '⚕️',
      Psychologist: '🧠',
      Psychometrician: '📊'
    };
    return icons[specialty] || '👨‍⚕️';
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedSpecialty, doctors]);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = [...doctors];
    
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialty !== 'ALL') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }
    
    setFilteredDoctors(filtered);
  };

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookAppointment = (doctor) => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/signupin');
      return;
    }
    navigate(`/booking?doctorId=${doctor.id}&doctorName=${doctor.name}&fee=${doctor.fee}`);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Doctors</h1>
        <p className="text-gray-500 mt-1">Browse our experienced mental health professionals</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'ALL' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {currentDoctors.length} of {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>
      )}

      {/* Doctors Grid */}
      {currentDoctors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500">No doctors found matching your criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('ALL');
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                        {getSpecialtyIcon(doctor.specialty)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Dr. {doctor.name}</h3>
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          {doctor.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>Online Consultation</span>
                    </div>
                    {doctor.bio && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{doctor.bio}</p>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">₱{doctor.fee}</span>
                      <span className="text-sm text-gray-500"> / session</span>
                    </div>
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Doctors;