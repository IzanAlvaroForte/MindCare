import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DoctorInfo from '../components/Booking/DoctorInfo';
import DateTimeSelector from '../components/Booking/DateTimeSelector';
import PatientForm from '../components/Booking/PatientForm';
import BookingSummary from '../components/Booking/BookingSummary';
import BookingSuccess from '../components/Booking/BookingSuccess';

// Mock doctors data (should match Doctors page)
const MOCK_DOCTORS = [
  { id: 1, name: 'Samantha Sanchez', specialty: 'Counselor', rating: 4.9, experience: 5, fee: 500, location: 'Online Clinic' },
  { id: 2, name: 'John Reyes', specialty: 'Psychiatrist', rating: 4.8, experience: 10, fee: 1000, location: 'Quezon City' },
  { id: 3, name: 'Maria Santos', specialty: 'Psychologist', rating: 4.9, experience: 7, fee: 800, location: 'Online Clinic' },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctor');
  
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    reason: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Load doctor from URL param or localStorage
    if (doctorId) {
      const found = MOCK_DOCTORS.find(d => d.id === parseInt(doctorId));
      setDoctor(found);
    }
  }, [doctorId]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (!selectedDate || !selectedTime || !formData.patientName || !formData.patientEmail || !formData.patientPhone) {
      alert('Please fill in all required fields');
      return;
    }

    // Create booking
    const booking = {
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      date: selectedDate,
      time: selectedTime,
      ...formData,
      status: 'PENDING',
      bookedAt: new Date().toISOString()
    };

    // Save to localStorage (mock)
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));

    setBookingDetails(booking);
    setIsSubmitted(true);
  };

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Loading doctor information...</p>
          <a href="/doctors" className="text-primary mt-4 inline-block">Back to Doctors</a>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <BookingSuccess bookingDetails={bookingDetails} onClose={() => setIsSubmitted(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Book an Appointment</h1>
        <p className="text-gray-500 mt-1">Fill in the details to schedule your consultation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <DoctorInfo doctor={doctor} />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <DateTimeSelector 
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
              />
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
                <PatientForm formData={formData} onChange={handleFormChange} />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div>
          <BookingSummary 
            doctor={doctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;