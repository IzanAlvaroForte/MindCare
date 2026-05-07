import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import DoctorFilter from '../components/Schedule/DoctorFilter';
import CalendarHeader from '../components/Schedule/CalendarHeader';
import ScheduleLegend from '../components/Schedule/ScheduleLegend';
import WeekView from '../components/Schedule/WeekView';
import { getDoctors, getAllAppointments } from '../services/api';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('ALL');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [doctorsData, appointmentsData] = await Promise.all([
        getDoctors(),
        getAllAppointments()
      ]);
      setDoctors(doctorsData || []);
      setAppointments(appointmentsData || []);
      
      // Debug: Log first appointment to see structure
      if (appointmentsData && appointmentsData.length > 0) {
        console.log('First appointment from API:', appointmentsData[0]);
      }
    } catch (err) {
      console.error('Error loading schedule:', err);
      setError('Failed to load schedule data');
    } finally {
      setLoading(false);
    }
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));
    
    return [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const today = new Date();
      return {
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.toISOString().split('T')[0],
        fullDate: d,
        isToday: d.toDateString() === today.toDateString()
      };
    });
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const formatTime = (time) => {
    const hour = parseInt(time.split(':')[0]);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
  };

  const weekDays = getWeekDays(currentDate);
  
  const filteredAppointments = selectedDoctor === 'ALL' 
    ? appointments 
    : appointments.filter(apt => apt.doctor?.id === selectedDoctor);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeekRange = () => {
    const start = weekDays[0]?.fullDate;
    const end = weekDays[6]?.fullDate;
    if (!start || !end) return '';
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const handlePrevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 7);
    setCurrentDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 7);
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button onClick={loadData} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Schedule Management</h1>
        <p className="text-sm text-gray-500 mt-1">View doctor schedules and patient appointments</p>
      </div>

      <DoctorFilter 
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        onSelect={setSelectedDoctor}
      />

      <CalendarHeader 
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        weekRange={getWeekRange()}
      />

      <ScheduleLegend />

      {doctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          No doctors found. Please add doctors in Doctor Management first.
        </div>
      ) : filteredAppointments.length === 0 && selectedDoctor !== 'ALL' ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          No appointments found for this doctor.
        </div>
      ) : (
        <WeekView 
          weekDays={weekDays}
          timeSlots={timeSlots}
          appointments={filteredAppointments}
          selectedDoctor={selectedDoctor}
          formatTime={formatTime}
          getStatusStyle={getStatusStyle}
        />
      )}
    </div>
  );
};

export default Schedule;