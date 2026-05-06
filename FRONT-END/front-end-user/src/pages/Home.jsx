import { useState, useEffect } from 'react';
import WelcomeBanner from '../components/Home/WelcomeBanner';
import QuickActions from '../components/Home/QuickActions';
import UpcomingAppointments from '../components/Home/UpcomingAppointments';

const Home = () => {
  const [userName, setUserName] = useState('User');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserName(JSON.parse(storedUser).name);
    }

    // Load appointments (mock for now)
    setTimeout(() => {
      setAppointments([
        { id: 1, doctorName: 'Dr. Samantha Sanchez', specialty: 'Counselor', date: '2024-05-10', time: '10:00 AM', status: 'CONFIRMED' },
        { id: 2, doctorName: 'Dr. John Reyes', specialty: 'Psychiatrist', date: '2024-05-15', time: '02:00 PM', status: 'PENDING' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleCancel = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const handleReschedule = (id) => {
    console.log('Reschedule appointment:', id);
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
      <WelcomeBanner userName={userName} />
      <QuickActions />
      <UpcomingAppointments 
        appointments={appointments}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />
    </div>
  );
};

export default Home;