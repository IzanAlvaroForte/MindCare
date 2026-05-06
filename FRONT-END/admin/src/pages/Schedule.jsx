import { useState } from 'react';
import CalendarHeader from '../components/Schedule/CalendarHeader';
import DoctorSelect from '../components/Schedule/DoctorSelect';
import WeekView from '../components/Schedule/WeekView';
import ScheduleLegend from '../components/Schedule/ScheduleLegend';
import AppointmentModal from '../components/Schedule/AppointmentModal';

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Samantha Sanchez', specialty: 'Counselor' },
  { id: 2, name: 'Dr. John Reyes', specialty: 'Psychiatrist' },
  { id: 3, name: 'Dr. Maria Santos', specialty: 'Psychologist' },
];

const MOCK_APPOINTMENTS = [
  { id: 1, patientName: 'John Doe', doctorName: 'Dr. Samantha Sanchez', date: '2024-05-05', time: '10:00 AM', status: 'CONFIRMED' },
  { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. John Reyes', date: '2024-05-06', time: '02:00 PM', status: 'PENDING' },
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('ALL');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
        isToday: d.toDateString() === today.toDateString()
      };
    });
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const weekDays = getWeekDays(currentDate);
  
  const filteredAppointments = selectedDoctor === 'ALL' 
    ? appointments 
    : appointments.filter(apt => {
        const doctor = MOCK_DOCTORS.find(d => d.id === selectedDoctor);
        return apt.doctorName === doctor?.name;
      });

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

  const handleTimeSlotClick = (day, time) => {
    setSelectedSlot({ day, time });
    setIsModalOpen(true);
  };

  const handleScheduleAppointment = (newAppointment) => {
    const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
    setAppointments([...appointments, { id: newId, ...newAppointment }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Schedule Management</h1>
        <p className="text-gray-500">Manage doctor schedules and appointments</p>
      </div>

      <DoctorSelect 
        doctors={MOCK_DOCTORS}
        selectedDoctor={selectedDoctor}
        onSelect={setSelectedDoctor}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <CalendarHeader 
          currentDate={currentDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onToday={handleToday}
        />

        <ScheduleLegend />

        <WeekView 
          weekDays={weekDays}
          timeSlots={timeSlots}
          appointments={filteredAppointments}
          onTimeSlotClick={handleTimeSlotClick}
        />
      </div>

      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slot={selectedSlot}
        doctors={MOCK_DOCTORS}
        onSchedule={handleScheduleAppointment}
      />
    </div>
  );
};

export default Schedule;